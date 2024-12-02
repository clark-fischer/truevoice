package com.truevoice.truevoice.RandomPlans.Collections;

import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

import lombok.Data;

@Data
public class CrsProperties {
    private String name;
    private FIPS fips;
    private ElectionType electionType;
    private Characteristic characteristic;
    private int noOfDistricts;
    private int oppDistricts;
    private int safeDistricts;
}
