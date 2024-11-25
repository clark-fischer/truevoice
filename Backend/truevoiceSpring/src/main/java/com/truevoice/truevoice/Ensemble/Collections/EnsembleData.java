package com.truevoice.truevoice.Ensemble.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnsembleData {
    private String electionType;
    private int numberOfPlans;
    private double avgOppRepresentative;
    private double avgRepDemSplit;
    private double populationDeviation;
    private double avgCompactness;
    private Object mmdLayout;
    private BoxWhiskerData boxWhisker;
    private EnsembleSummary ensembleSummary;
}