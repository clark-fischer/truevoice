package com.truevoice.truevoice.SeatVote.Collections;

import lombok.Data;

@Data
public class PlotData {
    private int districtId;
    private double demVoteShare;
    private double repVoteShare;
    private int totalVotes;
}
