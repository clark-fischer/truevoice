/* eslint-disable react/prop-types */
import React from 'react';

import OpportunityRepresentativesPlot from './OpportunityRepresentativesPlot';
import OpportunityDistrictPlot from './OpportunityDistrictPlot';
import SMDBoxAndWhiskerPlot from './SMDBoxAndWhiskerPlot';
import VoteShareSeatSharePlot from './VoteShareSeatSharePlot'

import {
    TabPanel,
} from "@chakra-ui/react";


const Ensemble = (props) => {

    return (
        <TabPanel padding={0}>

          <OpportunityRepresentativesPlot />
          <OpportunityDistrictPlot />
          <SMDBoxAndWhiskerPlot />
          <VoteShareSeatSharePlot />

        </TabPanel>
    );

};


export default Ensemble;