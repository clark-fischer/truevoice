package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.HeatMap.Collections.DistrictHeatmap;
import com.truevoice.truevoice.HeatMap.Collections.HeatMap;

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
    public HeatMap getPrecinctHeatMap(FIPS fips) {
        return heatMapRepository.findPrecinctHeatMap(fips)
                .orElseThrow(() -> new RuntimeException("Heat Map not found"));
    }

    @Cacheable
    public DistrictHeatmap getDistrictHeatMap(FIPS fips, ElectionType electionType) {
        return heatMapRepository.findDistrictHeatMap(fips,electionType)
                .orElseThrow(() -> new RuntimeException("Heat Map not found"));
    }
}