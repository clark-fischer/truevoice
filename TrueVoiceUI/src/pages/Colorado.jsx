import React from "react";

import {
  Box,
  Container,
  Divider,
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

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

import { useLocation } from "react-router-dom";

// data -- start
import "leaflet/dist/leaflet.css";
import state_smd_local from "../datafiles/nv_smd.json";
import col_smd_local from "../datafiles/co_cong_2021.json";
import nv_4mmd from "../datafiles/nv_4mmd.json";
import { Tooltip } from "@chakra-ui/react";
import nv_race_data from "../datafiles/nv_race_chloro_data.json";

import StateMap from "../components/StateMap";

const heatmapGradient = {
  white: { 0.1: "yellow", 1: "orange" },
  black: { 0.1: "pink", 1: "purple" },
  asian: { 0.1: "cyan", 1: "blue" },
  hispanic: { 0.1: "lime", 1: "green" },
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "2.3fr 1fr", // Two columns
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
    height: "10%", // Take up 10% of the container height
    background: "#ffffff",
  },
  button: {
    flexBasis: "50%", // Each button takes up about 22.5% of the width (to account for spacing)
    fontSize: "16px",
    textAlign: "center",
    border: "1px solid #f0f0f0",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  controlsContainer: {
    padding: "20px",
    width: "600px",
    // border: "1px solid red",
    boxSizing: "border-box",
  },
};

export default function State() {
  const selectedState =
    useLocation().pathname === "/nevada"
      ? "NV"
      : useLocation().pathname === "/colorado"
      ? "CO"
      : "None";
  const [state_smd, set_state_smd] = React.useState(
    selectedState === "NV" ? state_smd_local : col_smd_local
  );
  console.log(state_smd.features[0].properties.District);

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

  // const eachDistrict = (feature, layer) => {
  //   const districtNo = feature.properties.DISTRICTNO;
  //   layer.on("mouseover", function () {
  //     document.getElementById(
  //       "selected-district"
  //     ).innerText = `District ${districtNo}`;
  //     updateChartData(raceData, setRaceData);
  //     updateChartData(partyData, setPartyData);
  //   });
  // };

  const eachDistrict = (feature, layer) => {
    const districtNo =
      selectedState === "NV"
        ? feature.properties.DISTRICTNO
        : feature.properties.CD116FP;
    layer.on("mouseover", function () {
      document.getElementById(
        "selected-district"
      ).innerText = `District ${districtNo}`;
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

  const colorado_districts = {
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
    5: {
      color: "blue",
      fillColor: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    },
    6: {
      color: "red",
      fillColor: "red",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4,
    },
    7: {
      color: "blue",
      fillColor: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.3,
    },
    8: {
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

  // const getGeoJsonStyle = (data) => {
  //   if (data === state_smd) {
  //     return (feature) => nevada_districts[feature.properties.DISTRICTNO];
  //   } else if (data === nv_4mmd) {
  //     return () => ({
  //       color: "purple",
  //       fillColor: "purple",
  //       weight: 1,
  //       opacity: 1,
  //       fillOpacity: 0.7,
  //     });
  //   }
  //   return () => ({
  //     color: "gray",
  //     fillColor: "gray",
  //     weight: 1,
  //     opacity: 1,
  //     fillOpacity: 0.5,
  //   });
  // };

  const getGeoJsonStyle = (data) => {
    if (selectedState === "NV") {
      return (feature) => nevada_districts[feature.properties.DISTRICTNO];
    } else if (selectedState === "CO") {
      return (feature) => colorado_districts[feature.properties.District];
    } else {
      return () => ({
        color: "gray",
        fillColor: "gray",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5,
      });
    }
  };

  const [geoJsonData, setGeoJsonData] = React.useState(state_smd);
  const [geoJsonStyle, setGeoJsonStyle] = React.useState(() =>
    getGeoJsonStyle(state_smd)
  );

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
      <Divider my={2} />

      <Container centerContent minWidth="100%" p={0} m={0}>
        <div style={styles.gridContainer}>
          <div style={styles.mapWrapper}>
            <div style={styles.mapContainer}>
              <StateMap state={selectedState}></StateMap>
            </div>

            <div style={styles.buttonRow}>{renderDistrictButtons()}</div>
          </div>

          <Tabs mx={0} my={0}>
            <TabList>
              <Tab key={1}>Heatmap Explorer</Tab>
              <Tab key={2}>District Explorer</Tab>
              <Tab key={3}>Plot Explorer</Tab>
              <Tab key={4}>Random Plan Explorer</Tab>
            </TabList>
            <TabPanels>
              <TabPanel key={1} padding={0}>
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

              <TabPanel key={2} padding={0}>
                <div style={styles.controlsContainer}>
                  <div>
                    <b>Selected District:</b>
                    <p id="selected-district">
                      <i>None</i>
                    </p>
                    <b>Current Rep:</b>
                    <p id="selected-district">
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

              <TabPanel key={3} padding={0}>
                <div style={styles.controlsContainer}></div>
              </TabPanel>

              <TabPanel key={4} padding={0}>
                <div style={styles.controlsContainer}>hi</div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
