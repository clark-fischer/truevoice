/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

// Opportunity Representatives Plot
function OpportunityRepresentativesPlot({ title, x_label, y_label, fips, electionType, characteristic, width=800, height=600, fontSize=14 }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        //const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
        const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/BAR`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        // setError("Loading extra long...");
      }
    };

    fetchData();
  }, [fips, electionType, characteristic]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;



  const opportunityRepresentatives = data.barData.map((d) => d.opportunityRepresentatives);
  const maxFrequency = Math.max(...opportunityRepresentatives.map((d) => d.frequency || 0));
  const dtickValue = Math.ceil(maxFrequency / 5);

  const totalRepresentatives = data.totalDistricts; 
  const averageSeatShare = Number(data.democratAvgSeatShare * 100).toFixed(2).replace(/\.00$/, '');
  const voteShare = Number(data.democratAvgVoteShare * 100).toFixed(2).replace(/\.00$/, '');
  const trace = {
    x: opportunityRepresentatives,
    type: 'histogram',
    xbins: {
      start: 0 - 0.5, 
      end: totalRepresentatives + 0.5, 
      size: 1, 
  },
    marker: {
      color: '#7ff5b8',
      line: {
        color: 'black',
        width: 0
      },
    },
  };
  const conditionalAnnotations = [];

  if (electionType === "MMD" && fips === "NV") {
    conditionalAnnotations.push({
      x: 1,
      y: 0.94,
      xref: "paper",
      yref: "paper",
      text: "Minority: Hispanic<br>Threshold: 25%",
      showarrow: false,
      font: { size: 12 },
      align: "right",
    });
  } else if (electionType === "MMD" && fips === "CO") {
    conditionalAnnotations.push({
      x: 1,
      y: 0.92,
      xref: "paper",
      yref: "paper",
      text: "Minority: Hispanic<br>Threshold: 20% (5 reps)",
      showarrow: false,
      font: { size: 12 },
      align: "right",
    });
    conditionalAnnotations.push({
      x: 1,
      y: 0.92,
      xref: "paper",
      yref: "paper",
      text: "Minority: Hispanic<br>Threshold: 33% (3 reps)",
      showarrow: false,
      font: { size: 12 },
      align: "right",
    });
  } else if (electionType === "SMD" && (fips === "NV" || fips === "CO")) {
    conditionalAnnotations.push({
      x: 1,
      y: 0.935,
      xref: "paper",
      yref: "paper",
      text: "Minority: Hispanic<br>Threshold: 50%",
      showarrow: false,
      font: { size: 12 },
      align: "right",
    });
  }
  const baseAnnotations = [
    {
      x: 1,
      y: 1,
      xref: "paper",
      yref: "paper",
      text: `Democrat Average Seat Share: ${averageSeatShare}%<br>Democrat Vote Share: ${voteShare}%`,
      showarrow: false,
      font: { size: 12 },
      align: "right",
      
    },
  ];
  const layout = {
    title: title || `${data.electionType} - Opportunity Representatives`,
    font: {
      size: fontSize, 
  },
    xaxis: {
      title: x_label || 'Number of Opportunity Representatives',
      range: [0 - 0.5, totalRepresentatives + 0.5], 
      tickmode: 'linear', 
      dtick: 1,
      showline: true,
      linecolor: 'black', 
      linewidth: 2, 
    },
    yaxis: {
      title: y_label || 'Number of Plans',
      tickmode: 'linear', 
      dtick: 500,
      showline: true,
      linecolor: 'black', 
      linewidth: 2, 
      font: {
        size: 12, 
    },
    },
    annotations: [...baseAnnotations, ...conditionalAnnotations],
    bargap: 0.1,
     margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 60,
   },
    width: width,
    height: height,
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
}

export default OpportunityRepresentativesPlot;
