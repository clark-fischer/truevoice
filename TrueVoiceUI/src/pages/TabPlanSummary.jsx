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
      width: "800px",
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
              <h2>D/R Party Split:</h2>
              <span id="partysplit"></span>
            </div>





          </div>
        }

        <br />
        <hr />

        {/* Seat/Vote share chart */}
        {
          summary_stats.electionType === "MMD" ? <FRAResult fips={props.state} characteristic={props.characteristic}></FRAResult>  :<SMDRes fips={props.state}/>
        }
        

      </div>

    </TabPanel>
  );
};

export default TabPlanSummary;



const ComparisonTable = ({ data1, data2 }) => {
  data1 = JSON.parse(data1);
  data2 = JSON.parse(data2);

  const getAlignmentStyle = (value) => ({
    textAlign: typeof value === 'number' ? 'left' : 'left',
  });

  // formatNumberWithCommas

  return (
    <table border="1" style={{ borderCollapse: 'collapse', width: '85%', margin: '5px 5px' }}>
      <thead>
        <tr style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "5px",
        }}>
          <th style={{ textAlign: 'left' }} >Comparison</th>
          <th style={{ textAlign: 'left' }}>SMD</th>
          <th style={{ textAlign: 'left' }}>MMD</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data1).map((key) => (
          <tr key={key}>
            <td style={{ textAlign: 'left' }}>{key}</td>
            <td style={getAlignmentStyle(data1[key])}>{data1[key]}</td>
            <td style={getAlignmentStyle(data2[key])}>{data2[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// import React from 'react';

const SMDRes = ({fips}) => {

  return fips == "CO" ? <ColoradoDistrictResults />  :<NevadaDistrictResults/>
  
};


// import React from 'react';

const NevadaDistrictResults = () => {
  const data = [
    {
      district: 1,
      nominee1: { name: "Dina Titus", party: "D", votes: 167885, percentage: "51.99%" },
      nominee2: { name: "Mark Robertson", party: "R", votes: 143650, percentage: "44.49%" }
    },
    {
      district: 2,
      nominee1: { name: "Mark Amodei", party: "R", votes: 219919, percentage: "55.04%" },
      nominee2: { name: "Greg Kidd", party: "I", votes: 144064, percentage: "36.05%" }
    },
    {
      district: 3,
      nominee1: { name: "Susie Lee", party: "D", votes: 191304, percentage: "51.37%" },
      nominee2: { name: "Drew Johnson", party: "R", votes: 181084, percentage: "48.63%" }
    },
    {
      district: 4,
      nominee1: { name: "Steven Horsford", party: "D", votes: 174926, percentage: "52.7%" },
      nominee2: { name: "John Lee", party: "R", votes: 148061, percentage: "44.6%" }
    },
  ];

  return (
    <table 
      border="1" 
      cellPadding="10" 
      style={{ 
        borderCollapse: "collapse", 
        margin: "20px auto", 
        width: "105%", 
        textAlign: "left" 
      }}
    >
      <thead>
        <tr>
          <th>District</th>
          <th>Winner (Party)</th>
          <th>Votes</th>
          <th>%</th>
          <th>Loser (Party)</th>
          <th>Votes</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.district}>
            <td>{row.district}</td>
            <td>{`${row.nominee1.name} (${row.nominee1.party})`}</td>
            <td>{row.nominee1.votes.toLocaleString()}</td>
            <td>{row.nominee1.percentage}</td>
            <td>{`${row.nominee2.name} (${row.nominee2.party})`}</td>
            <td>{row.nominee2.votes.toLocaleString()}</td>
            <td>{row.nominee2.percentage}</td>
            {/* <td>{row.nominee2.percentage}</td>
            <td>{row.nominee2.percentage}</td> */}
            {/* <td>{row.nominee2.percentage}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


// export default NevadaDistrictResults;

const ColoradoDistrictResults = () => {
  const data = [
    {
      district: 1,
      nominee1: { name: "Diana DeGette", party: "D", votes: 226929, percentage: "80.3%" },
      nominee2: { name: "Jennifer Qualteri", party: "R", votes: 49529, percentage: "17.5%" }
    },
    {
      district: 2,
      nominee1: { name: "Joe Neguse", party: "D", votes: 244107, percentage: "70.0%" },
      nominee2: { name: "Marshall Dawson", party: "R", votes: 97770, percentage: "28.0%" }
    },
    {
      district: 3,
      nominee1: { name: "Lauren Boebert", party: "R", votes: 163832, percentage: "50.06%" },
      nominee2: { name: "Adam Frisch", party: "D", votes: 163278, percentage: "49.89%" }
    },
    {
      district: 4,
      nominee1: { name: "Ken Buck", party: "R", votes: 216024, percentage: "60.94%" },
      nominee2: { name: "Ike McCorkle", party: "D", votes: 129619, percentage: "36.56%" }
    },
    {
      district: 5,
      nominee1: { name: "Doug Lamborn", party: "R", votes: 155528, percentage: "56.0%" },
      nominee2: { name: "David Torres", party: "D", votes: 111978, percentage: "40.3%" }
    },
    {
      district: 6,
      nominee1: { name: "Jason Crow", party: "D", votes: 170140, percentage: "60.6%" },
      nominee2: { name: "Steve Monahan", party: "R", votes: 105084, percentage: "37.4%" }
    },
    {
      district: 7,
      nominee1: { name: "Brittany Pettersen", party: "D", votes: 204984, percentage: "56.4%" },
      nominee2: { name: "Erik Aadland", party: "R", votes: 150509, percentage: "41.4%" }
    },
    {
      district: 8,
      nominee1: { name: "Yadira Caraveo", party: "D", votes: 114377, percentage: "48.4%" },
      nominee2: { name: "Barbara Kirkmeyer", party: "R", votes: 112745, percentage: "47.7%" }
    },
  ];

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", margin: "20px auto", width: "100%" }}>
      <thead>
        <tr>
          <th>District</th>
          <th>Winner (Party)</th>
          <th>Votes</th>
          <th>%</th>
          <th>Loser (Party)</th>
          <th>Votes</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.district}>
            <td>{row.district}</td>
            <td>{`${row.nominee1.name} (${row.nominee1.party})`}</td>
            <td>{row.nominee1.votes.toLocaleString()}</td>
            <td>{row.nominee1.percentage}</td>
            <td>{`${row.nominee2.name} (${row.nominee2.party})`}</td>
            <td>{row.nominee2.votes.toLocaleString()}</td>
            <td>{row.nominee2.percentage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// export default ColoradoDistrictResults;


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
