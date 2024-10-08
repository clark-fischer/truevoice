package com.truevoice.truevoice;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "geos")
public class Geo {
    private ObjectId id;
    private String type;  // This should be "FeatureCollection"
    private String name;  // Corresponds to the "name" field in the JSON
    private List<Feature> features;  // List of Feature objects
}
