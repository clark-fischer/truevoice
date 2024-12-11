package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.HeatMap.Collections.PrecinctHeatMap;
import com.truevoice.truevoice.HeatMap.Collections.SMDHeatMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class HeatMapService {

    @Autowired
    private HeatMapRepository heatMapRepository;

    public HeatMapService(HeatMapRepository heatMapRepository) {
        this.heatMapRepository = heatMapRepository;
    }

    @Cacheable
    public SMDHeatMap getSMDHeatMap(FIPS fips,ElectionType electionType) {
        return heatMapRepository.findSMDHeatMap(fips,electionType)
                .orElseThrow(() -> new RuntimeException("Heat Map not found"));
    }

    @Cacheable
    public PrecinctHeatMap getPrecinctHeatMap(FIPS fips) {
        return heatMapRepository.findPrecinctHeatMap(fips)
                .orElseThrow(() -> new RuntimeException("Heat Map not found"));
    }
}