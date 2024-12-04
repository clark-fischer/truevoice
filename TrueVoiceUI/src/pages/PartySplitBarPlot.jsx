import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function PartySplitBarPlot({title ,x_label, y_label, fips, electionType, characteristic }) {

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

    }, [fips, electionType, characteristic]);

    if(error) return <div>Error: {error.message}</div>;
    if(!data) return <div>Loading...</div>;

    const diffValues = data.barData.map((d) => (d.democratsPercentage - d.republicanPercentage) * 10
    );

    
    const below50 = diffValues.filter((val) => val < 0);
    const above50 = diffValues.filter((val) => val >= 0);

    
    const averageSeatShare = Number(data.avgSeatShare * 100).toFixed(2).replace(/\.00$/, '');
    const voteShare = Number(data.voteShare * 100).toFixed(2).replace(/\.00$/, '');

    const traces = [
        {
          x: below50,
          type: 'histogram',
          name: 'Below 50% (REP)',
          marker: {
            color: '#FF0000',
            opacity: 0.7,
          },
          nbinsx: 5,
        },
        {
          x: above50,
          type: 'histogram',
          name: 'Above 50% (DEM)',
          marker: {
            color: '#0015BC',
            opacity: 0.7,
          },
          nbinsx: 5,
        },
      ];
    
      const layout = {
        title: title || `${data.electionType} Ensemble Summary: Distribution of Vote Share by Party`,
        font: {
          size: 14,
        },
        xaxis: {
          title: x_label || 'Democrat Points Advantage',
          range: [-0.7, 0.7], 
          tickmode: 'linear',
          dtick: 0.1, // Adjust tick spacing for better granularity
          showline: true,
          linecolor: 'black',
          linewidth: 2,
        },
        yaxis: {
          title: y_label || 'Frequency',
          tickmode: 'linear',
          dtick: 10, // Adjust dynamically if needed
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
        barmode: 'overlay',
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
          data={traces}
          layout={layout}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true }}
        />
      );
    
}

export default PartySplitBarPlot;
