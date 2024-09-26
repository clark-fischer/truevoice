import React, { useState } from "react";
// Leaflet/Map
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import coCong2021 from "./co_cong_2021.json";
// Switch
import { Switch, FormControl, FormLabel, Box } from "@chakra-ui/react";

export default function Colorado() {
  const [activeSwitch, setActiveSwitch] = useState(null); // Track which switch is active

  const handleSwitchChange = (value) => {
    setActiveSwitch(value);
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
      <h1>COLORADO</h1>
      <div style={styles.mapWrapper}>
        <MapContainer
          center={[39.113014, -105.358887]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={coCong2021} />
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
