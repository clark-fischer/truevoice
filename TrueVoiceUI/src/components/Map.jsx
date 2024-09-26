// import React from "react";
// import USAMap from "react-simple-maps";
// import { useNavigate } from "react-router-dom";

// export default function MapComponent() {
//   // Customize the color for specific states
//   const threeStates = {
//     CO: { fill: "#51cf4e" }, // New Jersey in red
//     UT: { fill: "#308a2f" }, // New York in green
//     NV: { fill: "#7de07b" }, // California in blue
//   };

//   // Handle click events on the states
//   const navigate = useNavigate();
//   const mapHandler = (event) => {
//     navigate(event.target.dataset.name);
//   };

//   return (
//     <div>
//       <USAMap customize={threeStates} onClick={mapHandler} />
//     </div>
//   );
// }
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from "react-router-dom";

// You can use a topology file for US States
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Mapping full state names to the colors
const stateNameMap = {
  Colorado: "#51cf4e",
  Utah: "#308a2f",
  Nevada: "#7de07b",
};

export default function MapComponent() {
  // Handle click events on the states
  const navigate = useNavigate();
  const mapHandler = (stateName) => {
    if (["Utah", "Colorado", "Nevada"].includes(stateName)) {
      const formattedStateName = stateName.toLowerCase().replace(/\s/g, "-");
      navigate(`/${formattedStateName}`); // Navigate to full state name route
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name; // Use full state name
              const fillColor = stateNameMap[stateName] || "#DDD"; // Default color for other states

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#FFF"
                  style={{
                    default: { outline: "none" },
                    hover: { opacity: 0.8, outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  onClick={() => mapHandler(stateName)} // Navigate on click
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
