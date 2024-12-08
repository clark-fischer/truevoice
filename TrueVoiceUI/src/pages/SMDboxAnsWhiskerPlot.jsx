import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function SMDBoxAndWhiskerPlot({ title, x_label, y_label, fips, electionType, characteristic }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(`http://localhost:8000/${fips}/${electionType}/${characteristic}/BOXPLOT`);
        const response = await axios.get(`http://localhost:8080/NV/SMD/BAR`);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [fips, electionType, characteristic]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // Extract data for boxplot (black)
  const plotData = data.boxWhisker.boxes.map((district) => [
    district.black.min,
    district.black.q1,
    district.black.median,
    district.black.q3,
    district.black.max,
  ]);

  const labels = data.boxWhisker.boxes.map((district, index) => 
    `District ${index + 1} (Reps: ${district.representatives})`
  );

  // Prepare traces for each district
  const traces = plotData.map((districtData, index) => ({
    y: districtData,
    name: labels[index],
    type: 'box',
    boxpoints: false, 
    marker: {
      color: '#7ff5b8',
    },
    line: {
      color: 'black',
    },
  }));

  const layout = {
    title: title || 'Nevada MMD Box and Whisker Plot',
    xaxis: {
      title: x_label || 'Districts',
    },
    yaxis: {
      title: y_label || 'Vote Share',
    },
    boxmode: 'group', 
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 50,
    },
    width: 800,
    height: 600,
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
}

export default SMDBoxAndWhiskerPlot;
