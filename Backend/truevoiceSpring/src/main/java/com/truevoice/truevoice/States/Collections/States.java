package com.truevoice.truevoice.States.Collections;

import java.util.Map;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.Enum.StateCode;

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
    private StateCode state;
    private int totalPopulation;
    private int votingPopulation;
    private Map<String, Integer> demographicGroup;
    private int seats;
    private double republicans;
    private double democrats;
}
