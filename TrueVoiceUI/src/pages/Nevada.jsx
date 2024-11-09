import React, { useEffect, useState } from "react";
import axios from "axios";

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
} from "@chakra-ui/react";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import DistrictTable from "./DistrictTable";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

// data -- start
import "leaflet/dist/leaflet.css";
// import state_smd_local from "../datafiles/nv_smd.json";
import state_smd_local from "../datafiles/NEVSMDFAIR.json";
import nv_4mmd from "../datafiles/nv_4mmd.json";
import { Flex, Heading, Tooltip, Image } from "@chakra-ui/react";
import nv_race_data from "../datafiles/nv_race_chloro_data.json";

import nv_race_by_district from "../datafiles/myJson.json"
import race_stats from "../datafiles/nv_race_chloro_data2_precinct.json"

const heatmapGradient = {
  white: { 0.1: "yellow", 1: "orange" },
  black: { 0.1: "pink", 1: "purple" },
  asian: { 0.1: "cyan", 1: "blue" },
  hispanic: { 0.1: "lime", 1: "green" },
};

const state_representatives = [
  "Dina Titus",
  "Mark Amodei",
  "Susie Lee",
  "Steven Horsford",
];

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
    width: "600px",
    // height: "100px",
    // border: "1px solid red",
    boxSizing: "border-box",
  },
};

// data --  end

export default function State() {
  // clark -- temp removed axios
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/NEV/SMD/FAIR");
        setData(response.data); // Set the data to state
        set_state_smd(response.data);
      } catch (err) {
        setError(err); // Handle any error that occurs during the request
      }
    };

    fetchData(); // Call the function
  }, []);

  // eslint-disable-next-line no-unused-vars
  // const [state_smd, set_state_smd] = React.useState(state_smd_local);

  const [state_smd, set_state_smd] = React.useState(null);

  // charting functionality -- BEGIN
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ChartTooltip,
    Legend
  );

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

  const updateChartData = (chartData, setChartData) => {
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

  const eachDistrict = (feature, layer) => {
    const districtNo = feature.properties.DISTRICTNO;
    layer.on("mouseover", function () {

      document.getElementById(
        "selected-district"
      ).innerText = `District ${districtNo}`;

      document.getElementById(
        "selected-rep"
      ).innerText = `Rep. ${state_representatives[districtNo - 1]}`;

      updateChartData(raceData, setRaceData);
      updateChartData(partyData, setPartyData);
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

  const styleFeature = (feature) => {
    const tractId = feature.properties.GEOID; // assuming GEOID links to your data
    const data = race_stats[tractId];

    const races = [
      { id: "race--white", color: "blue" },
      { id: "race--black", label: "African-American" },
      { id: "race--asian", label: "Asian-American" },
      { id: "race--hispanic", label: "Latino/Hispanic" },
    ];

    for (let i = 0; i < races.length; i++) {

    }

    if (!data) return { fillColor: '#ccc', color: '#333', weight: 1, fillOpacity: 0.5 };

    // Example color scaling based on 'white' demographic percentage, as an example
    const percentage = data.white; // Change 'white' to other demographic keys as needed
    const fillColor = `rgba(0, 0, 0, ${percentage})`;

    return {
      fillColor,
      color: '#333',
      weight: 1,
      fillOpacity: percentage,
    };
  };


  const changeDistrictMap = (data) => {
    setGeoJsonData(data);
    setGeoJsonStyle(() => getGeoJsonStyle(data));
  };

  const [heatmapData, setHeatmapData] = React.useState([]);

  const changeRaceMap = (event) => {
    const { id, checked } = event.target;
    const race = id.split("--")[1];
    setHeatmapData((prevData) => ({
      ...prevData,
      [race]: checked ? nv_race_data[race] : [],
    }));
  };

  const renderHeatmapLayers = () => {
    return Object.keys(heatmapData).map(
      (race) =>
        heatmapData[race] &&
        heatmapData[race].length > 0 && (
          <HeatmapLayer
            key={race}
            fitBoundsOnLoad={true}
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
    );
  };

  const renderDistrictButtons = () => {
    const districtMaps = [
      {
        label: "SMD, Single Rep. (current)",
        data: state_smd,
        tooltip: "These are Nevada's districts, as of 2024.",
      },
      // { label: "MMD, 2 Reps.", data: nv_2mmd, tooltip: "Entirely hypothetical. As per the FRA, a small state like Nevada would combine all districts into a single district." },
      // { label: "MMD, 3 Reps.", data: nv_3mmd, tooltip: "Entirely hypothetical. As per the FRA, a small state like Nevada would combine all districts into a single district." },
      {
        label: "MMD, 4 Reps. (FRA official)",
        data: nv_4mmd,
        tooltip: "This would be the official prescription of the FRA.",
      },
    ];

    return districtMaps.map((map, index) => (
      <Tooltip key={index} label={map.tooltip}>
        <button
          onClick={() => changeDistrictMap(map.data)}
          style={styles.button}
        >
          {map.label}
        </button>
      </Tooltip>
    ));
  };

  const renderRaceCheckboxes = () => {
    const races = [
      { id: "race--white", label: "White" },
      { id: "race--black", label: "African-American" },
      { id: "race--asian", label: "Asian-American" },
      { id: "race--hispanic", label: "Latino/Hispanic" },
    ];

    return races.map((race) => (
      <div key={race.id}>
        <input id={race.id} type="checkbox" onChange={changeRaceMap} />
        <label htmlFor={race.id} style={{ paddingLeft: "5px" }}>
          {race.label}
        </label>
        <br />
      </div>
    ));
  };

  return (
    <>
      {/* <Box position="relative" mb={5} p={10}> */}
      {/* */}
      {/* <AbsoluteCenter bg="white" px={4}>
          <Heading textAlign="center" flex="1">
            Nevada
          </Heading>
        </AbsoluteCenter> */}
      {/* </Box> */}

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
                {renderHeatmapLayers()}
                <GeoJSON
                  data={geoJsonData}
                  style={geoJsonStyle}
                  onEachFeature={eachDistrict}
                />
                <GeoJSON
                  data={nv_race_by_district}
                  style={styleFeature}
                />
              </MapContainer>
            </div>

            <div style={styles.buttonRow}>{renderDistrictButtons()}</div>
          </div>

          <Tabs mx={0} my={0}>
            <TabList>
              <Tab key={1}>Heatmap Explorer</Tab>
              <Tab key={2}>County Explorer</Tab>
              <Tab key={3}>State</Tab>
            </TabList>
            <TabPanels key={1}>
              <TabPanel padding={0}>
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
                  {renderRaceCheckboxes()}
                  <button
                    onClick={() =>
                      setGeoJsonData(geoJsonData ? null : state_smd)
                    }
                    style={styles.button}
                  >
                    {geoJsonData ? "Disable GeoJSON" : "Enable GeoJSON"}
                  </button>



                </div>
              </TabPanel>

              <TabPanel padding={0}>
                <div style={styles.controlsContainer}>
                  <div>
                    <b>Selected District:</b>
                    <p id="selected-district">
                      <i>None</i>
                    </p>
                    <b>Current Rep:</b>
                    <p id="selected-rep">
                      <i>None</i>
                    </p>
                  </div>

                  <div>
                    <br />
                    <b>Race Breakdown:</b>
                  </div>

                  <Box m="0 auto">
                    <Bar
                      data={raceData}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
                  </Box>

                  <div>
                    <br />
                    <b>Party Breakdown:</b>
                  </div>

                  <Box m="0 auto">
                    <Bar
                      data={partyData}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
                  </Box>
                </div>
              </TabPanel>

              <TabPanel padding={0} >
                <div style={styles.controlsContainer}>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "10px" }}>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                      <Heading size="md">Dem Favored</Heading>
                      <Text mt={4}>Content for card 1</Text>
                    </Box>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                      <Heading size="md">Repb Favored</Heading>
                      <Text mt={4}>Content for card 2</Text>
                    </Box>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                      <Heading size="md">Average</Heading>
                      <Text mt={4}>Content for card 3</Text>
                    </Box>
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                      <Heading size="md">Fair</Heading>
                      <Text mt={4}>Content for card 4</Text>
                    </Box>
                  </div>

                  <hr />  

                  <br></br>
                  <bold>District Plan Summary Data</bold>
                  <DistrictTable />
                </div>


              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Container>

      <Tabs>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex justify="space-between" align="center" h="50px" mx={14} my={2}>
        <Heading />
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

      <Heading ml={14} mt={9}>
        Metrics
      </Heading>

      <Text mx={15} my={5}>
        Here, we present the metrics for Nevada&apos;s congressional districts,
        under different scenarios.
      </Text>

      <Heading as="h4" size="md" mx={15} my={5}>
        Box and Whisker Fairness Plot
      </Heading>

      <ChartData />

      <Heading as="h4" size="md" mx={15} my={5}>
        Breakdown by Race and Party Wins in Each District
      </Heading>
      <Container maxW="container.lg">
        <Center>
          <Box overflowX="auto">
            <DistrictTable />
          </Box>
        </Center>
      </Container>

      <MoreAbout />
      {/* <div>
        {error && <p>Error: {error.message}</p>}
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre> // Display JSON data in a formatted way
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
    </>
  );
}

function MoreAbout() {
  return (
    <Box mx={14} my={7}>
      <Heading>The Fair Representation Act</Heading>
      <Text>What exactly does the FRA propose?</Text>
      <UnorderedList mx={5} my={7}>
        <ListItem>
          The Fair Representation Act aims to reform U.S. elections with ranked
          choice voting for all elections of Senators and House members.
        </ListItem>
        <ListItem>
          States with six or more Representatives must create multi-member
          districts, electing 3-5 Representatives per district.
        </ListItem>
        <ListItem>
          States with fewer Representatives will elect them at-large.
        </ListItem>
        <ListItem>
          Congressional redistricting must be handled by independent commissions
          or a U.S. District Court panel.
        </ListItem>
        <ListItem>
          The Election Assistance Commission will fund states to implement these
          changes.
        </ListItem>
      </UnorderedList>
      <Text>
        To learn more, you can read the bill yourself at{" "}
        <Link
          color="teal.500"
          href="https://www.congress.gov/bill/117th-congress/house-bill/3863"
        >
          Congress.gov
        </Link>
        . Or Google it...
      </Text>
    </Box>
  );
}

function ChartData() {
  const tabs = [
    {
      label: "SMD (current state)",
      image: "/Nevada_SMD_box_and_whisker_plot.png",
    },
    { label: "MMD, 2 Reps.", image: "/plot2.png" },
    { label: "MMD, 3 Reps.", image: "/plot3.png" },
    { label: "MMD, 4 Reps. (FRA Official)", image: "/plot4.png" },
  ];

  return (
    <Tabs variant="enclosed" mx={15} my={5}>
      <TabList>
        {tabs.map((tab, idx) => (
          <Tab key={idx}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab, idx) => (
          <TabPanel key={idx}>
            <Center>
              <Image
                src={tab.image}
                alt="Example Image"
                objectFit="cover"
                border="1px solid black"
              />
            </Center>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
