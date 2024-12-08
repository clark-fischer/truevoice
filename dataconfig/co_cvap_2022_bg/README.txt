2022 Citizen Voting Age Population (CVAP) Data for Colorado from the 2018-2022 American Community Survey (ACS) 5 Year Estimates at the Block Group level

##Redistricting Data Hub (RDH) Retrieval Date
05/14/24

##Sources
CVAP Data retrieved from the Census Citizen Voting Age Population by Race and Ethnicity website: https://www.census.gov/programs-surveys/decennial-census/about/voting-rights/cvap.2022.html
Boundary shapefile retrieved from the Census Cartographic Bounary File website: https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.2022.html

##Fields
Field Name Description                                                                               
GEOID20    Unique Identifier                                                                         
NAME       Full Geographic Name of the Block Group                                                   
STATE      Name of the State                                                                         
COUNTY     Name of the County                                                                        
STATEFP    State FIPS Code                                                                           
COUNTYFP   County FIPS Code                                                                          
TRACTCE    Tract Code                                                                                
BLKGRPCE   Block Group Code                                                                          
C_TOT22    Citizen Estimate for Total                                                                
CTOTMOE    Citizen Margin of Error for Total                                                         
C_NHS22    Citizen Estimate for Not Hispanic or Latino                                               
CNHSMOE    Citizen Margin of Error for Not Hispanic or Latino                                        
C_AMI22    Citizen Estimate for American Indian or Alaska Native Alone                               
CAMIMOE    Citizen Margin of Error for American Indian or Alaska Native Alone                        
C_ASI22    Citizen Estimate for Asian Alone                                                          
CASIMOE    Citizen Margin of Error for Asian Alone                                                   
C_BLA22    Citizen Estimate for Black or African American Alone                                      
CBLAMOE    Citizen Margin of Error for Black or African American Alone                               
C_NHP22    Citizen Estimate for Native Hawaiian or Other Pacific Islander Alone                      
CNHPMOE    Citizen Margin of Error for Native Hawaiian or Other Pacific Islander Alone               
C_WHT22    Citizen Estimate for White Alone                                                          
CWHTMOE    Citizen Margin of Error for White Alone                                                   
C_AIW22    Citizen Estimate for American Indian or Alaska Native and White                           
CAIWMOE    Citizen Margin of Error for American Indian or Alaska Native and White                    
C_ASW22    Citizen Estimate for Asian and White                                                      
CASWMOE    Citizen Margin of Error for Asian and White                                               
C_BLW22    Citizen Estimate for Black or African American and White                                  
CBLWMOE    Citizen Margin of Error for Black or African American and White                           
C_AIB22    Citizen Estimate for American Indian or Alaska Native and Black or African American       
CAIBMOE    Citizen Margin of Error for American Indian or Alaska Native and Black or African American
C_2OM22    Citizen Estimate for Remainder of Two or More Race Responses                              
C2OMMOE    Citizen Margin of Error for Remainder of Two or More Race Responses                       
C_HSP22    Citizen Estimate for Hispanic or Latino                                                   
CHSPMOE    Citizen Margin of Error for Hispanic or Latino                                            
C_AIA22    Citizen Estimate for American Indian or Alaska Native Alone or In Combination             
CAIAMOE    Citizen Margin of Error for American Indian or Alaska Native Alone or In Combination      
C_ASN22    Citizen Estimate for Asian Alone or In Combination                                        
CASNMOE    Citizen Margin of Error for Asian Alone or In Combination                                 
C_BLK22    Citizen Estimate for Black or African American Alone or In Combination                    
CBLKMOE    Citizen Margin of Error for Black or African American Alone or In Combination             
CVAP_TOT22 CVAP Estimate for Total                                                                   
CVAPTOTMOE CVAP Margin of Error for Total                                                            
CVAP_NHS22 CVAP Estimate for Not Hispanic or Latino                                                  
CVAPNHSMOE CVAP Margin of Error for Not Hispanic or Latino                                           
CVAP_AMI22 CVAP Estimate for American Indian or Alaska Native Alone                                  
CVAPAMIMOE CVAP Margin of Error for American Indian or Alaska Native Alone                           
CVAP_ASI22 CVAP Estimate for Asian Alone                                                             
CVAPASIMOE CVAP Margin of Error for Asian Alone                                                      
CVAP_BLA22 CVAP Estimate for Black or African American Alone                                         
CVAPBLAMOE CVAP Margin of Error for Black or African American Alone                                  
CVAP_NHP22 CVAP Estimate for Native Hawaiian or Other Pacific Islander Alone                         
CVAPNHPMOE CVAP Margin of Error for Native Hawaiian or Other Pacific Islander Alone                  
CVAP_WHT22 CVAP Estimate for White Alone                                                             
CVAPWHTMOE CVAP Margin of Error for White Alone                                                      
CVAP_AIW22 CVAP Estimate for American Indian or Alaska Native and White                              
CVAPAIWMOE CVAP Margin of Error for American Indian or Alaska Native and White                       
CVAP_ASW22 CVAP Estimate for Asian and White                                                         
CVAPASWMOE CVAP Margin of Error for Asian and White                                                  
CVAP_BLW22 CVAP Estimate for Black or African American and White                                     
CVAPBLWMOE CVAP Margin of Error for Black or African American and White                              
CVAP_AIB22 CVAP Estimate for American Indian or Alaska Native and Black or African American          
CVAPAIBMOE CVAP Margin of Error for American Indian or Alaska Native and Black or African American   
CVAP_2OM22 CVAP Estimate for Remainder of Two or More Race Responses                                 
CVAP2OMMOE CVAP Margin of Error for Remainder of Two or More Race Responses                          
CVAP_HSP22 CVAP Estimate for Hispanic or Latino                                                      
CVAPHSPMOE CVAP Margin of Error for Hispanic or Latino                                               
CVAP_AIA22 CVAP Estimate for American Indian or Alaska Native Alone or In Combination                
CVAPAIAMOE CVAP Margin of Error for American Indian or Alaska Native Alone or In Combination         
CVAP_ASN22 CVAP Estimate for Asian Alone or In Combination                                           
CVAPASNMOE CVAP Margin of Error for Asian Alone or In Combination                                    
CVAP_BLK22 CVAP Estimate for Black or African American Alone or In Combination                       
CVAPBLKMOE CVAP Margin of Error for Black or African American Alone or In Combination                

##Processing
CVAP data for Colorado was retrieved with a Python script from the Census. 
The data is available nationally for the Block Group. 
To extract the data for Colorado the national data was grouped by state and then extracted to a new file for each state. 
The data was pivoted from narrow to wide data based on GEOIDs so that one row is one Block Group, and each field represents either an estimate or margin of error for a particular racial/ethnic category. 
The fields were renamed to fit character length requirements. 
The shapefile was zipped into a folder with supporting files, ACS documentation, and this README. 
Processing was primarily completed using the pandas library.
To improve the usefulness of the data, we have add three categories to correspond with the Office of Management and Budget (OMB) racial categories. The "Alone or In Combinations" categories for American Indian or Alaska Native (fields with "AIA"), Asian (fields with "ASN"), and Black or African American (fields with "BLK") represent an encompassing racial category that is inclusive of all categories that include that race. For example, CVAP_AIA22 would be the sum of the "Alone" CVAP_AMI22, CVAP_AIB22, and CVAP_AIW22. For CVAP_BLK22, the field would be the sum of the "Alone" CVAP_BLA22, CVAP_AIB22, and CVAP_BLW22. For CVAP_ASN22, the field would be the sum of the "Alone" CVAP_ASI22 and CVAP_ASW22. These fields are also noted in the description as being "Alone or In Combination". No other estimate categories were modified.
For the estimates that were modified to fit OMB racial/ethnic categories, we also modified the Margins of Error as well. To create the new MOEs for the derived estimates, we summed the squared values of each MOE for the necessary fields, and then took the square root of the summed value. The fields that are represented with these modified MOEs correspond to the modified racial categories described above. They are rounded to the nearest hundredth.
For more information on OMB racial categories, please see this link: https://obamawhitehouse.archives.gov/omb/bulletins_b00-02/#n_1_
All of the racial estimates provided are Non-Hispanic. Breakdowns for Hispanic/Non-Hispanic by race are not provided in the CVAP special tabulation.
Null values or empty cells in the CSV file retrieved from the Census are assigned the value -999999.
The tabular data for Colorado was joined with geospatial data from Census TIGER files on the unique identifier field (GEOID20) and extracted as a shapefile. 
Processing for the join used pandas and geopandas libraries.

##Additional Notes
For more information on the ACS CVAP documentation please refer to the ACS link above in Sources as well as the ACS technical documentation included in this folder (also available at this link: https://www2.census.gov/programs-surveys/decennial/rdo/technical-documentation/special-tabulation/CVAP_2018-2022_ACS_documentation.pdf ).
Please note that this dataset is derived from data collected in the five year range of 2018-2022. The Census recommends against using different datasets that contain overlapping years. For more information please see https://www.census.gov/newsroom/blogs/random-samplings/2022/03/period-estimates-american-community-survey.html
For more information on the geospatial data, please refer to the Census Cartographic Boundary link above. 
The CVAP shapefile for Colorado is available in NAD83 projection.
Please direct questions related to processing this dataset to info@redistrictingdatahub.org.