package com.truevoice.truevoice.EnsembleBar;

import com.truevoice.truevoice.EnsembleBar.Collections.EnsembleBar;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class BarService {

    @Autowired
    private BarRepository barRepository;

    public BarService(BarRepository barRepository) {
        this.barRepository = barRepository;
    }

    @Cacheable
    public EnsembleBar getEnsembleBar(FIPS fips, ElectionType electionType) {
        return barRepository.findEnsembleBar(fips, electionType)
                .orElseThrow(() -> new RuntimeException("Ensemble summary not found"));
    }
}