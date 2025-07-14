import React, { useState } from 'react';
import { format } from 'date-fns';

interface Technician {
  id: string;
  name: string;
  certifications: Certification[];
  specialties: string[];
  competencyScore: number;
  totalJobs: number;
  avgCompletionTime: number;
  reworkRate: number;
  lastTraining: string;
  mentorStatus: 'mentor' | 'standard' | 'trainee';
  workHistory: WorkRecord[];
}

interface Certification {
  name: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
}

interface WorkRecord {
  turbineId: string;
  turbineName: string;
  date: string;
  workType: string;
  duration: number;
  quality: 'excellent' | 'good' | 'satisfactory' | 'needs-improvement';
  followUpRequired: boolean;
  secondaryIssues: string[];
}

const TechnicianCompetencyTracker: React.FC = () => {
  const [selectedTechnician, setSelectedTechnician] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Mock technician data
  const technicians: Technician[] = [
    {
      id: 'TECH001',
      name: 'John Smith',
      certifications: [
        { name: 'Wind Turbine Safety', expiryDate: '2024-12-15', status: 'valid' },
        { name: 'Electrical Systems', expiryDate: '2024-06-01', status: 'expiring' },
        { name: 'Hydraulics Specialist', expiryDate: '2025-03-20', status: 'valid' }
      ],
      specialties: ['Gearbox Maintenance', 'Bearing Replacement', 'Control Systems'],
      competencyScore: 92,
      totalJobs: 156,
      avgCompletionTime: 4.2,
      reworkRate: 2.1,
      lastTraining: '2024-01-15',
      mentorStatus: 'mentor',
      workHistory: [
        {
          turbineId: 'WT001',
          turbineName: 'North Wind 001',
          date: '2024-03-01',
          workType: 'Scheduled Maintenance',
          duration: 4.5,
          quality: 'excellent',
          followUpRequired: false,
          secondaryIssues: []
        },
        {
          turbineId: 'WT003',
          turbineName: 'Mountain Peak 001',
          date: '2024-02-15',
          workType: 'Bearing Replacement',
          duration: 8.0,
          quality: 'good',
          followUpRequired: true,
          secondaryIssues: ['Minor oil leak detected']
        }
      ]
    },
    {
      id: 'TECH002',
      name: 'Sarah Johnson',
      certifications: [
        { name: 'Wind Turbine Safety', expiryDate: '2024-11-30', status: 'valid' },
        { name: 'Electrical Systems', expiryDate: '2024-03-15', status: 'expired' },
        { name: 'Blade Inspection', expiryDate: '2025-01-10', status: 'valid' }
      ],
      specialties: ['Control Systems', 'Electrical Troubleshooting', 'SCADA'],
      competencyScore: 88,
      totalJobs: 98,
      avgCompletionTime: 5.1,
      reworkRate: 4.3,
      lastTraining: '2023-11-20',
      mentorStatus: 'standard',
      workHistory: []
    },
    {
      id: 'TECH003',
      name: 'Mike Wilson',
      certifications: [
        { name: 'Wind Turbine Safety', expiryDate: '2025-02-28', status: 'valid' },
        { name: 'Basic Maintenance', expiryDate: '2025-06-15', status: 'valid' }
      ],
      specialties: ['Routine Maintenance'],
      competencyScore: 72,
      totalJobs: 34,
      avgCompletionTime: 6.8,
      reworkRate: 8.2,
      lastTraining: '2024-02-01',
      mentorStatus: 'trainee',
      workHistory: []
    }
  ];

  const getCompetencyColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCertificationColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-50';
      case 'expiring': return 'text-orange-600 bg-orange-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const selectedTech = technicians.find(t => t.id === selectedTechnician);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Technician Competency & Skills Tracking</h2>
            <p className="text-gray-600 mt-1">Monitor certifications, performance, and training needs</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded ${view === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
            >
              Grid View
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

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800">Expired Certifications</h3>
          <p className="text-2xl font-bold text-red-600 mt-1">1</p>
          <p className="text-sm text-red-700">Sarah Johnson - Electrical Systems</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-800">Training Overdue</h3>
          <p className="text-2xl font-bold text-orange-600 mt-1">2</p>
          <p className="text-sm text-orange-700">Technicians need refresher training</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800">Skills Gap Identified</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">3</p>
          <p className="text-sm text-blue-700">Areas needing additional coverage</p>
        </div>
      </div>

      {/* Technician Grid/List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.map(tech => (
            <div
              key={tech.id}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTechnician(tech.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tech.mentorStatus === 'mentor' ? 'bg-purple-100 text-purple-800' :
                  tech.mentorStatus === 'trainee' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {tech.mentorStatus}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Competency Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          tech.competencyScore >= 90 ? 'bg-green-500' :
                          tech.competencyScore >= 80 ? 'bg-blue-500' :
                          tech.competencyScore >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${tech.competencyScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{tech.competencyScore}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Total Jobs</p>
                    <p className="font-medium">{tech.totalJobs}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Time</p>
                    <p className="font-medium">{tech.avgCompletionTime}h</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rework Rate</p>
                    <p className={`font-medium ${tech.reworkRate < 5 ? 'text-green-600' : 'text-red-600'}`}>
                      {tech.reworkRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Training</p>
                    <p className="font-medium">{format(new Date(tech.lastTraining), 'MMM yyyy')}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Certifications</p>
                  <div className="flex flex-wrap gap-1">
                    {tech.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs ${getCertificationColor(cert.status)}`}
                      >
                        {cert.status === 'expired' && '❌ '}
                        {cert.status === 'expiring' && '⚠️ '}
                        {cert.status === 'valid' && '✅ '}
                        {cert.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Technician</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jobs/Rework</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certifications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {technicians.map(tech => (
                <tr
                  key={tech.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTechnician(tech.id)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-sm text-gray-600">{tech.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetencyColor(tech.competencyScore)}`}>
                      {tech.competencyScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p>{tech.totalJobs} jobs</p>
                    <p className={tech.reworkRate < 5 ? 'text-green-600' : 'text-red-600'}>
                      {tech.reworkRate}% rework
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {tech.certifications.filter(c => c.status === 'expired').length > 0 && (
                        <span className="text-red-600">❌ {tech.certifications.filter(c => c.status === 'expired').length}</span>
                      )}
                      {tech.certifications.filter(c => c.status === 'expiring').length > 0 && (
                        <span className="text-orange-600">⚠️ {tech.certifications.filter(c => c.status === 'expiring').length}</span>
                      )}
                      <span className="text-green-600">✅ {tech.certifications.filter(c => c.status === 'valid').length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tech.mentorStatus === 'mentor' ? 'bg-purple-100 text-purple-800' :
                      tech.mentorStatus === 'trainee' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {tech.mentorStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed View Modal */}
      {selectedTech && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold">{selectedTech.name} - Detailed Profile</h3>
              <p className="text-gray-600">ID: {selectedTech.id} | Status: {selectedTech.mentorStatus}</p>
            </div>
            <button
              onClick={() => setSelectedTechnician(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Certifications & Training</h4>
              {selectedTech.certifications.map((cert, idx) => (
                <div key={idx} className={`mb-2 p-3 rounded ${getCertificationColor(cert.status)}`}>
                  <div className="flex justify-between">
                    <span className="font-medium">{cert.name}</span>
                    <span className="text-sm">Expires: {format(new Date(cert.expiryDate), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="text-sm font-medium">Next Required Training</p>
                <p className="text-sm text-gray-600 mt-1">Advanced Diagnostics - Due by April 2024</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Mean Time to Complete</span>
                    <span className="font-medium">{selectedTech.avgCompletionTime} hours</span>
                  </div>
                  <div className="text-xs text-gray-600">Industry avg: 5.5 hours</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Secondary Issues Rate</span>
                    <span className="font-medium text-orange-600">12%</span>
                  </div>
                  <div className="text-xs text-gray-600">Target: &lt;10%</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium text-green-600">4.8/5.0</span>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold mt-6 mb-3">Specialties & Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTech.specialties.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {selectedTech.workHistory.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Recent Work History</h4>
              <div className="space-y-2">
                {selectedTech.workHistory.map((work, idx) => (
                  <div key={idx} className="border rounded p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{work.turbineName}</span>
                      <span className="text-sm text-gray-600">{format(new Date(work.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{work.workType}</span>
                      <span className={`font-medium ${
                        work.quality === 'excellent' ? 'text-green-600' :
                        work.quality === 'good' ? 'text-blue-600' :
                        work.quality === 'satisfactory' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {work.quality}
                      </span>
                    </div>
                    {work.secondaryIssues.length > 0 && (
                      <p className="text-sm text-orange-600 mt-1">
                        ⚠️ Secondary issues: {work.secondaryIssues.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTech.mentorStatus === 'mentor' && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800">Mentorship Status</h4>
              <p className="text-sm text-purple-700 mt-1">
                This technician is qualified to train others in: {selectedTech.specialties.slice(0, 2).join(', ')}
              </p>
              <p className="text-sm text-purple-700 mt-1">
                Currently mentoring: Mike Wilson (TECH003)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechnicianCompetencyTracker;