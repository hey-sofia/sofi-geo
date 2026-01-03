import "./style.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapboxOverlay } from "@deck.gl/mapbox";
import mapboxgl, { Map, type LngLatLike } from "mapbox-gl";
import { ColumnLayer, ScatterplotLayer } from "@deck.gl/layers";
import { Deck, type Accessor, type Color } from "@deck.gl/core";

const DEFAULT_MAP_POSITION: LngLatLike = [-2.244, 53.478];
const DEFAULT_MAP_ZOOM = 17.6;

const LAND_COLOR = "#d59ee3";
const TARGET_COLOR: number[] & Accessor<any, Color> = [237, 52, 86, 100];

(async () => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/standard",
    config: {
      basemap: {
        lightPreset: "dawn",
        theme: "default",
        showRoadLabels: false,
        showPointOfInterestLabels: false,
        showAdminBoundaries: true,
        colorLand: "#d59ee3",
      },
    },
    center: DEFAULT_MAP_POSITION,
    zoom: DEFAULT_MAP_ZOOM,
    pitch: 75,
    bearing: 150,
  });

  const nav = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true,
  });

  map.addControl(nav, "top-right");

  map.once("load", () => {
    const data = [{ position: [-2.246, 53.47805], height: 200, label: "I work here!" }];
    const overlay = new MapboxOverlay({
      interleaved: true,
      layers: [
        new ColumnLayer({
          id: "highlight-cylinder",
          data,
          diskResolution: 24,
          radius: 8,
          extruded: true,
          elevationScale: 1,
          getPosition: (d) => d.position,
          getElevation: (d) => d.height,
          getFillColor: TARGET_COLOR,
          getLineColor: [0, 0, 0, 255],
          pickable: true,
        }),
      ],
      getTooltip: ({ object }) => {
        return (
          object && {
            html: `<img src="https://cdn.prod.website-files.com/67a4c861c36a0d39ecd11030/67ab7c5d1af0141539d118ec_rfa-logo-inline-colour-dark-RGB.svg" width="140px" height="75px"/>`,
            style: {
              backgroundColor: "#f5e9cd",
              padding: "0px 14px",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
              maxWidth: "260px",
            },
          }
        );
      },
    });

    map.addControl(overlay);

    map.setRain({
      density: 1,
      intensity: 1,
      color: "#c132ce",
      opacity: 0.19,
      "center-thinning": 0,
      direction: [0, 50],
      "droplet-size": [1, 10],
      "distortion-strength": 0.5,
      vignette: 0.5,
      "vignette-color": "#9b38ac",
    });
  });
})();
