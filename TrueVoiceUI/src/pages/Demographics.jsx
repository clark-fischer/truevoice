/* eslint-disable react/prop-types */


import {

  Text,


  TabPanel,
  Button,
  // Button,
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
    width: "800px",
    // height: "100px",
    // border: "1px solid red",
    boxSizing: "border-box",
  },
};


import nv_district_map from "../datafiles/nv_smd.json"
import nv_precinct_map from "../datafiles/nv_precinct.json"

import co_district_map from "../datafiles/co_smd.json"
import co_precinct_map from "../datafiles/nv_precinct.json"




const Demographics = (props) => {

  let raceCheckBoxes = props.raceCheckBoxes;

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

  return (
    <TabPanel padding={0}>

      <div style={styles.controlsContainer}>
        <legend
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Overlay Heatmap Data
        </legend>

        {/* mapping the checkboxes */}
        <div style={{ width: "120%", display: "flex", justifyContent: "space-between" }}>
          <div>
            <input onClick={() => props.setRaceMap(props.state == "NV" ? nv_district_map : co_district_map, true)} id="district-based" name="race-map-type" type="radio" />
            <label htmlFor="district-based" style={{ paddingLeft: "5px" }}>District Based</label>
            <br />
            <input onClick={() => props.setRaceMap(props.state == "NV" ? nv_precinct_map : co_precinct_map, false)} id="precinct-based" name="race-map-type" type="radio"  />
            <label htmlFor="precinct-based" style={{ paddingLeft: "5px" }}>Precinct Based</label>
            <br />
            <input onClick={() => {props.setRaceMap(props.state == "NV" ? nv_precinct_map : co_precinct_map, false); const radios2 = document.getElementsByName("racebtns"); radios2.forEach(radio => radio.disabled = true);}} id="hidemap" name="race-map-type" type="radio" />
            <label htmlFor="hidemap" style={{ paddingLeft: "5px" }}>Hide</label>

            
            

          </div>

          <div style={{ flexBasis: "70%" }}>
            {
              raceCheckBoxes.map((race, i) => (
                <div key={race.id}>
                  <input id={race.id} type="radio" name="racebtns"  onChange={() => props.toggle_map(i)} />
                  <label htmlFor={race.id} style={{ paddingLeft: "5px" }}>
                    {capitalizeFirstLetter(race.label)} <span style={{ color: race.hex }} >(in {race.hex})</span>
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
            <table style={{ width: '50%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 'large' }} colSpan="2">Demographics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>White:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="race--white2"></span></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Black:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="race--black2"></span></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Asian:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="race--asian2"></span></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Hispanic:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="race--hispanic2"></span></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Other:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="race--other2"></span></td>
                </tr>
              </tbody>
            </table>

            {/* <div style={{ borderLeft: "solid 1px white" }}>
              <Text fontWeight="bold" fontSize="lg" >Elected Reps</Text>
              <Text style={{ color: "blue" }} fontSize="lg" >Dina Titus</Text>
              <Text style={{ color: "red" }} fontSize="lg" >Anot Rep</Text>
              <Text style={{ color: "blue" }} fontSize="lg" >Ran Dom</Text>
              <Text style={{ color: "red" }} fontSize="lg" >Rep Five</Text>
              <Text style={{ color: "red" }} fontSize="lg" >Dom Ran</Text>
            </div> */}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 'large' }} colSpan="2"> Statistics</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Dem./Rep. Split:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="democratsPercentage"></span></td>
                </tr> */}
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>District Population:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="totalPopulation"></span></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Representative per District:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="totalRepresentatives"></span></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Opportunity Threshold:</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="opportunityThreshold"></span></td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left', fontSize: 'large' }}>Is Opportunity District?</td>
                  <td style={{ textAlign: 'right', fontSize: 'large' }}><span id="isOpportunityDistrict"></span></td>
                </tr>
              </tbody>
            </table>

            
            
          </div>

          <br />
          <br />
          {/* <Text fontSize="lg" >
            Estimated Vote Split (D/R): 0.5
          </Text> */}
          <br />
          <br />
          {/* <Button onClick={() => location.reload()} >Reset Page!</Button> */}
        </div>


      </div>
    </TabPanel>
  );
};

export default Demographics;