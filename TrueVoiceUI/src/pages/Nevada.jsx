/* eslint-disable no-unused-vars */
import React from "react";

// Leaflet/Map
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'

// data
import "leaflet/dist/leaflet.css";
import nv_smd from "./nv_smd.json";
import nv_2mmd from "./nv_2mmd.json";
import nv_3mmd from "./nv_3mmd.json";
import nv_4mmd from "./nv_4mmd.json";


import nv_race_data from "./nv_race_chloro_data.json"

import { Flex, Heading, Button, Tooltip, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";


export default function Colorado() {
  const w = 1;
  const nevada_districts = {
    1: {
      color: "blue",
      fillColor: "blue",
      weight: w,
      opacity: 1,
      fillOpacity: 0.8,
    },
    2: {
      color: "red",
      fillColor: "red",
      weight: w,
      opacity: 1,
      fillOpacity: 0.4,
    },
    3: {
      color: "blue",
      fillColor: "blue",
      weight: w,
      opacity: 1,
      fillOpacity: 0.3,
    },
    4: {
      color: "blue",
      fillColor: "blue",
      weight: w,
      opacity: 1,
      fillOpacity: 0.5,
    },
  }

  Object.keys(nevada_districts).forEach(district => {
    nevada_districts[district].fillOpacity /= 2;
  });


  const geojson_style = (feature) => {
    return nevada_districts[feature.properties.DISTRICTNO];
  };

  const styles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr", // Two columns
      height: "60vh",
      margin: "30px 30px",
    },
    mapWrapper: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    mapContainer: {
      flexGrow: 1, // Map takes up remaining space
      width: "100%",
    },
    map: {
      width: "100%",
      height: "100%",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "space-between",
      // padding: "10px",
      height: "10%", // Take up 10% of the container height
      background: "#ffffff",

    },
    button: {
      flexBasis: "25%", // Each button takes up about 22.5% of the width (to account for spacing)
      // padding: "1  0px",
      fontSize: "16px",
      textAlign: "center",
      border: "1px solid #f0f0f0",


      '&:hover': {
        textDecoration: 'underline',

      },
    },
    controlsContainer: {
      padding: "20px",
      background: "#f8f8f8",
      width: "250px",
      height: "100%", // Full-height controls column
      boxSizing: "border-box",
    },
  };





  const getGeoJsonStyle = (data) => {
    if (data === nv_smd) {
      return (feature) => nevada_districts[feature.properties.DISTRICTNO];
    } else if (data === nv_2mmd) {
      return (feature) => ({
        color: "green",
        fillColor: "green",
        weight: w,
        opacity: 1,
        fillOpacity: 0.6
      });
    } else if (data === nv_4mmd) {
      return (feature) => ({
        color: "purple",
        fillColor: "purple",
        weight: w,
        opacity: 1,
        fillOpacity: 0.7
      });
    }
    return (feature) => ({
      color: "gray",
      fillColor: "gray",
      weight: w,
      opacity: 1,
      fillOpacity: 0.5
    });
  };

  const [geoJsonData, setGeoJsonData] = React.useState(nv_smd);
  const [geoJsonStyle, setGeoJsonStyle] = React.useState(() => getGeoJsonStyle(nv_smd));

  const handleButtonClick = (data) => {
    setGeoJsonData(data);
    setGeoJsonStyle(() => getGeoJsonStyle(data));
    console.log("geojson changed");
  };

  const [heatmapData, setHeatmapData] = React.useState({
    white: [],
    black: [],
    asian: [],
    hispanic: []
  });

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const race = id.split('--')[1];
    setHeatmapData((prevData) => ({
      ...prevData,
      [race]: checked ? nv_race_data[race] : []
    }));
  };

  const heatmapGradient = {
    white: { 0.1: 'yellow', 1: 'orange' },
    black: { 0.1: 'pink', 1: 'purple' },
    asian: { 0.1: 'cyan', 1: 'blue' },
    hispanic: { 0.1: 'lime', 1: 'green' }

  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        width="100%"
        height="50px"
        marginTop="30px"
      >
        <Button as={NavLink} to="/" colorScheme="green" ml="30px">
          Home
        </Button>
        <Heading my="30px" textAlign="center" flex="1">
          Nevada
        </Heading>
      </Flex>
      <div style={styles.gridContainer}>

        <div style={styles.mapWrapper}>
          <div style={styles.mapContainer}>
            <MapContainer
              key={JSON.stringify(geoJsonData)} // Force re-render by changing key
              center={[38.876019, -117.224121]}
              zoom={6}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {Object.keys(heatmapData).map((race) => (
                heatmapData[race] && heatmapData[race].length > 0 && (
                  <HeatmapLayer
                    key={race}
                    fitBoundsOnLoad={false}
                    fitBoundsOnUpdate={false}
                    points={heatmapData[race]}
                    longitudeExtractor={(m) => m[1]}
                    latitudeExtractor={(m) => m[0]}
                    intensityExtractor={(m) => parseFloat(m[2])}
                    radius={10}
                    max={100}
                    minOpacity={.7}
                    useLocalExtrema={true}
                    gradient={heatmapGradient[race]}
                  />
                )
              ))}

              <GeoJSON data={geoJsonData} style={geoJsonStyle} />
            </MapContainer>
          </div>


          {/* Row of Buttons below the map */}
          <div style={styles.buttonRow}>
            <Tooltip label="Mayby a graph here">
              <button
                onClick={() => handleButtonClick(nvCong2021)}
                style={styles.button}
              >
                SMD, Single Rep.
              </button>
            </Tooltip>

            <Tooltip label="Mayby a graph here">
              <button
                onClick={() => handleButtonClick(nv_2mmd)}
                style={styles.button}
              >
                MMD, 2 Reps.
              </button>
            </Tooltip>
            <Tooltip label="Mayby a graph here">
              <button
                onClick={() => handleButtonClick(nvCong2021)}
                style={styles.button}
              >
                MMD, 3 Reps.
              </button>
            </Tooltip>
            <Tooltip label="Mayby a graph here">
              <button
                onClick={() => handleButtonClick(nv_4mmd)}
                style={styles.button}
              >
                MMD, 4 Reps.
              </button>
            </Tooltip>

          </div>
        </div>

        <div style={styles.controlsContainer}>
          <legend style={{fontSize: "18px", fontWeight: "bold", marginBottom: "10px"}}>Overlay Ethnicity Data</legend>
          <input id="race--white" type='checkbox' onChange={handleCheckboxChange} />
          <label htmlFor="race--white" style={{ paddingLeft: "5px" }}>White</label>


          <br />

          <input id="race--black" type='checkbox' onChange={handleCheckboxChange} />
          <label htmlFor="race--black" style={{ paddingLeft: "5px" }}>African-American</label>

          <br />


          <input id="race--asian" type='checkbox' onChange={handleCheckboxChange} />
          <label htmlFor="race--asian" style={{ paddingLeft: "5px" }}>Asian-American</label>

          <br />


          <input id="race--hispanic" type='checkbox' onChange={handleCheckboxChange} />
          <label htmlFor="race--hispanic" style={{ paddingLeft: "5px" }}>Latino/Hispanic</label>

          <br />

          <button onClick={() => setGeoJsonData(geoJsonData ? null : nv_smd)} style={styles.button}>
            {geoJsonData ? "Disable GeoJSON" : "Enable GeoJSON"}
          </button>
        </div>

      </div>

      <Image
        src="/plot.png"
        alt="Example Image"
        width="700px"
        height="400px"
        objectFit="cover"
        border="1px solid black"
        marginLeft="30px"
      />

    </>
  );
}
