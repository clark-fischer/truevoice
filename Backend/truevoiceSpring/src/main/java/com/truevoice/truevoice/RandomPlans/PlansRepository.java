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

    @Query("{ 'crs.properties.fips': ?0, 'crs.properties.electionType': ?1, 'crs.properties.characteristic': ?2 }")
    Optional<DistrictPlan> findDistrictPlan(FIPS fips, ElectionType electionType, Characteristic characteristic);
}
