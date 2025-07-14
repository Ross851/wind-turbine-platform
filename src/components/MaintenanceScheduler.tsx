import React, { useState, useEffect } from 'react';
import { getTurbines, getMaintenanceSchedule } from '../lib/turbine-service';
import type { Turbine, MaintenanceRecord } from '../types/turbine';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

const MaintenanceScheduler: React.FC = () => {
  const [turbines, setTurbines] = useState<Turbine[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  useEffect(() => {
    const fetchData = async () => {
      const [turbinesData, maintenanceData] = await Promise.all([
        getTurbines(),
        getMaintenanceSchedule()
      ]);
      setTurbines(turbinesData);
      setMaintenanceRecords(maintenanceData);
    };

    fetchData();
  }, []);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getMaintenanceForDate = (date: Date) => {
    return turbines.filter(turbine => 
      isSameDay(new Date(turbine.maintenance.nextScheduled), date)
    );
  };

  const getMaintenanceType = (turbine: Turbine) => {
    const hoursSinceLastMaintenance = turbine.maintenance.hoursRunning;
    if (hoursSinceLastMaintenance > 2000) return 'major';
    if (hoursSinceLastMaintenance > 1000) return 'minor';
    return 'inspection';
  };

  const getMaintenanceColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800 border-red-200';
      case 'minor': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'inspection': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, -7))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold">
              Week of {format(weekStart, 'MMM d, yyyy')}
            </h2>
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, 7))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded ${view === 'calendar' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded ${view === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="bg-gray-50 px-4 py-2 text-center">
                <div className="text-sm font-medium text-gray-900">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-semibold">
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weekDays.map((day) => {
              const dayMaintenance = getMaintenanceForDate(day);
              return (
                <div key={day.toISOString()} className="bg-white p-4 min-h-[200px]">
                  <div className="space-y-2">
                    {dayMaintenance.map((turbine) => {
                      const type = getMaintenanceType(turbine);
                      return (
                        <div
                          key={turbine.id}
                          className={`p-2 rounded border text-xs ${getMaintenanceColor(type)}`}
                        >
                          <div className="font-semibold">{turbine.name}</div>
                          <div className="capitalize">{type} maintenance</div>
                          <div className="mt-1">{turbine.maintenance.hoursRunning} hrs</div>
                        </div>
                      );
                    })}
                    {dayMaintenance.length === 0 && (
                      <div className="text-gray-400 text-sm text-center py-8">
                        No maintenance
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Maintenance</h3>
            <div className="space-y-4">
              {turbines
                .sort((a, b) => new Date(a.maintenance.nextScheduled).getTime() - new Date(b.maintenance.nextScheduled).getTime())
                .map((turbine) => {
                  const type = getMaintenanceType(turbine);
                  const daysUntil = Math.ceil((new Date(turbine.maintenance.nextScheduled).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={turbine.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{turbine.name}</h4>
                          <p className="text-sm text-gray-600">{turbine.specifications.model}</p>
                          <div className="mt-2 space-y-1 text-sm">
                            <p>Type: <span className={`px-2 py-1 rounded text-xs ${getMaintenanceColor(type)}`}>{type}</span></p>
                            <p>Last Inspection: {format(new Date(turbine.maintenance.lastInspection), 'MMM d, yyyy')}</p>
                            <p>Running Hours: {turbine.maintenance.hoursRunning}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            {format(new Date(turbine.maintenance.nextScheduled), 'MMM d')}
                          </p>
                          <p className="text-sm text-gray-600">
                            {daysUntil === 0 ? 'Today' : `In ${daysUntil} days`}
                          </p>
                          <button className="mt-2 text-sm text-primary-600 hover:text-primary-700">
                            Schedule Team →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">This Week</p>
          <p className="text-3xl font-bold">{turbines.filter(t => {
            const date = new Date(t.maintenance.nextScheduled);
            return date >= weekStart && date <= weekEnd;
          }).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Overdue</p>
          <p className="text-3xl font-bold text-red-600">
            {turbines.filter(t => new Date(t.maintenance.nextScheduled) < new Date()).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Next 30 Days</p>
          <p className="text-3xl font-bold">
            {turbines.filter(t => {
              const date = new Date(t.maintenance.nextScheduled);
              return date > new Date() && date <= addDays(new Date(), 30);
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Avg Hours/Turbine</p>
          <p className="text-3xl font-bold">
            {Math.round(turbines.reduce((sum, t) => sum + t.maintenance.hoursRunning, 0) / turbines.length)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScheduler;