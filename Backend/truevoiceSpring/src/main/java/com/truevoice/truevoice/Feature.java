package com.truevoice.truevoice;

import java.util.Map;

public class Feature {
    private String type;  // This should be "Feature"
    private Map<String, Object> properties;  // A map to store properties like DISTRICTNO, ADJPOP, etc.
    private Geometry geometry;  // Geometry object to store the shape

    // Getters and Setters
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    public Geometry getGeometry() {
        return geometry;
    }

    public void setGeometry(Geometry geometry) {
        this.geometry = geometry;
    }
}
