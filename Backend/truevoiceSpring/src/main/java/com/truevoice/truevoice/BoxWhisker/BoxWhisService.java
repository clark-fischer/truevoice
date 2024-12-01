package com.truevoice.truevoice.BoxWhisker;

import com.truevoice.truevoice.BoxWhisker.Collections.BoxWhiskerData;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class BoxWhisService {

    @Autowired
    private BoxWhisRepository boxWhisRepository;

    public BoxWhisService(BoxWhisRepository boxWhisRepository) {
        this.boxWhisRepository = boxWhisRepository;
    }


    @Cacheable
    public BoxWhiskerData getBoxWhiskerData(FIPS fips, ElectionType electionType) {
        return boxWhisRepository.findBoxWhiskerData(fips, electionType)
                .orElseThrow(() -> new RuntimeException("Box whisker data not found"));
    }

}