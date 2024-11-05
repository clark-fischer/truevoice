package com.truevoice.truevoice.RandomPlans.Collections;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.Enum.Characteristic;
import com.truevoice.truevoice.Enum.PlanType;
import com.truevoice.truevoice.Enum.StateCode;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "plans")
public class Plans {


    @Id
    private ObjectId id;
    private StateCode state;
    private PlanType planType;
    private Characteristic characteristic;
    private Crs crs;
    private List<Feature> features; 
}
