import React, { useState, useEffect } from 'react';
import { getTurbines } from '../lib/turbine-service';
import { getSeaConditions } from '../lib/weather-service';
import type { Turbine, SeaConditions } from '../types/turbine';

interface MaintenanceWindow {
  start: Date;
  end: Date;
  conditions: 'optimal' | 'acceptable' | 'risky' | 'dangerous';
  waveHeight: number;
  windSpeed: number;
}

const OffshoreMonitor: React.FC = () => {
  const [turbines, setTurbines] = useState<Turbine[]>([]);
  const [filter, setFilter] = useState<'all' | 'offshore' | 'maintenance-needed' | 'offline'>('all');
  const [seaConditions, setSeaConditions] = useState<Map<string, SeaConditions>>(new Map());
  const [maintenanceWindows, setMaintenanceWindows] = useState<Map<string, MaintenanceWindow[]>>(new Map());
  const [showSeaView, setShowSeaView] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const turbineData = await getTurbines();
      setTurbines(turbineData);

      // Fetch sea conditions for offshore turbines
      const offshoreOnly = turbineData.filter(t => t.type === 'offshore');
      const seaData = new Map<string, SeaConditions>();
      
      for (const turbine of offshoreOnly) {
        const conditions = await getSeaConditions(turbine.location.lat, turbine.location.lng);
        seaData.set(turbine.id, conditions);
      }
      
      setSeaConditions(seaData);
      calculateMaintenanceWindows(seaData);
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  const calculateMaintenanceWindows = (seaData: Map<string, SeaConditions>) => {
    const windows = new Map<string, MaintenanceWindow[]>();
    
    // Simulate 7-day forecast of maintenance windows
    seaData.forEach((conditions, turbineId) => {
      const turbineWindows: MaintenanceWindow[] = [];
      
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour += 6) {
          const date = new Date();
          date.setDate(date.getDate() + day);
          date.setHours(hour, 0, 0, 0);
          
          // Simulate varying conditions
          const waveHeight = conditions.waveHeight + (Math.random() - 0.5) * 2;
          const windSpeed = 10 + Math.random() * 15;
          
          let conditionRating: 'optimal' | 'acceptable' | 'risky' | 'dangerous';
          if (waveHeight < 1.5 && windSpeed < 15) {
            conditionRating = 'optimal';
          } else if (waveHeight < 2.5 && windSpeed < 20) {
            conditionRating = 'acceptable';
          } else if (waveHeight < 3.5 && windSpeed < 25) {
            conditionRating = 'risky';
          } else {
            conditionRating = 'dangerous';
          }
          
          turbineWindows.push({
            start: new Date(date),
            end: new Date(date.getTime() + 6 * 60 * 60 * 1000),
            conditions: conditionRating,
            waveHeight: Number(waveHeight.toFixed(1)),
            windSpeed: Number(windSpeed.toFixed(1))
          });
        }
      }
      
      windows.set(turbineId, turbineWindows);
    });
    
    setMaintenanceWindows(windows);
  };

  const getFilteredTurbines = () => {
    return turbines.filter(turbine => {
      switch (filter) {
        case 'offshore':
          return turbine.type === 'offshore';
        case 'maintenance-needed':
          return turbine.status === 'maintenance' || turbine.maintenance.alerts.length > 0;
        case 'offline':
          return turbine.status === 'offline';
        default:
          return true;
      }
    });
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'optimal': return 'bg-green-500';
      case 'acceptable': return 'bg-yellow-500';
      case 'risky': return 'bg-orange-500';
      case 'dangerous': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeaConditionStatus = (conditions: SeaConditions) => {
    if (conditions.waveHeight > 3) return { status: 'dangerous', message: 'No vessel operations' };
    if (conditions.waveHeight > 2) return { status: 'risky', message: 'Limited operations only' };
    if (conditions.waveHeight > 1.5) return { status: 'acceptable', message: 'Proceed with caution' };
    return { status: 'optimal', message: 'Safe for all operations' };
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Offshore Operations Monitor</h2>
            <p className="text-gray-600">Real-time sea conditions and maintenance windows</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSeaView(!showSeaView)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showSeaView ? 'Show Turbine View' : 'Show Sea Conditions'}
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(['all', 'offshore', 'maintenance-needed', 'offline'] as const).map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterType === 'all' && 'All Turbines'}
              {filterType === 'offshore' && '🌊 Offshore Only'}
              {filterType === 'maintenance-needed' && '🔧 Needs Maintenance'}
              {filterType === 'offline' && '⚠️ Offline'}
            </button>
          ))}
        </div>
      </div>

      {/* Sea Conditions View */}
      {showSeaView && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getFilteredTurbines()
            .filter(t => t.type === 'offshore')
            .map(turbine => {
              const conditions = seaConditions.get(turbine.id);
              const windows = maintenanceWindows.get(turbine.id) || [];
              const status = conditions ? getSeaConditionStatus(conditions) : null;
              
              return (
                <div key={turbine.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{turbine.name}</h3>
                      <p className="text-sm text-gray-600">
                        Status: <span className={`font-medium ${
                          turbine.status === 'operational' ? 'text-green-600' :
                          turbine.status === 'offline' ? 'text-red-600' :
                          'text-orange-600'
                        }`}>{turbine.status}</span>
                      </p>
                    </div>
                    {status && (
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        status.status === 'optimal' ? 'bg-green-100 text-green-800' :
                        status.status === 'acceptable' ? 'bg-yellow-100 text-yellow-800' :
                        status.status === 'risky' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {status.message}
                      </div>
                    )}
                  </div>

                  {conditions && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-sm text-gray-600">Wave Height</p>
                          <p className="text-xl font-bold text-blue-600">{conditions.waveHeight.toFixed(1)} m</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-sm text-gray-600">Current Speed</p>
                          <p className="text-xl font-bold text-blue-600">{conditions.currentSpeed.toFixed(2)} m/s</p>
                        </div>
                        <div className="bg-teal-50 p-3 rounded">
                          <p className="text-sm text-gray-600">Swell Height</p>
                          <p className="text-xl font-bold text-teal-600">{conditions.swellHeight.toFixed(1)} m</p>
                        </div>
                        <div className="bg-teal-50 p-3 rounded">
                          <p className="text-sm text-gray-600">Water Temp</p>
                          <p className="text-xl font-bold text-teal-600">{conditions.waterTemperature.toFixed(1)}°C</p>
                        </div>
                      </div>

                      {/* Maintenance Windows */}
                      <div>
                        <h4 className="font-semibold mb-2">Next 48h Maintenance Windows</h4>
                        <div className="grid grid-cols-8 gap-1">
                          {windows.slice(0, 8).map((window, idx) => (
                            <div
                              key={idx}
                              className={`h-8 rounded ${getConditionColor(window.conditions)} opacity-80 relative group cursor-pointer`}
                              title={`${window.start.toLocaleTimeString()} - Wave: ${window.waveHeight}m`}
                            >
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                                {window.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                <br />Wave: {window.waveHeight}m
                                <br />Wind: {window.windSpeed} m/s
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                          <span>Now</span>
                          <span>+48 hours</span>
                        </div>
                      </div>
                    </>
                  )}

                  {turbine.status === 'offline' && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm font-semibold text-red-800">⚠️ Turbine Offline</p>
                      <p className="text-sm text-red-700 mt-1">
                        Waiting for sea conditions to improve for maintenance crew dispatch
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* Maintenance Priority View */}
      {!showSeaView && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Maintenance Priority Queue</h3>
            <div className="space-y-4">
              {getFilteredTurbines()
                .filter(t => t.status === 'maintenance' || t.status === 'offline' || t.maintenance.alerts.length > 0)
                .sort((a, b) => {
                  // Prioritize offline turbines
                  if (a.status === 'offline' && b.status !== 'offline') return -1;
                  if (b.status === 'offline' && a.status !== 'offline') return 1;
                  return b.maintenance.alerts.length - a.maintenance.alerts.length;
                })
                .map(turbine => {
                  const conditions = seaConditions.get(turbine.id);
                  const nextGoodWindow = maintenanceWindows.get(turbine.id)?.find(w => 
                    w.conditions === 'optimal' || w.conditions === 'acceptable'
                  );

                  return (
                    <div key={turbine.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{turbine.name}</h4>
                            {turbine.status === 'offline' && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                OFFLINE
                              </span>
                            )}
                            {turbine.type === 'offshore' && (
                              <span className="text-blue-600">🌊</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {turbine.maintenance.alerts.length > 0 
                              ? turbine.maintenance.alerts[0].message
                              : 'Scheduled maintenance required'}
                          </p>
                          {nextGoodWindow && (
                            <p className="text-sm text-green-600 mt-2">
                              ✓ Next safe window: {nextGoodWindow.start.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Priority</p>
                          <p className={`text-2xl font-bold ${
                            turbine.status === 'offline' ? 'text-red-600' : 'text-orange-600'
                          }`}>
                            {turbine.status === 'offline' ? 'HIGH' : 'MED'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Sea Condition Legend</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Optimal (Wave &lt; 1.5m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Acceptable (Wave &lt; 2.5m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Risky (Wave &lt; 3.5m)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Dangerous (Wave &gt; 3.5m)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffshoreMonitor;