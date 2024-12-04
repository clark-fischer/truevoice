import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


function EnsembleSMDboxAndWhiskerPlot({ title, x_label, y_label, fips, electionType, characteristic ,comparisonBasis}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(`http://localhost:8000/${fips}/${electionType}/${characteristic}/BOXPLOT`);
        const response = await axios.get(`http://localhost:8080/NV/SMD/BOXWHIS`);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [fips, electionType, characteristic]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const sortedBoxes = data.boxes.sort(
    (a, b) => a[characteristic].median - b[characteristic].median
  );

  const bins = sortedBoxes.map((box) => `District ${box.binNo}`);
  const minValues = sortedBoxes.map((box) => box[characteristic].min);
  const q1Values = sortedBoxes.map((box) => box[characteristic].q1);
  const medianValues = sortedBoxes.map((box) => box[characteristic].median);
  const q3Values = sortedBoxes.map((box) => box[characteristic].q3);
  const maxValues = sortedBoxes.map((box) => box[characteristic].max);
  const enactedValues = sortedBoxes.map((box) => box[characteristic].enactedValue);

  const traces = sortedBoxes.map((box, i) => ({
    x: [bins[i]],
    lowerfence: [minValues[i]],
    q1: [q1Values[i]],
    median: [medianValues[i]],
    q3: [q3Values[i]],
    upperfence: [maxValues[i]],
    y: enactedValues[i] ? [enactedValues[i]] : [],
    type: "box",
    name: `District ${box.binNo}`,
    boxpoints: "outliers", // Include outliers
    marker: { color: "blue" },
    line: { color: "black" },
    showlegend: false,
  }));

  return (
    <Plot
      data={traces}
      layout={{
        title: title || `Nevada SMD Ensemble: Box & Whisker Plot for ${characteristic.toUpperCase()} Population Percent`,
        xaxis: {
          title: x_label || "Districts",
          tickangle: 45,
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
  );


}

export default EnsembleSMDboxAndWhiskerPlot;
