package com.truevoice.truevoice.HeatMap.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "heatmaps")
public class DistrictHeatmap {
    private FIPS fips;
    private ElectionType electionType;
    private Map<String, Demographics> districts;
}