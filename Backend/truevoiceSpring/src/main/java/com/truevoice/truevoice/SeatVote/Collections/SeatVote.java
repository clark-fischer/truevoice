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
    private int totalDistricts;
    private int democratsSeats;
    private int republicanSeats;
    private int demTotalVotes;
    private int repTotalVotes;
    private List<PlotData> curveData;
}
