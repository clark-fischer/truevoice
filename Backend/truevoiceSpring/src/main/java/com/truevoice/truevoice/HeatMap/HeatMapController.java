package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.HeatMap.Collections.PrecinctHeatMap;
import com.truevoice.truevoice.HeatMap.Collections.SMDHeatMap;

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

    @GetMapping("/{fips}/{electionType}/HEATMAP")
    public SMDHeatMap getSMDHeatMap(
        @PathVariable("fips") FIPS fips, @PathVariable("electionType") ElectionType electionType) {
        return heatMapService.getSMDHeatMap(fips,electionType);
    }

    @GetMapping("/{fips}/PRECINCT/HEATMAP")
    public PrecinctHeatMap getPrecinctHeatMap(
            @PathVariable("fips") FIPS fips) {
        return heatMapService.getPrecinctHeatMap(fips);
    }


}