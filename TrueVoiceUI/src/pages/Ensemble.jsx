/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';

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

const Ensemble = (props) => {

    return (
        <TabPanel padding={0}>
            <div style={styles.controlsContainer}>
                <h1>Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>

            </div>

        </TabPanel>
    );

};

export default Ensemble;