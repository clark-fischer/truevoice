package com.truevoice.truevoice.RandomPlans.Collections;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "plans")
public class DistrictPlan {
    private ObjectId _id;
    private String type; 
    private String name;  
    private Crs crs;
    private List<Features> features; 
}
