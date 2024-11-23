package com.truevoice.truevoice.States;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.truevoice.truevoice.States.Collections.States;
import com.truevoice.truevoice.FRAEnum.FIPS;

@Service
public class StatesService {

    @Autowired
    private StatesRepository statesRepository;

    public StatesService(StatesRepository statesRepository) {
        this.statesRepository = statesRepository;
    }

    /**
     * @param fips 
     * @return 
     * @throws IllegalArgumentException
     */
    public States getSummaryByState(FIPS fips) {
        // Retrieve the state information
        Optional<States> stateData = statesRepository.findByState(fips);

        // Return the found state or throw an exception if not found
        return stateData.orElseThrow(() -> new IllegalArgumentException("State not found: " + fips));
    }
}
