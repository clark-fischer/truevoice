import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


//opp representative
function OpportunityDistrictsPlot({title ,x_label, y_label, fips, electionType, characteristic }){

    const [data, setData] = useState(null);
    const [error,setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            try{
                const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
                //const response = await axios.get(`http://localhost:8080/NV/SMD/BAR`);
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
    //const totalDistricts = data.state.ensemble.ensembleSummary.totalDistricts;
    const minDistrict = Math.min(...opportunityDistricts);
    const maxDistrict = Math.max(...opportunityDistricts);
    const bins = Array.from({ length: maxDistrict - minDistrict + 2 }, (_, i) => minDistrict + i);
  
    const averageSeatShare = Number(data.avgSeatShare * 100).toFixed(2).replace(/\.00$/, '');
    const voteShare = Number(data.voteShare * 100).toFixed(2).replace(/\.00$/, '');
    const trace = {
        x: opportunityDistricts,
        type: 'histogram',
        xbins: {
          start: bins[0],
          end: bins[bins.length - 1],
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
        title: title || 'Opportunity Districts Distribution',
        xaxis: {
          title: x_label || 'Number of Opportunity Districts',
          tickmode: 'linear',
          tick0: minDistrict,
          tickmode: 'linear', 
          dtick: 1,
          showline: true,
          linecolor: 'black', 
          linewidth: 2, 
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

export default OpportunityDistrictsPlot;
   





