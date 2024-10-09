package com.truevoice.truevoice.Nevada;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.truevoice.truevoice.Nevada.Collections.NevDistrict;


@Service
public class NevService {

    @Autowired
    private NevRepository nevRepository;
    public NevService(NevRepository nevRepository) {
        this.nevRepository = nevRepository;
    }
    public List<NevDistrict> allDistricts() {
        return nevRepository.findAll();
    }
}

// package com.truevoice.truevoice.Nevada;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Map;
// import org.springframework.stereotype.Service;
// import com.truevoice.truevoice.Nevada.Collections.NevDistrict;
// import com.truevoice.truevoice.Nevada.Collections.NevCrs;
// import com.truevoice.truevoice.Nevada.Collections.NevCrsProperties;
// import com.truevoice.truevoice.Nevada.Collections.NevFeature;
// import com.truevoice.truevoice.Nevada.Collections.NevGeometry;

// @Service
// public class NevService {

//     // Temporarily return hardcoded data
//     public List<NevDistrict> allDistricts() {
//         List<NevDistrict> districts = new ArrayList<>();

//         // Create a CRS object
//         NevCrs crs = new NevCrs();
//         crs.setType("name");
//         NevCrsProperties crsProperties = new NevCrsProperties();
//         crsProperties.setName("urn:ogc:def:crs:EPSG::4269");
//         crs.setProperties(crsProperties);

//         // Create a geometry object
//         NevGeometry geometry = new NevGeometry();
//         geometry.setType("Polygon");

//         // Sample coordinates for testing
//         List<List<Map<Integer, Double>>> coordinates = new ArrayList<>();
//         geometry.setCoordinates(coordinates);

//         // Create a feature object
//         NevFeature feature = new NevFeature();
//         feature.setType("Feature");
//         feature.setGeometry(geometry);

//         // Add properties to the feature
//         feature.setProperties(Map.of(
//                 "DISTRICTNO", 1,
//                 "ADJPOP", 12345,
//                 "TAWHITEALN", 0.34
//         ));

//         // Create a NevDistrict object
//         NevDistrict district = new NevDistrict();
//         district.setType("FeatureCollection");
//         district.setName("Test Nevada District");
//         district.setCrs(crs);
//         district.setFeatures(List.of(feature));

//         // Add the hardcoded district to the list
//         districts.add(district);

//         return districts;
//     }
// }
