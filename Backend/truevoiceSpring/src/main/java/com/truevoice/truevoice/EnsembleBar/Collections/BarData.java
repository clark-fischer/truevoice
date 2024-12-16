package com.truevoice.truevoice.EnsembleBar.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BarData {
    private int planId;
    private int opportunityRepresentatives;
    private int opportunityDistricts;
    private double democratsPercentage;
    private double republicanPercentage;
    private int democratsSeatsPercentage;
    private int republicanSeatsPercentage;
}

