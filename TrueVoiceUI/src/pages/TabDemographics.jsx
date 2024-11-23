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

const TabDemographics = () => {

    const [view, setView] = React.useState(0);

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
        <TabPanel padding={0}>

                <div style={{ margin: "20px" }}>

                  <legend
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    What is this?
                  </legend>

                  <input
                    type="radio"
                    id="precinct-level"
                    name="view"
                    value="precinct"
                    onChange={(e) => setView(e.target.value)}
                  />
                  <label style={{ paddingLeft: "10px" }} htmlFor="precinct-level">Precinct Level</label>
                  <br />
                  <input
                    type="radio"
                    id="map-view-filter"
                    name="view"
                    value="map"
                    onChange={(e) => setView(e.target.value)}
                  />
                  <label style={{ paddingLeft: "10px" }} htmlFor="map-view-filter">Map View Filter</label>
                  <br />
                  (
                    <div style={{ marginLeft: "25px", marginTop: "5px" }}>
                      <input type="radio" id="filter1" name="filter" value="filter1" />
                      <label htmlFor="filter1">Enacted</label>
                      <br />
                      <input type="radio" id="filter2" name="filter" value="filter2" />
                      <label htmlFor="filter2">Fair</label>
                      <br />
                      <input type="radio" id="filter3" name="filter" value="filter3" />
                      <label htmlFor="filter3">Rep. Favored</label>
                      <br />
                      <input type="radio" id="filter4" name="filter" value="filter4" />
                      <label htmlFor="filter4">Dem. Favored</label>
                      <br />
                      <input type="radio" id="filter5" name="filter" value="filter5" />
                      <label htmlFor="filter5">Average</label>
                    </div>
                  )
                </div>
                <hr />
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
                  {/* <button
                    onClick={() =>
                      setGeoJsonData(geoJsonData ? null : state_smd)
                    }
                    style={styles.button}
                  >
                    {geoJsonData ? "Disable GeoJSON" : "Enable GeoJSON"}
                  </button> */}



                </div>
              </TabPanel>
    );
};

export default TabDemographics;