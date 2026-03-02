import { NextResponse } from 'next/server';
import { calculateNatalChart, initEphemeris } from '@/lib/ephemeris/swisseph';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { birthDate, birthTime, latitude, longitude, timezone, houseSystem = 'P' } = body;

    if (!birthDate || !birthTime || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize ephemeris
    initEphemeris();

    // Combine date and time
    const dateTimeString = `${birthDate}T${birthTime}`;
    const birthDateTime = new Date(dateTimeString);

    // Calculate chart
    const chart = calculateNatalChart(
      birthDateTime,
      parseFloat(latitude),
      parseFloat(longitude),
      houseSystem
    );

    return NextResponse.json({
      success: true,
      data: chart,
    });
  } catch (error) {
    console.error('Chart calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate chart', details: (error as Error).message },
      { status: 500 }
    );
  }
}
