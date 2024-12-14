package com.truevoice.truevoice.BoxWhisker.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BinData {
    private String binNo;
    private DemographicData white;
    private DemographicData black;
    private DemographicData asian;
    private DemographicData hispanic;
    private DemographicData other;
}