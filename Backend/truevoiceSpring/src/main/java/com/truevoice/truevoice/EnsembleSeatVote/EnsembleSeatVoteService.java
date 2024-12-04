package com.truevoice.truevoice.EnsembleSeatVote;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.EnsembleSeatVote.Collections.EnsembleSeatVote;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;


@Service
public class EnsembleSeatVoteService {

    @Autowired
    private EnsembleSeatVoteRepository seatVoteRepository;

    public EnsembleSeatVoteService(EnsembleSeatVoteRepository seatVoteRepository) {
        this.seatVoteRepository = seatVoteRepository;
    }

    @Cacheable
    public Optional<EnsembleSeatVote> getCurveFromDB(FIPS fips, ElectionType electionType) {
        return seatVoteRepository.findSeatVoteCurve(fips, electionType);
    }

    
}
