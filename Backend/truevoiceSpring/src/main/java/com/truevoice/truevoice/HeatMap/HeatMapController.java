package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.HeatMap.Collections.DistrictHeatmap;
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

    @GetMapping("/{fips}/PRECINCT/HEATMAP")
    public HeatMap getPrecinctHeatmap(
            @PathVariable("fips") FIPS fips) {
        return heatMapService.getPrecinctHeatMap(fips);
    }

    @GetMapping("/{fips}/{electionType}/HEATMAP")
    public DistrictHeatmap getDistrictHeatmap(
            @PathVariable("fips") FIPS fips, @PathVariable("electionType") ElectionType electionType) {
        return heatMapService.getDistrictHeatMap(fips, electionType);
    }
}