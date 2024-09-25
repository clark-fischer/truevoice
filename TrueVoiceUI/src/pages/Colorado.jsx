import React from "react";
//Leaflet/Map
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Colorado() {
  const styles = {
    mapWrapper: {
      padding: "5%",
      height: "90vh",
      width: "90vw",
    },
  };
  return (
    <>
      <h1>COLORADO</h1>
      <div style={styles.mapWrapper}>
        <MapContainer center={[39.113014, -105.358887]} zoom={7}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </>
  );
}
