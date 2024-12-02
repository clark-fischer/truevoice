package com.truevoice.truevoice.Ensemble;

import com.truevoice.truevoice.BoxWhisker.Collections.BoxWhiskerData;
import com.truevoice.truevoice.Ensemble.Collections.EnsembleSummary;
import com.truevoice.truevoice.Ensemble.Collections.StateData;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class EnsembleService {

    // @Autowired
    // private EnsembleRepository ensembleRepository;

    // public EnsembleService(EnsembleRepository ensembleRepository) {
    //     this.ensembleRepository = ensembleRepository;
    // }

    // @Cacheable
    // public StateData getStateData(FIPS fips, ElectionType electionType) {
    //     return ensembleRepository.findStateData(fips, electionType)
    //             .orElseThrow(() -> new RuntimeException("State data not found"));
    // }
}