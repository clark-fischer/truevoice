import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

// Opportunity Representatives Plot
function OpportunityRepresentativesPlot({ title, x_label, y_label, fips, electionType, characteristic }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
        //const response = await axios.get(`http://localhost:8080/NV/SMD/BAR`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, [fips, electionType, characteristic]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;



  const opportunityRepresentatives = data.barData.map((d) => d.opportunityRepresentatives);
  const maxFrequency = Math.max(...opportunityRepresentatives.map((d) => d.frequency || 0));
  const dtickValue = Math.ceil(maxFrequency / 5);

  const totalRepresentatives = data.totalRepresentatives; 
  const averageSeatShare = Number(data.avgSeatShare * 100).toFixed(2).replace(/\.00$/, '');
  const voteShare = Number(data.voteShare * 100).toFixed(2).replace(/\.00$/, '');
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

  const layout = {
    title: title || `${data.electionType} Ensemble Summary: Opportunity Representatives`,
    font: {
      size: 14, 
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
      title: y_label || 'Frequency',
      tickmode: 'linear', 
      dtick: 10 ,
      showline: true,
      linecolor: 'black', 
      linewidth: 2, 
      font: {
        size: 12, 
    },
    },
    annotations: [
      {
        x: 1,
        y: 0.97,
        xref: 'paper',
        yref: 'paper',
        text: `Average Seat Share: ${averageSeatShare}%<br>Vote Share: ${voteShare}%`,
        showarrow: false,
        font: {
          size: 12,
        },
        align: 'left',
        bgcolor: 'white',
        bordercolor: 'black',
        borderwidth: 1,
      },
    ],
    bargap: 0.1,
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
      data={[trace]}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
}

export default OpportunityRepresentativesPlot;
