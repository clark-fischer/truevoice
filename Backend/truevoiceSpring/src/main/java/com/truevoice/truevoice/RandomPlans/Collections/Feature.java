package com.truevoice.truevoice.RandomPlans.Collections;

public class Feature {
    private String type; 
    private FeatureProperties properties; 
    private Geometry geometry; 
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public FeatureProperties getProperties() {
        return properties;
    }
    public void setProperties(FeatureProperties properties) {
        this.properties = properties;
    }
    public Geometry getGeometry() {
        return geometry;
    }
    public void setGeometry(Geometry geometry) {
        this.geometry = geometry;
    }
}
