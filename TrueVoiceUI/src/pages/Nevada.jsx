import React from "react";
// Leaflet/Map
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import nvCong2021 from "./nv_cong_2021.json";
import nv_2mmd from "./nv_2mmd.json";
import nv_4mmd from "./nv_4mmd.json";


export default function Colorado() {

  const w = 1;
  const nevada_districts = {
    "1": {
      "color": "blue",
      "fillColor": "blue",
      "weight": w,
      "opacity": 1,
      "fillOpacity": 0.8
    },
    "2": {
      "color": "red",
      "fillColor": "red",
      "weight": w,
      "opacity": 1,
      "fillOpacity": 0.4
    },
    "3": {
      "color": "blue",
      "fillColor": "blue",
      "weight": w,
      "opacity": 1,
      "fillOpacity": 0.3
    },
    "4": {
      "color": "blue",
      "fillColor": "blue",
      "weight": w,
      "opacity": 1,
      "fillOpacity": 0.5
    }
  }
  const geojson_style = (feature) => {
    return nevada_districts[feature.properties.DISTRICTNO];
  }

  const styles = {
    stateTitle: {
        marginLeft: "35px", 
        gridColumn: "1 / 2", 
        fontSize: "30px",
    },

    district_img :{
      stextAlign: "center", 
      marginTop: "20px" 
    },
    img_ :{
      isplay: "block",
       margin: "0 auto", 
       width: "300px"
      
    },

    gridContainer: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr", // Two columns
      height: "80vh",
      margin: "30px 30px"
    },
    mapWrapper: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },
    mapContainer: {
      flexGrow: 1, // Map takes up remaining space
      width: "100%",
    },
    map: {
      width: "100%",
      height: "100%"
    },
    buttonRow: {
      display: "flex",
      justifyContent: "space-between",
      // padding: "10px",
      height: "10%", // Take up 10% of the container height
      background: "#ffffff",
      
    },
    button: {
      flexBasis: "25%", // Each button takes up about 22.5% of the width (to account for spacing)
      // padding: "1  0px",
      fontSize: "16px",
      textAlign: "center",
      border: "1px solid #f0f0f0",

      '&:hover': {
             textDecoration: 'underline',
        }, 
    },
    controlsContainer: {
      padding: "20px",
      background: "#f8f8f8",
      height: "100%", // Full-height controls column
      boxSizing: "border-box"
    }
  };


  

  const [geoJsonData, setGeoJsonData] = React.useState(nvCong2021);

  const handleButtonClick = (data) => {
    setGeoJsonData(data);
    console.log("geojson changed")
  };

  return (
    <>
      <h1 style={styles.stateTitle}>NEVADA</h1>

      <div style={styles.gridContainer}>
        
        <div style={styles.mapWrapper}>
          <div style={styles.mapContainer}>
            <MapContainer
              key={JSON.stringify(geoJsonData)} // Force re-render by changing key
              center={[38.876019, -117.224121]}
              zoom={6}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON data={geoJsonData} style={geojson_style} />
            </MapContainer>
          </div>

          {/* Row of Buttons below the map */}
          <div style={styles.buttonRow}>
            <button onClick={() => handleButtonClick(nvCong2021)} style={styles.button}>SMD, Single Rep.</button>
            <button onClick={() => handleButtonClick(nv_2mmd)} style={styles.button}>MMD, 2 Reps.</button>
            <button onClick={() => handleButtonClick(nvCong2021)} style={styles.button}>MMD, 3 Reps.</button>
            <button onClick={() => handleButtonClick(nv_4mmd)} style={styles.button}>MMD, 4 Reps.</button>
          </div>
        </div>

        <div style={styles.controlsContainer}>
          <legend>Overlay Ethnicity Data</legend>

          <input id="race--white" type='checkbox' onClick='handleClick(this);' />
          <label htmlFor="race--white">White</label>
          <br />

          <input id="race--black" type='checkbox' onClick='handleClick(this);' />
          <label htmlFor="race--black">African-American</label>
          <br />

          <input id="race--asian" type='checkbox' onClick='handleClick(this);' />
          <label htmlFor="race--asian">Asian-American</label>
          <br />

          <input id="race--latino" type='checkbox' onClick='handleClick(this);' />
          <label htmlFor="race--latino">Latino/Hispanic</label>
          <br />
        </div>


      </div>
    
      <div style={styles.district_img}>
        <img src=".png" alt="nv_box_and_whisker_plot" style={styles.img_} />
      </div>
    </>
  );
}
