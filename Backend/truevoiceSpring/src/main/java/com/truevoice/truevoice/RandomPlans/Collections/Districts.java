package com.truevoice.truevoice.RandomPlans.Collections;

import java.util.List;

import lombok.Data;

@Data
public class Districts {
    // private List<Object> districts;
   
    // @Data
    // private static class District{
        private int districtNo;
        private Geometry geometry;
        private Demographics demographics;
        private boolean isOppDistrict;
        private double repDepSplit;
        private int representatives;
        private double oppThreshold;
    // }

}
