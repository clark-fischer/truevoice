package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.HeatMap.Collections.HeatMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HeatMapController {

    @Autowired
    private HeatMapService heatMapService;

    public HeatMapController(HeatMapService heatMapService) {
        this.heatMapService = heatMapService;
    }

    @GetMapping("/{fips}/HEATMAP")
    public HeatMap getEnsembleBar(
            @PathVariable("fips") FIPS fips) {
        return heatMapService.getHeatMap(fips);
    }
}