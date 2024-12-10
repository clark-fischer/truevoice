package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.HeatMap.Collections.HeatMap;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface HeatMapRepository extends MongoRepository<HeatMap, ObjectId> {

    @Query("{ 'fips': ?0 }")
    Optional<HeatMap> findSMDHeatMap(FIPS fips);

    @Query("{ 'fips': ?0, 'electionType': { $exists: false } }")
    Optional<HeatMap> findPrecinctHeatMap(FIPS fips);
}