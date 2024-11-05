package com.truevoice.truevoice.RandomPlans.Collections;


import java.util.List;

public class Geometry {
    private String type;  
    private List<List<List<Double>>> coordinates; 
    // Getters and Setters
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public List<List<List<Double>>> getCoordinates() {
        return coordinates;
    }
    public void setCoordinates(List<List<List<Double>>> coordinates) {
        this.coordinates = coordinates;
    }
}
