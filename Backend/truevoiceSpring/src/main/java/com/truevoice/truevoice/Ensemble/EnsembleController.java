package com.truevoice.truevoice.Ensemble;

import com.truevoice.truevoice.Ensemble.Collections.StateData;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EnsembleController {

    // @Autowired
    // private EnsembleService ensembleService;

    // public EnsembleController(EnsembleService ensembleService) {
    //     this.ensembleService = ensembleService;
    // }

    // // @GetMapping("/{fips}/{electionType}/ENSEMBLE")
    // // public StateData getEnsembleSummary(
    // //         @PathVariable("fips") FIPS fips,
    // //         @PathVariable("electionType") ElectionType electionType) {
    // //     return ensembleService.getEnsembleSummary(fips, electionType);
    // // }

    // @GetMapping("/{fips}/{electionType}/BAR")
    // public StateData getStateData(
    //         @PathVariable("fips") FIPS fips,
    //         @PathVariable("electionType") ElectionType electionType) {
    //     return ensembleService.getStateData(fips, electionType);
    // }
}