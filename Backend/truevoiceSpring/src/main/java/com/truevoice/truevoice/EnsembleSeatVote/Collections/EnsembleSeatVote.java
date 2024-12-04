package com.truevoice.truevoice.EnsembleSeatVote.Collections;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "ensembleseatvote")
public class EnsembleSeatVote {
    private FIPS fips;
    private ElectionType electionType;
    private int totalDistricts;
    private double symmetry;
    private double bias;
    private double responsiveness;
    private List<PlotData> curveData;
}
