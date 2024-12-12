import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


//opp representative
function OpportunityDistrictsPlot({title ,x_label, y_label, fips, electionType, height=600, width=800, fontSize=14}) {

    const [data, setData] = useState(null);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try{
                //const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/BAR`);
                const response = await axios.get(`http://localhost:8080/NV/SMD/BAR`);
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

    const averageSeatShare = Number(data.democratAvgSeatShare * 100).toFixed(2).replace(/\.00$/, '');
    const voteShare = Number(data.democratAvgVoteShare * 100).toFixed(2).replace(/\.00$/, '');
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
    
      const layout = {
        title: title || `${data.electionType} Ensemble summary: Opportunity Districts` ,
        font: {
            size: fontSize, 
        },
        xaxis: {
          title: x_label || 'Number of Opportunity Districts',
          tickmode: 'linear',
          
          range: [0 - 0.5, totalDistricts + 0.5],
          tickmode: 'linear', 
          dtick: 1,
          showline: true,
          linecolor: 'black', 
          linewidth: 2, 

        },
        yaxis: {
          title: y_label || 'Frequency',
          dtick: dtickValue,
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
        // margin: {
        //   l: 50,
        //   r: 50,
        //   t: 50,
        //   b: 50,
        // },
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
   





