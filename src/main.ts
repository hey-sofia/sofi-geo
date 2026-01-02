import "./style.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxOverlay } from "@deck.gl/mapbox";
import mapboxgl, { type LngLatLike } from "mapbox-gl";

const INITIAL_POSITION: LngLatLike = [-2.24455, 53.478];

(async () => {
  console.log("hello");
  mapboxgl.accessToken = "<API_KEY_GOES_HERE>";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: INITIAL_POSITION,
    zoom: 9,
  });

  map.once("load", () => {
    const overlay = new MapboxOverlay({
      interleaved: true,
      layers: [
        new ScatterplotLayer({
          id: "deckgl-circle",
          data: [{ position: INITIAL_POSITION, color: [255, 0, 0], radius: 1000 }],
          getPosition: (d) => d.position,
          getFillColor: (d) => d.color,
          getRadius: (d) => d.radius,
          opacity: 0.3,
        }),
      ],
    });

    map.addControl(overlay);
  });
})();
