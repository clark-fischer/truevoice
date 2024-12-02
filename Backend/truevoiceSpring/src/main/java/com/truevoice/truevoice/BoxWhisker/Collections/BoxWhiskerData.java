package com.truevoice.truevoice.BoxWhisker.Collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "boxwhiskers")
public class BoxWhiskerData {
    private ObjectId id;
    private FIPS fips;
    private ElectionType electionType;
    private BoxWhisker boxWhisker;
}