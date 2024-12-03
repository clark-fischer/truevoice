// package com.truevoice.truevoice.SeatVote;
// import com.truevoice.truevoice.RandomPlans.Collections.DistrictPlan;

// import java.util.Optional;

// import org.bson.types.ObjectId;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;
// import org.springframework.data.repository.query.Param;
// import org.springframework.stereotype.Repository;

// import com.truevoice.truevoice.FRAEnum.Characteristic;
// import com.truevoice.truevoice.FRAEnum.ElectionType;
// import com.truevoice.truevoice.FRAEnum.FIPS;

// @Repository
// public interface SeatVoteRepository extends MongoRepository<DistrictPlan, ObjectId> {

//     @Query("{ 'crs.properties.fips': ?0, 'crs.properties.electionType': ?1, 'crs.properties.characteristic': ?2 }")
//     Optional<DistrictPlan> findSeatVoteCurve(FIPS fips, ElectionType electionType, Characteristic characteristic);

// }
