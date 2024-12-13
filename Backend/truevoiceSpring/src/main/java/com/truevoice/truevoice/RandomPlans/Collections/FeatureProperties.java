package com.truevoice.truevoice.RandomPlans.Collections;

import java.util.Map;

import lombok.Data;

@Data
public class FeatureProperties {
    
private int DISTRICTNO;

private Demographics demographics;
private double demRatio;
private int representatives;
private double oppThreshold;
private boolean oppDistrict;
private Map<String, Double> electionResult;
}
