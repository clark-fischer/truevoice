package com.truevoice.truevoice.Nevada.Collections;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "nevada") 
public class NevElectionData {

    @Id
    private String id;
    private String precinct;
    private String office;
    private String partyDetailed;
    private String partySimplified;
    private String mode;
    private int votes;
    private String countyName;
    private String countyFips;
    private String jurisdictionName;
    private String jurisdictionFips;
    private String candidate;
    private String district;
    private int magnitude;
    private String dataverse;
    private int year;
    private String stage;
    private String state;
    private boolean special;
    private boolean writein;
    private String statePo;
    private String stateFips;
    private String stateCen;
    private String stateIc;
    private String date;
    private boolean readmeCheck;

}
