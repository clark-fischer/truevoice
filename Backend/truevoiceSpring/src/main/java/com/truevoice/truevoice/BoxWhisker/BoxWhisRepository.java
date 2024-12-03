package com.truevoice.truevoice.BoxWhisker;

import com.truevoice.truevoice.BoxWhisker.Collections.BoxWhiskerData;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoxWhisRepository extends MongoRepository<BoxWhiskerData, ObjectId> {


    @Query(value = "{ 'fips': ?0, 'electionType': ?1 }")
    Optional<BoxWhiskerData> findBoxWhiskerData(FIPS fips, ElectionType electionType);
}