import React, { useState } from 'react';
import { format } from 'date-fns';
import type { Turbine, MaintenanceRecord, Part } from '../types/turbine';

interface TurbineDetailModalProps {
  turbine: Turbine;
  isOpen: boolean;
  onClose: () => void;
}

interface TechnicianWork {
  id: string;
  technicianName: string;
  technicianId: string;
  date: string;
  workType: string;
  duration: number;
  partsUsed: Part[];
  oilChanged: boolean;
  notes: string;
  issues: string[];
  completionStatus: 'completed' | 'partial' | 'follow-up-required';
}

const TurbineDetailModal: React.FC<TurbineDetailModalProps> = ({ turbine, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'maintenance' | 'parts' | 'technicians' | 'report'>('overview');
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [reportText, setReportText] = useState('');

  if (!isOpen) return null;

  // Mock maintenance history
  const maintenanceHistory: TechnicianWork[] = [
    {
      id: 'MW001',
      technicianName: 'John Smith',
      technicianId: 'TECH001',
      date: '2024-03-01',
      workType: 'Scheduled Maintenance',
      duration: 4.5,
      partsUsed: [
        { id: 'P001', name: 'Hydraulic Filter', partNumber: 'HF-2000', quantity: 2, cost: 450 },
        { id: 'P002', name: 'Brake Pads', partNumber: 'BP-150', quantity: 4, cost: 800 }
      ],
      oilChanged: true,
      notes: 'Regular maintenance completed. Noticed slight wear on main bearing - monitor closely.',
      issues: ['Minor bearing wear detected'],
      completionStatus: 'completed'
    },
    {
      id: 'MW002',
      technicianName: 'Sarah Johnson',
      technicianId: 'TECH002',
      date: '2024-01-15',
      workType: 'Emergency Repair',
      duration: 8.0,
      partsUsed: [
        { id: 'P003', name: 'Control Board', partNumber: 'CB-500X', quantity: 1, cost: 2500 }
      ],
      oilChanged: false,
      notes: 'Control system failure resolved. Firmware updated to latest version.',
      issues: ['Control system malfunction'],
      completionStatus: 'completed'
    }
  ];

  // Required parts for next maintenance
  const requiredParts = [
    { name: 'Main Bearing', partNumber: 'MB-2000', quantity: 1, urgency: 'high', estimatedCost: 5000 },
    { name: 'Hydraulic Oil', partNumber: 'HO-15W40', quantity: 50, urgency: 'medium', estimatedCost: 1500 },
    { name: 'Air Filters', partNumber: 'AF-300', quantity: 6, urgency: 'low', estimatedCost: 300 }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{turbine.name}</h2>
              <p className="text-primary-200">{turbine.specifications.model} - {turbine.specifications.manufacturer}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  turbine.status === 'operational' ? 'bg-green-500' :
                  turbine.status === 'maintenance' ? 'bg-blue-500' :
                  turbine.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                }`}>
                  {turbine.status.toUpperCase()}
                </span>
                <span>{turbine.type === 'offshore' ? '🌊 Offshore' : '🏔️ Onshore'}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-gray-50">
          <div className="flex space-x-1 p-1">
            {(['overview', 'maintenance', 'parts', 'technicians', 'report'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Power</span>
                      <span className="font-medium">{turbine.performance.currentPower} MW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity Factor</span>
                      <span className="font-medium">{turbine.performance.capacityFactor}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Energy</span>
                      <span className="font-medium">{turbine.performance.totalEnergy.toLocaleString()} MWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Running Hours</span>
                      <span className="font-medium">{turbine.maintenance.hoursRunning.toLocaleString()} hrs</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Next Maintenance</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Scheduled Date</p>
                      <p className="font-medium">{format(new Date(turbine.maintenance.nextScheduled), 'MMMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Technician</p>
                      <p className="font-medium">{maintenanceHistory[0].technicianName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Maintenance Type</p>
                      <p className="font-medium">Major Service (2000hr)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {turbine.maintenance.alerts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Active Alerts</h3>
                  {turbine.maintenance.alerts.map(alert => (
                    <div key={alert.id} className="flex items-start gap-3 mt-2">
                      <span className="text-red-600">⚠️</span>
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-gray-600">{new Date(alert.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Maintenance History Tab */}
          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Complete Maintenance History</h3>
              {maintenanceHistory.map(work => (
                <div key={work.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{work.workType}</h4>
                      <p className="text-sm text-gray-600">{format(new Date(work.date), 'MMMM d, yyyy')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      work.completionStatus === 'completed' ? 'bg-green-100 text-green-800' :
                      work.completionStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {work.completionStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Technician:</span> {work.technicianName} ({work.technicianId})</p>
                      <p><span className="font-medium">Duration:</span> {work.duration} hours</p>
                      <p><span className="font-medium">Oil Changed:</span> {work.oilChanged ? '✅ Yes' : '❌ No'}</p>
                    </div>
                    <div>
                      <p className="font-medium">Parts Used:</p>
                      <ul className="ml-4 text-gray-600">
                        {work.partsUsed.map(part => (
                          <li key={part.id}>{part.quantity}x {part.name} (${part.cost})</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {work.notes && (
                    <div className="mt-3 p-3 bg-gray-100 rounded">
                      <p className="text-sm font-medium">Technician Notes:</p>
                      <p className="text-sm text-gray-700">{work.notes}</p>
                    </div>
                  )}

                  {work.issues.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-orange-600">Issues Found:</p>
                      <ul className="text-sm text-orange-700">
                        {work.issues.map((issue, idx) => (
                          <li key={idx}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Parts Tab */}
          {activeTab === 'parts' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Required Parts for Next Maintenance</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Parts should be ordered at least 2 weeks before scheduled maintenance
                  </p>
                </div>
                <div className="space-y-3">
                  {requiredParts.map((part, idx) => (
                    <div key={idx} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{part.name}</h4>
                        <p className="text-sm text-gray-600">Part #: {part.partNumber}</p>
                        <p className="text-sm">Quantity needed: {part.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${part.estimatedCost}</p>
                        <span className={`px-2 py-1 rounded text-xs ${getUrgencyColor(part.urgency)}`}>
                          {part.urgency} priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="font-semibold">Total Estimated Cost: $6,800</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Parts Change History</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Part</th>
                      <th className="text-left p-2">Quantity</th>
                      <th className="text-left p-2">Technician</th>
                      <th className="text-left p-2">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceHistory.flatMap(work => 
                      work.partsUsed.map(part => (
                        <tr key={`${work.id}-${part.id}`} className="border-b">
                          <td className="p-2">{format(new Date(work.date), 'MM/dd/yyyy')}</td>
                          <td className="p-2">{part.name}</td>
                          <td className="p-2">{part.quantity}</td>
                          <td className="p-2">{work.technicianName}</td>
                          <td className="p-2">${part.cost}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Technicians Tab */}
          {activeTab === 'technicians' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Technician Work Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from(new Set(maintenanceHistory.map(w => w.technicianId))).map(techId => {
                  const techWork = maintenanceHistory.filter(w => w.technicianId === techId);
                  const tech = techWork[0];
                  const totalHours = techWork.reduce((sum, w) => sum + w.duration, 0);
                  
                  return (
                    <div key={techId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{tech.technicianName}</h4>
                          <p className="text-sm text-gray-600">ID: {tech.technicianId}</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Certified
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Jobs</span>
                          <span className="font-medium">{techWork.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Hours</span>
                          <span className="font-medium">{totalHours.toFixed(1)} hrs</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Visit</span>
                          <span className="font-medium">{format(new Date(tech.date), 'MM/dd/yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Specialties</span>
                          <span className="font-medium">Hydraulics, Control Systems</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-600">Performance Rating</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[1,2,3,4,5].map(star => (
                            <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Recommended Technician for Next Service</h4>
                <p className="text-sm text-blue-700">
                  Based on the detected bearing wear, John Smith (TECH001) is recommended due to his 
                  expertise in mechanical systems and familiarity with this turbine.
                </p>
              </div>
            </div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Maintenance Report</h3>
                <button
                  onClick={() => setIsEditingReport(!isEditingReport)}
                  className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                >
                  {isEditingReport ? 'Save Report' : 'Write Report'}
                </button>
              </div>

              {isEditingReport ? (
                <div>
                  <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    className="w-full h-96 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Write your detailed maintenance report here...

Include:
- Work performed
- Issues found
- Parts replaced
- Recommendations
- Follow-up required
- Safety concerns
- Performance observations"
                  />
                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                      Submit Report
                    </button>
                    <button 
                      onClick={() => setIsEditingReport(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {maintenanceHistory.slice(0, 1).map(work => (
                    <div key={work.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold">Maintenance Report - {work.workType}</h4>
                          <p className="text-sm text-gray-600">
                            {format(new Date(work.date), 'MMMM d, yyyy')} by {work.technicianName}
                          </p>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="prose max-w-none">
                        <h5 className="font-semibold mt-4">Work Performed:</h5>
                        <p className="text-gray-700">{work.notes}</p>
                        
                        <h5 className="font-semibold mt-4">Parts Replaced:</h5>
                        <ul className="text-gray-700">
                          {work.partsUsed.map(part => (
                            <li key={part.id}>{part.name} ({part.quantity} units)</li>
                          ))}
                        </ul>
                        
                        {work.oilChanged && (
                          <>
                            <h5 className="font-semibold mt-4">Oil Change:</h5>
                            <p className="text-gray-700">✅ Gearbox oil changed - 50L of HO-15W40 hydraulic oil</p>
                          </>
                        )}
                        
                        <h5 className="font-semibold mt-4">Issues Identified:</h5>
                        <ul className="text-gray-700">
                          {work.issues.map((issue, idx) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                        
                        <h5 className="font-semibold mt-4">Recommendations:</h5>
                        <p className="text-gray-700">
                          Monitor main bearing closely during next inspection. Consider scheduling 
                          bearing replacement within next 3-4 months to prevent failure.
                        </p>
                        
                        <h5 className="font-semibold mt-4">Next Steps:</h5>
                        <p className="text-gray-700">
                          Schedule follow-up inspection in 30 days to check bearing condition. 
                          Order replacement bearing (MB-2000) to have on hand.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurbineDetailModal;