package com.truevoice.truevoice.Nevada;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.truevoice.truevoice.Nevada.Collections.NevDistrict;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class NevService {
    @Autowired
    private NevRespository nevRespository;
    private static final Logger logger = LoggerFactory.getLogger(NevService.class);
    public List<NevDistrict> allDistricts(){
        logger.info("Calling findAll() on NevRespository");
        List<NevDistrict> districts = nevRespository.findAll();
        logger.info("Number of districts found: {}", districts.size());
        return districts;
    }
}
