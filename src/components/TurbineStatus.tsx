import React, { useState, useEffect } from 'react';
import { getTurbines } from '../lib/turbine-service';
import type { Turbine } from '../types/turbine';

const TurbineStatus: React.FC = () => {
  const [turbines, setTurbines] = useState<Turbine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurbines = async () => {
      try {
        const data = await getTurbines();
        setTurbines(data);
      } catch (error) {
        console.error('Error fetching turbines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurbines();
    const interval = setInterval(fetchTurbines, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Turbine['status']) => {
    switch (status) {
      case 'operational': return 'text-success-600 bg-success-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'maintenance': return 'text-blue-600 bg-blue-100';
      case 'offline': return 'text-red-600 bg-red-100';
    }
  };

  const getStatusIcon = (status: Turbine['status']) => {
    switch (status) {
      case 'operational':
        return <span className="text-success-600">●</span>;
      case 'warning':
        return <span className="text-orange-600">▲</span>;
      case 'maintenance':
        return <span className="text-blue-600">■</span>;
      case 'offline':
        return <span className="text-red-600">✕</span>;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Turbine Status</h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {turbines.map((turbine) => (
          <div key={turbine.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getStatusIcon(turbine.status)}</span>
                <div>
                  <h3 className="font-semibold text-sm">{turbine.name}</h3>
                  <p className="text-xs text-gray-500">{turbine.type === 'offshore' ? '🌊 Offshore' : '🏔️ Onshore'}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(turbine.status)}`}>
                {turbine.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Power:</span>
                <span className="ml-1 font-medium">{turbine.performance.currentPower} MW</span>
              </div>
              <div>
                <span className="text-gray-500">Wind:</span>
                <span className="ml-1 font-medium">{turbine.performance.windSpeed} m/s</span>
              </div>
              <div>
                <span className="text-gray-500">Efficiency:</span>
                <span className="ml-1 font-medium">{turbine.performance.capacityFactor}%</span>
              </div>
              <div>
                <span className="text-gray-500">Temp:</span>
                <span className="ml-1 font-medium">{turbine.performance.temperature}°C</span>
              </div>
            </div>

            {turbine.maintenance.alerts.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs text-orange-600">
                  ⚠️ {turbine.maintenance.alerts.length} active alert{turbine.maintenance.alerts.length > 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2 text-xs">
        <div className="text-center">
          <p className="text-gray-500">Total Capacity</p>
          <p className="font-bold text-lg">{turbines.reduce((sum, t) => sum + t.specifications.capacity, 0).toFixed(1)} MW</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Active Power</p>
          <p className="font-bold text-lg text-success-600">
            {turbines.reduce((sum, t) => sum + t.performance.currentPower, 0).toFixed(1)} MW
          </p>
        </div>
      </div>
    </div>
  );
};

export default TurbineStatus;