import React, { useState, useEffect } from 'react';
import axios from 'axios';
import seedrandom from "seedrandom";
import "chart.js/auto";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
///{fips}/{electionType}/{characteristic}/SEATVOTE
function VoteSeatSharePlotPlanSpecific({title, x_label, y_label, fips, electionType, characteristic}){

    
    const [demData, setDemData] = useState([]);
    const [repData, setRepData] = useState([]);
    //const [annotations, setAnnotations] = useState({ bias: 0, symmetry: 0, responsiveness: 0 });
    //<p>Bias: {annotations.bias} | Symmetry: {annotations.symmetry} | Responsiveness: {annotations.responsiveness}</p>

    

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/${characteristic}/SEATVOTE`);
            //const response = await axios.get(f`http://localhost:8080/${fips}/${electionType}/${characteristic}/SEATVOTE`);
            const simulationData = response.data.curveData;
            const seed = seedrandom("42");

            //setAnnotations({ bias: response.data.bias.toFixed(2), symmetry: response.data.symmetry.toFixed(2), responsiveness: response.data.responsiveness.toFixed(2) });

            
            
             
            let dem_df = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
            let rep_df = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    
            let simulation = simulationData.map((d) => ({
              demVoteShare: d.demVoteShare,
              repVoteShare: d.repVoteShare,
              totalVotes: d.totalVotes,
            }));

            // Calculate initial total shares
            const totalVotes = simulation.reduce((sum, d) => sum + d.totalVotes, 0);
            const totalDemVoteShare = simulation.reduce((sum, d) => sum + d.demVoteShare * d.totalVotes, 0) / totalVotes;
            const totalDemSeatShare = simulation.filter((d) => d.demVoteShare > 0.5).length / simulation.length;
          
            dem_df.push({ x: totalDemVoteShare, y: totalDemSeatShare });
            rep_df.push({ x: 1 - totalDemVoteShare, y: 1 - totalDemSeatShare });
    
            // Simulation logic: upward increments
            for (let i = 0; i < 50; i++) { 
              let allResults = []; // Store all 100 simulation results
            
              // Run 100 simulations per iteration
              for (let j = 0; j < 30; j++) {
                const Increment = 0.01 + 0.01 * i + (Math.floor(seed() * 10) - 5) / 100;
            
                let currentSimulation = simulation.map((d) => ({
                  ...d,
                  demVoteShare: Math.min(1, Math.max(0, d.demVoteShare + Increment)),
                  repVoteShare: Math.min(1, Math.max(0, d.repVoteShare - Increment)),
                }));
            
                const avgDemVoteShare =
                  currentSimulation.reduce((sum, d) => sum + d.demVoteShare * d.totalVotes, 0) / totalVotes;
            
                const avgDemSeatShare =
                  currentSimulation.filter((d) => d.demVoteShare > 0.5).length / currentSimulation.length;
            
                // Store results for this single simulation
                allResults.push({ avgDemVoteShare, avgDemSeatShare });
              }
            
              // Aggregate results after 100 simulations
              const aggregatedDemVoteShare =
                allResults.reduce((sum, r) => sum + r.avgDemVoteShare, 0) / allResults.length;
            
              const aggregatedDemSeatShare =
                allResults.reduce((sum, r) => sum + r.avgDemSeatShare, 0) / allResults.length;
            
              dem_df.push({ x: aggregatedDemVoteShare, y: aggregatedDemSeatShare });
              rep_df.push({ x: 1 - aggregatedDemVoteShare, y: 1 - aggregatedDemSeatShare });
            }            

            // Simulation logic: downward increments
            for (let i = 0; i < 50; i++) { 
              let allResults = []; // Store all 100 simulation results
            
              // Run 100 simulations per iteration
              for (let j = 0; j < 30; j++) {
                const Increment = -0.01 - 0.01 * i + (Math.floor(seed() * 10) - 5) / 100;
            
                let currentSimulation = simulation.map((d) => ({
                  ...d,
                  demVoteShare: Math.min(1, Math.max(0, d.demVoteShare + Increment)),
                  repVoteShare: Math.min(1, Math.max(0, d.repVoteShare - Increment)),
                }));
            
                const avgDemVoteShare =
                  currentSimulation.reduce((sum, d) => sum + d.demVoteShare * d.totalVotes, 0) / totalVotes;
            
                const avgDemSeatShare =
                  currentSimulation.filter((d) => d.demVoteShare > 0.5).length / currentSimulation.length;
            
                // Store results for this single simulation
                allResults.push({ avgDemVoteShare, avgDemSeatShare });
              }
            
              // Aggregate results after 100 simulations
              const aggregatedDemVoteShare =
                allResults.reduce((sum, r) => sum + r.avgDemVoteShare, 0) / allResults.length;
            
              const aggregatedDemSeatShare =
                allResults.reduce((sum, r) => sum + r.avgDemSeatShare, 0) / allResults.length;
            
              dem_df.push({ x: aggregatedDemVoteShare, y: aggregatedDemSeatShare });
              rep_df.push({ x: 1 - aggregatedDemVoteShare, y: 1 - aggregatedDemSeatShare });
            }

            
              setDemData(dem_df.sort((a, b) => a.x - b.x));
              setRepData(rep_df.sort((a, b) => a.x - b.x));
      


            }catch(err){
                console.error("Error fetching data:", error);
            }

        
            
        }
        fetchData();
    },[fips, electionType, characteristic]);

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ marginBottom: "10px" }}>{title || `${electionType} ${characteristic ? capitalizeFirstLetter(characteristic) : "loading..."}: Vote-Seat Share`}</h2>
    
          <LineChart width={600} height={350} data={demData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 1]}
              dataKey="x"
              tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`}
              label={{ value: x_label || "Vote Share (%)", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`}
              label={{ value: y_label || "Seat Share (%)", angle: -90, position: "insideLeft" }}
    
            />
            <Tooltip
              formatter={(value, name) => [`${(value * 100).toFixed(2)}%`, name]}
              labelFormatter={(label) => `Vote Share: ${(label * 100).toFixed(0)}%`}
              wrapperStyle={{ backgroundColor: "#f9f9f9", border: "1px solid #ccc", padding: "10px" }}
              cursor={{ stroke: "gray", strokeWidth: 1 }}
            />
            <Legend />
            <Line type="monotone" dataKey="y" name="Republican" data={repData} stroke="red" strokeWidth={3} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="y" name="Democrat" data={demData} stroke="blue" strokeWidth={3} dot={false} isAnimationActive={false} />
            <ReferenceLine x={0.5} stroke="gray" strokeDasharray="3 3" />
            <ReferenceLine y={0.5} stroke="gray" strokeDasharray="3 3" />
          </LineChart>
        </div>
      );

}
export default VoteSeatSharePlotPlanSpecific;