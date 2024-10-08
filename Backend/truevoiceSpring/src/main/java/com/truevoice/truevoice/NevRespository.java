package com.truevoice.truevoice;
import org.bson.types.ObjectId;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NevRespository extends MongoRepository<Geo, ObjectId>{
    
}
