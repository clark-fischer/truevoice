import geopandas as gpd
import numpy as np
import json
import pprint
import pandas as pd

csv_path = r"/Users/clark/Desktop/truevoice/dataconfig/co_cvap_2022_cd (1)/co_cvap_2022_cd.csv"

# Load the CSV file
gdf_df = pd.read_csv(csv_path)

race_dict = {}
for i, gdf in enumerate(gdf_df.itertuples()):
    total_population = gdf.C_TOT22
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

with open("co_race_chloro_data2_district.json", "w") as outfile: 
    json.dump(race_dict, outfile)
