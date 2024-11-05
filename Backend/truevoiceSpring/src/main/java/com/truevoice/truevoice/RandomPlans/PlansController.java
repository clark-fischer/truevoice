package com.truevoice.truevoice.RandomPlans;

// package com.truevoice.truevoice.RandomPlans;

// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RestController;

// import com.truevoice.truevoice.Enum.StateCode;
// import com.truevoice.truevoice.RandomPlans.Collections.Plans;

// @RestController
// @CrossOrigin(origins = "http://localhost:5173")
// public class PlansController {
//     @Autowired
//     private PlansService plansService;
//     public PlansController(PlansService plansService) {
//         this.plansService = plansService;
//     }

// @GetMapping("/{state}/{type}/{characteristic}")
// public Optional<Plans> getSummary(@PathVariable StateCode state) {
//     return plansService.getSummaryByState(state);
// }
// }
import com.truevoice.truevoice.Enum.PlanType;
import com.truevoice.truevoice.Enum.StateCode;
import com.truevoice.truevoice.Enum.Characteristic;

import com.truevoice.truevoice.RandomPlans.Collections.Plans;

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

    @GetMapping("/{state}/{type}/{characteristic}")
    public Optional<Plans> getSummary(
        @PathVariable StateCode state,
        @PathVariable PlanType type,
        @PathVariable Characteristic characteristic) {
        
        System.out.println("Received state: " + state);
        System.out.println("Received type: " + type);
        System.out.println("Received characteristic: " + characteristic);
    
        return plansService.getSummaryByStateTypeAndCharacteristic(state, type, characteristic);
    }
    
}
