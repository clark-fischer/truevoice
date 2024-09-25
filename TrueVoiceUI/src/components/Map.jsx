import React from "react";
import USAMap from "react-usa-map";
import { useNavigate } from "react-router-dom";

const MapComponent = () => {
  // Customize the color for specific states
  const threeStates = {
    CO: { fill: "#51cf4e" }, // New Jersey in red
    UT: { fill: "#308a2f" }, // New York in green
    NV: { fill: "#7de07b" }, // California in blue
  };

  // Handle click events on the states
  const navigate = useNavigate();
  const mapHandler = (event) => {
    navigate(event.target.dataset.name);
  };

  return (
    <div>
      <USAMap customize={threeStates} onClick={mapHandler} />
    </div>
  );
};

export default MapComponent;
