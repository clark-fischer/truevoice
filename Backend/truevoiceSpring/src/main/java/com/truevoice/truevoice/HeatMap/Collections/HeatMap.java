package com.truevoice.truevoice.HeatMap.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.truevoice.truevoice.FRAEnum.FIPS;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "heatmaps")
public class HeatMap {
    private FIPS fips;
    // private List<Demographics> demographics;
    private Map<String, Demographics> precincts;
}