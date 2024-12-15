/* eslint-disable react/prop-types */
import React from 'react';

import OpportunityRepresentativesPlot from '../graphs/OpportunityRepresentativesPlot';
import OpportunityDistrictsPlot from '../graphs/OpportunityDistrictPlot';
import PartySplitBarPlot from "../graphs/PartySplitBarPlot";
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
                <OpportunityDistrictsPlot fips={super_props.state} electionType={"MMD"} width={400} height={600} fontSize={9} />
            }
            plot2={
                <OpportunityDistrictsPlot electionType={"SMD"} width={400} height={600} fontSize={9} />
            }
        />,

        <PlotComparison
            plot1={
                <PartySplitBarPlot fips={super_props.state} electionType={"MMD"} width={400} height={600} fontSize={9} />
            }
            plot2={
                <PartySplitBarPlot electionType={"SMD"} width={400} height={600} fontSize={9} />
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
                    <SMDBoxAndWhiskerPlot comparisonBasis={comparisonBasis} setComparisonBasis={setComparisonBasis} fips={super_props.state} electionType={"MMD"} width={500} height={600} fontSize={9} />
                }
                plot2={
                    <SMDBoxAndWhiskerPlot comparisonBasis={comparisonBasis} setComparisonBasis={setComparisonBasis} fips={super_props.state} electionType={"SMD"} width={500} height={600} fontSize={9} />
                }
            /></>,

        <PrettyTable />,

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
            <p>out of 5040 plans</p>

        </TabPanel>
    );

};

// import React from "react";
import axios from "axios";

import co_mmd_summary from "../datafiles/ensemble_summary/co_mmd_summary_data_plan_specific.json"
import nv_mmd_summary from "../datafiles/ensemble_summary/nv_mmd_summary_data_plan_specific.json"

import co_smd_summary from "../datafiles/ensemble_summary/co_smd_summary_data_plan_specific.json"
import nv_smd_summary from "../datafiles/ensemble_summary/nv_smd_summary_data_plan_specific.json"
import { m } from 'framer-motion';

function PrettyTable({state="NV"}) {
    const sty1 = { border: "1px solid black", padding: "10px", backgroundColor: "#f2f2f2" };
    const sty2 = { border: "1px solid black", padding: "10px" };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let smd = await axios.get("http://localhost:8080/NV/SMD/ENACTED");
                smd = smd.data;

                let mmd = await axios.get("http://localhost:8080/NV/MMD/AVERAGE");
                mmd = mmd.data;

                

                document.querySelector(".smd_opp").innerText = `${smd.crs.properties.oppDistricts}`;
                document.querySelector(".mmd_opp").innerText = `${mmd.crs.properties.oppDistricts}`;

                if (state == "NV") {
                    smd = nv_smd_summary.interesting_plans_summary.find(item => item.characteristic === "ENACTED");
                    mmd = nv_mmd_summary.interesting_plans_summary.find(item => item.characteristic === "AVERAGE");
                } else {
                    smd = co_smd_summary.interesting_plans_summary.find(item => item.characteristic === "ENACTED");
                    mmd = co_mmd_summary.interesting_plans_summary.find(item => item.characteristic === "AVERAGE");
                }

                document.querySelector(".smd_vs").innerText = `${smd.voteShare}`;
                document.querySelector(".mmd_vs").innerText = `${mmd.voteShare}`;

                document.querySelector(".smd_seat").innerText = `${smd.seatShare}`;
                document.querySelector(".mmd_seat").innerText = `${mmd.seatShare}`;
                

                function sumDemocratRepresentatives(districtsSummary) {
                    return districtsSummary
                        .filter(district => district.partyWinner === "DEMOCRAT")
                        .reduce((total, district) => total + district.totalRepresentatives, 0);
                }
                const split = smd.districts_summary.filter(obj => obj.partyWinner === "REPUBLICAN").length;
                const split2 = sumDemocratRepresentatives(mmd.districts_summary)

                document.querySelector(".smd_dr_split").innerText = `${split} and ${smd.districts_summary.length - split}`;
                document.querySelector(".mmd_dr_split").innerText = `${split2} and ${smd.districts_summary.length - split2}`;

            } catch (err) {
                console.log("inital error");
                console.log(err);
            }
        };

        fetchData(); // Call the function
    }, []);

    return (
        <table style={{ margin: "10px", borderCollapse: "collapse", width: "98%", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <thead>
                <tr>
                    <th style={sty1}></th>
                    <th style={sty1}>SMD Stats</th>
                    <th style={sty1}>MMD Stats</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={sty2}>Democratic/Republican Splits</td>
                    <td style={sty2}><div className="smd_dr_split"></div></td>
                    <td style={sty2}><div className="mmd_dr_split"></div></td>
                </tr>
                <tr>
                    <td style={sty2}># of Opportunity Representatives</td>
                    <td style={sty2}><div className="smd_opp"></div></td>
                    <td style={sty2}><div className="mmd_opp"></div> </td>
                </tr>
                <tr>
                    <td style={sty2}>Vote Share</td>
                    <td style={sty2}><div className="smd_vs"></div></td>
                    <td style={sty2}><div className="mmd_vs"></div></td>
                </tr>
                <tr>
                    <td style={sty2}>Seat Share</td>
                    <td style={sty2}><div className="smd_seat"></div></td>
                    <td style={sty2}><div className="mmd_seat"></div></td>
                </tr>
            </tbody>
        </table>
    );
}

// export default PrettyTable;

// export default PrettyTable;

export default Ensemble;