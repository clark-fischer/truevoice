package com.truevoice.truevoice.Nevada.Collections;


import java.util.List;

public class NevGeometry {
    private String type;  // Could be "Polygon" or "MultiPolygon"
    private List<List<List<Double>>> coordinates;  // Nested list for coordinates (List of List of List of Double)
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
