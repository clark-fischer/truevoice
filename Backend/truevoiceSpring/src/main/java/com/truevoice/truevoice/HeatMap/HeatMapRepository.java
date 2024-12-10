package com.truevoice.truevoice.HeatMap;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.HeatMap.Collections.PrecinctHeatMap;
import com.truevoice.truevoice.HeatMap.Collections.SMDHeatMap;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface HeatMapRepository extends MongoRepository<PrecinctHeatMap, ObjectId> {

    @Query("{ 'fips': ?0, 'electionType': ?1 }")
    Optional<SMDHeatMap> findSMDHeatMap(FIPS fips,ElectionType electionType);

    @Query("{ 'fips': ?0, 'electionType': { $exists: false } }")
    Optional<PrecinctHeatMap> findPrecinctHeatMap(FIPS fips);
}