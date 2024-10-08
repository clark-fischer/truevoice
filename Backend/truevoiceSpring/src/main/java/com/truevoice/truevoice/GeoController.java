package com.truevoice.truevoice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/api/v1/smd")
public class GeoController {
    @Autowired
    private GeoService geoService;

    @GetMapping
    public ResponseEntity<List<Geo>> getAllGeos(){
        return new ResponseEntity<List<Geo>>(geoService.allGeo(), HttpStatus.OK);
    }

    // @GetMapping
    // public ResponseEntity<String> getAllGeos(){
    //         return new ResponseEntity<String>("hi", HttpStatus.OK);
    //     }
}