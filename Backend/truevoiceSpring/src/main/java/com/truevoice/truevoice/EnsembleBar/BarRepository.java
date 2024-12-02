package com.truevoice.truevoice.EnsembleBar;

import com.truevoice.truevoice.EnsembleBar.Collections.EnsembleBar;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BarRepository extends MongoRepository<EnsembleBar, ObjectId> {

    @Query("{ 'fips': ?0, 'electionType': ?1 }")
    Optional<EnsembleBar> findEnsembleBar(FIPS fips, ElectionType electionType);

}