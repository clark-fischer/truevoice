import React, { useEffect } from "react";
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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import DistrictTable from "./DistrictTable";
<<<<<<< HEAD
// Leaflet/Map
=======

import TabStatePlans from "./TabStatePlans";

>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

// data
import "leaflet/dist/leaflet.css";
<<<<<<< HEAD
// import nv_smd_local from "../datafiles/nv_smd.json";
// import nv_2mmd from "../datafiles/nv_2mmd.json";
// import nv_3mmd from "../datafiles/nv_3mmd.json";
// import nv_4mmd from "../datafiles/nv_4mmd.json";
import { Flex, Heading, Tooltip, Image } from "@chakra-ui/react";
import nv_race_data from "../datafiles/nv_race_chloro_data.json";

export default function Colorado() {
  const [nv_smd, set_nv_smd] = React.useState([]);
  const [nv_2mmd, set_nv_2mmd] = React.useState([]);
  const [nv_3mmd, set_nv_3mmd] = React.useState([]);
  const [nv_4mmd, set_nv_4mmd] = React.useState([]);

=======
// import state_smd_local from "../datafiles/nv_smd.json";
// import state_smd_local from "../datafiles/NEVSMDFAIR.json";
import nv_4mmd from "../datafiles/nv_4mmd.json";
import { Flex, Heading, Tooltip, Image } from "@chakra-ui/react";
import nv_race_data from "../datafiles/nv_race_chloro_data.json";

import nv_race_by_district from "../datafiles/myJson.json"
import race_stats from "../datafiles/nv_race_chloro_data2_precinct.json"
import TabPlanSummary from "./TabPlanSummary";

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
>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba
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

<<<<<<< HEAD
  const [geoJsonData, setGeoJsonData] = React.useState(nv_smd);
  const [geoJsonStyle, setGeoJsonStyle] = React.useState(() =>
    getGeoJsonStyle(nv_smd)
  );
=======
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

>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba

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

  useEffect(() => {
  
    const fetchDistrictsData = async () => {


<<<<<<< HEAD
      try {
        const response = await axios.get(
          "http://localhost:8080/nevada/districts/all"
        );
        console.log("Fetched data:", response.data);
        
        set_nv_smd(response.data[0]);
        set_nv_4mmd(response.data[1]);
        set_nv_3mmd(response.data[2]);
        set_nv_2mmd(response.data[3]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDistrictsData();
  }, []);

=======


  

  const [selectedBoxes, setSelectedBoxes] = useState([false, false, false, false]);

  const handleBoxClick = (index) => {
    const updatedBoxes = [...selectedBoxes];
    updatedBoxes[index] = !updatedBoxes[index];
    setSelectedBoxes(updatedBoxes);
    console.log(`Box ${index + 1} clicked`);
  };
>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba

  return (
    <>
      <Box position="relative" mb={5} p={10}>
        <Divider />
        <AbsoluteCenter bg="white" px={4}>
          <Heading textAlign="center" flex="1">
            Nevada
          </Heading>
        </AbsoluteCenter>
      </Box>

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
                <GeoJSON
                  data={nv_race_by_district}
                  style={styleFeature}
                />
              </MapContainer>
            </div>

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

              <Tooltip label="This would be the official prescription of the FRA.">
                <button
                  onClick={() => handleButtonClick(nv_4mmd)}
                  style={styles.button}
                >
                  MMD, 4 Reps. (FRA official)
                </button>
              </Tooltip>
            </div>
          </div>

<<<<<<< HEAD
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
              <br />
              <b>Selected District:</b>
              <p id="selected-district">
                <i>None</i>
              </p>
            </div>
=======
          <Tabs mx={0} my={0}>
            <TabList>
              <Tab key={1}>Demographics</Tab>
              <Tab key={2}>Plan Summary</Tab>
              {/* <Tab key={2}>County Explorer</Tab> */}
              <Tab key={3}>State</Tab>
              <Tab key={3}>SMD vs. MMD</Tab>
              <Tab key={3}>Vote Share</Tab>
            </TabList>
            <TabPanels key={1}>
              <TabDemographics />

              <TabPlanSummary />

              {/* <TabPanel padding={0}>
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
>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba

            <div>
              <br />
              <b>Race Breakdown:</b>
            </div>

            <Box m="0 auto">
              <Bar
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>

            <div>
              <br />
              <b>Party Breakdown:</b>
            </div>

<<<<<<< HEAD
            <Box m="0 auto">
              <Bar
                data={partyData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>
          </div>
=======
                  <Box m="0 auto">
                    <Bar
                      data={partyData}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
                  </Box>
                </div>
              </TabPanel> */}

              <TabStatePlans />

              <TabPanel padding={0}>
                <div style={styles.controlsContainer}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid black", padding: "8px", width: "20%" }}></th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>SMD</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>MMD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Rep/Dem Split</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>60:40</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>65:35</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Opp Reps</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>1</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>2</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>...</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>...</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>

              <TabPanel padding={0}>
                <div style={styles.controlsContainer}>
                  <h1>Lorem Ipsum</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                  <Center><img src="/Nevada_SMD_box_and_whisker_plot.png" /></Center>
                </div>

              </TabPanel>
            </TabPanels>
          </Tabs>
>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba
        </div>
      </Container>

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

      <Tabs variant="enclosed" mx={15} my={5}>
        <TabList>
          <Tab>SMD (current state)</Tab>
          <Tab>MMD, 2 Reps.</Tab>
          <Tab>MMD, 3 Reps.</Tab>
          <Tab>MMD, 4 Reps. (FRA Official)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Center>
              <Image
                src="/Nevada_SMD_box_and_whisker_plot.png"
                alt="Example Image"
                objectFit="cover"
                border="1px solid black"
              />
            </Center>
          </TabPanel>
          <TabPanel>
            <Image
              src="/plot.png"
              alt="Example Image"
              objectFit="cover"
              border="1px solid black"
            />
          </TabPanel>
          <TabPanel>
            <Image
              src="/plot.png"
              alt="Example Image"
              objectFit="cover"
              border="1px solid black"
            />
          </TabPanel>
          <TabPanel>
            <Image
              src="/plot.png"
              alt="Example Image"
              objectFit="cover"
              border="1px solid black"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Heading as="h4" size="md" mx={15} my={5}>
        Pie Charts for MMD Scenarios
      </Heading>
      <Text mx={15} my={5}>
        Although political party is not the ideal metric for representation, it
        is certainly one metric. These pie charts illustrate the party win
        breakdown of various SMD/MMD plans.
      </Text>
      <Flex justify="center" align="center" mx={15} my={5}>
        <Image
          src="/Nevada_MMD_2_pie_chart.png"
          alt="MMD 2 Reps Pie Chart"
          objectFit="cover"
          boxSize="500px"
        />
        <Image
          src="/Nevada_MMD_3_pie_chart.png"
          alt="MMD 3 Reps Pie Chart"
          objectFit="cover"
          boxSize="500px"
        />
        <Image
          src="/Nevada_MMD_4_pie_chart.png"
          alt="MMD 4 Reps Pie Chart"
          objectFit="cover"
          boxSize="500px"
        />
      </Flex>

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

<<<<<<< HEAD
      <Box mx={14} my={7}>
        <Heading>The Fair Representation Act</Heading>
        <Text>What exactly does the FRA propose?</Text>
        <UnorderedList mx={5} my={7}>
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
=======
      <MoreAbout />
      {/* <div>
                      {error && <p>Error: {error.message}</p>}
                      {data ? (
                        <pre>{JSON.stringify(data, null, 2)}</pre> // Display JSON data in a formatted way
                      ) : (
                        <p>Loading...</p>
                      )}
                      </div> */}
>>>>>>> 735197f69e027a4deacc708dd68bf32f3cb5a0ba
    </>
  );
}
