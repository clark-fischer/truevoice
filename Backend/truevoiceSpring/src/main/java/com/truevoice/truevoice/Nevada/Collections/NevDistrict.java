package com.truevoice.truevoice.Nevada.Collections;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "nevada")
public class NevDistrict {
    private ObjectId _id;
    private String type; 
    private String name;  
    private NevCrs crs;
    private List<NevFeature> features; 
}
