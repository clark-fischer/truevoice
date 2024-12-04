package com.truevoice.truevoice.BoxWhisker.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class DemographicData {
    private double min;
    private double q1;
    private double median;
    private double q3;
    private double max;
    private Double enactedValue=null;
}