package com.truevoice.truevoice.Ensemble.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnsemblePlan {
    private int planId;
    private int opportunityRepresentatives;
    private int opportunityDistricts;
    private double democratsPercentage;
    private double republicanPercentage;
}