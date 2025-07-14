import type { Turbine } from '../types/turbine';

// Interface for Open Street Map turbine data
interface OSMTurbine {
  id: string;
  lat: number;
  lon: number;
  tags: {
    'generator:source'?: string;
    'generator:type'?: string;
    'generator:output:electricity'?: string;
    manufacturer?: string;
    model?: string;
    operator?: string;
    height?: string;
    rotor_diameter?: string;
    start_date?: string;
    [key: string]: string | undefined;
  };
}

// Global turbine database service
export class GlobalTurbineService {
  private static instance: GlobalTurbineService;
  private turbineCache: Map<string, Turbine> = new Map();
  
  static getInstance(): GlobalTurbineService {
    if (!GlobalTurbineService.instance) {
      GlobalTurbineService.instance = new GlobalTurbineService();
    }
    return GlobalTurbineService.instance;
  }

  // Fetch turbines from OpenStreetMap Overpass API
  async fetchTurbinesInBounds(
    north: number,
    south: number,
    east: number,
    west: number
  ): Promise<Turbine[]> {
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["generator:source"="wind"](${south},${west},${north},${east});
        way["generator:source"="wind"](${south},${west},${north},${east});
      );
      out body;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery,
        headers: {
          'Content-Type': 'text/plain'
        }
      });

      const data = await response.json();
      return this.convertOSMToTurbines(data.elements);
    } catch (error) {
      console.error('Error fetching OSM turbines:', error);
      // Return mock data as fallback
      return this.getMockGlobalTurbines(north, south, east, west);
    }
  }

  // Convert OSM data to our Turbine format
  private convertOSMToTurbines(osmElements: OSMTurbine[]): Turbine[] {
    return osmElements.map(element => {
      const power = element.tags['generator:output:electricity'] 
        ? parseFloat(element.tags['generator:output:electricity'].replace(/[^0-9.]/g, '')) / 1000 
        : 2.0; // Default 2MW

      const height = element.tags.height 
        ? parseFloat(element.tags.height.replace(/[^0-9.]/g, '')) 
        : 100;

      const rotorDiameter = element.tags.rotor_diameter 
        ? parseFloat(element.tags.rotor_diameter.replace(/[^0-9.]/g, '')) 
        : 90;

      return {
        id: `OSM-${element.id}`,
        name: element.tags.operator ? `${element.tags.operator} Turbine ${element.id}` : `Turbine ${element.id}`,
        type: 'onshore', // OSM doesn't distinguish, would need coastal analysis
        status: 'operational', // Default status
        location: {
          lat: element.lat,
          lng: element.lon,
          altitude: 0
        },
        specifications: {
          model: element.tags.model || 'Unknown Model',
          manufacturer: element.tags.manufacturer || 'Unknown',
          capacity: power,
          rotorDiameter: rotorDiameter,
          hubHeight: height,
          installationDate: element.tags.start_date || '2020-01-01'
        },
        performance: {
          currentPower: power * 0.8, // Assume 80% capacity factor
          totalEnergy: power * 24 * 365 * 3, // 3 years of operation
          capacityFactor: 80,
          availability: 95,
          windSpeed: 12,
          rotorSpeed: 15,
          temperature: 15
        },
        maintenance: {
          lastInspection: '2024-01-01',
          nextScheduled: '2024-06-01',
          hoursRunning: 26280, // 3 years
          alerts: []
        }
      };
    });
  }

  // Mock data for demonstration when OSM is unavailable
  private getMockGlobalTurbines(north: number, south: number, east: number, west: number): Turbine[] {
    const turbines: Turbine[] = [];
    
    // Generate a grid of turbines within bounds
    const latStep = (north - south) / 10;
    const lngStep = (east - west) / 10;
    
    for (let lat = south; lat < north; lat += latStep) {
      for (let lng = west; lng < east; lng += lngStep) {
        // Add some randomness to make it look more realistic
        const offsetLat = lat + (Math.random() - 0.5) * latStep * 0.8;
        const offsetLng = lng + (Math.random() - 0.5) * lngStep * 0.8;
        
        // Random turbine characteristics
        const manufacturers = ['Vestas', 'Siemens Gamesa', 'GE', 'Enercon', 'Nordex'];
        const models = ['V150-4.2', 'SG 5.0-145', 'GE 2.7-116', 'E-126 EP3', 'N149/4.0-4.5'];
        const capacities = [2.0, 2.5, 3.0, 3.6, 4.2, 5.0];
        
        const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
        const model = models[Math.floor(Math.random() * models.length)];
        const capacity = capacities[Math.floor(Math.random() * capacities.length)];
        
        turbines.push({
          id: `MOCK-${lat.toFixed(4)}-${lng.toFixed(4)}`,
          name: `${manufacturer} Wind Farm ${turbines.length + 1}`,
          type: Math.abs(offsetLat) < 60 && Math.random() > 0.7 ? 'offshore' : 'onshore',
          status: Math.random() > 0.9 ? 'maintenance' : 'operational',
          location: {
            lat: offsetLat,
            lng: offsetLng,
            altitude: Math.random() * 500
          },
          specifications: {
            model: model,
            manufacturer: manufacturer,
            capacity: capacity,
            rotorDiameter: 90 + Math.random() * 60,
            hubHeight: 80 + Math.random() * 40,
            installationDate: `20${18 + Math.floor(Math.random() * 6)}-01-01`
          },
          performance: {
            currentPower: capacity * (0.6 + Math.random() * 0.3),
            totalEnergy: capacity * 24 * 365 * Math.random() * 5,
            capacityFactor: 70 + Math.random() * 25,
            availability: 90 + Math.random() * 9,
            windSpeed: 5 + Math.random() * 15,
            rotorSpeed: 10 + Math.random() * 10,
            temperature: 10 + Math.random() * 15
          },
          maintenance: {
            lastInspection: '2024-01-01',
            nextScheduled: '2024-06-01',
            hoursRunning: Math.floor(Math.random() * 40000),
            alerts: []
          }
        });
      }
    }
    
    return turbines;
  }

  // Get turbine statistics for a region
  async getRegionStatistics(bounds: { north: number; south: number; east: number; west: number }) {
    const turbines = await this.fetchTurbinesInBounds(
      bounds.north,
      bounds.south,
      bounds.east,
      bounds.west
    );

    const stats = {
      totalTurbines: turbines.length,
      totalCapacity: turbines.reduce((sum, t) => sum + t.specifications.capacity, 0),
      averageCapacity: turbines.length > 0 
        ? turbines.reduce((sum, t) => sum + t.specifications.capacity, 0) / turbines.length 
        : 0,
      manufacturers: {} as Record<string, number>,
      operationalStatus: {
        operational: 0,
        maintenance: 0,
        offline: 0,
        warning: 0
      },
      types: {
        onshore: 0,
        offshore: 0
      }
    };

    turbines.forEach(turbine => {
      // Count by manufacturer
      const manufacturer = turbine.specifications.manufacturer;
      stats.manufacturers[manufacturer] = (stats.manufacturers[manufacturer] || 0) + 1;
      
      // Count by status
      stats.operationalStatus[turbine.status]++;
      
      // Count by type
      stats.types[turbine.type]++;
    });

    return stats;
  }
}

// Singleton instance
export const globalTurbineService = GlobalTurbineService.getInstance();