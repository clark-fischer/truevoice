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
                <OpportunityRepresentativesPlot width={400} height={600} fontSize={9}/>
            </div>
            <div>
                <OpportunityDistrictsPlot width={400} height={600} fontSize={9} />
            </div>
        </div >


    );
};


const PlotCarousel = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const plots = [
        <OpportunityRepresentativesPlot />,
        <OpportunityDistrictsPlot />,
        <PlotComparison />,
        <SMDBoxAndWhiskerPlot fips="NV" electionType="SMD" />
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



            <PlotCarousel />


        </TabPanel>
    );

};


export default Ensemble;