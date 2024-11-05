// package com.truevoice.truevoice.RandomPlans;

// import java.util.Optional;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.truevoice.truevoice.Enum.StateCode;
// import com.truevoice.truevoice.RandomPlans.Collections.Plans;

// @Service
// public class PlansService {

//     @Autowired
//     private PlansRepository plansRepository;

//     public PlansService(PlansRepository plansRepository) {
//         this.plansRepository = plansRepository;
//     }

//     /**
//      * @param state 
//      * @return 
//      * @throws IllegalArgumentException
//      */
//     public Optional<Plans> getSummaryByState(StateCode state) {
//         // Retrieve the state information
//         Optional<Plans> stateData = plansRepository.findByState(state);

//         // Return the found state or throw an exception if not found
//         return stateData;
//     }
// }
package com.truevoice.truevoice.RandomPlans;
import com.truevoice.truevoice.Enum.PlanType;
import com.truevoice.truevoice.Enum.StateCode;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.truevoice.truevoice.Enum.Characteristic;
import com.truevoice.truevoice.RandomPlans.Collections.Plans;

@Service
public class PlansService {

    @Autowired
    private PlansRepository plansRepository;

    public PlansService(PlansRepository plansRepository) {
        this.plansRepository = plansRepository;
    }

    public Optional<Plans> getSummaryByStateTypeAndCharacteristic(StateCode state, PlanType type, Characteristic characteristic) {
        return plansRepository.findByStateAndPlanTypeAndCharacteristic(state, type, characteristic);
    }
    
}
