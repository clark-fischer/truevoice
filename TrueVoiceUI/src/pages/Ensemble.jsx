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
                
            < PictureSlider />
            </div>

        </TabPanel>
    );

};


const PictureSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '1.png',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.png',
    '6.png',
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext} style={{ marginLeft: '10px' }}>
          Next
        </button>
      </div>
    </div>
  );
};



export default Ensemble;