package com.truevoice.truevoice.Nevada;
import org.bson.types.ObjectId;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.truevoice.truevoice.Nevada.Collections.NevDistrict;

@Repository
public interface NevRepository extends MongoRepository<NevDistrict, ObjectId>{
}