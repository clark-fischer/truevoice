/* eslint-disable react/prop-types */
import React from 'react';

import OpportunityRepresentativesPlot from '../graphs/OpportunityRepresentativesPlot';
import OpportunityDistrictsPlot from '../graphs/OpportunityDistrictPlot';
import SMDBoxAndWhiskerPlot from '../graphs/EnsembleBoxAndWhiskerPlot';
import { Row, Col } from 'react-bootstrap';

import {
    Button,
    Center,
    TabPanel,
} from "@chakra-ui/react";

const PlotComparison = ({ plot1, plot2 }) => {
    return (
        < div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

            <div>
                {plot1}
            </div>
            <div>
                {plot2}
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
    const [comparisonBasis, setComparisonBasis] = React.useState("hispanic");
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const super_props = props.super_props;

    const plots = [

        <PlotComparison
            plot1={
                <OpportunityRepresentativesPlot fips={super_props.state} electionType={"MMD"} width={400} height={600} fontSize={9} />
            }
            plot2={
                <OpportunityRepresentativesPlot fips={super_props.state} electionType={"SMD"} width={400} height={600} fontSize={9} />
            }
        />,

        <PlotComparison
            plot1={
                <OpportunityDistrictsPlot fips={"NV"} electionType={"MMD"} width={400} height={600} fontSize={9} />
            }
            plot2={
                <OpportunityDistrictsPlot electionType={"SMD"} width={400} height={600} fontSize={9} />
            }
        />,

        <>

            <Center>
            <label style={{ marginBottom: "-5px" }}>
                Select Comparison Basis:
                <select
                    value={comparisonBasis}
                    onChange={(e) => setComparisonBasis(e.target.value)}
                    style={{ marginLeft: "10px", padding: "5px" }}
                >
                    <option value="hispanic">Hispanic</option>
                    <option value="black">Black</option>
                    <option value="asian">Asian</option>
                    <option value="white">White</option>
                </select>
            </label>
            </Center>

            <PlotComparison
                plot1={
                    <SMDBoxAndWhiskerPlot comparisonBasis={comparisonBasis} setComparisonBasis={setComparisonBasis} fips={"NV"} electionType={"MMD"} width={500} height={600} fontSize={9} />
                }
                plot2={
                    <SMDBoxAndWhiskerPlot comparisonBasis={comparisonBasis} setComparisonBasis={setComparisonBasis} fips={"NV"} electionType={"SMD"} width={500} height={600} fontSize={9} />
                }
            /></>,

        // <SMDBoxAndWhiskerPlot fips={super_props.state} characteristic={super_props.characteristic} electionType={super_props.electionType} />

        // <OnTop />,

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



            <PlotCarousel super_props={props} />


        </TabPanel>
    );

};


export default Ensemble;