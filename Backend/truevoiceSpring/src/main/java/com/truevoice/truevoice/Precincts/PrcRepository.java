package com.truevoice.truevoice.Precincts;
import org.bson.types.ObjectId;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.truevoice.truevoice.Nevada.Collections.NevDistrict;

@Repository
public interface PrcRepository extends MongoRepository<NevDistrict, ObjectId>{
}