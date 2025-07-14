import{j as t}from"./jsx-runtime.BftctW7E.js";import{r as n}from"./index.DJO9vBfz.js";import{L as i,T as j}from"./TurbineDetailModal.BVYzYKzL.js";/* empty css                       */import{g as N}from"./turbine-service.CN_jfETl.js";import{g as S}from"./weather-service.BbyU-1F5.js";import"./format.DnvyW2U9.js";const z=()=>{const l=n.useRef(null),r=n.useRef(null),[d,x]=n.useState(!0),[b,v]=n.useState(!0),[p,w]=n.useState(!0),[f,u]=n.useState(null),[h,y]=n.useState([]);return n.useEffect(()=>{if(!l.current||r.current)return;const s=i.map(l.current).setView([55.5,13.5],8);r.current=s,i.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"}).addTo(s),N().then(async o=>{y(o);for(const e of o){const c=`
          <div class="turbine-marker-enhanced ${e.status} ${e.type}">
            ${e.status==="offline"?'<div class="pulse-ring"></div>':""}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M12 6l2.5 5h-5z"/>
              <path d="M12 6l-2.5 5 5 0z" transform="rotate(120 12 12)"/>
              <path d="M12 6l-2.5 5 5 0z" transform="rotate(240 12 12)"/>
            </svg>
            ${e.type==="offshore"?'<div class="wave-indicator"></div>':""}
          </div>
        `,m=i.divIcon({html:c,className:"turbine-icon-enhanced",iconSize:[40,40],iconAnchor:[20,20]});let a=null;if(e.type==="offshore"&&(a=await S(e.location.lat,e.location.lng)),i.marker([e.location.lat,e.location.lng],{icon:m}).addTo(s).on("click",()=>{u(e)}).bindPopup(`
            <div class="turbine-popup-enhanced">
              <h3 class="font-bold text-lg">${e.name}</h3>
              <div class="status-badge ${e.status}">
                ${e.status.toUpperCase()}
              </div>
              
              <div class="mt-3 space-y-2">
                <div class="flex justify-between">
                  <span>Type:</span>
                  <span class="font-medium">${e.type==="offshore"?"🌊 Offshore":"🏔️ Onshore"}</span>
                </div>
                <div class="flex justify-between">
                  <span>Power:</span>
                  <span class="font-medium">${e.performance.currentPower} MW</span>
                </div>
                <div class="flex justify-between">
                  <span>Wind:</span>
                  <span class="font-medium">${e.performance.windSpeed} m/s</span>
                </div>
              </div>
              
              ${a?`
                <div class="mt-3 pt-3 border-t">
                  <h4 class="font-semibold mb-2">Sea Conditions</h4>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="text-gray-600">Waves:</span>
                      <span class="font-medium ${a.waveHeight>2?"text-red-600":"text-green-600"}">
                        ${a.waveHeight.toFixed(1)}m
                      </span>
                    </div>
                    <div>
                      <span class="text-gray-600">Current:</span>
                      <span class="font-medium">${a.currentSpeed.toFixed(2)} m/s</span>
                    </div>
                  </div>
                  ${a.waveHeight>2.5?`
                    <div class="mt-2 p-2 bg-yellow-50 rounded text-sm">
                      ⚠️ High waves - Vessel operations restricted
                    </div>
                  `:""}
                </div>
              `:""}
              
              ${e.status==="offline"?`
                <div class="mt-3 p-2 bg-red-50 rounded">
                  <p class="text-sm font-semibold text-red-800">🔴 Turbine Offline</p>
                  ${e.type==="offshore"?`
                    <p class="text-xs text-red-700 mt-1">
                      Waiting for safe sea conditions for repair crew
                    </p>
                  `:`
                    <p class="text-xs text-red-700 mt-1">
                      Maintenance crew required immediately
                    </p>
                  `}
                </div>
              `:""}
              
              <button onclick="window.dispatchEvent(new CustomEvent('openTurbineDetail', { detail: '${e.id}' }))" 
                      class="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">
                View Full Details
              </button>
            </div>
          `),e.status==="offline"&&p&&i.circle([e.location.lat,e.location.lng],{color:"red",fillColor:"#ff0000",fillOpacity:.1,radius:5e3,className:"offline-warning-circle"}).addTo(s),e.type==="offshore"&&d&&a){const k=i.divIcon({html:`
              <div class="current-arrow" style="transform: rotate(${a.currentDirection}deg)">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#0066cc" opacity="0.7">
                  <path d="M12 2l4 8h-3v12h-2V10H8z"/>
                </svg>
              </div>
            `,className:"current-arrow-icon",iconSize:[30,30]});i.marker([e.location.lat+.02,e.location.lng+.02],{icon:k}).addTo(s)}}});const g=o=>{const e=o,c=h.find(m=>m.id===e.detail);c&&u(c)};return window.addEventListener("openTurbineDetail",g),()=>{window.removeEventListener("openTurbineDetail",g),r.current&&(r.current.remove(),r.current=null)}},[d,p,h]),t.jsxs("div",{className:"relative",children:[t.jsx("div",{ref:l,className:"w-full h-full rounded-lg"}),t.jsxs("div",{className:"absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000]",children:[t.jsx("h4",{className:"font-semibold mb-2",children:"Map Layers"}),t.jsxs("div",{className:"space-y-2",children:[t.jsxs("label",{className:"flex items-center space-x-2 cursor-pointer",children:[t.jsx("input",{type:"checkbox",checked:d,onChange:s=>x(s.target.checked),className:"form-checkbox"}),t.jsx("span",{className:"text-sm",children:"Ocean Currents"})]}),t.jsxs("label",{className:"flex items-center space-x-2 cursor-pointer",children:[t.jsx("input",{type:"checkbox",checked:b,onChange:s=>v(s.target.checked),className:"form-checkbox"}),t.jsx("span",{className:"text-sm",children:"Wave Heights"})]}),t.jsxs("label",{className:"flex items-center space-x-2 cursor-pointer",children:[t.jsx("input",{type:"checkbox",checked:p,onChange:s=>w(s.target.checked),className:"form-checkbox"}),t.jsx("span",{className:"text-sm",children:"Highlight Offline"})]})]})]}),t.jsx("style",{children:`
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
      `}),f&&t.jsx(j,{turbine:f,isOpen:!!f,onClose:()=>u(null)})]})};export{z as default};
