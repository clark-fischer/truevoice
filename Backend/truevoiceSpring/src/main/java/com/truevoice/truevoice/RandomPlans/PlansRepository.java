// package com.truevoice.truevoice.RandomPlans;

// import org.bson.types.ObjectId;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;
// import org.springframework.stereotype.Repository;
// import java.util.Optional;
// import com.truevoice.truevoice.Enum.StateCode;
// import com.truevoice.truevoice.RandomPlans.Collections.Plans;

// @Repository
// public interface PlansRepository extends MongoRepository<Plans, ObjectId> {

//     // Custom method to find a state document by its 'state' field using @Query
//     @Query("{ 'state': ?0 }")
//     Optional<Plans> findByState(StateCode state);
// }

package com.truevoice.truevoice.RandomPlans;
import com.truevoice.truevoice.RandomPlans.Collections.DistrictPlan;
import com.truevoice.truevoice.RandomPlans.Collections.SeatVoteShare;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

@Repository
public interface PlansRepository extends MongoRepository<DistrictPlan, ObjectId> {

    // Custom query to find by state, planType, and characteristic
    @Query("{ 'fips': ?0, 'electionType': ?1, 'characteristic': ?2 }")
    Optional<DistrictPlan> findDistrictPlan(FIPS fips, ElectionType electionType, Characteristic characteristic);


    // @Query(value = "{ 'state': ?0, 'planType': ?1, 'characteristic': ?2 }", fields = "{ 'seatVoteShare': 0 }")
    // Optional<DistrictPlan> findDistrictPlan(FIPS state, ElectionType type, Characteristic characteristic);

    @Query(value = "{ 'fips': ?0, 'electionType': ?1, 'characteristic': ?2 }", fields = "{ 'seatVoteShare': 1 }")
    DistrictPlan findVoteSeatPlot(FIPS fips, ElectionType electionType, Characteristic characteristic);

}
