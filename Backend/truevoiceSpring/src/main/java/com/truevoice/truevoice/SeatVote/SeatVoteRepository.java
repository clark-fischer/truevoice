package com.truevoice.truevoice.SeatVote;
import com.truevoice.truevoice.SeatVote.Collections.SeatVote;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

@Repository
public interface SeatVoteRepository extends MongoRepository<SeatVote, ObjectId> {

    @Query("{ 'fips': ?0, 'electionType': ?1, 'characteristic': ?2 }")
    Optional<SeatVote> findSeatVoteCurve(FIPS fips, ElectionType electionType, Characteristic characteristic);

}
