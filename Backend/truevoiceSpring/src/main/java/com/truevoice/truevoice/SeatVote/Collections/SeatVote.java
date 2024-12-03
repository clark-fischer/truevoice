package com.truevoice.truevoice.SeatVote.Collections;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;
import com.truevoice.truevoice.FRAEnum.Characteristic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "seatvote")
public class SeatVote {
    private FIPS fips;
    private ElectionType electionType;
    private Characteristic characteristic;
    private double state_vote_share;
    private double symmetry;
    private double bias;
    private double responsiveness;
    private List<PlotData> ensemble;
}
