package com.truevoice.truevoice.Nevada.Collections;

public class NevFeature {
    private String type;  // This should be "Feature"
    private NevFeatureProperties properties;  // Now using the NevFeatureProperties class
    private NevGeometry geometry;  // Geometry object to store the shape
    // Getters and Setters
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public NevFeatureProperties getProperties() {
        return properties;
    }
    public void setProperties(NevFeatureProperties properties) {
        this.properties = properties;
    }
    public NevGeometry getGeometry() {
        return geometry;
    }
    public void setGeometry(NevGeometry geometry) {
        this.geometry = geometry;
    }
}
