package com.truevoice.truevoice.EnsembleBar;

import com.truevoice.truevoice.EnsembleBar.Collections.EnsembleBar;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BarController {

    @Autowired
    private BarService barService;

    public BarController(BarService barService) {
        this.barService = barService;
    }

    @GetMapping("/{fips}/{electionType}/BAR")
    public EnsembleBar getEnsembleBar(
            @PathVariable("fips") FIPS fips,
            @PathVariable("electionType") ElectionType electionType) {
        return barService.getEnsembleBar(fips, electionType);
    }
}