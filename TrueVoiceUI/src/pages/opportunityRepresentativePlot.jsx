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

        //const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
        const response = await axios.get(`http://localhost:8080/NV/SMD/BAR`);
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



  const opportunityRepresentatives = data.state.ensemble.ensembleSummary.ensembles.map(
    (plans) => plans.opportunityRepresentatives
  );
  const totalRepresentatives = data.state.ensemble.ensembleSummary.totalRepresentatives; 
  const averageSeatShare = Number(data.state.ensemble.ensembleSummary.avgSeatShare * 100).toFixed(2).replace(/\.00$/, '');
  const voteShare = Number(data.state.ensemble.ensembleSummary.voteShare * 100).toFixed(2).replace(/\.00$/, '');
  const trace = {
    x: opportunityRepresentatives,
    type: 'histogram',
    marker: {
      color: '#7ff5b8',
      line: {
        color: 'black',
        width: 0
      },
    },
  };

  const layout = {
    title: title || 'Opportunity Representatives',
    xaxis: {
      title: x_label || 'Number of Opportunity Representatives',
      range: [0, totalRepresentatives + 0.5], 
      tickmode: 'linear', 
      dtick: 1,
      showline: true,
      linecolor: 'black', 
      linewidth: 1, 
    },
    yaxis: {
      title: y_label || 'Frequency',
      tickmode: 'linear', 
      dtick: 1,
      showline: true,
      linecolor: 'black', 
      linewidth: 2, 
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
    bargap: 0.2,
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
