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

import nv_race_by_district from "../datafiles/myJson.json"
import TabPlanSummary from "./TabPlanSummary";
import Ensemble from "./Ensemble";

const state_representatives = [
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

  const [state_smd, set_state_smd] = React.useState(null);
  const [race_stats, set_race_stats] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/NV/SMD/DEMFAVORED");
        // console.log(response); // Set the data to state
        setGeoJsonData(response.data);
        set_state_smd(response.data);

        const response2 = await axios.get("http://localhost:8080/NV/HEATMAP");
        console.log("resp2", response2); // Set the data to state
        set_race_stats(response2.data.precincts)


      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call the function
  }, []);


  const [raceData, setRaceData] = React.useState({
    labels: ["White", "Non-White"],
    datasets: [
      {
        label: "Percentage of Population",
        data: [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const [partyData, setPartyData] = React.useState({
    labels: ["Republican", "Democrat"],
    datasets: [
      {
        label: "Population",
        data: [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });


  const eachDistrict = (feature, layer) => {
    const districtNo = feature.properties.districtno;
    console.log(feature.properties)
    layer.on("mouseover", function () {

      // district no
      document.getElementById(
        "selected-district"
      ).innerText = `District ${districtNo}`;

      document.getElementById(
        "race--white2"
      ).innerText = `${feature.properties.demographics.white}`;

      document.getElementById(
        "race--black2"
      ).innerText = `${feature.properties.demographics.black}`;

      document.getElementById(
        "race--hispanic2"
      ).innerText = `${feature.properties.demographics.latin}`;

      document.getElementById(
        "race--asian2"
      ).innerText = `${feature.properties.demographics.asian}`;

      document.getElementById(
        "race--other2"
      ).innerText = `${feature.properties.demographics.other}`;

      document.getElementById(
        "selected-rep"
      ).innerText = `Rep. ${state_representatives[districtNo - 1]}`;
    });
  };

  const nevada_districts = {
    1: {
      color: "blue",
      fillColor: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    },
    2: {
      color: "red",
      fillColor: "red",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4,
    },
    3: {
      color: "blue",
      fillColor: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.3,
    },
    4: {
      color: "blue",
      fillColor: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.3,
    },
  };

  Object.keys(nevada_districts).forEach((district) => {
    nevada_districts[district].fillOpacity /= 2;
  });

  const getGeoJsonStyle = (data) => {
    if (data === state_smd) {
      return (feature) => nevada_districts[feature.properties.DISTRICTNO];
    } else if (data === nv_4mmd) {
      return () => ({
        color: "purple",
        fillColor: "purple",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7,
      });
    }
    return () => ({
      color: "gray",
      fillColor: "gray",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.5,
    });
  };

  const [geoJsonData, setGeoJsonData] = React.useState(state_smd);
  const [geoJsonStyle, setGeoJsonStyle] = React.useState(() => getGeoJsonStyle(state_smd));

  function mixColors(colors) {
    // Parse hex color to RGB
    const hexToRgb = (hex) => {
      hex = hex.replace('#', '');
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
      };
    };

    const rgbToHex = ({ r, g, b }) => {
      const toHex = (value) => value.toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    // Normalize percentages if not summing to 1
    const totalWeight = colors.reduce((sum, { weight }) => sum + weight, 0);
    const normalizedColors = colors.map(({ hex, weight }) => ({
      rgb: hexToRgb(hex),
      weight: weight / totalWeight
    }));

    // Calculate the weighted average of each channel
    const mixedRgb = normalizedColors.reduce(
      (acc, { rgb, weight }) => {
        acc.r += rgb.r * weight;
        acc.g += rgb.g * weight;
        acc.b += rgb.b * weight;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );

    // Round channels and convert to hex
    const resultRgb = {
      r: Math.round(mixedRgb.r),
      g: Math.round(mixedRgb.g),
      b: Math.round(mixedRgb.b)
    };

    return rgbToHex(resultRgb);
  }

  // Example usage:
  // const colors = [
  //     { hex: '#ff0000', weight: 0.4 }, // red 40%
  //     { hex: '#00ff00', weight: 0.3 }, // green 30%
  //     { hex: '#0000ff', weight: 0.3 }  // blue 30%
  // ];

  // console.log(mixColors(colors)); // Outputs a blended color

  function buildHeatmap(i) {
    return (feature) => {
      const tractId = feature.properties.GEOID; // assuming GEOID links to your data
      const data = race_stats[tractId];
      // console.log("buuldin")
      // console.log(data);
      const percentage = data[races[i]["label"]];

      return {
        color: races[i]['hex'],
        weight: 0,
        fillOpacity: percentage,
        
      };
    };

  }



  const changeDistrictMap = (data) => {
    setGeoJsonData(data);
    setGeoJsonStyle(() => getGeoJsonStyle(data));
  };

  const [heatmapData, setHeatmapData] = React.useState([]);


  const renderDistrictButtons = () => {
    const districtMaps = [
      {
        label: "SMD, Single Rep. (current)",
        data: state_smd,
        tooltip: "These are Nevada's districts, as of 2024.",
      },
      {
        label: "MMD, 4 Reps. (FRA official)",
        data: nv_4mmd,
        tooltip: "This would be the official prescription of the FRA.",
      },
    ];

    return districtMaps.map((map, index) => (
      <Tooltip key={index} label={map.tooltip}>
        <button
          onClick={() => {
            document.getElementById("district-button0").style.color="black";
            document.getElementById("district-button1").style.color="black";
            document.getElementById("district-button" + index).style.color="blue";
            document.getElementById("district-button" + index).style.fontWeight="bold";
            changeDistrictMap(map.data);
          }}
          style={styles.button}
          id={"district-button" + index}
        >
          {map.label}
        </button>
      </Tooltip>
    ));
  };

  const [races, setRaces] = useState([
    { id: "race--white", label: "white", hex: 'blue', checked: 0 },
    { id: "race--black", label: "black", hex: 'red', checked: 0 },
    { id: "race--asian", label: "asian", hex: 'green', checked: 0 },
    { id: "race--hispanic", label: "hispanic", hex: 'yellow', checked: 0 },
    { id: "race--other", label: "other", hex: 'brown', checked: 0 },
  ]);

  const toggle_map = (index) => { 
    const nextRaces = races.map((c, i) => {

      const copy = { ...c };

      if (i === index) {
        // Increment the clicked counter
        copy.checked = !copy.checked;
      } 

      return copy;
    });


    setRaces(nextRaces);
  }

  return (
    <>

      <Divider my={2} />

      <Container centerContent minWidth="100%" p={0} m={0}>
        <div style={styles.gridContainer}>
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

                {
                  races.map((race, i) => {

                    return race["checked"] ? <GeoJSON
                      data={nv_race_by_district}
                      style={buildHeatmap(i)}
                      key={i*10 + race["checked"] }
                    /> : <></>
                  })
                }

                <GeoJSON
                  data={geoJsonData}
                  style={geoJsonStyle}
                  onEachFeature={eachDistrict}
                />
              </MapContainer>
            </div>

            <div style={styles.buttonRow}>{renderDistrictButtons()}</div>
          </div>

          <Tabs mx={0} my={0}>
            <TabList>
            <Tab key={1}>Demographics</Tab>
              <Tab key={4}>SMD vs. MMD</Tab>

              
              <Tab key={2}>Plans</Tab>
              {/* <Tab key={2}>County Explorer</Tab> */}
              <Tab key={3}>State</Tab>


              {/* <Tab key={5}>Vote Share</Tab> */}
              <Tab key={5}>Ensemble</Tab>
            </TabList>
            <TabPanels key={1}>

            <Demographics races={races} setRaces={setRaces} toggle_map={toggle_map} />

              <TabPanel padding={0}>
                <div style={styles.controlsContainer}>

                  

                  <div style={{display: "flex", margin: "0"}}>

                  <SideBySideImages
                    image1='2.jpg'
                    image2='3.jpg'
                    alt1="First placeholder"
                    alt2="Second placeholder"
                    
                  />
                     <table style={{ height: "10px", borderCollapse: "collapse", marginRight: "10px" }}>
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid white",   }}></th>
                        <th style={{ border: "1px solid white",  }}>SMD</th>
                        <th style={{ border: "1px solid white",  }}>MMD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid white",  }}>Rep/Dem Split</td>
                        <td style={{ border: "1px solid white",  }}>60:40</td>
                        <td style={{ border: "1px solid white",  }}>65:35</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid white",  }}>Opp Reps</td>
                        <td style={{ border: "1px solid white",  }}>1</td>
                        <td style={{ border: "1px solid white",  }}>2</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid white",  }}>Vote share</td>
                        <td style={{ border: "1px solid white",  }}>sample</td>
                        <td style={{ border: "1px solid white",  }}>sample</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid white",  }}>Seat share</td>
                        <td style={{ border: "1px solid white",  }}>sample</td>
                        <td style={{ border: "1px solid white",  }}>sample</td>
                      </tr>
                    </tbody>
                  </table> 

            

                  </div>

                  
                  <br />

                  

                  {/* <Heading>
                  Ensemble Data
                </Heading> */}
                </div>


              </TabPanel>

              


              

              <TabPlanSummary />
              <TabStatePlans />


              <Ensemble />
            </TabPanels>
          </Tabs>
        </div>
      </Container>
    </> 
  );
}
