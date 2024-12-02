package com.truevoice.truevoice.EnsembleBar.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bars")
public class EnsembleBar {
    private FIPS fips;
    private ElectionType electionType;
    private double voteShare;
    private double avgSeatShare;
    private int totalRepresentatives;
    private int totalDistricts;
    private List<BarData> barData;
}