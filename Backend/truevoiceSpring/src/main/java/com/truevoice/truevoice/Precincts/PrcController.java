package com.truevoice.truevoice.Precincts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.truevoice.truevoice.Nevada.Collections.NevDistrict;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PrcController {
    @Autowired
    private PrcService prcService;
    public PrcController(PrcService prcService) {
        this.prcService = prcService;
    }

    @GetMapping("/nevada/precincts/all")
    public List<NevDistrict> getAllPrecincts(){
        return prcService.allPrecincts();
    }

}