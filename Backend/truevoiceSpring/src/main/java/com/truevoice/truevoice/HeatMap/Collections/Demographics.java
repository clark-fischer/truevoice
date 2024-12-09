package com.truevoice.truevoice.HeatMap.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Demographics {
    private double white;
    private double black;
    private double asian;
    private double hispanic;
    private int total_population;
}
