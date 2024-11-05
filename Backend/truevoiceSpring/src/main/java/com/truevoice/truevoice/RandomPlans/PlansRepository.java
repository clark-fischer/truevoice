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


import com.truevoice.truevoice.Enum.PlanType;
import com.truevoice.truevoice.Enum.StateCode;
import com.truevoice.truevoice.RandomPlans.Collections.Plans;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.truevoice.truevoice.Enum.Characteristic;

@Repository
public interface PlansRepository extends MongoRepository<Plans, ObjectId> {

    // Custom query to find by state, planType, and characteristic
    @Query("{ 'state': ?0, 'planType': ?1, 'characteristic': ?2 }")
Optional<Plans> findByStateAndPlanTypeAndCharacteristic(StateCode state, PlanType type, Characteristic characteristic);

}
