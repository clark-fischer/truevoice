/* eslint-disable react/prop-types */
import React from 'react';

import OpportunityRepresentativesPlot from '../graphs/OpportunityRepresentativesPlot';
import OpportunityDistrictsPlot from '../graphs/OpportunityDistrictPlot';
import SMDBoxAndWhiskerPlot from '../graphs/EnsembleBoxAndWhiskerPlot';
import { Row, Col } from 'react-bootstrap';

import {
    Button,
    TabPanel,
} from "@chakra-ui/react";

const PlotComparison = () => {
    return (
        < div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

            <div>
                <OpportunityDistrictsPlot  fips={"NV"} electionType={"MMD"} width={400} height={600} fontSize={9}/>
            </div>
            <div>
                <OpportunityDistrictsPlot electionType={"SMD"}  width={400} height={600} fontSize={9} />
            </div>
        </div >


    );
};

// const OnTop = () => {
//     return (
//       <Row>
//         <Col md={6}>
//           <OpportunityRepresentativesPlot  height={300} fontSize={9} />
//         </Col>
//         <Col md={6}>
//           <OpportunityDistrictsPlot  height={300} fontSize={9} />
//         </Col>
//       </Row>
//     );
//   };
  

const PlotCarousel = (props) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const super_props = props.super_props;

    const plots = [
        
        <OpportunityRepresentativesPlot fips={super_props.state} characteristic={super_props.characteristic} electionType={super_props.electionType} />,
        <OpportunityDistrictsPlot fips={super_props.state} characteristic={super_props.characteristic} electionType={super_props.electionType} />,
        <PlotComparison fips={super_props.state} characteristic={super_props.characteristic} electionType={super_props.electionType} />,
        // <OnTop />,
        <SMDBoxAndWhiskerPlot fips={super_props.state} characteristic={super_props.characteristic} electionType={super_props.electionType} />
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + plots.length) % plots.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % plots.length);
    };

    return (
        <div>
            {plots[currentIndex]}
            < div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Button onClick={handlePrev}>Previous</Button>
            
            <Button onClick={handleNext}>Next</Button>
            </div>
            
        </div>
    );
};

// export default PlotCarousel;

const Ensemble = (props) => {

    return (
        <TabPanel padding={0}>



            <PlotCarousel super_props={props}/>


        </TabPanel>
    );

};


export default Ensemble;