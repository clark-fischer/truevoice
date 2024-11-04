package com.truevoice.truevoice.States;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.truevoice.truevoice.States.Collections.States;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StatesController {
    @Autowired
    private StatesService statesService;
    public StatesController(StatesService statesService) {
        this.statesService = statesService;
    }

@GetMapping("/{state}/summary")
public States getSummary(@PathVariable String state) {
    return statesService.getSummaryByState(state);
}
}