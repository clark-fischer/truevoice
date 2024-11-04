package com.truevoice.truevoice.States;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.truevoice.truevoice.States.Collections.States;

@Service
public class StatesService {

    @Autowired
    private StatesRepository statesRepository;

    public StatesService(StatesRepository statesRepository) {
        this.statesRepository = statesRepository;
    }

    /**
     * Retrieves state information based on the provided state code.
     *
     * @param state The state code to search for.
     * @return The States object containing information about the specified state.
     * @throws IllegalArgumentException if the state is not found.
     */
    public States getSummaryByState(String state) {
        // Validate the input
        if (state == null || state.isEmpty()) {
            throw new IllegalArgumentException("State cannot be null or empty");
        }

        // Retrieve the state information
        Optional<States> stateData = statesRepository.findByState(state);

        // Return the found state or throw an exception if not found
        return stateData.orElseThrow(() -> new IllegalArgumentException("State not found: " + state));
    }
}
