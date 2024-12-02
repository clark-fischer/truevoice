package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.FIPS;
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
    public HeatMap getHeatMap(FIPS fips) {
        return heatMapRepository.findHeatMap(fips)
                .orElseThrow(() -> new RuntimeException("Heat Map not found"));
    }
}