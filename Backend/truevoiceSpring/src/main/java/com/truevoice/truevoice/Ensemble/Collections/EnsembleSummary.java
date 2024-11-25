package com.truevoice.truevoice.Ensemble.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnsembleSummary {
    private double voteShare;
    private double avgSeatShare;
    private int totalDistricts;
    private int totalRepresentatives;
    private List<EnsemblePlan> ensembles;
}