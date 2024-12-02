package com.truevoice.truevoice.RandomPlans.Collections;

import java.util.List;

import lombok.Data;

@Data
public class Geometry {
     private String type;  
    private List<List<List<Double>>> coordinates;
}
