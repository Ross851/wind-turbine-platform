import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GlobalStats: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');

  // Mock global statistics
  const globalData = {
    totalTurbines: 328547,
    totalCapacity: 845.2, // GW
    countriesActive: 84,
    averageCapacityFactor: 35.2,
    co2Avoided: 1.2, // billion tons/year
    homesEquivalent: 425000000
  };

  const countryData = [
    { country: 'China', capacity: 288.3, turbines: 145000 },
    { country: 'USA', capacity: 132.7, turbines: 67000 },
    { country: 'Germany', capacity: 63.8, turbines: 32000 },
    { country: 'India', capacity: 39.2, turbines: 22000 },
    { country: 'Spain', capacity: 27.1, turbines: 21000 },
    { country: 'UK', capacity: 24.7, turbines: 11000 },
    { country: 'France', capacity: 18.8, turbines: 9000 },
    { country: 'Brazil', capacity: 17.7, turbines: 8500 },
    { country: 'Others', capacity: 233.9, turbines: 13047 }
  ];

  const manufacturerData = [
    { name: 'Vestas', value: 28.5, color: '#0066cc' },
    { name: 'Siemens Gamesa', value: 22.3, color: '#00aa44' },
    { name: 'GE', value: 18.7, color: '#ff6600' },
    { name: 'Goldwind', value: 12.4, color: '#ffcc00' },
    { name: 'Enercon', value: 8.6, color: '#990099' },
    { name: 'Others', value: 9.5, color: '#666666' }
  ];

  const growthData = [
    { year: '2018', capacity: 591, offshore: 23 },
    { year: '2019', capacity: 651, offshore: 29 },
    { year: '2020', capacity: 743, offshore: 35 },
    { year: '2021', capacity: 837, offshore: 57 },
    { year: '2022', capacity: 906, offshore: 64 },
    { year: '2023', capacity: 1021, offshore: 75 },
    { year: '2024', capacity: 1147, offshore: 92 }
  ];

  return (
    <div className="space-y-6">
      {/* Global Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Turbines</p>
          <p className="text-2xl font-bold">{globalData.totalTurbines.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-1">Worldwide</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Total Capacity</p>
          <p className="text-2xl font-bold">{globalData.totalCapacity} GW</p>
          <p className="text-xs opacity-75 mt-1">Installed power</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Countries</p>
          <p className="text-2xl font-bold">{globalData.countriesActive}</p>
          <p className="text-xs opacity-75 mt-1">With wind power</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Capacity Factor</p>
          <p className="text-2xl font-bold">{globalData.averageCapacityFactor}%</p>
          <p className="text-xs opacity-75 mt-1">Global average</p>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">CO₂ Avoided</p>
          <p className="text-2xl font-bold">{globalData.co2Avoided}B</p>
          <p className="text-xs opacity-75 mt-1">Tons per year</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg p-4">
          <p className="text-sm opacity-90">Homes Powered</p>
          <p className="text-2xl font-bold">{(globalData.homesEquivalent / 1000000).toFixed(0)}M</p>
          <p className="text-xs opacity-75 mt-1">Equivalent homes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Capacity by Country */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Wind Power Capacity by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" angle={-45} textAnchor="end" height={70} />
              <YAxis label={{ value: 'Capacity (GW)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="capacity" fill="#0066cc" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Manufacturer Market Share */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Global Manufacturer Market Share</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={manufacturerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {manufacturerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Trend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Global Wind Power Growth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: 'Capacity (GW)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="capacity" stroke="#0066cc" name="Total Capacity" strokeWidth={2} />
            <Line type="monotone" dataKey="offshore" stroke="#00aa44" name="Offshore" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold mb-3">Onshore vs Offshore</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Onshore</span>
                <span className="text-sm font-semibold">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Offshore</span>
                <span className="text-sm font-semibold">8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold mb-3">Average Turbine Size</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Onshore</span>
              <span className="font-semibold">3.2 MW</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Offshore</span>
              <span className="font-semibold">8.0 MW</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hub Height (avg)</span>
              <span className="font-semibold">105m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rotor Diameter (avg)</span>
              <span className="font-semibold">126m</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold mb-3">Power Generation</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Annual Generation</span>
              <span className="font-semibold">2,100 TWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Global Electricity</span>
              <span className="font-semibold">7.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="font-semibold text-green-600">+12%/yr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">2030 Target</span>
              <span className="font-semibold">3,000 GW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Live Global Wind Power Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm opacity-90">Current Output</p>
            <p className="text-3xl font-bold">{(globalData.totalCapacity * 0.352).toFixed(1)} GW</p>
            <p className="text-xs opacity-75">Real-time generation</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Wind Speed (avg)</p>
            <p className="text-3xl font-bold">8.7 m/s</p>
            <p className="text-xs opacity-75">Global average</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Turbines Online</p>
            <p className="text-3xl font-bold">94.2%</p>
            <p className="text-xs opacity-75">Operational status</p>
          </div>
          <div>
            <p className="text-sm opacity-90">CO₂ Saved Today</p>
            <p className="text-3xl font-bold">3.3M</p>
            <p className="text-xs opacity-75">Tons avoided</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;