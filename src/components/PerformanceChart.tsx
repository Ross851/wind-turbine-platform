import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart: React.FC = () => {
  // Generate mock data for the last 24 hours
  const generateData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = time.getHours();
      
      // Simulate realistic wind patterns
      const baseWind = 10 + Math.sin(hour / 24 * Math.PI * 2) * 3;
      const windSpeed = baseWind + Math.random() * 2 - 1;
      const powerOutput = Math.max(0, Math.min(50, windSpeed * 3.5 + Math.random() * 5));
      
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hour: hour,
        windSpeed: Number(windSpeed.toFixed(1)),
        powerOutput: Number(powerOutput.toFixed(1)),
        efficiency: Number((powerOutput / 50 * 100).toFixed(1))
      });
    }
    
    return data;
  };

  const data = generateData();

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            interval={4}
          />
          <YAxis 
            yAxisId="power"
            orientation="left"
            tick={{ fontSize: 12 }}
            label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="wind"
            orientation="right"
            tick={{ fontSize: 12 }}
            label={{ value: 'Wind Speed (m/s)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ccc' }}
            formatter={(value: any, name: string) => {
              const unit = name === 'Power Output' ? ' MW' : ' m/s';
              return [value + unit, name];
            }}
          />
          <Legend />
          <Line 
            yAxisId="power"
            type="monotone" 
            dataKey="powerOutput" 
            stroke="#00c369" 
            strokeWidth={2}
            name="Power Output"
            dot={false}
          />
          <Line 
            yAxisId="wind"
            type="monotone" 
            dataKey="windSpeed" 
            stroke="#0085ff" 
            strokeWidth={2}
            name="Wind Speed"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Avg Power Output</p>
          <p className="text-xl font-bold text-success-600">
            {(data.reduce((acc, d) => acc + d.powerOutput, 0) / data.length).toFixed(1)} MW
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Peak Power</p>
          <p className="text-xl font-bold text-primary-600">
            {Math.max(...data.map(d => d.powerOutput)).toFixed(1)} MW
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Capacity Factor</p>
          <p className="text-xl font-bold text-orange-600">
            {(data.reduce((acc, d) => acc + d.efficiency, 0) / data.length).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;