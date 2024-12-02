package com.truevoice.truevoice.Ensemble;

// import com.truevoice.truevoice.Ensemble.Collections.BoxWhiskerData;
// import com.truevoice.truevoice.Ensemble.Collections.EnsembleSummary;
import com.truevoice.truevoice.Ensemble.Collections.StateData;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EnsembleRepository extends MongoRepository<StateData, ObjectId> {


    // @Query("{ 'state.fips': ?0, 'state.ensemble.electionType': ?1 }")
    // Optional<StateData> findStateData(FIPS fips, ElectionType electionType);
}