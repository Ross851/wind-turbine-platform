import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getTurbines } from '../lib/turbine-service';
import type { Turbine } from '../types/turbine';

const TurbineMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([55.6761, 12.5683], 7);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Load turbines and add markers
    getTurbines().then((turbines) => {
      turbines.forEach((turbine) => {
        const icon = L.divIcon({
          html: `
            <div class="turbine-marker ${turbine.status}">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6l2.5 5h-5z"/>
                <path d="M12 6l-2.5 5 5 0z" transform="rotate(120 12 12)"/>
                <path d="M12 6l-2.5 5 5 0z" transform="rotate(240 12 12)"/>
              </svg>
            </div>
          `,
          className: 'turbine-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([turbine.location.lat, turbine.location.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="turbine-popup">
              <h3 class="font-bold">${turbine.name}</h3>
              <p>Status: <span class="status-${turbine.status}">${turbine.status}</span></p>
              <p>Power: ${turbine.performance.currentPower} MW</p>
              <p>Wind: ${turbine.performance.windSpeed} m/s</p>
            </div>
          `);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      <style>{`
        .turbine-marker {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .turbine-marker.operational {
          color: #00c369;
        }
        .turbine-marker.warning {
          color: #ff9800;
        }
        .turbine-marker.maintenance {
          color: #2196f3;
        }
        .turbine-marker.offline {
          color: #f44336;
        }
        .turbine-popup {
          min-width: 150px;
        }
        .status-operational {
          color: #00c369;
          font-weight: bold;
        }
        .status-warning {
          color: #ff9800;
          font-weight: bold;
        }
        .status-maintenance {
          color: #2196f3;
          font-weight: bold;
        }
        .status-offline {
          color: #f44336;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default TurbineMap;