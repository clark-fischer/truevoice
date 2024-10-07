/* eslint-disable no-unused-vars */
import React from "react";

import {
  Box,
  Container,
  Text,
  UnorderedList,
  ListItem,
  ScaleFade,
  useDisclosure,
  Divider,
  AbsoluteCenter,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

// Leaflet/Map
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

// data
import "leaflet/dist/leaflet.css";
import nv_smd from "./nv_smd.json";
import nv_2mmd from "./nv_2mmd.json";
import nv_3mmd from "./nv_3mmd.json";
import nv_4mmd from "./nv_4mmd.json";
import { Flex, Heading, Button, Tooltip, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import nv_race_data from "./nv_race_chloro_data.json";

export default function Colorado() {
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ChartTooltip,
    Legend
  );

  const [chartData, setChartData] = React.useState({
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

  const updateChartData = (districtNo) => {
    const newData = [...chartData.datasets[0].data];
    newData[0] = Math.floor(Math.random() * 60) + 1;
    newData[1] = 100 - newData[0];
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: newData,
        },
      ],
    });
  };

  const updatePartyData = (districtNo) => {
    const newData = [...partyData.datasets[0].data];
    newData[0] = Math.floor(Math.random() * 60) + 1;
    newData[1] = 100 - newData[0];
    setPartyData({
      ...partyData,
      datasets: [
        {
          ...partyData.datasets[0],
          data: newData,
        },
      ],
    });
  };

  const eachDistrict = (feature, layer) => {
    const districtNo = feature.properties.DISTRICTNO;
    layer.on("mouseover", function (e) {
      // layer.bindPopup(`District ${districtNo}`).openPopup();
      document.getElementById(
        "selected-district"
      ).innerText = `District ${districtNo}`;
      updateChartData(districtNo);
      updatePartyData(districtNo);
    });
  };

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
      fillOpacity: 0.3,
    },
  };

  Object.keys(nevada_districts).forEach((district) => {
    nevada_districts[district].fillOpacity /= 2;
  });

  const geojson_style = (feature) => {
    return nevada_districts[feature.properties.DISTRICTNO];
  };

  const styles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "2.3fr 1fr", // Two columns
      // height: "60vh",
      margin: "0px",
    },
    mapWrapper: {
      display: "flex",
      flexDirection: "column",
      height: "700px",
    },
    mapContainer: {
      flexGrow: 1, // Map takes up remaining space
      width: "100%",
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
      "&:hover": {
        textDecoration: "underline",
      },
    },
    controlsContainer: {
      padding: "20px",
      background: "#f8f8f8",
      width: "400px",
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
        fillOpacity: 0.6,
      });
    } else if (data === nv_4mmd) {
      return (feature) => ({
        color: "purple",
        fillColor: "purple",
        weight: w,
        opacity: 1,
        fillOpacity: 0.7,
      });
    }
    return (feature) => ({
      color: "gray",
      fillColor: "gray",
      weight: w,
      opacity: 1,
      fillOpacity: 0.5,
    });
  };

  const [geoJsonData, setGeoJsonData] = React.useState(nv_smd);
  const [geoJsonStyle, setGeoJsonStyle] = React.useState(() =>
    getGeoJsonStyle(nv_smd)
  );

  const handleButtonClick = (data) => {
    setGeoJsonData(data);
    setGeoJsonStyle(() => getGeoJsonStyle(data));
    console.log("geojson changed");
  };

  const [heatmapData, setHeatmapData] = React.useState({
    white: [],
    black: [],
    asian: [],
    hispanic: [],
  });

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const race = id.split("--")[1];
    setHeatmapData((prevData) => ({
      ...prevData,
      [race]: checked ? nv_race_data[race] : [],
    }));
  };

  const heatmapGradient = {
    white: { 0.1: "yellow", 1: "orange" },
    black: { 0.1: "pink", 1: "purple" },
    asian: { 0.1: "cyan", 1: "blue" },
    hispanic: { 0.1: "lime", 1: "green" },
  };

  return (
    <>
      <Box position="relative" style={{ marginBottom: "5px" }} padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Heading textAlign="center" flex="1">
            Nevada
          </Heading>
        </AbsoluteCenter>
      </Box>

      <Container centerContent minWidth={"100%"} padding={0} margin={0}>
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
                  attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />

                {Object.keys(heatmapData).map(
                  (race) =>
                    heatmapData[race] &&
                    heatmapData[race].length > 0 && (
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
                        minOpacity={0.7}
                        useLocalExtrema={true}
                        gradient={heatmapGradient[race]}
                      />
                    )
                )}

                <GeoJSON
                  data={geoJsonData}
                  style={geoJsonStyle}
                  onEachFeature={eachDistrict}
                />
              </MapContainer>
            </div>

            {/* /* Row of Buttons below the map */}
            <div style={styles.buttonRow}>
              <Tooltip label="These are Nevada's districts, as of 2024.">
                <button
                  onClick={() => handleButtonClick(nv_smd)}
                  style={styles.button}
                >
                  SMD, Single Rep. (current)
                </button>
              </Tooltip>

              <Tooltip label="Entirely hypothetical. As per the FRA, a small state like Nevada would combine all districts into a single district.">
                <button
                  onClick={() => handleButtonClick(nv_2mmd)}
                  style={styles.button}
                >
                  MMD, 2 Reps.
                </button>
              </Tooltip>
              <Tooltip label="Entirely hypothetical. As per the FRA, a small state like Nevada would combine all districts into a single district.">
                <button
                  onClick={() => handleButtonClick(nv_3mmd)}
                  style={styles.button}
                >
                  MMD, 3 Reps.
                </button>
              </Tooltip>
              <Tooltip label="This would be the offical prescription of the FRA.">
                <button
                  onClick={() => handleButtonClick(nv_4mmd)}
                  style={styles.button}
                >
                  MMD, 4 Reps. (FRA official)
                </button>
              </Tooltip>
            </div>
          </div>

          <div style={styles.controlsContainer}>
            <legend
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Overlay Ethnicity Data
            </legend>
            <input
              id="race--white"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="race--white" style={{ paddingLeft: "5px" }}>
              White
            </label>

            <br />

            <input
              id="race--black"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="race--black" style={{ paddingLeft: "5px" }}>
              African-American
            </label>

            <br />

            <input
              id="race--asian"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="race--asian" style={{ paddingLeft: "5px" }}>
              Asian-American
            </label>

            <br />

            <input
              id="race--hispanic"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="race--hispanic" style={{ paddingLeft: "5px" }}>
              Latino/Hispanic
            </label>

            <br />

            <button
              onClick={() => setGeoJsonData(geoJsonData ? null : nv_smd)}
              style={styles.button}
            >
              {geoJsonData ? "Disable GeoJSON" : "Enable GeoJSON"}
            </button>

            <div>
              <br></br>
              <b>Selected District:</b>

              <p id="selected-district">
                <i>None</i>
              </p>
            </div>

            <div>
              <br></br>
              <b>Race Breakdown:</b>
            </div>

            <Box margin="0px auto">
              <Bar
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>
            <div>
              <br></br>
              <b>Party Breakdown:</b>
            </div>

            <Box margin="0px auto">
              <Bar
                data={partyData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>
          </div>
        </div>
      </Container>

      <Flex
        justify="space-between"
        align="center"
        height="50px"
        style={{ margin: "6px 67px 10px 56px" }}
      >
        <Heading></Heading>
        <Text>
          In Nevada, congressional district boundaries are drawn by{" "}
          <Link
            color="teal.500"
            href="https://ballotpedia.org/Redistricting_in_Nevada"
          >
            the state legislature.
          </Link>
        </Text>
      </Flex>

      <Heading style={{ marginLeft: "56px", marginTop: "36px" }}>
        Metrics
      </Heading>

      <Image
        src="/plot.png"
        alt="Example Image"
        // width="700px"
        // height="900px"
        objectFit="cover"
        border="1px solid black"
        marginLeft="30px"
      />

      <Box style={{ margin: "50px 56px 30px 56px" }}>
        <Heading>The Fair Representation Act</Heading>
        What exactly does the FRA propose?
        <UnorderedList style={{ margin: "0px 20px 30px 40px" }}>
          <ListItem>
            The Fair Representation Act aims to reform U.S. elections with
            ranked choice voting for all elections of Senators and House
            members.
          </ListItem>
          <ListItem>
            States with six or more Representatives must create multi-member
            districts, electing 3-5 Representatives per district.
          </ListItem>
          <ListItem>
            States with fewer Representatives will elect them at-large.
          </ListItem>
          <ListItem>
            Congressional redistricting must be handled by independent
            commissions or a U.S. District Court panel.
          </ListItem>
          <ListItem>
            The Election Assistance Commission will fund states to implement
            these changes.
          </ListItem>
        </UnorderedList>
        <br />
        To learn more, you can read the bill yourself at{" "}
        <Link
          color="teal.500"
          href="https://www.congress.gov/bill/117th-congress/house-bill/3863"
        >
          Congress.gov
        </Link>
        . Or Google it. That works too.
      </Box>

      <Box bg="gray.800" color="gray.200" py={10}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          px={8}
        >
          <Text fontSize="sm">&copy; {new Date().getFullYear()} TrueVoice</Text>
          <Stack direction="row" spacing={6}>
            <Link
              href="/about"
              _hover={{ textDecoration: "none", color: "gray.400" }}
            >
              About Us
            </Link>
          </Stack>
        </Stack>
        <Divider mt={6} />
        <Text textAlign="center" mt={6} fontSize="xs" color="gray.500">
          CSE416: GUI Deliverable 1
        </Text>
      </Box>
    </>
  );
}
