import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


//opp representative
function opportunityRepresentativesPlot({title ,x_lable, y_lable, fips, electionType, characteristic }){

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



   const opportunityRepresentatives = data.ensembleSummary.map((d) => d.opportunityRepresentatives);
  const averageSeatShare = (data.avgSeatShare * 100).toFixed(2); // Format as percentage
  const voteShare = (data.voteShare * 100).toFixed(2); // Format as percentage
  const trace = {
    x: opportunityRepresentatives,
    type: 'histogram',
    marker: {
      color: '#7ff5b8',
      line: {
        color: 'black',
        width: 1,
      },
    },
  };


  const layout = {
    title: title || 'Opportunity Representatives Distribution',
    xaxis: {
      title: x_label || 'Number of Opportunity Representatives',
    },
    yaxis: {
      title: y_label || 'Frequency',
    },
    annotations: [
      {
        x: 0.65,
        y: 0.8,
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

export default opportunityRepresentativesPlot;
   





