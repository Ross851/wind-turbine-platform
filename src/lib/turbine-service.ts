import type { Turbine, Alert, MaintenanceRecord } from '../types/turbine';

// Mock data for demonstration
export const mockTurbines: Turbine[] = [
  {
    id: 'WT001',
    name: 'North Wind 001',
    type: 'onshore',
    status: 'operational',
    location: {
      lat: 55.6761,
      lng: 12.5683,
      altitude: 150
    },
    specifications: {
      model: 'V150-4.2',
      manufacturer: 'Vestas',
      capacity: 4.2,
      rotorDiameter: 150,
      hubHeight: 105,
      installationDate: '2021-03-15'
    },
    performance: {
      currentPower: 3.8,
      totalEnergy: 28450,
      capacityFactor: 45.2,
      availability: 97.5,
      windSpeed: 11.5,
      rotorSpeed: 12.3,
      temperature: 15.2
    },
    maintenance: {
      lastInspection: '2024-01-15',
      nextScheduled: '2024-04-15',
      hoursRunning: 18240,
      alerts: []
    }
  },
  {
    id: 'WT002',
    name: 'Baltic Offshore 001',
    type: 'offshore',
    status: 'warning',
    location: {
      lat: 55.5,
      lng: 14.5
    },
    specifications: {
      model: 'SWT-8.0-154',
      manufacturer: 'Siemens Gamesa',
      capacity: 8.0,
      rotorDiameter: 154,
      hubHeight: 120,
      installationDate: '2022-06-20'
    },
    performance: {
      currentPower: 6.2,
      totalEnergy: 35600,
      capacityFactor: 52.1,
      availability: 94.2,
      windSpeed: 14.8,
      rotorSpeed: 11.8,
      temperature: 12.5
    },
    maintenance: {
      lastInspection: '2024-02-01',
      nextScheduled: '2024-03-15',
      hoursRunning: 12450,
      alerts: [
        {
          id: 'ALT001',
          turbineId: 'WT002',
          type: 'warning',
          category: 'mechanical',
          message: 'Gearbox temperature above normal range',
          timestamp: '2024-03-10T14:30:00Z',
          resolved: false
        }
      ]
    }
  },
  {
    id: 'WT003',
    name: 'Mountain Peak 001',
    type: 'onshore',
    status: 'maintenance',
    location: {
      lat: 56.2,
      lng: 13.8,
      altitude: 450
    },
    specifications: {
      model: 'E-126 EP3',
      manufacturer: 'Enercon',
      capacity: 3.5,
      rotorDiameter: 126,
      hubHeight: 135,
      installationDate: '2020-09-10'
    },
    performance: {
      currentPower: 0,
      totalEnergy: 41200,
      capacityFactor: 38.9,
      availability: 96.8,
      windSpeed: 9.2,
      rotorSpeed: 0,
      temperature: 11.8
    },
    maintenance: {
      lastInspection: '2024-03-01',
      nextScheduled: '2024-03-12',
      hoursRunning: 25600,
      alerts: [
        {
          id: 'ALT002',
          turbineId: 'WT003',
          type: 'info',
          category: 'mechanical',
          message: 'Scheduled maintenance in progress',
          timestamp: '2024-03-11T08:00:00Z',
          resolved: false
        }
      ]
    }
  }
];

export async function getTurbines(): Promise<Turbine[]> {
  // In a real app, this would fetch from an API
  return mockTurbines;
}

export async function getTurbineById(id: string): Promise<Turbine | undefined> {
  return mockTurbines.find(t => t.id === id);
}

export async function getAlerts(): Promise<Alert[]> {
  return mockTurbines.flatMap(t => t.maintenance.alerts);
}

export async function getMaintenanceSchedule(): Promise<MaintenanceRecord[]> {
  // Mock maintenance records
  return [
    {
      id: 'MR001',
      turbineId: 'WT001',
      date: '2024-01-15',
      type: 'scheduled',
      technician: 'John Smith',
      duration: 4.5,
      partsReplaced: [
        {
          id: 'P001',
          name: 'Hydraulic Filter',
          partNumber: 'HF-2000',
          quantity: 2,
          cost: 450
        }
      ],
      notes: 'Regular maintenance completed. All systems operational.',
      cost: 1200
    }
  ];
}

export function calculateOptimalOperation(windSpeed: number, windDirection: number): {
  recommendedPower: number;
  yawAngle: number;
  pitchAngle: number;
} {
  // Simplified calculation for demonstration
  const optimalWindSpeed = 12; // m/s
  const cutInSpeed = 3;
  const cutOutSpeed = 25;
  
  let recommendedPower = 0;
  
  if (windSpeed >= cutInSpeed && windSpeed <= cutOutSpeed) {
    if (windSpeed <= optimalWindSpeed) {
      recommendedPower = (windSpeed / optimalWindSpeed) * 100;
    } else {
      recommendedPower = 100 - ((windSpeed - optimalWindSpeed) / (cutOutSpeed - optimalWindSpeed)) * 20;
    }
  }
  
  return {
    recommendedPower,
    yawAngle: windDirection,
    pitchAngle: windSpeed > 15 ? 5 : 0
  };
}