package com.truevoice.truevoice.Nevada.Collections;

import java.util.Map;

public class NevFeature {
    private String type;  // This should be "Feature"
    private Map<String, Object> properties;  // A map to store properties like DISTRICTNO, ADJPOP, etc.
    private NevGeometry nevgeometry;  // Geometry object to store the shape
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
    public NevGeometry getGeometry() {
        return nevgeometry;
    }
    public void setGeometry(NevGeometry nevgeometry) {
        this.nevgeometry = nevgeometry;
    }
}
