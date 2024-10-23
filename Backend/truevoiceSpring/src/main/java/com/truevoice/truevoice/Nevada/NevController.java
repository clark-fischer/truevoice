package com.truevoice.truevoice.Nevada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import com.truevoice.truevoice.Nevada.Collections.NevDistrict;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/nevada")
public class NevController {
    @Autowired
    private NevService nevService;
    public NevController(NevService nevService) {
        this.nevService = nevService;
    }

    @GetMapping("/districts/all")
    public List<NevDistrict> getAllDistricts(){
        return nevService.allDistricts();
    }
    @GetMapping("/{state_division}/{name}")
    public List<NevDistrict> getAllDistrictsTest(
        @PathVariable String state_division,
        @PathVariable String name
    ) {
        if (state_division.equals("district")) {
            return nevService.allDistricts();
        }
        return null;
    }

}