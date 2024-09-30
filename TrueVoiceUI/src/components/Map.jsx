import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";

// You can use a topology file for US States
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Mapping full state names to the colors and tooltip labels
const stateNameMap = {
  Colorado: { fill: "#51cf4e", tooltip: "Colorado" },
  Utah: { fill: "#51cf4e", tooltip: "Utah" },
  Nevada: { fill: "#51cf4e", tooltip: "Nevada" },
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
    <div style={{ width: "100%", margin: "auto", paddingBottom: "20px" }}>
      <ComposableMap projection="geoAlbersUsa" width={1200} height={550}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name; // Use full state name
              const stateInfo = stateNameMap[stateName]; // Get color and tooltip for specific states

              return (
                <Tooltip
                  key={geo.rsmKey}
                  label={stateInfo?.tooltip || ""}
                  isDisabled={!stateInfo} // Disable tooltip for states without custom info
                >
                  <Geography
                    geography={geo}
                    fill={stateInfo?.fill || "#DDD"} // Default color for other states
                    stroke="black"
                    strokeWidth="1.2px"
                    style={{
                      default: { outline: "none" },
                      hover: {filter: "brightness(110%)", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    onClick={() => mapHandler(stateName)} // Navigate on click
                  />
                </Tooltip>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
