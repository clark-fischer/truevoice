package com.truevoice.truevoice.RandomPlans;
import com.truevoice.truevoice.FRAEnum.Characteristic;
import com.truevoice.truevoice.FRAEnum.ElectionType;
import com.truevoice.truevoice.FRAEnum.FIPS;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.truevoice.truevoice.RandomPlans.Collections.DistrictPlan;

@Service
public class PlansService {

    @Autowired
    private PlansRepository plansRepository;

    public PlansService(PlansRepository plansRepository) {
        this.plansRepository = plansRepository;
    }

    @Cacheable
    public Optional<DistrictPlan> getPlanFromDB(FIPS fips, ElectionType electionType, Characteristic characteristic) {
        return plansRepository.findDistrictPlan(fips, electionType, characteristic);
    }
}
