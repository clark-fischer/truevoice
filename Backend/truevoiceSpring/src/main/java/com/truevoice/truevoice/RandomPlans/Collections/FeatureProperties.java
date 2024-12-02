package com.truevoice.truevoice.RandomPlans.Collections;

import lombok.Data;

@Data
public class FeatureProperties {
    
private int DISTRICTNO;

private Demographics demographics;
private double demRatio;
private int representatives;
private double oppThreshold;
private boolean oppDistrict;
}
