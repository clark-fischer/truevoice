package com.truevoice.truevoice.BoxWhisker;

import com.truevoice.truevoice.BoxWhisker.Collections.BoxWhiskerData;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BoxWhisController {

    @Autowired
    private BoxWhisService boxWhisService;

    public BoxWhisController(BoxWhisService boxWhisService) {
        this.boxWhisService = boxWhisService;
    }

    @GetMapping("/{fips}/{electionType}/BOXWHIS")
    public BoxWhiskerData getBoxWhiskerData(
            @PathVariable("fips") FIPS fips,
            @PathVariable("electionType") ElectionType electionType) {
        return boxWhisService.getBoxWhiskerData(fips, electionType);
    }


}