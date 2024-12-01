package com.truevoice.truevoice.BoxWhisker.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BinData {
    private int binNo;
    private int representatives;
    private DemographicData black;
    private DemographicData hispanic;
    private DemographicData democratic;
    private DemographicData republican;
}