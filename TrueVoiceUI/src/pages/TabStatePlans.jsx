/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Heading, Center } from "@chakra-ui/react";
import axios from "axios";

import {

    TabPanel,
} from "@chakra-ui/react";

const TabStatePlans = (props) => {

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


    const [selectedBoxes, setSelectedBoxes] = useState([false, false, false, false]);

    // const [overlaySelectedBoxes, setOverlaySelectedBoxes] = useState([false, false, false, false]);

    return (
        <TabPanel padding={0} >
            <div style={styles.controlsContainer}>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        margin: "10px",
                    }}
                >
                    {props.plan_options.map((item, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p={5}
                            onClick={() => {
                                setSelectedBoxes([index === 0, index === 1, index === 2, index === 3])
                                const fetchData = async () => {
                                    try {
                                        const response = await axios.get(item.path);
                                        // console.log(response); // Set the data to state
                                        props.setGeoJsonData(response.data);
                                        props.setPlanData(response.data.crs.properties);

                                    } catch (err) {
                                        props.setGeoJsonData(null);
                                        console.log(err);
                                    }

                                    document.getElementById("district-button0").innerHTML = "SMD (" + item.title + ")";
                                };

                                fetchData(); // Call the function

                            }}
                            style={{
                                cursor: "pointer",
                                boxShadow: selectedBoxes[index] ? "0 0 10px 2px lightgreen" : "none",
                                transition: "box-shadow 0.3s",
                            }}
                        >
                            <Heading size="md">{item.title}</Heading>
                            <Center>
                                <img
                                    src={item.image}
                                    style={{ width: "75px" }}
                                    alt={item.title}
                                />
                            </Center>
                        </Box>
                    ))}
                </div>

                <hr />

                {/* <div style={{ margin: "20px 0 0 10px" }}>
                    Overlay additional plans below:
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        gap: "20px",
                        margin: "10px",
                    }}
                >
                    {["D- Fvrd", "R- Fvrd", "Average", "Fair"].map((title, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p={5}
                            onClick={() => {
                                const updatedOverlayBoxes = [...overlaySelectedBoxes];
                                updatedOverlayBoxes[index] = !updatedOverlayBoxes[index];
                                setOverlaySelectedBoxes(updatedOverlayBoxes);
                            }}
                            style={{
                                cursor: "pointer",
                                boxShadow: overlaySelectedBoxes[index] ? "0 0 10px 2px lightgreen" : "none",
                                transition: "box-shadow 0.3s",
                            }}
                        >
                            <Heading size="sd">{title}</Heading>
                            <Center>
                                <img
                                    src={index === 0 ? "/dem.jpeg" : "/rep.jpeg"}
                                    style={{ width: "45px" }}
                                    alt={title}
                                />
                            </Center>
                        </Box>
                    ))}
                </div> */}


            </div>
        </TabPanel>
    )
}

export default TabStatePlans;