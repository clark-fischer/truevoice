package com.truevoice.truevoice.RandomPlans.Collections;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

import lombok.Data;

@Data
@Document(collection = "plans")
public class DistrictPlan {
    @Id
    private ObjectId _id;
    private FIPS fips;
    private ElectionType electionType;
    private Characteristic characteristic;
    private int noOfDistricts;
    private int oppDistricts;
    private int safeDistricts;
    private List<Districts> districts;
    private SeatVoteShare seatVoteShare;
}
