package com.truevoice.truevoice.States.Collections;

import java.util.Map;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "state")
public class States {

    @Id
    private ObjectId id;

    private String state;
    private int total_population;
    private int voting_population;
    private Map<String, Integer> demographic_group; // Map for demographic groups like WHITE, BLACK, etc.
    private int seats;
    private double Republicans;
    private double Democrats;
}
