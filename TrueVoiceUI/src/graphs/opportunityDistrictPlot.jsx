import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


//opp representative
function OpportunityDistrictsPlot({title ,x_label, y_label, fips='NULL', electionType, height=600, width=800, fontSize=14}) {

    const [data, setData] = useState(null);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try{
                //const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/BAR`);
                const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/BAR`);
                setData(response.data);

            }catch (err){
                setError(err)
                }

        };
        fetchData();

    }, [fips, electionType]);
  
    if(error) return <div>Error: {error.message}</div>;
    if(!data) return <div>Loading...</div>;
   


    const opportunityDistricts = data.barData.map((d) => d.opportunityDistricts);
    //const totalDistricts = data.totalDistricts;
    const totalDistricts = data.totalDistricts;
    const maxFrequency = Math.max(...opportunityDistricts.map((d) => d.frequency || 0)); 
    const dtickValue = Math.ceil(maxFrequency / 5);

    const averageSeatShare = (data.democratAvgSeatShare * 100).toFixed(1);
    const voteShare = (data.democratAvgVoteShare * 100).toFixed(1);
    console.log(opportunityDistricts);
    const trace = {
        x: opportunityDistricts,
        type: 'histogram',
        xbins: {
            start: 0 - 0.5, 
            end: totalDistricts + 0.5, 
            size: 1, 
        },
        marker: {
          color: '#7ff5b8',
          line: {
            color: 'black',
            width: 0,
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
        title: title || `${data.electionType} - Opportunity Districts` ,
        font: {
            size: fontSize, 
        },
        xaxis: {
          title: x_label || 'Number of Opportunity Districts',
          range: [0 - 0.5, totalDistricts + 0.5],
          tickmode: 'linear', 
          dtick: 1,
          showline: true,
          linecolor: 'black', 
          linewidth: 2, 

        },
        yaxis: {
          title: y_label || 'Number of Plans',
          dtick: dtickValue,
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

export default OpportunityDistrictsPlot;
   





