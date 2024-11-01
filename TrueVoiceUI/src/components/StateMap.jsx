import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function StateMap(state) {
  const nevada_districts = {
    0: {
      color: "blue",
      fillColor: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4,
    },
    1: {
      color: "red",
      fillColor: "red",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.2,
    },
    2: {
      color: "red",
      fillColor: "red",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.15,
    },
    3: {
      color: "blue",
      fillColor: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.15,
    },
  };

  // Function to get GeoJSON style
  const getGeoJsonStyle = (feature) =>
    nevada_districts[feature.properties.DISTRICTNO] || {
      color: "gray",
      fillColor: "gray",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.5,
    };

  // State for GeoJSON data
  const [geoJsonData, setGeoJsonData] = useState(null);
  if (geoJsonData != null) {
    geoJsonData.features.forEach((feature) => {
      console.log(feature.geometry);
    });
  }

  // Load GeoJSON data using fetch inside useEffect
  useEffect(() => {
    fetch("/mock_district.geojson")
      // fetch("/modified_co_cong_2021.geojson")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <MapContainer
      // center={
      //   state === "NV" ? [38.876019, -117.224121] : [39.113014, -105.358887]
      // }
      center={[38.876019, -117.224121]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {geoJsonData && <GeoJSON data={geoJsonData} style={getGeoJsonStyle} />}
    </MapContainer>
  );
}
