import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


function SMDBoxAndWhiskerPlot({ title, x_label, y_label, fips, electionType, characteristic ,comparisonBasis}) {
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

  

  //get data for boxplot for a compariosn basis (ex: black)
  const plotData = data.state.ensemble.boxWhisker.boxes[0].map((district) => [
    district[comparisonBasis].min,
    district[comparisonBasis].q1,
    district[comparisonBasis].median,
    district[comparisonBasis].q3,
    district[comparisonBasis].max,
  ]);

  const enactedValues = data.state.ensemble.boxWhisker.boxes[0].map((district) => (
    district[comparisonBasis].enactedValue * 100
  ));

  const labels = data.state.ensemble.boxWhisker.boxes[0].map((district) => 
    `District ${district.binNo} `
  );

 
  const boxTraces = plotData.map((districtData, index) => ({
    y: districtData,
    x: labels[index],
    name: labels[index],
    type: 'box',
    boxpoints: false, 
    fillcolor: "rgba(31, 119, 180, 0.5)",
    marker: {
      color: "rgba(31, 119, 180, 0.5)",
    },
    line: {
      color: 'black',
  
    },
    showlegend: false,
  }));

  const scatterTrace = {
    x: labels,
    y: enactedValues,
    mode: 'markers',
    name: 'Enacted Plan',
    marker: {
      color: 'red',
      size: 8,
    },
    text: enactedValues.map((value) => value.toFixed(2) ),
    textposition: "top center",
  };
  

  const layout = {
    title: title || `SMD Box and Whisker Plot for ${comparisonBasis}`,
    xaxis: {
      title: x_label || 'Districts',
      tickangle: 0,
    },
    yaxis: {
      title: y_label || 'Vote Share',
    },
    boxmode: 'group', 
    showlegend: true,
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 50,
    },
    height: 500,
    width: 700,
    showlegend: true,
    boxmode: "group",
  };

  return (
    <Plot
      data={[...boxTraces, scatterTrace]} 
      layout={layout}

      config={{ responsive: true }}
    />
  );
}

export default SMDBoxAndWhiskerPlot;
