import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function VoteShareSeatSharePlot({ title, x_label, y_label }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/NV/SMD/ENACTED/SEATVOTE');
      
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

    //const voteShares = data.electionResults.map((d) => d.voteShare);
   //const seatShares = data.electionResults.map((d) => d.seatShare);


  const voteShares = Array.from({ length: 100 }, (_, i) => i / 99);
  const seatShares = voteShares.map((voteShare) => 1 / (1 + Math.exp(-10 * (voteShare - 0.5))));

  const voteShare = data.voteShare;
  const smdSeatShare = data.smdSeatShare;
  const mmdSeatShare = data.mmdSeatShare;

  const traceLine = {
    x: voteShares,
    y: seatShares,
    type: 'scatter',
    mode: 'lines',
    name: 'Seat-Vote Curve',
    line: {
      color: 'black',
      width: 2,
    },
  };

  const traceSMD = {
    x: [voteShare],
    y: [smdSeatShare],
    type: 'scatter',
    mode: 'markers',
    name: 'SMD Vote/Seat Share',
    marker: {
      color: 'red',
      size: 10,
    },
  };

  const traceMMD = {
    x: [voteShare],
    y: [mmdSeatShare],
    type: 'scatter',
    mode: 'markers',
    name: 'MMD Vote/Seat Share',
    marker: {
      color: 'blue',
      size: 10,
    },
  };


  const dataTraces = [traceLine, traceSMD, traceMMD];

  const layout = {
    title: title || `Seat-Vote Curve for ${data.state || 'Nevada'}`,
    xaxis: {
      title: x_label || 'Vote Share',
      range: [0, 1],
    },
    yaxis: {
      title: y_label || 'Seat Share',
      range: [0, 1],
    },
    annotations: [
    
      {
        x: 0.05,
        y: 0.9,
        xref: 'paper',
        yref: 'paper',
        text: `Symmetry: ${data.symmetry}`,
        showarrow: false,
        font: {
          size: 12,
          color: 'black',
        },
        align: 'left',
      },
      {
        x: 0.05,
        y: 0.85,
        xref: 'paper',
        yref: 'paper',
        text: `Bias: ${data.bias}`,
        showarrow: false,
        font: {
          size: 12,
          color: 'black',
        },
        align: 'left',
      },
      {
        x: 0.05,
        y: 0.8,
        xref: 'paper',
        yref: 'paper',
        text: `Responsiveness: ${data.responsiveness}`,
        showarrow: false,
        font: {
          size: 12,
          color: 'black',
        },
        align: 'left',
      },
    ],
    legend: {
      x: 0.8,
      y: 1,
    },
    margin: {
      l: 60,
      r: 50,
      t: 60,
      b: 60,
    },
    width: 800, // Adjusted width for a less wide graph
    height: 600, // Adjusted height to maintain aspect ratio
  };

  return (
    <Plot
      data={dataTraces}
      layout={layout}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
}

export default VoteShareSeatSharePlot;
