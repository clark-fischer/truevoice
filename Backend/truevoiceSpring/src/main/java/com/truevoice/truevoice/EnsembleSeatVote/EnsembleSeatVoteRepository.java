package com.truevoice.truevoice.EnsembleSeatVote;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.truevoice.truevoice.EnsembleSeatVote.Collections.EnsembleSeatVote;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

@Repository
public interface EnsembleSeatVoteRepository extends MongoRepository<EnsembleSeatVote, ObjectId> {

    @Query("{ 'fips': ?0, 'electionType': ?1}")
    Optional<EnsembleSeatVote> findSeatVoteCurve(FIPS fips, ElectionType electionType);

}
