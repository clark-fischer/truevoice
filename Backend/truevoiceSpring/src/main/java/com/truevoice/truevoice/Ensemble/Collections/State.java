package com.truevoice.truevoice.Ensemble.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class State {
    private String fips;
    private int totalPopulation;
    private int votingPopulation;
    private EnsembleData ensemble;
}