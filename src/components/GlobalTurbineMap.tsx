import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { globalTurbineService } from '../lib/global-turbine-service';
import type { Turbine } from '../types/turbine';
import TurbineDetailModal from './TurbineDetailModal';

// Leaflet marker clustering for performance
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

const GlobalTurbineMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<any>(null);
  
  const [turbineCount, setTurbineCount] = useState(0);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTurbine, setSelectedTurbine] = useState<Turbine | null>(null);
  const [viewMode, setViewMode] = useState<'satellite' | 'terrain' | 'street'>('satellite');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [regionStats, setRegionStats] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map with global view
    const map = L.map(mapRef.current, {
      center: [54.5, 15.0], // Center on Northern Europe
      zoom: 5,
      maxZoom: 18,
      minZoom: 3
    });
    
    mapInstanceRef.current = map;

    // Add tile layers
    const tileLayers = {
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
      }),
      terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap'
      }),
      street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    };

    tileLayers.satellite.addTo(map);

    // Initialize marker cluster group
    const markers = (L as any).markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster: any) => {
        const childCount = cluster.getChildCount();
        let c = ' marker-cluster-';
        if (childCount < 10) {
          c += 'small';
        } else if (childCount < 100) {
          c += 'medium';
        } else {
          c += 'large';
        }

        return new L.DivIcon({
          html: `<div><span>${childCount}</span></div>`,
          className: 'marker-cluster' + c,
          iconSize: new L.Point(40, 40)
        });
      }
    });
    
    markersRef.current = markers;
    map.addLayer(markers);

    // Load turbines when map moves
    const loadTurbinesInView = async () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      
      // Only load detailed data when zoomed in enough
      if (zoom < 7) {
        setRegionStats({
          message: 'Zoom in to load turbine data',
          zoom: zoom
        });
        return;
      }

      setLoading(true);
      
      try {
        const turbines = await globalTurbineService.fetchTurbinesInBounds(
          bounds.getNorth(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getWest()
        );

        // Clear existing markers
        markers.clearLayers();

        // Add new markers
        turbines.forEach(turbine => {
          const iconColor = turbine.type === 'offshore' ? '#0066cc' : '#00aa44';
          const icon = L.divIcon({
            html: `
              <div class="global-turbine-marker" style="color: ${iconColor}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" opacity="0.3"/>
                  <path d="M12 2l3 6h-6z"/>
                  <path d="M12 2l-3 6 6 0z" transform="rotate(120 12 12)"/>
                  <path d="M12 2l-3 6 6 0z" transform="rotate(240 12 12)"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
            `,
            className: 'turbine-icon-global',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          const marker = L.marker([turbine.location.lat, turbine.location.lng], { icon })
            .on('click', () => setSelectedTurbine(turbine));

          marker.bindPopup(`
            <div class="turbine-popup">
              <h4 class="font-bold">${turbine.name}</h4>
              <div class="text-sm space-y-1">
                <p><strong>Type:</strong> ${turbine.type}</p>
                <p><strong>Manufacturer:</strong> ${turbine.specifications.manufacturer}</p>
                <p><strong>Model:</strong> ${turbine.specifications.model}</p>
                <p><strong>Capacity:</strong> ${turbine.specifications.capacity} MW</p>
                <p><strong>Hub Height:</strong> ${turbine.specifications.hubHeight}m</p>
                <p><strong>Rotor Diameter:</strong> ${turbine.specifications.rotorDiameter}m</p>
                ${turbine.specifications.manufacturer !== 'Unknown' ? `
                  <p><strong>Status:</strong> <span class="status-${turbine.status}">${turbine.status}</span></p>
                ` : ''}
              </div>
              <button onclick="window.dispatchEvent(new CustomEvent('viewTurbineDetails', { detail: '${turbine.id}' }))" 
                      class="mt-3 w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                View Details
              </button>
            </div>
          `);

          markers.addLayer(marker);
        });

        setTurbineCount(turbines.length);
        setTotalCapacity(turbines.reduce((sum, t) => sum + t.specifications.capacity, 0));

        // Get region statistics
        const stats = await globalTurbineService.getRegionStatistics({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        });
        setRegionStats(stats);

      } catch (error) {
        console.error('Error loading turbines:', error);
      } finally {
        setLoading(false);
      }
    };

    // Event listeners
    map.on('moveend', loadTurbinesInView);
    map.on('zoomend', loadTurbinesInView);

    // Initial load
    loadTurbinesInView();

    // Handle view mode changes
    const handleViewModeChange = (e: CustomEvent) => {
      const mode = e.detail;
      Object.values(tileLayers).forEach(layer => map.removeLayer(layer));
      tileLayers[mode as keyof typeof tileLayers].addTo(map);
    };

    window.addEventListener('changeMapView', handleViewModeChange as any);

    // Handle turbine detail view
    const handleViewDetails = (e: CustomEvent) => {
      const turbineId = e.detail;
      // In a real app, fetch the turbine details
      console.log('View details for turbine:', turbineId);
    };

    window.addEventListener('viewTurbineDetails', handleViewDetails as any);

    return () => {
      window.removeEventListener('changeMapView', handleViewModeChange as any);
      window.removeEventListener('viewTurbineDetails', handleViewDetails as any);
      map.off('moveend', loadTurbinesInView);
      map.off('zoomend', loadTurbinesInView);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
        <h3 className="font-bold text-lg mb-2">Global Wind Turbines</h3>
        <div className="space-y-2 text-sm">
          <p>Turbines in view: <span className="font-bold">{turbineCount.toLocaleString()}</span></p>
          <p>Total capacity: <span className="font-bold">{totalCapacity.toFixed(1)} MW</span></p>
          {loading && <p className="text-blue-600">Loading turbines...</p>}
        </div>
        
        <div className="mt-4 space-y-2">
          <label className="text-xs font-semibold text-gray-600">Map View</label>
          <div className="flex gap-1">
            {(['satellite', 'terrain', 'street'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  setViewMode(mode);
                  window.dispatchEvent(new CustomEvent('changeMapView', { detail: mode }));
                }}
                className={`px-3 py-1 text-xs rounded ${
                  viewMode === mode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Panel */}
      {regionStats && regionStats.manufacturers && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-sm">
          <h4 className="font-semibold mb-2">Region Statistics</h4>
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-medium">Manufacturers:</p>
              <div className="ml-2 text-xs space-y-1">
                {Object.entries(regionStats.manufacturers)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .slice(0, 5)
                  .map(([manufacturer, count]) => (
                    <div key={manufacturer} className="flex justify-between">
                      <span>{manufacturer}</span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span>Onshore:</span>
                <span className="font-medium">{regionStats.types.onshore}</span>
              </div>
              <div className="flex justify-between">
                <span>Offshore:</span>
                <span className="font-medium text-blue-600">{regionStats.types.offshore}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h4 className="font-semibold text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Onshore Turbine</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>Offshore Turbine</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs">10</div>
            <span>Cluster</span>
          </div>
        </div>
      </div>

      {/* Zoom instruction */}
      {regionStats && regionStats.message && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 z-[1000]">
          <p className="text-sm font-medium text-yellow-800">{regionStats.message}</p>
        </div>
      )}

      {/* Turbine Detail Modal */}
      {selectedTurbine && (
        <TurbineDetailModal
          turbine={selectedTurbine}
          isOpen={!!selectedTurbine}
          onClose={() => setSelectedTurbine(null)}
        />
      )}

      <style>{`
        .marker-cluster-small {
          background-color: rgba(255, 165, 0, 0.6);
        }
        .marker-cluster-small div {
          background-color: rgba(255, 140, 0, 0.6);
        }
        .marker-cluster-medium {
          background-color: rgba(255, 120, 0, 0.6);
        }
        .marker-cluster-medium div {
          background-color: rgba(255, 90, 0, 0.6);
        }
        .marker-cluster-large {
          background-color: rgba(255, 60, 0, 0.6);
        }
        .marker-cluster-large div {
          background-color: rgba(255, 30, 0, 0.6);
        }
        .marker-cluster {
          background-clip: padding-box;
          border-radius: 20px;
        }
        .marker-cluster div {
          width: 30px;
          height: 30px;
          margin-left: 5px;
          margin-top: 5px;
          text-align: center;
          border-radius: 15px;
          font: 12px Arial, Helvetica, sans-serif;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-cluster span {
          line-height: 30px;
        }
        .global-turbine-marker {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .turbine-popup {
          min-width: 200px;
        }
        .status-operational { color: #10b981; font-weight: bold; }
        .status-maintenance { color: #3b82f6; font-weight: bold; }
        .status-offline { color: #ef4444; font-weight: bold; }
        .status-warning { color: #f59e0b; font-weight: bold; }
      `}</style>
    </div>
  );
};

export default GlobalTurbineMap;