import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getTurbines } from '../lib/turbine-service';
import { getSeaConditions } from '../lib/weather-service';
import type { Turbine, SeaConditions } from '../types/turbine';
import TurbineDetailModal from './TurbineDetailModal';

const CoastalWindMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [showCurrents, setShowCurrents] = useState(true);
  const [showWaveHeight, setShowWaveHeight] = useState(true);
  const [highlightOffline, setHighlightOffline] = useState(true);
  const [selectedTurbine, setSelectedTurbine] = useState<Turbine | null>(null);
  const [turbinesData, setTurbinesData] = useState<Turbine[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map with ocean view
    const map = L.map(mapRef.current).setView([55.5, 13.5], 8);
    mapInstanceRef.current = map;

    // Add ocean-friendly tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
    }).addTo(map);

    // Load turbines and add enhanced markers
    getTurbines().then(async (turbines) => {
      setTurbinesData(turbines);
      for (const turbine of turbines) {
        // Create custom icon based on status and type
        const iconHtml = `
          <div class="turbine-marker-enhanced ${turbine.status} ${turbine.type}">
            ${turbine.status === 'offline' ? '<div class="pulse-ring"></div>' : ''}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M12 6l2.5 5h-5z"/>
              <path d="M12 6l-2.5 5 5 0z" transform="rotate(120 12 12)"/>
              <path d="M12 6l-2.5 5 5 0z" transform="rotate(240 12 12)"/>
            </svg>
            ${turbine.type === 'offshore' ? '<div class="wave-indicator"></div>' : ''}
          </div>
        `;

        const icon = L.divIcon({
          html: iconHtml,
          className: 'turbine-icon-enhanced',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        // Get sea conditions for offshore turbines
        let seaConditions: SeaConditions | null = null;
        if (turbine.type === 'offshore') {
          seaConditions = await getSeaConditions(turbine.location.lat, turbine.location.lng);
        }

        L.marker([turbine.location.lat, turbine.location.lng], { icon })
          .addTo(map)
          .on('click', () => {
            setSelectedTurbine(turbine);
          })
          .bindPopup(`
            <div class="turbine-popup-enhanced">
              <h3 class="font-bold text-lg">${turbine.name}</h3>
              <div class="status-badge ${turbine.status}">
                ${turbine.status.toUpperCase()}
              </div>
              
              <div class="mt-3 space-y-2">
                <div class="flex justify-between">
                  <span>Type:</span>
                  <span class="font-medium">${turbine.type === 'offshore' ? '🌊 Offshore' : '🏔️ Onshore'}</span>
                </div>
                <div class="flex justify-between">
                  <span>Power:</span>
                  <span class="font-medium">${turbine.performance.currentPower} MW</span>
                </div>
                <div class="flex justify-between">
                  <span>Wind:</span>
                  <span class="font-medium">${turbine.performance.windSpeed} m/s</span>
                </div>
              </div>
              
              ${seaConditions ? `
                <div class="mt-3 pt-3 border-t">
                  <h4 class="font-semibold mb-2">Sea Conditions</h4>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="text-gray-600">Waves:</span>
                      <span class="font-medium ${seaConditions.waveHeight > 2 ? 'text-red-600' : 'text-green-600'}">
                        ${seaConditions.waveHeight.toFixed(1)}m
                      </span>
                    </div>
                    <div>
                      <span class="text-gray-600">Current:</span>
                      <span class="font-medium">${seaConditions.currentSpeed.toFixed(2)} m/s</span>
                    </div>
                  </div>
                  ${seaConditions.waveHeight > 2.5 ? `
                    <div class="mt-2 p-2 bg-yellow-50 rounded text-sm">
                      ⚠️ High waves - Vessel operations restricted
                    </div>
                  ` : ''}
                </div>
              ` : ''}
              
              ${turbine.status === 'offline' ? `
                <div class="mt-3 p-2 bg-red-50 rounded">
                  <p class="text-sm font-semibold text-red-800">🔴 Turbine Offline</p>
                  ${turbine.type === 'offshore' ? `
                    <p class="text-xs text-red-700 mt-1">
                      Waiting for safe sea conditions for repair crew
                    </p>
                  ` : `
                    <p class="text-xs text-red-700 mt-1">
                      Maintenance crew required immediately
                    </p>
                  `}
                </div>
              ` : ''}
              
              <button onclick="window.dispatchEvent(new CustomEvent('openTurbineDetail', { detail: '${turbine.id}' }))" 
                      class="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">
                View Full Details
              </button>
            </div>
          `);

        // Add warning circle for offline turbines
        if (turbine.status === 'offline' && highlightOffline) {
          L.circle([turbine.location.lat, turbine.location.lng], {
            color: 'red',
            fillColor: '#ff0000',
            fillOpacity: 0.1,
            radius: 5000,
            className: 'offline-warning-circle'
          }).addTo(map);
        }

        // Add current arrows for offshore turbines
        if (turbine.type === 'offshore' && showCurrents && seaConditions) {
          const arrowIcon = L.divIcon({
            html: `
              <div class="current-arrow" style="transform: rotate(${seaConditions.currentDirection}deg)">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#0066cc" opacity="0.7">
                  <path d="M12 2l4 8h-3v12h-2V10H8z"/>
                </svg>
              </div>
            `,
            className: 'current-arrow-icon',
            iconSize: [30, 30]
          });

          L.marker(
            [turbine.location.lat + 0.02, turbine.location.lng + 0.02],
            { icon: arrowIcon }
          ).addTo(map);
        }
      }
    });

    // Event handler for opening turbine details
    const handleOpenDetail = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const turbine = turbinesData.find(t => t.id === customEvent.detail);
      if (turbine) {
        setSelectedTurbine(turbine);
      }
    };

    window.addEventListener('openTurbineDetail', handleOpenDetail);

    return () => {
      window.removeEventListener('openTurbineDetail', handleOpenDetail);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [showCurrents, highlightOffline, turbinesData]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
        <h4 className="font-semibold mb-2">Map Layers</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCurrents}
              onChange={(e) => setShowCurrents(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm">Ocean Currents</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showWaveHeight}
              onChange={(e) => setShowWaveHeight(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm">Wave Heights</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={highlightOffline}
              onChange={(e) => setHighlightOffline(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm">Highlight Offline</span>
          </label>
        </div>
      </div>
      
      <style>{`
        .turbine-marker-enhanced {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .turbine-marker-enhanced.operational {
          color: #00c369;
        }
        
        .turbine-marker-enhanced.warning {
          color: #ff9800;
        }
        
        .turbine-marker-enhanced.maintenance {
          color: #2196f3;
        }
        
        .turbine-marker-enhanced.offline {
          color: #f44336;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .pulse-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 3px solid #f44336;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .wave-indicator {
          position: absolute;
          bottom: -5px;
          width: 40px;
          height: 10px;
          background: linear-gradient(90deg, transparent, #2196f3, transparent);
          animation: wave 3s infinite;
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .turbine-popup-enhanced {
          min-width: 250px;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          margin-top: 8px;
        }
        
        .status-badge.operational {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .status-badge.offline {
          background: #ffebee;
          color: #c62828;
        }
        
        .status-badge.maintenance {
          background: #e3f2fd;
          color: #1565c0;
        }
        
        .status-badge.warning {
          background: #fff3e0;
          color: #e65100;
        }
        
        .offline-warning-circle {
          animation: pulse-fade 3s infinite;
        }
        
        @keyframes pulse-fade {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        
        .current-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      
      {/* Turbine Detail Modal */}
      {selectedTurbine && (
        <TurbineDetailModal
          turbine={selectedTurbine}
          isOpen={!!selectedTurbine}
          onClose={() => setSelectedTurbine(null)}
        />
      )}
    </div>
  );
};

export default CoastalWindMap;