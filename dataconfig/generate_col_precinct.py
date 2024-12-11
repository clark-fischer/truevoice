import geopandas as gpd
import numpy as np
import json

# Read the shapefile
shapefile_path = '/Users/clark/Desktop/truevoice/dataconfig/co_cvap_2022_bg/co_cvap_2022_bg.shp'
gdf_df = gpd.read_file(shapefile_path)

# print(gdf.columns)

race_dict = {}
for i, gdf in enumerate(gdf_df.itertuples()):
    total_population = gdf.C_TOT22
    if total_population == 0:

        race_dict[gdf.GEOID20] = {
        'white': 0,
        'black': 0,
        'asian': 0,
        'hispanic': 0,
        'total_population': total_population
        }
        
        continue

    white = gdf.C_WHT22
    black = gdf.C_BLA22
    asian = gdf.C_ASI22
    hispanic = gdf.C_HSP22

    race_dict[gdf.GEOID20] = {
        'white': white / total_population,
        'black': black / total_population,
        'asian': asian / total_population,
        'hispanic': hispanic / total_population,
        'total_population': total_population
    }

    
with open("co_race_chloro_data.json", "w") as outfile: 
    json.dump(race_dict, outfile)