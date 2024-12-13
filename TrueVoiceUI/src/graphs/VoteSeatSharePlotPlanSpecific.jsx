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
                let increments = Array(5).fill().map(() => 0.01 + (Math.floor(seed() * 10) - 5) / 100);
                const avgIncrement = increments.reduce((a, b) => a + b, 0) / increments.length;
      
                simulation = simulation.map((d) => ({
                  ...d,
                  demVoteShare: Math.min(1, Math.max(0, d.demVoteShare + avgIncrement)),
                  repVoteShare: Math.min(1, Math.max(0, d.repVoteShare - avgIncrement)),
                }));
      
                const avgDemVoteShare = simulation.reduce((sum, d) => sum + d.demVoteShare * d.totalVotes, 0) / totalVotes;
                const avgDemSeatShare = simulation.filter((d) => d.demVoteShare > 0.5).length / simulation.length;
      
                dem_df.push({ x: avgDemVoteShare, y: avgDemSeatShare });
                rep_df.push({ x: 1 - avgDemVoteShare, y: 1 - avgDemSeatShare });
              }

            // Simulation logic: downward increments
            for (let i = 0; i < 50; i++) {
                let increments = Array(5).fill().map(() => -0.01 + (Math.floor(seed() * 10) - 5) / 100);
                const avgIncrement = increments.reduce((a, b) => a + b, 0) / increments.length;
      
                simulation = simulation.map((d) => ({
                  ...d,
                  demVoteShare: Math.min(1, Math.max(0, d.demVoteShare + avgIncrement)),
                  repVoteShare: Math.min(1, Math.max(0, d.repVoteShare - avgIncrement)),
                }));
      
                const avgDemVoteShare = simulation.reduce((sum, d) => sum + d.demVoteShare * d.totalVotes, 0) / totalVotes;
                const avgDemSeatShare = simulation.filter((d) => d.demVoteShare > 0.5).length / simulation.length;
      
                dem_df.push({ x: avgDemVoteShare, y: avgDemSeatShare });
                rep_df.push({ x: 1 - avgDemVoteShare, y: 1 - avgDemSeatShare });
              }

            
              setDemData(dem_df.sort((a, b) => a.x - b.x));
              setRepData(rep_df.sort((a, b) => a.x - b.x));
      


            }catch(err){
                console.error("Error fetching data:", error);
            }

        
            
        }
        fetchData();
    },[fips, electionType, characteristic]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ marginBottom: "10px" }}>{title || `${fips} ${electionType} ${characteristic}: Vote-Seat Share`}</h2>
    
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