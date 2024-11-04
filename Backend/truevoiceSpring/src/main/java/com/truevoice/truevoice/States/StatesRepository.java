package com.truevoice.truevoice.States;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.truevoice.truevoice.States.Collections.States;

@Repository
public interface StatesRepository extends MongoRepository<States, ObjectId> {

    // Custom method to find a state document by its 'state' field using @Query
    @Query("{ 'state': ?0 }")
    Optional<States> findByState(String state);
}
