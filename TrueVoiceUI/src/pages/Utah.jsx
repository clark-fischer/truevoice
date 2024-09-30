import React, { useState } from "react";
// Leaflet/Map
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import utCong2021 from "./ut_cong_2021.json"; // Adjust the path as necessary

// Switch
import { Switch, FormControl, FormLabel, Box } from "@chakra-ui/react";

export default function Colorado() {
  const [activeSwitch, setActiveSwitch] = useState(null); // Track which switch is active

  const handleSwitchChange = (value) => {
    setActiveSwitch(value);
  };

  const w = 2;
  const utah_districts = {

    1: {
        color: "red",
        fillColor: "red",
        "weight": w,
        opacity: 0.8,
        fillOpacity: 0.8
    },
    2: {
        color: "red",
        fillColor: "red",
        "weight": w,
        opacity: 0.6,
        fillOpacity: 0.6
    },
    3: {
        color: "red",
        fillColor: "red",
        "weight": w,
        opacity: .8,
        fillOpacity: 0.8
    },
    4: {
        color: "red",
        fillColor: "red",
        "weight": w,
        opacity: .8,
        fillOpacity: 0.8
    }

  };
  const geojson_style = (feature) => {
    return utah_districts[feature.properties.DISTRICTNO];
  };

  const styles = {
    mapWrapper: {
      padding: "5%",
      height: "90vh",
      width: "90vw",
      position: "relative", // Allow for positioning of the switches
    },
    switchContainer: {
      position: "fixed", // Fix position relative to the viewport
      top: "50%", // Center vertically
      right: "5%", // Adjust right position as needed
      transform: "translateY(-50%)", // Center vertically using transform
      display: "flex",
      flexDirection: "column", // Stack switches vertically
      gap: "10px", // Space between switches
      zIndex: 1000, // Ensure it is on top of the map
      backgroundColor: "white", // Optional: background for better visibility
      padding: "10px", // Optional: padding around the switches
      borderRadius: "8px", // Optional: rounded corners
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: shadow for depth
    },
  };

  

  return (
    <>
      <h1>UTAH</h1>
      <div style={styles.mapWrapper}>
        <MapContainer
          center={[39.41922, -111.950684]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={utCong2021} style={geojson_style} />
        </MapContainer>
        <Box style={styles.switchContainer}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="democrats">
              Gerrymandering Favor of Democrats
            </FormLabel>
            <Switch
              id="democrats"
              colorScheme="teal"
              size="lg"
              isChecked={activeSwitch === "democrats"}
              onChange={() => handleSwitchChange("democrats")}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="republicans">
              Gerrymandering Favor of Republicans
            </FormLabel>
            <Switch
              id="republicans"
              colorScheme="teal"
              size="lg"
              isChecked={activeSwitch === "republicans"}
              onChange={() => handleSwitchChange("republicans")}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="fair">Gerrymandering Fairly</FormLabel>
            <Switch
              id="fair"
              colorScheme="teal"
              size="lg"
              isChecked={activeSwitch === "fair"}
              onChange={() => handleSwitchChange("fair")}
            />
          </FormControl>
        </Box>
      </div>
    </>
  );
}
