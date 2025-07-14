export interface Turbine {
  id: string;
  name: string;
  type: 'onshore' | 'offshore';
  status: 'operational' | 'maintenance' | 'offline' | 'warning';
  location: {
    lat: number;
    lng: number;
    altitude?: number;
  };
  specifications: {
    model: string;
    manufacturer: string;
    capacity: number; // MW
    rotorDiameter: number; // meters
    hubHeight: number; // meters
    installationDate: string;
  };
  performance: {
    currentPower: number; // MW
    totalEnergy: number; // MWh
    capacityFactor: number; // percentage
    availability: number; // percentage
    windSpeed: number; // m/s
    rotorSpeed: number; // rpm
    temperature: number; // celsius
  };
  maintenance: {
    lastInspection: string;
    nextScheduled: string;
    hoursRunning: number;
    alerts: Alert[];
  };
}

export interface Alert {
  id: string;
  turbineId: string;
  type: 'critical' | 'warning' | 'info';
  category: 'mechanical' | 'electrical' | 'weather' | 'performance';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface MaintenanceRecord {
  id: string;
  turbineId: string;
  date: string;
  type: 'scheduled' | 'emergency' | 'predictive';
  technician: string;
  duration: number; // hours
  partsReplaced: Part[];
  notes: string;
  cost: number;
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  quantity: number;
  cost: number;
}

export interface WeatherData {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  visibility: number;
  cloudCover: number;
  precipitation: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  datetime: string;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  conditions: string;
  icon: string;
}

export interface SeaConditions {
  waveHeight: number;
  wavePeriod: number;
  waveDirection: number;
  currentSpeed: number;
  currentDirection: number;
  waterTemperature: number;
  swellHeight: number;
  visibility: number;
}