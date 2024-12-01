import React from 'react';

import {
    // Box,
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

                <Center><img src="/Nevada_SMD_box_and_whisker_plot.png" /></Center>
                


              </TabPanel>
    );
};

export default TabPlanSummary;