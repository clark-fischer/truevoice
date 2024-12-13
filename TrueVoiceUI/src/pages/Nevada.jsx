/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBySideImages from './SideBySideImages';

import {
  Box,
  Container,
  Text,
  UnorderedList,
  ListItem,
  Center,
  Divider,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
} from "@chakra-ui/react";


import Demographics from "./Demographics";
import TabStatePlans from "./TabStatePlans";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

// data -- start
import "leaflet/dist/leaflet.css";
import nv_4mmd from "../datafiles/nv_4mmd.json";

import nv_district_map from "../datafiles/nv_smd.json"
import nv_precinct_map from "../datafiles/nv_precinct.json"
import TabPlanSummary from "./TabPlanSummary";
import Ensemble from "./Ensemble";

const stateRepresentives = [
  "Dina Titus",
  "Mark Amodei",
  "Susie Lee",
  "Steven Horsford",
];

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: ".7fr 1fr", // Two columns
    // height: "60vh",
    margin: "0px",
    width: "100%",
  },
  mapWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "700px",
    // display: "none"
  },
  mapContainer: {
    flexGrow: 1, // Map takes up remaining space
    // width: "100%",
  },

  buttonRow: {
    display: "flex",
    // justifyContent: "space-between",
    // padding: "10px",
    height: "10%", // Take up 10% of the container height
    background: "#ffffff",
  },
  button: {
    flexBasis: "50%", // Each button takes up about 22.5% of the width (to account for spacing)
    // padding: "1  0px",
    fontSize: "16px",
    textAlign: "center",
    border: "1px solid #f0f0f0",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  controlsContainer: {
    padding: "20px",
    // background: "#f8f8f8",
    // width: "600px",
    // height: "100px",
    // border: "1px solid red",
    boxSizing: "border-box",
  },
};


export default function State() {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planResp = await axios.get("http://localhost:8080/NV/SMD/ENACTED");

        setGeoJsonData(planResp.data);
        setPlanData(planResp.data.crs.properties);

        const raceResp = await axios.get("http://localhost:8080/NV/PRECINCT/HEATMAP");
        setP_r_stats(raceResp.data.precincts)

        const race2Resp = await axios.get("http://localhost:8080/NV/SMD/HEATMAP");
        setD_r_stats(race2Resp.data.districts)

        // this sucks -- change to css later
        document.getElementById("district-button0").style.color = "blue";
        document.getElementById("district-button0").style.fontWeight = "bold";

      } catch (err) {
        console.log("inital error");
        console.log(err);
      }
    };

    fetchData(); // Call the function
  }, []);

  const [p_r_stats, setP_r_stats] = React.useState(null);
  const [d_r_stats, setD_r_stats] = React.useState(null);
  const eachDistrict = (feature, layer) => {
    const { districtno, demographics } = feature.properties; // Destructure for cleaner code
    console.log(feature.properties);  

    function formatNumberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const updateInfo = () => {
      // // Update district number and representative
      document.getElementById("selected-district").innerText = `District: ${districtno}`;
      // document.getElementById("selected-rep").innerText = `Rep. ${stateRepresentives[districtno - 1] || "Unknown"}`;

      // Loop through demographics to update race information
      const raceMapping = {
        white: "race--white2", black: "race--black2", latin: "race--hispanic2", asian: "race--asian2", other: "race--other2",
      };

      for (const [key, id] of Object.entries(raceMapping)) {
        // console.log(key, id )
        document.getElementById(id).innerText = `${formatNumberWithCommas(demographics[key] || 0)}`;
      }
    };

    // Attach event handler
    layer.on("mouseover", updateInfo);
  };

  const [raceStats, setRaceStats] = React.useState(null);
  const [geoJsonData, setGeoJsonData] = React.useState(null);
  const [raceMap, setRaceMap2] = React.useState(null);
  const [planData, setPlanData] = React.useState(null);

  const setRaceMap = (data, p_or_d) => {
    setRaceMap2(data);
    if (!p_or_d) {
      setRaceStats(p_r_stats);
    } else {
      setRaceStats(d_r_stats);
    }
    
  }


  function buildHeatmap(i) {
    return (feature) => {

      // if (raceStats.length > 100) {
        const tractId = feature.properties.GEOID; // assuming GEOID links to your data  
      // }
      
      

      // console.log(feature)
      // console.log(raceStats)
      const data = raceStats[tractId];
      const percentage = data[raceCheckBoxes[i]["label"]];

      return {
        color: raceCheckBoxes[i]['hex'],
        weight: 0,
        fillOpacity: percentage,

      };
    };

  }

  const renderDistrictButtons = () => {
    const districtMaps = [
      {
        label: "SMD (Enacted)",
        path: "http://localhost:8080/NV/SMD/ENACTED",
        tooltip: "These are Nevada's districts, as of 2024.",
        planOptions: plan_options_smd,
      },
      {
        label: "MMD, 4 Reps. (FRA official)",
        path: "http://localhost:8080/NV/MMD/AVERAGE",
        tooltip: "This would be the official prescription of the FRA.",
        planOptions: plan_options_mmd,
      },
    ];

    const handleButtonClick = (index, map) => {
      // Reset styles for all buttons
      districtMaps.forEach((_, i) => {
        const button = document.getElementById(`district-button${i}`);
        button.style.color = "black";
        button.style.fontWeight = "normal";
      });

      // Highlight the selected button
      const selectedButton = document.getElementById(`district-button${index}`);
      selectedButton.style.color = "blue";
      selectedButton.style.fontWeight = "bold";

      const fetchData = async () => {
        try {
          const response = await axios.get(map.path);
          console.log(response); // Set the data to state
          setGeoJsonData(response.data);
          setPlanData(response.data.crs.properties);


        } catch (err) {
          setGeoJsonData(null);
          console.log(err);
        }

        document.getElementById("district-button0").innerHTML = "SMD (" + map.title + ")";
      };

      fetchData(); // Call the function
      set_plan_options(map.planOptions);

      // Update button text if needed
      if (index === 0) {
        selectedButton.innerHTML = map.label;
      }
    };

    return districtMaps.map((map, index) => (
      <Tooltip key={index} label={map.tooltip}>
        <button
          id={`district-button${index}`}
          style={styles.button}
          onClick={() => handleButtonClick(index, map)}
        >
          {map.label}
        </button>
      </Tooltip>
    ));
  };

  const plan_options_smd = [
    {
      title: "Enacted",
      image: "/dem.jpeg",
      path: "http://localhost:8080/NV/SMD/ENACTED"
    },
    {
      title: "Dem Favored",
      image: "/dem.jpeg",
      path: "http://localhost:8080/NV/SMD/DEMFAVORED"
    },
    {
      title: "Repb Favored",
      image: "/rep.jpeg",
      path: "http://localhost:8080/NV/SMD/REPFAVORED"
    },
    {
      title: "Average",
      image: "/dem.jpeg",
      path: "http://localhost:8080/NV/SMD/AVERAGE"
    },
    {
      title: "Fair",
      image: "/dem.jpeg",
      path: "http://localhost:8080/NV/SMD/FAIR"
    },
    {
      title: "Hide",
      image: "/hide.png",
      path: "http://localhost:8080/NV/SMD/NULL"
    },
  ]

  const plan_options_mmd = [
    {
      title: "MMD",
      image: "/dem.jpeg",
      path: "http://localhost:8080/NV/MMD/AVERAGE",
    },
    {
      title: "Hide",
      image: "/dem.jpeg",
      path: "http://localhost:8080/NV/SMD/NULL"
    },
  ]

  const [plan_options, set_plan_options] = useState(plan_options_smd);

  const [raceCheckBoxes, setRaceCheckBoxes] = useState([
    { id: "race--white", label: "white", hex: 'blue', checked: 0 },
    { id: "race--black", label: "black", hex: 'red', checked: 0 },
    { id: "race--asian", label: "asian", hex: 'green', checked: 0 },
    { id: "race--hispanic", label: "hispanic", hex: 'gold', checked: 0 },
    { id: "race--other", label: "other", hex: 'brown', checked: 0 },
  ]);

  const toggle_map = (index) => {
    const nextRaces = raceCheckBoxes.map((c, i) => {

      const copy = { ...c };

      if (i === index) {
        // Increment the clicked counter
        copy.checked = !copy.checked;
      }

      return copy;
    });


    setRaceCheckBoxes(nextRaces);
  }

  return (
    <>
      <Divider my={2} />

      {/* Entire Page contained here */}
      <Container centerContent minWidth="100%" p={0} m={0}>
        <div style={styles.gridContainer}>

          {/* This is the map component */}
          <div style={styles.mapWrapper}>
            <div style={styles.mapContainer}>
              <MapContainer
                key={JSON.stringify(geoJsonData)}
                center={[38.876019, -117.224121]}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
                <GeoJSON
                  data={geoJsonData}
                  onEachFeature={eachDistrict}
                />

                {
                  raceCheckBoxes.map((race, race_index) => {

                    return race["checked"] ? <GeoJSON
                      data={raceMap}
                      style={buildHeatmap(race_index)}
                      key={race_index * 10 + race["checked"]}
                    /> : <></>
                  })
                }

                
              </MapContainer>
            </div>

            <div style={styles.buttonRow}>{renderDistrictButtons()}</div>
          </div>

          {/* Map ends; Tabs begin */}
          <Tabs mx={0} my={0}>

            <TabList>
              <Tab key={1}>Demographics</Tab>
              <Tab key={4}>SMD vs. MMD</Tab>
              <Tab key={2}>Plans</Tab>
              <Tab key={3}>State</Tab>
              <Tab key={5}>Ensemble</Tab>
            </TabList>

            <TabPanels key={1}>

              <Demographics setRaceMap={setRaceMap} state={"NV"} raceCheckBoxes={raceCheckBoxes} setRaceCheckBoxes={setRaceCheckBoxes} toggle_map={toggle_map} />
              <TabPanel padding={0}>
                <div style={styles.controlsContainer}>
                  <SideBySideImages
                    image1='2.jpg'
                    image2='3.jpg'
                    alt1="First placeholder"
                    alt2="Second placeholder"
                  />
                </div>
              </TabPanel >
              <TabPlanSummary planData={planData} />
              <TabStatePlans plan_options={plan_options} setGeoJsonData={setGeoJsonData} setPlanData={setPlanData} />
              <Ensemble />

            </TabPanels>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
