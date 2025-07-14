import React, { useState, useEffect } from 'react';
import { getTurbines } from '../lib/turbine-service';
import type { Turbine } from '../types/turbine';

const TurbineList: React.FC = () => {
  const [turbines, setTurbines] = useState<Turbine[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'operational' | 'warning' | 'maintenance' | 'offline'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
  }, []);

  const filteredTurbines = turbines.filter(turbine => {
    const matchesFilter = filter === 'all' || turbine.status === filter;
    const matchesSearch = turbine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turbine.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Turbine['status']) => {
    const colors = {
      operational: 'bg-success-100 text-success-800',
      warning: 'bg-orange-100 text-orange-800',
      maintenance: 'bg-blue-100 text-blue-800',
      offline: 'bg-red-100 text-red-800'
    };
    
    return `px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filters and Search */}
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search turbines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'operational', 'warning', 'maintenance', 'offline'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Turbine Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turbine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Maintenance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTurbines.map((turbine) => (
              <tr key={turbine.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{turbine.name}</div>
                    <div className="text-sm text-gray-500">{turbine.specifications.model}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(turbine.status)}>
                    {turbine.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {turbine.type === 'offshore' ? '🌊 Offshore' : '🏔️ Onshore'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {turbine.location.lat.toFixed(4)}, {turbine.location.lng.toFixed(4)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="flex items-center">
                      <span className="text-gray-500">Power:</span>
                      <span className="ml-2 font-medium">{turbine.performance.currentPower} MW</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500">Wind:</span>
                      <span className="ml-2 font-medium">{turbine.performance.windSpeed} m/s</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(turbine.maintenance.nextScheduled).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.ceil((new Date(turbine.maintenance.nextScheduled).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-3">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Turbines</p>
            <p className="text-2xl font-bold">{turbines.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Operational</p>
            <p className="text-2xl font-bold text-success-600">
              {turbines.filter(t => t.status === 'operational').length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Capacity</p>
            <p className="text-2xl font-bold">
              {turbines.reduce((sum, t) => sum + t.specifications.capacity, 0).toFixed(1)} MW
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Current Output</p>
            <p className="text-2xl font-bold text-primary-600">
              {turbines.reduce((sum, t) => sum + t.performance.currentPower, 0).toFixed(1)} MW
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurbineList;