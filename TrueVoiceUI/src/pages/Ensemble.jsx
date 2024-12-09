/* eslint-disable react/prop-types */
import React from 'react';


import OpportunityRepresentativesPlot from './OpportunityRepresentativesPlot';
import OpportunityDistrictPlot from './OpportunityDistrictPlot';
import SMDBoxAndWhiskerPlot from './SMDBoxAndWhiskerPlot';

import {
    TabPanel,
} from "@chakra-ui/react";


const Ensemble = (props) => {

    return (
        <TabPanel padding={0}>

          <OpportunityRepresentativesPlot />
          <OpportunityDistrictPlot />
          <SMDBoxAndWhiskerPlot />

        </TabPanel>
    );

};


export default Ensemble;