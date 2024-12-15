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
import FRAResult from '../components/FRAresults';
// 
// import FRAResults from './FRAresults'

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
          <div style={{ display: 'grid', gap: '6px' }}>
            {/* {Object.entries(summary_stats).map(([key, value]) => (
              <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                <h2>{key}:</h2>
                <span>{value}</span>
              </div>
            ))} */}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
              <h2>SMD or MMD:</h2>
              <span>{summary_stats.electionType}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
              <h2>Type of Interesting Plan:</h2>
              <span>{summary_stats.characteristic}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
              <h2>Number of Districts:</h2>
              <span>{summary_stats.noOfDistricts}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
              <h2>Number of Opportunity Districts:</h2>
              <span>{summary_stats.oppDistricts}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
              <h2>Number of Safe Districts:</h2>
              <span>{summary_stats.safeDistricts}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
              <h2>Democratic/Republican Party Split:</h2>
              <span id="partysplit"></span>
            </div>





          </div>
        }

        <br />
        <hr />

        {/* Seat/Vote share chart */}

        <FRAResult fips={props.state} characteristic="FAIR"></FRAResult> 

      </div>

    </TabPanel>
  );
};

export default TabPlanSummary;


const PlotCarousel = (props) => {
  const [comparisonBasis, setComparisonBasis] = React.useState("hispanic");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const super_props = props.super_props;

  const plots = [

      <PlotComparison
          plot1={
              <OpportunityRepresentativesPlot fips={super_props.state} electionType={"MMD"} width={400} height={600} fontSize={9} />
          }
          plot2={
              <OpportunityRepresentativesPlot fips={super_props.state} electionType={"SMD"} width={400} height={600} fontSize={9} />
          }
      />,

      <PlotComparison
          plot1={
              <OpportunityDistrictsPlot fips={"NV"} electionType={"MMD"} width={400} height={600} fontSize={9} />
          }
          plot2={
              <OpportunityDistrictsPlot electionType={"SMD"} width={400} height={600} fontSize={9} />
          }
      />,

      <PlotComparison
          plot1={
              <PartySplitBarPlot fips={"NV"} electionType={"MMD"} width={400} height={600} fontSize={9} />
          }
          plot2={
              <PartySplitBarPlot electionType={"SMD"} width={400} height={600} fontSize={9} />
          }
      />,

      

      <>

          <Center>
          <label style={{ marginBottom: "-5px" }}>
              Select Comparison Basis:
              <select
                  value={comparisonBasis}
                  onChange={(e) => setComparisonBasis(e.target.value)}
                  style={{ marginLeft: "10px", padding: "5px" }}
              >
                  <option value="hispanic">Hispanic</option>
                  <option value="black">Black</option>
                  <option value="asian">Asian</option>
                  <option value="white">White</option>
              </select>
          </label>
          </Center>

          <PlotComparison
              plot1={
                  <SMDBoxAndWhiskerPlot comparisonBasis={comparisonBasis} setComparisonBasis={setComparisonBasis} fips={"NV"} electionType={"MMD"} width={500} height={600} fontSize={9} />
              }
              plot2={
                  <SMDBoxAndWhiskerPlot comparisonBasis={comparisonBasis} setComparisonBasis={setComparisonBasis} fips={"NV"} electionType={"SMD"} width={500} height={600} fontSize={9} />
              }
          /></>,

      // <SMDBoxAndWhiskerPlot fips={super_props.state} characteristic={super_props.characteristic} electionType={super_props.electionType} />

      // <OnTop />,

  ];

  const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + plots.length) % plots.length);
  };

  const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % plots.length);
  };

  return (
      <div>
          {plots[currentIndex]}
          < div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Button onClick={handlePrev}>Previous</Button>

              <Button onClick={handleNext}>Next</Button>
          </div>

      </div>
  );
};
