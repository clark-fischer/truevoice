package com.truevoice.truevoice;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeoService {
    @Autowired
    private NevRespository nevRespository;

    public List<Geo> allGeo(){
        return nevRespository.findAll();
    }
}
