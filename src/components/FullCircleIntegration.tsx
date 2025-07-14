import React, { useState } from 'react';
import { format } from 'date-fns';

interface ServiceTicket {
  id: string;
  turbineId: string;
  brand: string;
  model: string;
  serviceType: '24/7-emergency' | 'scheduled' | 'inspection' | 'repair';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'completed' | 'pending-parts';
  description: string;
  createdAt: string;
  assignedTeam: string;
  estimatedCompletion: string;
  customerName: string;
  siteLocation: string;
}

interface BrandExpertise {
  brand: string;
  models: string[];
  certifiedTechnicians: number;
  yearsExperience: number;
  totalServiced: number;
}

const FullCircleIntegration: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'tickets' | 'expertise' | 'monitoring'>('dashboard');
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Multi-brand expertise data
  const brandExpertise: BrandExpertise[] = [
    {
      brand: 'Vestas',
      models: ['V90', 'V110', 'V117', 'V136', 'V150'],
      certifiedTechnicians: 12,
      yearsExperience: 18,
      totalServiced: 450
    },
    {
      brand: 'GE',
      models: ['1.5MW', '2.5MW', '2.7-116', '2.8-127', '3.x Platform'],
      certifiedTechnicians: 10,
      yearsExperience: 15,
      totalServiced: 380
    },
    {
      brand: 'Siemens Gamesa',
      models: ['SWT-2.3', 'SWT-3.0', 'SG 5.0', 'SG 8.0'],
      certifiedTechnicians: 8,
      yearsExperience: 12,
      totalServiced: 290
    },
    {
      brand: 'Nordex',
      models: ['N117', 'N131', 'N149', 'Delta4000'],
      certifiedTechnicians: 6,
      yearsExperience: 10,
      totalServiced: 180
    },
    {
      brand: 'Enercon',
      models: ['E-82', 'E-101', 'E-126', 'E-138'],
      certifiedTechnicians: 5,
      yearsExperience: 8,
      totalServiced: 120
    }
  ];

  // Mock service tickets
  const serviceTickets: ServiceTicket[] = [
    {
      id: 'TKT-2024-001',
      turbineId: 'WT-VES-001',
      brand: 'Vestas',
      model: 'V136',
      serviceType: '24/7-emergency',
      priority: 'critical',
      status: 'in-progress',
      description: 'Gearbox temperature alarm - immediate inspection required',
      createdAt: '2024-03-13T14:30:00Z',
      assignedTeam: 'Team Alpha',
      estimatedCompletion: '2024-03-13T18:00:00Z',
      customerName: 'Wind Farm Holdings LLC',
      siteLocation: 'Colorado Wind Farm'
    },
    {
      id: 'TKT-2024-002',
      turbineId: 'WT-GE-045',
      brand: 'GE',
      model: '2.5MW',
      serviceType: 'scheduled',
      priority: 'medium',
      status: 'open',
      description: 'Annual maintenance - 8000 hour service',
      createdAt: '2024-03-13T09:00:00Z',
      assignedTeam: 'Team Bravo',
      estimatedCompletion: '2024-03-15T17:00:00Z',
      customerName: 'Green Energy Partners',
      siteLocation: 'Texas Panhandle Site'
    }
  ];

  // 24/7 Support metrics
  const supportMetrics = {
    averageResponseTime: 45, // minutes
    activeTickets: 12,
    ticketsToday: 8,
    ticketsThisWeek: 34,
    uptime: 97.8,
    technicianUtilization: 82
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Full Circle Branding */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Full Circle Wind Services</h1>
            <p className="text-green-100 mt-1">Multi-Brand O&M Excellence • 24/7 Technical Support</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-100">Nearly 20 Years Experience</p>
            <p className="text-2xl font-bold">1,420+ Turbines Serviced</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow p-1">
        <div className="flex space-x-1">
          {(['dashboard', 'tickets', 'expertise', 'monitoring'] as const).map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeView === view
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <>
          {/* 24/7 Support Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-green-600">{supportMetrics.averageResponseTime}m</p>
                </div>
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Tickets</p>
                  <p className="text-2xl font-bold">{supportMetrics.activeTickets}</p>
                </div>
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Tickets</p>
                  <p className="text-2xl font-bold">{supportMetrics.ticketsToday}</p>
                </div>
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Weekly Total</p>
                  <p className="text-2xl font-bold">{supportMetrics.ticketsThisWeek}</p>
                </div>
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fleet Uptime</p>
                  <p className="text-2xl font-bold text-green-600">{supportMetrics.uptime}%</p>
                </div>
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tech Utilization</p>
                  <p className="text-2xl font-bold">{supportMetrics.technicianUtilization}%</p>
                </div>
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button 
                onClick={() => setShowNewTicketForm(true)}
                className="p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Service Ticket
              </button>
              <button 
                onClick={() => setShowMaintenanceForm(true)}
                className="p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Schedule Maintenance
              </button>
              <button 
                onClick={() => setShowContactForm(true)}
                className="p-4 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                24/7 Support Contact
              </button>
              <button 
                onClick={() => setShowReportModal(true)}
                className="p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Performance Report
              </button>
            </div>
          </div>
        </>
      )}

      {/* Service Tickets View */}
      {activeView === 'tickets' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Service Tickets</h3>
              <button 
                onClick={() => setShowNewTicketForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                + New Ticket
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {serviceTickets.map(ticket => (
                <div key={ticket.id} className={`border rounded-lg p-4 ${getPriorityColor(ticket.priority)}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{ticket.id}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          ticket.serviceType === '24/7-emergency' ? 'bg-red-600 text-white' :
                          ticket.serviceType === 'scheduled' ? 'bg-blue-600 text-white' :
                          ticket.serviceType === 'inspection' ? 'bg-purple-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {ticket.serviceType}
                        </span>
                        <span className="text-sm text-gray-600">{ticket.brand} {ticket.model}</span>
                      </div>
                      <p className="text-gray-800 mb-2">{ticket.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Customer:</span>
                          <span className="ml-1 font-medium">{ticket.customerName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Site:</span>
                          <span className="ml-1 font-medium">{ticket.siteLocation}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Team:</span>
                          <span className="ml-1 font-medium">{ticket.assignedTeam}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">ETA:</span>
                          <span className="ml-1 font-medium">
                            {format(new Date(ticket.estimatedCompletion), 'MMM d, h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'completed' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'pending-parts' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Multi-Brand Expertise View */}
      {activeView === 'expertise' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Multi-Brand Service Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandExpertise.map(brand => (
                <div key={brand.brand} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold">{brand.brand}</h4>
                    <span className="text-sm text-gray-600">{brand.yearsExperience} years</span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Certified Technicians</span>
                      <span className="font-medium">{brand.certifiedTechnicians}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Turbines Serviced</span>
                      <span className="font-medium">{brand.totalServiced}+</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Models Supported:</p>
                    <div className="flex flex-wrap gap-1">
                      {brand.models.map(model => (
                        <span key={model} className="px-2 py-1 bg-gray-100 text-xs rounded">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Why Choose Full Circle?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-semibold">24/7/365 Support</h4>
                <p className="text-sm text-gray-600 mt-1">Round-the-clock technical support with rapid response times</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h4 className="font-semibold">Multi-Brand Certified</h4>
                <p className="text-sm text-gray-600 mt-1">Expert technicians certified across all major turbine brands</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h4 className="font-semibold">Proactive Monitoring</h4>
                <p className="text-sm text-gray-600 mt-1">Advanced monitoring to prevent issues before they occur</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monitoring View */}
      {activeView === 'monitoring' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Real-Time Fleet Monitoring</h3>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-600">Advanced monitoring dashboard coming soon</p>
            <p className="text-sm text-gray-500 mt-2">Real-time performance metrics, predictive analytics, and proactive alerts</p>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Create Service Ticket</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Turbine ID</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="WT-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option>Vestas</option>
                    <option>GE</option>
                    <option>Siemens Gamesa</option>
                    <option>Nordex</option>
                    <option>Enercon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Service Type</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option>24/7 Emergency</option>
                    <option>Scheduled Maintenance</option>
                    <option>Inspection</option>
                    <option>Repair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="Describe the issue..."></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewTicketForm(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Maintenance Modal */}
      {showMaintenanceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Schedule Maintenance</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Turbine(s)</label>
                  <input type="text" className="w-full border rounded px-3 py-2" placeholder="Select turbines..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Maintenance Type</label>
                  <select className="w-full border rounded px-3 py-2">
                    <option>500hr Service</option>
                    <option>1000hr Service</option>
                    <option>2000hr Service</option>
                    <option>Annual Inspection</option>
                    <option>Blade Inspection</option>
                    <option>Gearbox Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Date</label>
                  <input type="date" className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration (Days)</label>
                  <input type="number" className="w-full border rounded px-3 py-2" placeholder="2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Special Requirements</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3} placeholder="Any special tools, parts, or access requirements..."></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowMaintenanceForm(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 24/7 Support Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold mb-4">24/7 Emergency Support</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <p className="text-orange-800 font-semibold">Emergency Hotline: +1-800-WINDFIX</p>
              <p className="text-orange-700 text-sm">Available 24/7/365 for critical issues</p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input type="tel" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Turbine Location</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issue Description</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3}></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowContactForm(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">Request Callback</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Performance Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Fleet Performance Report</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Availability</p>
                  <p className="text-2xl font-bold text-green-600">97.8%</p>
                  <p className="text-xs text-gray-500">↑ 2.3% from last month</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="text-2xl font-bold text-blue-600">94.5%</p>
                  <p className="text-xs text-gray-500">↑ 1.2% from last month</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Energy</p>
                  <p className="text-2xl font-bold text-purple-600">42.5 GWh</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Key Achievements</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Zero safety incidents for 180 consecutive days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Reduced average repair time by 23% through predictive maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Successfully serviced 127 turbines across 5 different brands</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowReportModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Close</button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Download Full Report</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullCircleIntegration;