'use client';

import { useState } from 'react';

export default function TestChartPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    birthDate: '1990-05-15',
    birthTime: '14:30',
    latitude: '-6.2088',
    longitude: '106.8456',
    timezone: 'Asia/Jakarta',
    houseSystem: 'P',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/charts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate chart');
      }

      setResult(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">AstroAI - Chart Calculator</h1>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">Birth Date</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Birth Time</label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">Latitude</label>
              <input
                type="text"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="-6.2088"
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Longitude</label>
              <input
                type="text"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="106.8456"
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">House System</label>
            <select
              value={formData.houseSystem}
              onChange={(e) => setFormData({ ...formData, houseSystem: e.target.value })}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
            >
              <option value="P">Placidus</option>
              <option value="K">Koch</option>
              <option value="E">Equal</option>
              <option value="W">Whole Sign</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Calculating...' : 'Calculate Chart'}
          </button>
        </form>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Natal Chart Results</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Planets</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(result.planets).map(([name, planet]: [string, any]) => (
                  <div key={name} className="bg-slate-700 rounded p-2 text-sm">
                    <span className="font-medium capitalize">{name}</span>
                    <div className="text-slate-400">
                      {planet.sign} {planet.signDegree.toFixed(1)}°
                      {planet.retrograde && ' ℞'}
                    </div>
                    <div className="text-xs text-slate-500">House {planet.house}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Houses</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {result.houses.map((house: any) => (
                  <div key={house.house} className="bg-slate-700 rounded p-2 text-sm">
                    <span className="font-medium">House {house.house}</span>
                    <div className="text-slate-400">
                      {house.sign} {house.signDegree.toFixed(1)}°
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Angles</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-700 rounded p-2 text-sm">
                  <span className="font-medium">ASC</span>
                  <div className="text-slate-400">{result.angles.ascendant.toFixed(2)}°</div>
                </div>
                <div className="bg-slate-700 rounded p-2 text-sm">
                  <span className="font-medium">MC</span>
                  <div className="text-slate-400">{result.angles.mc.toFixed(2)}°</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-400">Aspects ({result.aspects.length})</h3>
              <div className="max-h-40 overflow-y-auto">
                {result.aspects.map((aspect: any, i: number) => (
                  <div key={i} className="bg-slate-700 rounded p-2 text-sm mb-1 flex justify-between">
                    <span>{aspect.planet1} {aspect.type} {aspect.planet2}</span>
                    <span className="text-slate-400">orb: {aspect.orb.toFixed(2)}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
