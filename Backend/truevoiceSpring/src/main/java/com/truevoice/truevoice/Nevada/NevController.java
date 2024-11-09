package com.truevoice.truevoice.Nevada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.truevoice.truevoice.Nevada.Collections.NevDistrict;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class NevController {
    @Autowired
    private NevService nevService;
    public NevController(NevService nevService) {
        this.nevService = nevService;
    }

    @GetMapping("/nevada/districts/all")
    public List<NevDistrict> getAllDistricts(){
        return nevService.allDistricts();
    }
    

}