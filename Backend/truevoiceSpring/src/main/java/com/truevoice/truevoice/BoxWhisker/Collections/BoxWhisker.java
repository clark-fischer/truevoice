package com.truevoice.truevoice.BoxWhisker.Collections;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoxWhisker {
    private int totalRepresentatives;
    private List<List<BinData>> boxes;
}
