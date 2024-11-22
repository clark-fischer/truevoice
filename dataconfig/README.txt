Nevada 2022 Select Race Data from the American Community Survey (2018-2022) at the Census Tract level

##Redistricting Data Hub (RDH) Retrieval Date
03/13/24

##Sources
ACS data retrieved using the Census API: https://api.census.gov/data/2022/acs/acs5
Boundary shapefile retrieved from the Census Cartographic Boundary File website: https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.2022.html

##Fields
Field Name Description                                                                         
GEOID      Unique Geographic Identifier                                                        
STATEFP    State FIPS                                                                          
STATE      State Name                                                                          
COUNTYFP   County FIPS                                                                         
COUNTY     County Name                                                                         
TOT_POP22  Total Population (sum of B03002_002E and B03002_012E)                               
NHSP_POP22 Total Population (Not Hispanic/Latino) (B03002_002E)                                
HSP_POP22  Total Population (Hispanic/Latino) (B03002_012E)                                    
WHT_NHSP22 White Alone (Not Hispanic/Latino) (B03002_003E)                                     
BLK_NHSP22 Black or African-American Alone (Not Hispanic/Latino) (B03002_004E)                 
AIA_NHSP22 American Indian and Alaska Native Alone (Not Hispanic/Latino) (B03002_005E)         
ASN_NHSP22 Asian Alone (Not Hispanic/Latino) (B03002_006E)                                     
HPI_NHSP22 Native Hawaiian and Other Pacific Islander Alone (Not Hispanic/Latino) (B03002_007E)
OTH_NHSP22 Some Other Race Alone (Not Hispanic/Latino) (B03002_008E)                           
2OM_NHSP22 Two or More Races (Not Hispanic/Latino) (B03002_009E)                               
BLK_ALL22  Black or African-American Alone or In Combination (B02009_001E)                     
AIA_ALL22  American Indian and Alaska Native Alone or In Combination (B02010_001E)             
ASN_ALL22  Asian Alone or In Combination (B02011_001E)                                         
HPI_ALL22  Native Hawaiian and Other Pacific Islander Alone or In Combination (B02012_001E)    
OTH_ALL22  Some Other Race Alone or In Combination (B02013_001E)                               

##Processing
ACS data for Nevada was retrieved with a Python script from the Census API.
The census tract data is available by county for all counties in Nevada. The script extracted the data for all counties in Nevada. 
Each field represents an estimate from the Census for a particular variable or sum of variables, as noted in the Fields section above.
The data were then merged on the GEOID with a corresponding TIGER shapefile.

##Additional Notes
For any questions about this dataset or if you would like additional related ACS data, please email info@redistrictingdatahub.org.