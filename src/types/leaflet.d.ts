import 'leaflet';

declare module 'leaflet' {
  export interface MarkerClusterGroupOptions extends LayerOptions {
    chunkedLoading?: boolean;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    maxClusterRadius?: number;
    iconCreateFunction?: (cluster: MarkerCluster) => Icon | DivIcon;
  }

  export interface MarkerCluster extends Layer {
    getChildCount(): number;
    getAllChildMarkers(): Marker[];
  }

  export interface MarkerClusterGroup extends FeatureGroup {
    new (options?: MarkerClusterGroupOptions): MarkerClusterGroup;
    clearLayers(): this;
    addLayer(layer: Layer): this;
    removeLayer(layer: Layer): this;
  }

  export function markerClusterGroup(options?: MarkerClusterGroupOptions): MarkerClusterGroup;
}