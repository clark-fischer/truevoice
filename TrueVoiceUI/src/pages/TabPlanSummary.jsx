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

import VoteShareSeatSharePlot from '../graphs/VoteSeatSharePlotPlanSpecific'

const TabPlanSummary = (props) => {

  let summary_stats = [];

  if (props.planData != null) {
    summary_stats = props.planData;
    delete summary_stats["fips"]
    delete summary_stats["name"]
  }

  const styles = {
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
    legend: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "5px",
    }
  };

  return (
    <TabPanel padding={0}>
      <div style={styles.controlsContainer}>
        <legend style={styles.legend}> Plan Summary </legend>

        {/* Display boxes */}
        {
          <div style={{ display: 'grid', gap: '10px' }}>
            {Object.entries(summary_stats).map(([key, value]) => (
              <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                <h2>{key}:</h2>
                <span>{value}</span>
              </div>
            ))}
          </div>
        }

        <br />
        <hr />

        {/* Seat/Vote share chart */}
        
<VoteShareSeatSharePlot />

      </div>

    </TabPanel>
  );
};

export default TabPlanSummary;