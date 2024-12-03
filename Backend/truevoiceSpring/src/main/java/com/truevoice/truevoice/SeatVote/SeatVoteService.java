package com.truevoice.truevoice.SeatVote;
import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.truevoice.truevoice.SeatVote.Collections.SeatVote;

@Service
public class SeatVoteService {

    @Autowired
    private SeatVoteRepository seatVoteRepository;

    public SeatVoteService(SeatVoteRepository seatVoteRepository) {
        this.seatVoteRepository = seatVoteRepository;
    }

    @Cacheable
    public Optional<SeatVote> getCurveFromDB(FIPS fips, ElectionType electionType, Characteristic characteristic) {
        return seatVoteRepository.findSeatVoteCurve(fips, electionType, characteristic);
    }

    
}
