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
        //const response = await axios.get(`http://localhost:8000/${fips}/${electionType}/BOXWHIS`);
        const response = await axios.get(`http://localhost:8080/NV/SMD/BOXWHIS`);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [fips, electionType, comparisonBasis]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const sortedBoxes = data.boxes;
  const bins = sortedBoxes.map((box) => box["bin"]); // Bin labels

  const minValues = sortedBoxes.map((box) => box[comparisonBasis]["min"]);
  const q1Values = sortedBoxes.map((box) => box[comparisonBasis]["q1"]);
  const medianValues = sortedBoxes.map((box) => box[comparisonBasis]["median"]);
  const q3Values = sortedBoxes.map((box) => box[comparisonBasis]["q3"]);
  const maxValues = sortedBoxes.map((box) => box[comparisonBasis]["max"]);
  const enactedValues = sortedBoxes.map((box) => box[comparisonBasis]["enactedValue"]);
  const xPositions = [0];
  for (let i = 1; i < maxValues.length; i++) {
    xPositions.push(xPositions[i - 1] + (maxValues[i - 1] - minValues[i - 1]) + 1);
  }
  

  const traces = [
    {
      x: xPositions,
      y: maxValues,
      type: "scatter",
      mode: "lines",
      line: { color: "black" },
      showlegend: false,
    },
    {
      x: xPositions,
      y: minValues,
      type: "scatter",
      mode: "lines",
      line: { color: "black" },
      showlegend: false,
    },
    {
      x: xPositions,
      y: medianValues,
      mode: "markers",
      marker: { color: "orange", size: 8, symbol: "line-ns-open" },
      name: "Median",
    },
    {
      x: xPositions,
      y: enactedValues,
      mode: "markers",
      marker: { color: "red", size: 8, symbol: "circle" },
      name: "Enacted Plan",
    },
    {
      x: xPositions,
      y: q3Values.map((q3, i) => q3 - q1Values[i]),
      base: q1Values,
      type: "bar",
      width: 0.8, // Adjust the width of the boxes
      marker: { color: "blue", opacity: 0.7, line: { color: "black", width: 1 } },
      name: "IQR (Q1-Q3)",
    },
  ];

  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {/* Dropdown for comparisonBasis */}
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
          height: 600,
          width: 1000,
          showlegend: true,
        }}
        config={{ responsive: true }}
      />
  </div>
  );


}

export default EnsembleBoxAndWhiskerPlot;
