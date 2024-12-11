/* eslint-disable react/prop-types */
import React from 'react';

import OpportunityRepresentativesPlot from '../graphs/OpportunityRepresentativesPlot';
import OpportunityDistrictsPlot from '../graphs/OpportunityDistrictPlot';
import SMDBoxAndWhiskerPlot from '../graphs/EnsembleBoxAndWhiskerPlot';
import VoteShareSeatSharePlot from '../graphs/VoteSeatSharePlotPlanSpecific'

import {
    TabPanel,
} from "@chakra-ui/react";


const Ensemble = (props) => {

    return (
        <TabPanel padding={0}>

          <OpportunityRepresentativesPlot />
          <OpportunityDistrictsPlot />
          <SMDBoxAndWhiskerPlot />
          <VoteShareSeatSharePlot />

        </TabPanel>
    );

};


export default Ensemble;