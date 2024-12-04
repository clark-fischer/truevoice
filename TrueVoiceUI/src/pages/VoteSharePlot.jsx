import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function VoteShareSeatSharePlot({ title, x_label, y_label , fips, electionType, plan, characteristic}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get('http://localhost:8080/NV/SMD/SEATVOTE');
        const response = await axios.get(f`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
      
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [fips, electionType, plan, characteristic]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  //remove duplicates by averaging seat shares
  const aggregateVoteSeatData = (voteShare, seatShare) => {
    const voteSeatMap = {};
    voteShare.forEach((vote, index) => {
      if (!voteSeatMap[vote]) voteSeatMap[vote] = [];
      voteSeatMap[vote].push(seatShare[index]);
    });

    const uniqueVoteShare = Object.keys(voteSeatMap).map(Number);
    const averagedSeatShare = uniqueVoteShare.map(
      (vote) =>
        voteSeatMap[vote].reduce((sum, value) => sum + value, 0) /
        voteSeatMap[vote].length
    );

    return { uniqueVoteShare, averagedSeatShare };
  };

    const demData = data.barData.map((entry) => ({
      voteShare: entry.demVoteShare,
      seatShare: entry.demSeatShare,
    }));
    const repData = data.barData.map((entry) => ({
      voteShare: entry.repVoteShare,
      seatShare: entry.repSeatShare,
    }));

    const {
      uniqueVoteShare: demVoteShare,
      averagedSeatShare: demSeatShare,
    } = aggregateVoteSeatData(
      demData.map((entry) => entry.voteShare),
      demData.map((entry) => entry.seatShare)
    );

    const {
      uniqueVoteShare: repVoteShare,
      averagedSeatShare: repSeatShare,
    } = aggregateVoteSeatData(
      repData.map((entry) => entry.voteShare),
      repData.map((entry) => entry.seatShare)
    );

    const smoothX = Array.from(
      { length: 500 },
      (_, i) =>
        Math.min(...demVoteShare, ...repVoteShare) +
        (i * (Math.max(...demVoteShare, ...repVoteShare) - Math.min(...demVoteShare, ...repVoteShare))) / 499
    );


    const interpolate = (x, y) => {
      const interpolatedValues = [];
      smoothX.forEach((sx) => {
        let interpolatedY = 0;
        if (sx <= x[0]) interpolatedY = y[0];
        else if (sx >= x[x.length - 1]) interpolatedY = y[y.length - 1];
        else {
          const lowerIndex = x.findIndex((val) => val >= sx) - 1;
          const upperIndex = lowerIndex + 1;
  
          const slope =
            (y[upperIndex] - y[lowerIndex]) /
            (x[upperIndex] - x[lowerIndex]);
          interpolatedY =
            y[lowerIndex] + slope * (sx - x[lowerIndex]);
        }
        interpolatedValues.push(interpolatedY);
      });
      return interpolatedValues;
    };

    const demSmoothY = interpolate(demVoteShare, demSeatShare);
    const repSmoothY = interpolate(repVoteShare, repSeatShare);

    const bias = data.bias;
    const symmetry = data.symmetry;
    const responsiveness = data. responsiveness


    return (
      <Plot
        data={[
          {
            x: smoothX,
            y: demSmoothY,
            type: "scatter",
            mode: "lines",
            name: "Democrats",
            line: { color: "blue" },
          },
          {
            x: smoothX,
            y: repSmoothY,
            type: "scatter",
            mode: "lines",
            name: "Republicans",
            line: { color: "red" },
          },
        ]}
        layout={{
          title: title || f`${data.electionType} Vote/Seat Share Ensemble`,
          xaxis: { title: x_label || "Vote Share" },
          yaxis: { title: y_label || "Seat Share" },
          annotations: [
            {
              x: 0.5,
              y: 0.9,
              xref: "paper",
              yref: "paper",
              text: `Bias: ${bias}<br>Responsiveness: ${responsiveness}<br>Symmetry: ${symmetry}`,
              showarrow: false,
              font: { size: 12 },
              align: "left",
              bgcolor: "white",
              bordercolor: "black",
              borderwidth: 1,
            },
          ],
          width: 800,
          height: 600,
        }}
        config={{ responsive: true }}
      />
    );
  }
  


export default VoteShareSeatSharePlot;
