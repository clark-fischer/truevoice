import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


function EnsembleBoxAndWhiskerPlot({ title, x_label, y_label, fips, electionType}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [comparisonBasis, setComparisonBasis] = useState("hispanic"); // hispanic is default selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/BOXWHIS`);
        //const response = await axios.get(`http://localhost:8080/NV/SMD/BOXWHIS`);
        setData(response.data);
      } catch (err) {
        // setError(err);
        setError("Loading extra long...");
      }
    };

    fetchData();
  }, [fips, electionType, comparisonBasis]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const sortedBoxes = data.boxes;
  const bins = sortedBoxes.map((box) => box["binNo"]); // Bin labels

  const minValues = sortedBoxes.map((box) => box[comparisonBasis]["min"]);
  const q1Values = sortedBoxes.map((box) => box[comparisonBasis]["q1"]);
  const medianValues = sortedBoxes.map((box) => box[comparisonBasis]["median"]);
  const q3Values = sortedBoxes.map((box) => box[comparisonBasis]["q3"]);
  const maxValues = sortedBoxes.map((box) => box[comparisonBasis]["max"]);
  const enactedValues = sortedBoxes.map((box) => box[comparisonBasis]["enactedValue"]);
  const xPositions = bins.map((_, i) => i + 1);
  

  const traces = [
    // Whiskers 
    {
      x: xPositions.flatMap((x) => [x, x, null]),
      y: minValues.flatMap((min, i) => [min, maxValues[i], null]),
      mode: "lines",
      line: { color: "black", width: 1.5 },
      showlegend: false,
    },
    
    // Horizontal lines at Min
    {
      x: xPositions.flatMap((x) => [x - 0.2, x + 0.2, null]),
      y: minValues.flatMap((min) => [min, min, null]),
      mode: "lines",
      line: { color: "black", width: 1.5 },
      showlegend: false,
    },
    // Horizontal lines at Max
    {
      x: xPositions.flatMap((x) => [x - 0.2, x + 0.2, null]),
      y: maxValues.flatMap((max) => [max, max, null]),
      mode: "lines",
      line: { color: "black", width: 1.5 },
      showlegend: false,
    },
    
    // Enacted Plan
    {
      x: xPositions,
      y: enactedValues,
      mode: "markers",
      marker: { color: "red", size: 10, symbol: "circle" },
      name: "Enacted Plan",
    },
    // Boxes (IQR - Q1 to Q3)
    {
      x: xPositions,
      y: q3Values.map((q3, i) => q3 - q1Values[i]),
      base: q1Values,
      type: "bar",
      width: 0.5, 
      marker: { color: "blue", opacity: 0.7, line: { color: "black", width: 1.5 } },
      showlegend: false,
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <label style={{ marginBottom: "10px" }}>
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

      <Plot
        data={traces}
        layout={{
          title: title || `${fips} ${electionType} Ensemble: Box & Whisker Plot for ${comparisonBasis} Population Percent`,
          xaxis: {
            title: x_label || "Bins",
            tickmode: "array",
            tickvals: xPositions,
            ticktext: bins,
          },
          yaxis: {
            title: y_label || "Population Percent (%)",
            zeroline: false,
          },
          height: 555,
          width: 700,
          showlegend: true,
        }}
        config={{ responsive: true }}
      />
    </div>
  );


}

export default EnsembleBoxAndWhiskerPlot;
