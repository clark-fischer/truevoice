import React from 'react';

import {
    // Box,
    Container,
    Text,
    UnorderedList,
    ListItem,
    // Center,
    Divider,
    Link,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
  } from "@chakra-ui/react";

const TabPlanSummary = () => {

    const summary_stats = {
        "Number of Districts": 4,
        "Safe Districts": 2,
        "Opportunity Districts": 2,
        "Opportunity District Thresholds": 0.5,
        "Election Types": "SMD"
      }

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
      
    return (
        <TabPanel padding={0}>
                <div style={styles.controlsContainer}>
                  
                <legend
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    Plan Summary
                  </legend>

                  {<div style={{ display: 'grid', gap: '10px' }}>
                    {Object.entries(summary_stats).map(([key, value]) => (
                      <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                        <h2>{key}:</h2>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>}


                </div>

                <hr />

                <div style={{ margin: "10px", border: "10 solid grey" }}>
                  <div style={{ padding: "10px", background: "lightgrey", width: "100px", borderRadius: "5px" }}>
                    
                    <Text fontSize="lg" >
                      District: 1
                    </Text>

                  </div>
                  <br />


                  <div style={{ marginLeft: "10px", display: "flex", gap: "90px" }}>
                    <div >
                      <Text fontWeight="bold" fontSize="lg">Demographics</Text>
                      <Text fontSize="lg">White: 50%</Text>
                      <Text fontSize="lg">Black: 30%</Text>
                      <Text fontSize="lg">Asian: 10%</Text>
                      <Text fontSize="lg">Hispanic: 10%</Text>
                      <Text fontSize="lg">Other: 0%</Text>
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


              </TabPanel>
    );
};

export default TabPlanSummary;