package com.truevoice.truevoice.SeatVote;

import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.SeatVote.Collections.SeatVote;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SeatVoteController {

    @Autowired
    private SeatVoteService seatVoteService;

    public SeatVoteController(SeatVoteService seatVoteService) {
        this.seatVoteService = seatVoteService;
    }

    @GetMapping("/{fips}/{electionType}/{characteristic}/SEATVOTE")
    public Optional<SeatVote> getSeatVoteCurve(
        @PathVariable("fips") FIPS fips,
        @PathVariable("electionType") ElectionType electionType,
        @PathVariable("characteristic") Characteristic characteristic) {
        
    
        return seatVoteService.getCurveFromDB(fips, electionType, characteristic);
    }

    
}
