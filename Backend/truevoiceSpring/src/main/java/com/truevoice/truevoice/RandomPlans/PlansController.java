package com.truevoice.truevoice.RandomPlans;

import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.RandomPlans.Collections.DistrictPlan;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PlansController {

    @Autowired
    private PlansService plansService;

    public PlansController(PlansService plansService) {
        this.plansService = plansService;
    }

    @GetMapping("/{fips}/{electionType}/{characteristic}")
    public Optional<DistrictPlan> getDistrictPlan(
        @PathVariable("fips") FIPS fips,
        @PathVariable("electionType") ElectionType electionType,
        @PathVariable("characteristic") Characteristic characteristic) {
        
    
        return plansService.getPlanFromDB(fips, electionType, characteristic);
    }

    
}
