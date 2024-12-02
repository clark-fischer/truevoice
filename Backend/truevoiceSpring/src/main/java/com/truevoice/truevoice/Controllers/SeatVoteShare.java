package com.truevoice.truevoice.Controllers;

import java.util.List;

import lombok.Data;
@Data
public class SeatVoteShare {
    private double voteShare;
    private double smdSeatShare;
    private double mmdSeatShare;
    private double symmetry;
    private double bias;
    private double responsiveness;
    private List<ElectionResult> electionResults;

    @Data
    public static class ElectionResult {
        private int districtId;
        private double seatShare;
        private double voteShare;
    }
}
