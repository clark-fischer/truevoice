/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';

import {
  Box,
  Container,
  Text,
  Heading,
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

const Demographics = (props) => {


  let races = props.races;
  // let setRaces = props.setRaces;

  // const changeRaceMap = () => {
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  //   checkboxes.forEach((checkbox, i) => {
  //     if (["race--white", "race--black", "race--asian", "race--hispanic"].includes(checkbox.id)) {
  //       checkbox.addEventListener('change', (event) => {
  //     if (event.target.checked) {
  //       races[i]["checked"] = 1
  //     } else {
  //       races[i]["checked"] = 0;
  //     }
  //       });
  //     }
  //   });

  //   console.log(races);

  //   setRaces(races);
  // }



  // const renderRaceCheckboxes = ;


  return (
    <TabPanel padding={0}>

      {/* <div style={{ margin: "20px" }}>


      </div> */}
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

        {/* mapping the checkboxes */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flexBasis: "30%" }}>
            <Box
              key={1}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={5}
              
              style={{
                cursor: "pointer",
                boxShadow: "0 0 10px 2px lightgreen",
                transition: "box-shadow 0.3s",
              }}
            >
              <Heading size="sd">{"District"}</Heading>
              <Center>
                <img
                  src={"/district.png"}
                  style={{ width: "80px" }}
                  alt={"District"}
                />
              </Center>
            </Box>
          </div>
          <div style={{ flexBasis: "30%" }}>
          <Box
              key={1}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={5}
              
              style={{
                cursor: "pointer",
                boxShadow: "0 0 10px 2px lightgreen",
                transition: "box-shadow 0.3s",
              }}
            >
              <Heading size="sd">{"Precinct"}</Heading>
              <Center>
                <img
                  src={"/precinct.png"}
                  style={{ width: "80px" }}
                  alt={"District"}
                />
              </Center>
            </Box>
          </div>
          <div style={{ flexBasis: "30%" }}>
            {
              races.map((race, i) => (
                <div key={race.id}>
                  <input id={race.id} type="checkbox" onChange={() => props.toggle_map(i)} />
                  <label htmlFor={race.id} style={{ paddingLeft: "5px" }}>
                    {race.label}
                  </label>
                  <br />
                </div>
              ))
            }
          </div>
        </div>

        <br></br>
        <hr></hr>
        <div style={{ margin: "10px", border: "10 solid grey" }}>
          <div style={{ padding: "10px", background: "lightgrey", width: "100px", borderRadius: "5px" }}>

            <Text id="selected-district" fontSize="lg" >
              District: 1
            </Text>

          </div>
          <br />


          <div style={{ marginLeft: "10px", display: "flex", gap: "90px" }}>
            <div >
              <Text fontWeight="bold" fontSize="lg">Demographics</Text>
              <Text fontSize="lg">White: <span id="race--white2"></span></Text>
              <Text fontSize="lg">Black: <span id="race--black2"></span></Text>
              <Text fontSize="lg">Asian: <span id="race--asian2"></span></Text>
              <Text fontSize="lg">Hispanic: <span id="race--hispanic2"></span></Text>
              <Text fontSize="lg">Other: <span id="race--other2"></span></Text>
            </div>
            <div style={{ borderLeft: "solid 1px white" }}>
              <Text fontWeight="bold" fontSize="lg" >Elected Reps</Text>
              <Text style={{ color: "blue" }} fontSize="lg" >Dina Titus</Text>
              <Text style={{ color: "red" }} fontSize="lg" >Anot Rep</Text>
              <Text style={{ color: "blue" }} fontSize="lg" >Ran Dom</Text>
              <Text style={{ color: "red" }} fontSize="lg" >Rep Five</Text>
              <Text style={{ color: "red" }} fontSize="lg" >Dom Ran</Text>
            </div>
          </div>

          <br />
          <br />
          <Text fontSize="lg" >
            Estimated Vote Split (D/R): 0.5
          </Text>
        </div>
      </div>
    </TabPanel>
  );
};

export default Demographics;