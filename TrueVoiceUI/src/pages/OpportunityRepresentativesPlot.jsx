import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


//opp representative
function OpportunityRepresentativesPlot(){

    const [data, setData] = useState([]);
    const [error,setError] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try{            
                //const response = await axios.get(`http://localhost:8080/${fips}/${electionType}/${characteristic}`);
                const response = await axios.get(`http://localhost:8080/NV/SMD/BAR`);
                console.log(response.data);
                setData(response.data);

            }catch (err){
                setError(err)
                }

        };
        fetchData();

    }, []);
    
    if(error) return <div>Error: {error.message}</div>;
    if(!data) return <div>Loading...</div>;



  const opportunityRepresentatives = data.barData.map((d) => d.opportunityRepresentatives);
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
    title: 'Opportunity Representatives Distribution',
    xaxis: {
      title:  'Number of Opportunity Representatives',
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

export default OpportunityRepresentativesPlot;
   





