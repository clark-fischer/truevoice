/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBySideImages from './SideBySideImages';
import VoteSeatSharePlotPlanSpecific from '../graphs/VoteSeatSharePlotPlanSpecific';
import FINAL_NAMES from "../datafiles/FINAL_NAMES.json"
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

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";

// data -- start
import "leaflet/dist/leaflet.css";
// import co_4mmd from "../datafiles/co_4mmd.json";

// import co_district_map from "../datafiles/co_smd.json"
// import co_precinct_map from "../datafiles/co_precinct.json"
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

// import co_mmd_summary from "../datafiles/ensemble_summary/co_mmd_summary_data_plan_specific.json"
import mmd_summary from "../datafiles/ensemble_summary/co_mmd_summary_data_plan_specific.json"

// import co_smd_summary from "../datafiles/ensemble_summary/co_smd_summary_data_plan_specific.json"
import smd_summary from "../datafiles/ensemble_summary/co_smd_summary_data_plan_specific.json"


export default function State() {

  const state = "CO";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planResp = await axios.get("http://localhost:8080/CO/SMD/ENACTED");

        setGeoJsonData(planResp.data);
        setPlanData(planResp.data.crs.properties);

        const raceResp = await axios.get("http://localhost:8080/CO/PRECINCT/HEATMAP");
        setP_r_stats(raceResp.data.precincts)

        const race2Resp = await axios.get("http://localhost:8080/CO/SMD/HEATMAP");
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

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function roundToDecimalPlaces(num, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }

  const [p_r_stats, setP_r_stats] = React.useState(null);
  const [d_r_stats, setD_r_stats] = React.useState(null);
  const eachDistrict = (feature, layer) => {
    const { districtno, demographics } = feature.properties; // Destructure for cleaner code
    // console.log(feature  .properties);  

    function formatNumberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function roundToDecimalPlaces(num, decimalPlaces) {
      const factor = Math.pow(10, decimalPlaces);
      return Math.round(num * factor) / factor;
    }

    console.log(roundToDecimalPlaces(1.23456, 2)); // Outputs: 1.23
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
        try {
          document.getElementById(id).innerText = `${formatNumberWithCommas(demographics[key] || 0)}`;
        } catch {
          console.log("error");
        }
        // 
      }



      let sum_data = (electionType === "SMD") ? smd_summary : mmd_summary;
      const result = sum_data.interesting_plans_summary.find(item => item.characteristic === characteristic).districts_summary.find(item => item.districtId === districtno);



      for (const [key, value] of Object.entries(result)) {
        const element = document.getElementById(key);
        if (element) {
          element.innerText = "failure";
        }
      }

      // "districtId": 1,
      //               "democratsPercentage": 0.5367958419322786,
      //               "republicanPercentage": 0.4632041580677214,
      //               "totalRepresentatives": 3,
      //               "totalPopulation": 1842069,
      //               "opportunityThreshold": 0.3333333333333333,
      //               "isOpportunityDistrict": false,


      // document.getElementById("democratsPercentage").innerText = `${roundToDecimalPlaces(result.democratsPercentage, 2)}/${roundToDecimalPlaces(result.republicanPercentage, 2)}`;


      document.getElementById("totalRepresentatives").innerText = `${result.totalRepresentatives}`;
      document.getElementById("totalPopulation").innerText = `${formatNumberWithCommas(result.totalPopulation)}`;
      document.getElementById("opportunityThreshold").innerText = `${roundToDecimalPlaces(result.opportunityThreshold, 2)}`;
      document.getElementById("isOpportunityDistrict").innerText = result.isOpportunityDistrict ? "Yes" : "No";

      const f = geoJsonData.features.find(obj => obj.properties.districtno === districtno);

      if (electionType == "SMD") {
        document.getElementById("hello").style.display = "block"
        document.getElementById("lostBy").style.display = "block"
        let final_d = FINAL_NAMES.interesting_plans_summary.find(obj => obj.characteristic === characteristic).districts_summary.find(obj => obj.districtId === districtno);

        const winner = final_d.partyWinner === "DEMOCRAT" ? "(D)" : "(R)";
        const los = final_d.partyWinner === "DEMOCRAT" ? "(R)": "(D)" ;
        const by_how_much = (f.properties.demRatio) * (result.totalPopulation);

        document.getElementById("wonBy").innerText = `${final_d.winner_name} ${winner} \n by ${formatNumberWithCommas(Math.floor(final_d.winnerVote))} votes `;

        document.getElementById("lostBy").innerText = `${final_d.loser_name} ${los} \n by ${formatNumberWithCommas(Math.floor(final_d.loserVote))} votes `;

        

      } if (electionType == "MMD") {
        document.getElementById("hello").style.display = "none"
        document.getElementById("lostBy").style.display = "none"

        const formattedData = Object.entries(f.properties.electionResult)
        .map(([key, value]) => {
          const party = key.startsWith("D") ? "Democratic" : "Republican";
          return `${party}: ${formatNumberWithCommas(value)}`;
        })
        .join("\n");
        document.getElementById("wonBy").innerText = formattedData

        // .properties.electionResult = result.partyWinner;
      }

      // document.getElementById("pert_stats").innerText = 
    };

    // Attach event handler
    layer.on("mouseover", updateInfo);
  };

  const [raceStats, setRaceStats2] = React.useState(null);
  const [geoJsonData, setGeoJsonData2] = React.useState(null);
  const [characteristic, setCharacteristic] = React.useState(null);
  const [electionType, setElectionType] = React.useState(null);
  const [raceMap, setRaceMap2] = React.useState(null);
  const [planData, setPlanData2] = React.useState(null);

  const setRaceStats = (data) => {
    function addOtherColumn(data) {
      const districts = data;

      for (const districtId in districts) {
        const district = districts[districtId];
        let other = 1 - (district.white + district.black + district.asian + district.hispanic);
        other = other == 1 ? 0 : other
        district.other = other;
      }

      return data;
    }

    setRaceStats2(addOtherColumn(data));
  }

  const setPlanData = (data) => {

    // let sum_data = (data.electionType === "SMD") ? smd_summary : mmd_summary;
    // const split = sum_data.interesting_plans_summary.find(item => item.characteristic === data.characteristic).districts_summary.filter(obj => obj.partyWinner === "REPUBLICAN").length;
    // const split2 = sum_data.interesting_plans_summary.find(item => item.characteristic === data.characteristic).districts_summary.filter(obj => obj.partyWinner === "DEMOCRAT").length;
    // document.getElementById("partysplit").innerText = `${split2} and  ${split}`;


    



    setPlanData2(data);
  }

  const setGeoJsonData = (data) => {
    setGeoJsonData2(data);



    setElectionType(data.crs.properties.electionType);
    setCharacteristic(data.crs.properties.characteristic);


    let demsWon = 0;
    if (data.crs.properties.electionType === "SMD") {
      demsWon = data.features.reduce(
        (count, feature) => count + (feature.properties.demRatio > 0.5 ? 1 : 0),
        0
      );
    } else {

      for(let i = 0; i < data.features.length; i++) {
        const f = data.features[i];
        console.log(f)
        for (let j = 0; j < Object.keys(f.properties.electionResult).length; j++) {
          console.log(Object.keys(f.properties.electionResult));
          if (Object.keys(f.properties.electionResult)[j].startsWith("D")) {
            demsWon++;
          }
        }
      
        
      }
    }

    const split = data.crs.properties.fips == "NV" ? 4 : 8;
    
    document.getElementById("partysplit").innerText = `${demsWon} and  ${split - demsWon}`;
  }

  const setRaceMap = (data, p_or_d) => {
    const nextRaces = raceCheckBoxes.map((c, i) => {

      const copy = { ...c };
      copy.checked = 0;


      return copy;
    });

    const radios2 = document.getElementsByName("racebtns");
    radios2.forEach(radio => radio.disabled = false);

    setRaceCheckBoxes(nextRaces);

    const radios = document.getElementsByName("racebtns");
    radios.forEach(radio => radio.checked = false);

    setRaceMap2(data);

    // setMaxValue(findMaxPercentage(raceStats, raceCheckBoxes[i]["label"]));
    
    if (!p_or_d) {
      setRaceStats(p_r_stats);
    } else {
      setRaceStats(d_r_stats);
    }

  }

  function findMaxPercentage(data, race) {
    const districts = data;
    let maxBlackPercentage = 0;

    console.log("max percentage", districts);
  
    for (const district in districts) {
      if (districts[district][race] > maxBlackPercentage) {
        maxBlackPercentage = districts[district][race];
      }
    }
  
    return (maxBlackPercentage * 100).toFixed(1)
  }

  const setMax = (label) => {
    setMaxValue(findMaxPercentage(raceStats, label));
  }
  

  function scaleValue(value, max) {
    return (value / max) * 80;
}

   function buildHeatmap(i) {
    // setMaxValue(100)

    return (feature) => {

      // if (raceStats.length > 100) {
      const tractId = feature.properties.GEOID; // assuming GEOID links to your data  
      // }



      const data = raceStats[tractId];
      let maxValue = findMaxPercentage(raceStats, raceCheckBoxes[i].label)
      let percentage = data[raceCheckBoxes[i]["label"]];
      percentage = scaleValue(percentage, maxValue)
      

      return {
        color: raceCheckBoxes[i]['hex'],
        weight: 1,
        fillOpacity: percentage,


      };
    };

  }

  const buildStyle = (feature) => {
    return {
      color: "black",
      weight: 2,
      fillOpacity: 0,


    };
  }

  const GradientLegend = ({index , color }) => {
    const map = useMap();

    let maxValue = findMaxPercentage(raceStats, raceCheckBoxes[index].label)

    useEffect(() => {
      const legend = L.control({ position: "bottomright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.style.background = `linear-gradient(to right, white, ${color})`;
        div.style.width = "200px";
        div.style.height = "20px";
        div.style.border = "1px solid #ccc";
        div.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 12px;">
            <span>0</span><span>${maxValue}% of total pop.</span>
          </div>
        `;
        return div;
      };

      legend.addTo(map);

      return () => map.removeControl(legend); // Cleanup on component unmount
    }, [map, maxValue, color]);

    return null;
  };

  const renderDistrictButtons = () => {
    const districtMaps = [
      {
        label: "SMD Mode",
        path: "http://localhost:8080/CO/SMD/ENACTED",
        tooltip: "These are Nevada's districts, as of 2024.",
        planOptions: plan_options_smd,
      },
      {
        label: "MMD Mode",
        path: "http://localhost:8080/CO/MMD/AVERAGE",
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
        button.style.backgroundColor = "white";
      });

      // Highlight the selected button
      const selectedButton = document.getElementById(`district-button${index}`);
      selectedButton.style.color = "black";
      selectedButton.style.fontWeight = "bold";
      selectedButton.style.backgroundColor = "lightgreen";

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

        // const smd_title = map.title !== undefined ? "(" +  +map.title ")" : " (Enacted)";
        // document.getElementById("district-button0").innerHTML = "SMD" + smd_title;
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

  const CustomLegend = ({ text }) => {
    const map = useMap();
  
    useEffect(() => {
      const legend = L.control({ position: "bottomleft" }); // Change position to bottomleft
  
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "custom-legend");
        div.innerHTML = `
          <div style="display: flex; align-items: center; font-size: 14px; padding: 5px; background: white; border: 1px solid #ccc; border-radius: 4px;">
            <span>Displaying ${text} Plan</span>
          </div>
        `;
        return div;
      };
  
      legend.addTo(map);
  
      return () => map.removeControl(legend); // Cleanup on unmount
    }, [map, text]);
  
    return null;
  };
  


  const plan_options_smd = [
    {
      title: "Enacted",
      image: "/dem_co.png",
      path: "http://localhost:8080/CO/SMD/ENACTED"
    },
    {
      title: "Democratic Favored",
      image: "/dem_co.png",
      path: "http://localhost:8080/CO/SMD/DEMFAVORED"
    },
    {
      title: "Republican Favored",
      image: "/rep_co.png",
      path: "http://localhost:8080/CO/SMD/REPFAVORED"
    },
    {
      title: "Average",
      image: "/dem_co.png",
      path: "http://localhost:8080/CO/SMD/AVERAGE"
    },
    {
      title: "Fair",
      image: "/dem_co.png",
      path: "http://localhost:8080/CO/SMD/FAIR"
    },
    {
      title: "Hide",
      image: "/hide.png",
      path: "http://localhost:8080/CO/SMD/NULL"
    },
  ]

  const plan_options_mmd = [
    {
      title: "Average",
      image: "/dem_co.png",
      path: "http://localhost:8080/CO/MMD/AVERAGE",
    },

    {
      title: "Fair",
      image: "/dem_co.png",
      path: "http://localhost:8080/CO/MMD/FAIR",
    },

    {
      title: "Democratic Favored",
      image: "/dem_co.png",
      path: "http://localhost:8080/CO/MMD/DEMFAVORED",
    },

    {
      title: "Republican Favored",
      image: "/rep_co.png",
      path: "http://localhost:8080/CO/MMD/REPFAVORED",
    },
    {
      title: "Hide",
      image: "/hide.png",
      path: "http://localhost:8080/CO/SMD/NULL"
    },
  ]

  const [plan_options, set_plan_options] = useState(plan_options_smd);

  const [raceCheckBoxes, setRaceCheckBoxes] = useState([
    { id: "race--white", label: "white", hex: 'indigo', checked: 0 },
    { id: "race--black", label: "black", hex: 'teal', checked: 0 },
    { id: "race--asian", label: "asian", hex: 'green', checked: 0 },
    { id: "race--hispanic", label: "hispanic", hex: 'orange', checked: 0 },
    { id: "race--other", label: "other", hex: 'brown', checked: 0 },
  ]);

   const [overlaySelectedBoxes, setOverlaySelectedBoxes] = useState([false, false, false, false]);
    const [maps, setMaps] = useState({});
  
    const urls = [
      `http://localhost:8080/${state}/${electionType}/DEMFAVORED`,
     `http://localhost:8080/${state}/${electionType}/REPFAVORED`,
      `http://localhost:8080/${state}/${electionType}/AVERAGE`,
      `http://localhost:8080/${state}/${electionType}/FAIR`,
    ];
  
    const line_colors = {
      DEMFAVORED: { color: 'blue', dashArray: '4 4', weight: 2, fillOpacity: 0 },
      REPFAVORED: { color: 'red', dashArray: '4 4', weight: 2, fillOpacity: 0 },
      AVERAGE: { color: 'green', dashArray: '', weight: 2, fillOpacity: 0 },
      FAIR: { color: 'purple', dashArray: '', weight: 2, fillOpacity: 0 }
  
    };
  
    useEffect(() => {
      overlaySelectedBoxes.forEach((isSelected, index) => {
        if (isSelected && !maps[index]) {
          fetch(urls[index])
            .then((response) => response.json())
            .then((data) => {
              setMaps((prevMaps) => ({ ...prevMaps, [index]: data }));
            })
            .catch((error) => console.error(`Error fetching GeoJSON for index ${index}:`, error));
        }
      });
    }, [overlaySelectedBoxes, maps]);
    
  
    // for (let i = 0; i < 4; i++) {
    //   const overlay = overlaySelectedBoxes[i];
    //   if (overlay) {
  
    //   }
    // }


  const rm = (json) => JSON.stringify(json, (key, value) => {
    return key === "districts_summary" ? undefined : value;
  });

  // smd_summary.interesting_plans_summary["totalPopulation"] = formatNumberWithCommas(smd_summary.interesting_plans_summary["totalPopulation"]);
  // smd_summary.interesting_plans_summary["totalPopulation"] = formatNumberWithCommas(smd_summary.interesting_plans_summary["totalPopulation"]);
  // fixl ater

  let smd_enacted = smd_summary.interesting_plans_summary.find((item) => item.characteristic == "ENACTED");
  smd_enacted["totalPopulation"] = formatNumberWithCommas(smd_enacted["totalPopulation"]);

  let mmd_average = mmd_summary.interesting_plans_summary.find((item) => item.characteristic == "AVERAGE");
  mmd_average["totalPopulation"] = formatNumberWithCommas(mmd_average["totalPopulation"]);

  let smd_compr = rm(smd_enacted).toString()
  let mmd_compr = rm(mmd_average).toString()


  const toggle_map = (index) => {
    const nextRaces = raceCheckBoxes.map((c, i) => {

      const copy = { ...c };

      if (i === index) {
        // Increment the clicked counter
        copy.checked = 1;
      } else {
        // Reset all other counters
        copy.checked = 0;
      }

      return copy;
    });


    setRaceCheckBoxes(nextRaces);
  }

  const [maxValue, setMaxValue] = useState(0);



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
                center={[38.576019, -105.7821]}
                zoom={6}
                style={{ height: "100%", width: "100%", color: "black" }}
                // onEachFeature={stylizeMap}
                zoomControl={true}

              >
                <TileLayer
                  attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />

                <GeoJSON
                  data={geoJsonData}
                  onEachFeature={eachDistrict}
                  style={buildStyle}
                />



                {
                  raceCheckBoxes.map((race, race_index) => {

                    return race["checked"] ?
                      <>
                      
                        <GradientLegend index={race_index} color={race["hex"]} />
                        <GeoJSON
                          data={raceMap}
                          style={buildHeatmap(race_index)}
                          key={race_index * 10 + race["checked"]}
                        // onEachFeature={eachDistrict}
                        /> </> : <></>
                  })
                }

                <CustomLegend text={characteristic} />

                {Object.entries(maps).map(([index, geoJson]) => {
                          const type = urls[index].split('/').pop(); // Get the type from the URL
                          return (
                            overlaySelectedBoxes[index] && (
                              <GeoJSON key={index} data={geoJson} style={line_colors[type]} />
                            )
                          );
                        })}


              </MapContainer>
            </div>

            <div style={styles.buttonRow}>{renderDistrictButtons()}</div>
          </div>

          {/* Map ends; Tabs begin */}
          <Tabs mx={0} my={0}>

            <TabList>
              <Tab key={1}>Demographics</Tab>
              <Tab key={4}>Vote Seat Share</Tab>
              <Tab key={2}>Plan Summary</Tab>
              <Tab key={3}>Select Plan</Tab>
              <Tab key={5}>SMD vs. MMD</Tab>
            </TabList>

            <TabPanels key={1}>


              <Demographics setRaceMap={setRaceMap} state={state} raceCheckBoxes={raceCheckBoxes} setRaceCheckBoxes={setRaceCheckBoxes} toggle_map={toggle_map} />


              <TabPanel >
                {/* <br /> */}
                {/* <Center> */}
                {/* <ComparisonTable data1={smd_compr} data2={mmd_compr} /> */}
                {/* </Center> */}
                <br />
                <div style={{ margin: "10px" }}>
                  <VoteSeatSharePlotPlanSpecific fips={state} characteristic={characteristic} electionType={electionType} width={600}/>
                </div>

              </TabPanel >
              <TabPlanSummary planData={planData} state={state} characteristic={characteristic} electionType={electionType} />
              <TabStatePlans overlaySelectedBoxes={overlaySelectedBoxes} setOverlaySelectedBoxes={setOverlaySelectedBoxes} state={state} plan_options={plan_options} setGeoJsonData={setGeoJsonData} setPlanData={setPlanData} />

  
              <Ensemble state={state} characteristic={characteristic} electionType={electionType} />

            </TabPanels>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
