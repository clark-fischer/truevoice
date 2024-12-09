import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


//opp representative
function OpportunityDistrictPlot({title ,x_lable, y_lable, fips, electionType, characteristic }){

    const [data, setData] = useState(null);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try{
                //const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
                const response = await axios.get(`http://localhost:8080/NV/SMD/BAR`);
                setData(response.data);

            }catch (err){
                setError(err)
                }

        };
        fetchData();

    }, []);
    
    if(error) return <div>Error: {error.message}</div>;
    if(!data) return <div>Loading...</div>;

    const opportunityDistricts = data.barData.map((d) => d.opportunityDistricts);
    const totalDistricts = data.totalDistricts;
    const minDistrict = Math.min(...opportunityDistricts);
    const maxDistrict = Math.max(...opportunityDistricts);
    const bins = Array.from({ length: maxDistrict - minDistrict + 2 }, (_, i) => minDistrict + i);
  
    const averageSeatShare = (data.avgSeatShare * 100).toFixed(2); 
    const voteShare = (data.voteShare * 100).toFixed(2); 

    const trace = {
        x: opportunityDistricts,
        type: 'histogram',
        xbins: {
          start: bins[0],
          end: bins[bins.length - 1],
          size: 1, // Bin size is 1 to ensure whole integers
        },
        marker: {
          color: '#7ff5b8',
          line: {
            color: 'black',
            width: 1,
          },
        },
      };
    
      const layout = {
        title: 'Opportunity Districts Distribution',
        xaxis: {
          title: 'Number of Opportunity Districts',
          tickmode: 'linear',
          tick0: minDistrict,
          dtick: 1, // Ensure whole integers on the x-axis
        },
        yaxis: {
          title:  'Frequency',
        },
        annotations: [
          {
            x: 0.65,
            y: 0.8,
            xref: 'paper',
            yref: 'paper',
            text: `Average Seat Share: ${(data.average_seat_share * 100).toFixed(2)}%<br>Vote Share: ${(data.vote_share * 100).toFixed(2)}%`,
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
        bargap: 0, // Bars tightly packed
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

export default OpportunityDistrictPlot;
   





