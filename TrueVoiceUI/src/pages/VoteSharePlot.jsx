import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import * as d3 from "d3";
import { 
    Chart as ChartJS,
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend,
    Filler, 
  } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
import axios from 'axios';


function VoteShareSeatSharePlot({ title, x_label, y_label , fips, electionType, plan, characteristic}) {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null)
  
  const aggregateDuplicates = (voteShare, seatShare) => {
    const aggregated = {};
    voteShare.forEach((vote, idx) => {
      if (!aggregated[vote]) aggregated[vote] = [];
      aggregated[vote].push(seatShare[idx]);
    });
    const uniqueVoteShare = Object.keys(aggregated).map(Number).sort((a, b) => a - b);
    const averagedSeatShare = uniqueVoteShare.map(
      (vote) => aggregated[vote].reduce((a, b) => a + b, 0) / aggregated[vote].length
    );
    return { voteShare: uniqueVoteShare, seatShare: averagedSeatShare };
  };
  const interpolates = (xVals, yVals, fullRange) => {
    const interpolated = fullRange.map((x) => {
      const index = xVals.findIndex((val) => val === x);
      if (index !== -1) return yVals[index];

      // Linear interpolation between two surrounding points
      const lower = Math.max(...xVals.filter((v) => v < x));
      const upper = Math.min(...xVals.filter((v) > x));

      if (lower && upper) {
        const lowerIndex = xVals.indexOf(lower);
        const upperIndex = xVals.indexOf(upper);
        return (
          yVals[lowerIndex] +
          ((yVals[upperIndex] - yVals[lowerIndex]) / (upper - lower)) * (x - lower)
        );
      }
      return null;
    });
    return interpolated;
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/NV/SMD/SEATVOTE');
        //const response = await axios.get(f`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
      
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [fips, electionType, plan, characteristic]);


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

    const demData = data.curveData.map((entry) => ({
      voteShare: entry.demVoteShare,
      seatShare: entry.demSeatShare,
    }));
    const repData = data.curveData.map((entry) => ({
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
  
          const slope = (y[upperIndex] - y[lowerIndex]) / (x[upperIndex] - x[lowerIndex]);
          interpolatedY = y[lowerIndex] + slope * (sx - x[lowerIndex]);
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
          title: title || `${data.electionType} Vote/Seat Share Ensemble`,
          xaxis: { title: x_label || "Vote Share" , range: [0.46, 0.54] },
          yaxis: { title: y_label || "Seat Share", range: [0, 1] },
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
