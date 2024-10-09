package com.truevoice.truevoice.Nevada;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.truevoice.truevoice.Nevada.Collections.NevDistrict;

import java.util.List;
@RestController
public class NevController {
    @Autowired
    private NevService nevService;
    public NevController(NevService nevService) {
        this.nevService = nevService;
    }

    // @GetMapping("/test")
    // @ResponseBody
    // public String testing(){
    //     return "hi";
    // }
    @GetMapping("/nevada/districts/all")
    public List<NevDistrict> getAllDistricts(){
        return nevService.allDistricts();
    }

    // @GetMapping
    // public ResponseEntity<String> getAllGeos(){
    //         return new ResponseEntity<String>("hi", HttpStatus.OK);
    //     }
}