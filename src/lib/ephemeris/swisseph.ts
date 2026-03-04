/**
 * Swiss Ephemeris Integration for AstroAI
 * 
 * This module provides astronomical calculations using the Swiss Ephemeris library.
 * 
 * Required ephemeris files (download from https://github.com/aloistr/swisseph/tree/master/ephe):
 * - sepl_18.se1 (planets)
 * - semo_18.se1 (moon)
 * - seas_18.se1 (asteroids)
 * 
 * Place files in: public/ephe/ or configure custom path
 */

import * as sweph from 'swisseph';
import * as path from 'path';

// Planet constants from swephexp.h
export const PLANETS = {
  SUN: 0,
  MOON: 1,
  MERCURY: 2,
  VENUS: 3,
  MARS: 4,
  JUPITER: 5,
  SATURN: 6,
  URANUS: 7,
  NEPTUNE: 8,
  PLUTO: 9,
  MEAN_NODE: 10,
  TRUE_NODE: 11,
  CHIRON: 15,
} as const;

// House system codes
export const HOUSE_SYSTEMS = {
  PLACIDUS: 'P',
  KOCH: 'K',
  EQUAL: 'E',
  WHOLE_SIGN: 'W',
  CAMPANUS: 'C',
  REGIOMONTANUS: 'R',
  PORPHYRY: 'O',
  MORINUS: 'M',
} as const;

// Zodiac signs
export const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

// Aspect types
export interface Aspect {
  planet1: string;
  planet2: string;
  type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition' | 'quincunx';
  angle: number;
  orb: number;
  applying: boolean;
}

export interface PlanetPosition {
  planet: string;
  longitude: number;
  latitude: number;
  distance: number;
  sign: string;
  signDegree: number;
  house: number;
  retrograde: boolean;
  speed: number;
}

export interface HouseCusp {
  house: number;
  cusp: number;
  sign: string;
  signDegree: number;
}

export interface ChartData {
  datetime: Date;
  julianDay: number;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  planets: Record<string, PlanetPosition>;
  houses: HouseCusp[];
  angles: {
    ascendant: number;
    mc: number;
    descendant: number;
    ic: number;
  };
  aspects: Aspect[];
}

let isInitialized = false;

/**
 * Initialize Swiss Ephemeris with ephemeris files path
 */
export function initEphemeris(ephePath?: string): void {
  if (isInitialized) return;
  
  const defaultPath = path.join(process.cwd(), 'public', 'ephe');
  const targetPath = ephePath || defaultPath;
  
  try {
    sweph.swe_set_ephe_path(targetPath);
    isInitialized = true;
    console.log('Swiss Ephemeris initialized with path:', targetPath);
  } catch (error) {
    console.error('Failed to initialize Swiss Ephemeris:', error);
    throw new Error('Ephemeris initialization failed');
  }
}

/**
 * Convert date to Julian Day
 */
export function toJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  
  const hourDecimal = hour + minute / 60 + second / 3600;
  
  return sweph.swe_julday(year, month, day, hourDecimal, sweph.SE_GREG_CAL);
}

/**
 * Calculate planet position
 */
export function calculatePlanet(
  julianDay: number,
  planetId: number,
  planetName: string
): PlanetPosition {
  // SEFLG_SPEED to get speed data (for retrograde detection)
  const flags = sweph.SEFLG_SPEED;
  const result = sweph.swe_calc_ut(julianDay, planetId, flags);
  
  const longitude = result.longitude;
  const signIndex = Math.floor(longitude / 30) % 12;
  
  return {
    planet: planetName,
    longitude,
    latitude: result.latitude,
    distance: result.distance,
    sign: SIGNS[signIndex],
    signDegree: longitude % 30,
    house: 0, // Will be set after house calculation
    retrograde: result.speedLongitude < 0,
    speed: result.speedLongitude,
  };
}

/**
 * Calculate all planet positions
 */
export function calculateAllPlanets(julianDay: number): Record<string, PlanetPosition> {
  const planets: Record<string, PlanetPosition> = {};
  
  for (const [name, id] of Object.entries(PLANETS)) {
    planets[name.toLowerCase()] = calculatePlanet(julianDay, id, name);
  }
  
  return planets;
}

/**
 * Calculate house cusps
 */
export function calculateHouses(
  julianDay: number,
  latitude: number,
  longitude: number,
  houseSystem: string = HOUSE_SYSTEMS.PLACIDUS
): { houses: HouseCusp[]; angles: ChartData['angles'] } {
  const result = sweph.swe_houses_ex(
    julianDay,
    0, // flags
    latitude,
    longitude,
    houseSystem
  );
  
  const houses: HouseCusp[] = result.house.map((cusp, index) => {
    const signIndex = Math.floor(cusp / 30) % 12;
    return {
      house: index + 1,
      cusp,
      sign: SIGNS[signIndex],
      signDegree: cusp % 30,
    };
  });
  
  return {
    houses,
    angles: {
      ascendant: result.ascendant,
      mc: result.mc,
      descendant: (result.ascendant + 180) % 360,
      ic: (result.mc + 180) % 360,
    },
  };
}

/**
 * Assign planets to houses
 */
export function assignPlanetsToHouses(
  planets: Record<string, PlanetPosition>,
  houses: HouseCusp[]
): Record<string, PlanetPosition> {
  const updatedPlanets = { ...planets };
  
  for (const planetName of Object.keys(updatedPlanets)) {
    const planet = updatedPlanets[planetName];
    const longitude = planet.longitude;
    
    // Find which house the planet is in
    for (let i = 0; i < 12; i++) {
      const houseStart = houses[i].cusp;
      const houseEnd = houses[(i + 1) % 12].cusp;
      
      // Handle wrap-around (e.g., house 12 to house 1)
      if (houseEnd < houseStart) {
        if (longitude >= houseStart || longitude < houseEnd) {
          planet.house = i + 1;
          break;
        }
      } else {
        if (longitude >= houseStart && longitude < houseEnd) {
          planet.house = i + 1;
          break;
        }
      }
    }
  }
  
  return updatedPlanets;
}

/**
 * Calculate aspects between planets
 */
export function calculateAspects(
  planets: Record<string, PlanetPosition>,
  orb: number = 8
): Aspect[] {
  const aspects: Aspect[] = [];
  const planetNames = Object.keys(planets);
  
  // Aspect angles
  const aspectAngles: Record<string, number> = {
    conjunction: 0,
    sextile: 60,
    square: 90,
    trine: 120,
    opposition: 180,
    quincunx: 150,
  };
  
  for (let i = 0; i < planetNames.length; i++) {
    for (let j = i + 1; j < planetNames.length; j++) {
      const p1 = planets[planetNames[i]];
      const p2 = planets[planetNames[j]];
      
      const angle = Math.abs(p1.longitude - p2.longitude);
      const normalizedAngle = angle > 180 ? 360 - angle : angle;
      
      for (const [type, targetAngle] of Object.entries(aspectAngles)) {
        const orbValue = Math.abs(normalizedAngle - targetAngle);
        
        if (orbValue <= orb) {
          aspects.push({
            planet1: p1.planet,
            planet2: p2.planet,
            type: type as Aspect['type'],
            angle: normalizedAngle,
            orb: orbValue,
            applying: isApplying(p1, p2, targetAngle),
          });
          break; // Only take the closest aspect
        }
      }
    }
  }
  
  return aspects;
}

/**
 * Determine if an aspect is applying or separating
 */
function isApplying(p1: PlanetPosition, p2: PlanetPosition, targetAngle: number): boolean {
  const currentAngle = Math.abs(p1.longitude - p2.longitude);
  const speed1 = p1.speed;
  const speed2 = p2.speed;
  
  // Simplified: if faster planet is moving toward the aspect angle, it's applying
  const angleDiff = currentAngle - targetAngle;
  const relativeSpeed = speed1 - speed2;
  
  return (angleDiff > 0 && relativeSpeed < 0) || (angleDiff < 0 && relativeSpeed > 0);
}

/**
 * Calculate complete natal chart
 */
export function calculateNatalChart(
  birthDate: Date,
  latitude: number,
  longitude: number,
  houseSystem: string = HOUSE_SYSTEMS.PLACIDUS
): ChartData {
  if (!isInitialized) {
    initEphemeris();
  }
  
  const julianDay = toJulianDay(birthDate);
  
  // Calculate planets
  let planets = calculateAllPlanets(julianDay);
  
  // Calculate houses
  const { houses, angles } = calculateHouses(julianDay, latitude, longitude, houseSystem);
  
  // Assign planets to houses
  planets = assignPlanetsToHouses(planets, houses);
  
  // Calculate aspects
  const aspects = calculateAspects(planets);
  
  return {
    datetime: birthDate,
    julianDay,
    location: {
      latitude,
      longitude,
      timezone: 'UTC',
    },
    planets,
    houses,
    angles,
    aspects,
  };
}

/**
 * Get current transits for a natal chart
 */
export function calculateTransits(
  natalChart: ChartData,
  transitDate: Date = new Date()
): Aspect[] {
  if (!isInitialized) {
    initEphemeris();
  }
  
  const transitJulianDay = toJulianDay(transitDate);
  const transitPlanets = calculateAllPlanets(transitJulianDay);
  
  const transits: Aspect[] = [];
  
  for (const natalPlanet of Object.values(natalChart.planets)) {
    for (const transitPlanet of Object.values(transitPlanets)) {
      const angle = Math.abs(natalPlanet.longitude - transitPlanet.longitude);
      const normalizedAngle = angle > 180 ? 360 - angle : angle;
      
      // Only major aspects for transits
      const aspectAngles = [0, 60, 90, 120, 180];
      const orb = 3; // Tighter orb for transits
      
      for (const targetAngle of aspectAngles) {
        const orbValue = Math.abs(normalizedAngle - targetAngle);
        
        if (orbValue <= orb) {
          const typeMap: Record<number, string> = {
            0: 'conjunction',
            60: 'sextile',
            90: 'square',
            120: 'trine',
            180: 'opposition',
          };
          
          transits.push({
            planet1: `natal ${natalPlanet.planet}`,
            planet2: `transit ${transitPlanet.planet}`,
            type: typeMap[targetAngle] as Aspect['type'],
            angle: normalizedAngle,
            orb: orbValue,
            applying: isApplying(natalPlanet, transitPlanet, targetAngle),
          });
        }
      }
    }
  }
  
  return transits;
}

/**
 * Clean up resources
 */
export function closeEphemeris(): void {
  try {
    sweph.swe_close();
    isInitialized = false;
    console.log('Swiss Ephemeris closed');
  } catch (error) {
    console.error('Error closing Swiss Ephemeris:', error);
  }
}

// Auto-initialize on import (for server-side)
if (typeof window === 'undefined') {
  try {
    initEphemeris();
  } catch (error) {
    console.warn('Auto-initialization failed, call initEphemeris() manually');
  }
}
