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
        //const response = await axios.get(f`http://localhost:8080/${fips}/${electionType}/${characteristic}/SEATVOTE`);
        
        const data = response.data;
        


        const bias = data.bias;
        const symmetry = data.symmetry;
        const responsiveness = data.responsiveness;

        const demData = data.curveData.map((entry) => [entry.demVoteShare, entry.demSeatShare]);
        const repData = data.curveData.map((entry) => [entry.repVoteShare, entry.repSeatShare]);
  
        const sortedDem = demData.sort((a, b) => a[0] - b[0]);
        const sortedRep = repData.sort((a, b) => a[0] - b[0]);
  
        const demVoteShare = sortedDem.map((d) => d[0]);
        const demSeatShare = sortedDem.map((d) => d[1]);
        const repVoteShare = sortedRep.map((r) => r[0]);
        const repSeatShare = sortedRep.map((r) => r[1]);
        
        const demClean = aggregateDuplicates(demVoteShare, demSeatShare);
        const repClean = aggregateDuplicates(repVoteShare, repSeatShare);
        
        

        const interpolate = (x, y) => {
          const line = d3
            .line()
            .x((_, i) => x[i])
            .y((_, i) => y[i])
            .curve(d3.curveBasis); // Smooth spline curve
          return { x: x, y: y, path: line(x.map((_, i) => i)) };
        };
  
        const demSmooth = interpolate(demClean.voteShare, demClean.seatShare);
        const repSmooth = interpolate(repClean.voteShare, repClean.seatShare);

        console.log("Democrats Data:", demClean);
        console.log("Republicans Data:", repClean);

        setChartData({
          
          datasets: [
            {
              label: "Democrats",
              data: demSmooth.x.map((x, i) => ({ x, y: demSmooth.y[i] })),
              borderColor: "blue",
              borderWidth: 2,
              backgroundColor: "transparent",
              tension: 0.4, // Smooth curve
              pointRadius: 0,
            },
            {
              label: "Republicans",
              data: [],
              borderColor: "red",
              backgroundColor: "transparent",
              borderWidth: 2,
              tension: 0.4, // Smooth curve
              pointRadius: 0,
            },
          ],
        });

        
      } catch (err) {
        // setError(err);
        setError("Loading extra long...");

      }
    };

    fetchData();
  }, [fips, electionType, plan, characteristic]);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        title: { display: true, text: "Vote Share" },
        ticks: { stepSize: 0.01 },
        min: 0.44,
        max: 0.54,
      },
      y: {
        title: { display: true, text: "Seat Share" },
        min: 0,
        max: 1,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "SMD Vote/Seat Share Ensemble",
      },
      legend: {
        display: true,
        position: "top",
        
      },
    },
  };



  return (
    <div style={{ width: "800px", height: "500px" }}>
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
  }
  


export default VoteShareSeatSharePlot;
