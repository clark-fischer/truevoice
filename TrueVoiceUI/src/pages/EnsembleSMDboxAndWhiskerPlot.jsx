import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


function EnsembleSMDboxAndWhiskerPlot({ title, x_label, y_label, fips, electionType, characteristic}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [comparisonBasis, setComparisonBasis] = useState("hispanic"); // hispanic is default selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(`http://localhost:8000/${fips}/${electionType}/${comparisonBasis}/BOXPLOT`);
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

  const sortedBoxes = data.boxes.sort(
    (a, b) => a[comparisonBasis].median - b[comparisonBasis].median
  );

  const bins = sortedBoxes.map((box) => `District ${box.binNo}`);
  const minValues = sortedBoxes.map((box) => box[comparisonBasis].min);
  const q1Values = sortedBoxes.map((box) => box[comparisonBasis].q1);
  const medianValues = sortedBoxes.map((box) => box[comparisonBasis].median);
  const q3Values = sortedBoxes.map((box) => box[comparisonBasis].q3);
  const maxValues = sortedBoxes.map((box) => box[comparisonBasis].max);
  const enactedValues = sortedBoxes.map((box) => box[comparisonBasis].enactedValue);

  const traces = [
    {
      x: bins, 
      lowerfence: minValues,
      q1: q1Values,
      median: medianValues,
      q3: q3Values,
      upperfence: maxValues,
      type: "box",
      boxpoints: "outliers",
      marker: { color: "blue" },
      line: { color: "black" },
      name: "Ensemble Data",
    },
    {
      x: bins,
      y: enactedValues, 
      mode: "markers",
      marker: {
        color: "red",
        size: 8, 
        symbol: "circle",
      },
      name: "Enacted Plan",
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
          title: title || `Nevada SMD Ensemble: Box & Whisker Plot for ${comparisonBasis} Population Percent`,
          xaxis: {
            title: x_label || "District Plans Bins",
            tickangle: 0,
          },
          yaxis: {
            title: y_label || "Population Percent (%)",
            
            zeroline: false,
          },
          boxmode: "group",
          height: 600,
          width: 1000,
        }}
        config={{
          responsive: true,
        }}
      />
  </div>
  );


}

export default EnsembleSMDboxAndWhiskerPlot;
