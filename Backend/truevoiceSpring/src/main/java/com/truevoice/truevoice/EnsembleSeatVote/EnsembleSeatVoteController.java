package com.truevoice.truevoice.EnsembleSeatVote;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.EnsembleSeatVote.Collections.EnsembleSeatVote;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EnsembleSeatVoteController {

    @Autowired
    private EnsembleSeatVoteService seatVoteService;

    public EnsembleSeatVoteController(EnsembleSeatVoteService seatVoteService) {
        this.seatVoteService = seatVoteService;
    }

    @GetMapping("/{fips}/{electionType}/SEATVOTE")
    public Optional<EnsembleSeatVote> getSeatVoteCurve(
        @PathVariable("fips") FIPS fips,
        @PathVariable("electionType") ElectionType electionType) {
        
    
        return seatVoteService.getCurveFromDB(fips, electionType);
    }

    
}
