import geopandas as gpd
import numpy as np
import json
import pprint

shapefile_path = '/Users/clark/Desktop/truevoice/Colorado/nv_cvap_2022_cd.geojson'
gdf_df = gpd.read_file(shapefile_path)

# print(gdf)
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


# tt = white + black  + asian + hispanic 

# names = ['white', 'black', 'asian', 'hispanic', 'total_population']
# all_races = np.divide(np.array([white, black, asian, hispanic, tt]), np.array(total_population))
# all_races = np.round(all_races,2)

# print(all_races.T)

# 

# for i, races in enumerate(all_races):
#     race_dict[i] = {
#         'white': races[0],
#         'black': races[1],
#         'asian': races[2],
#         'hispanic': races[3],

#         'total_population': races[4]
#     }

# # print(len(gdf))
# # for idx, geoid in enumerate(gdf):

# #     race_dict[geoid] = {
# #         'white': float(np.nan_to_num(all_races[0][idx])),
# #         'black': float(np.nan_to_num(all_races[1][idx])),
# #         'asian': float(np.nan_to_num(all_races[2][idx])),
# #         'hispanic': float(np.nan_to_num(all_races[3][idx])),

# #         'total_population': float(np.nan_to_num(total_population[idx]))
# #     }

# pprint.pprint(race_dict)

with open("nv_race_chloro_data2_district.json", "w") as outfile: 
    json.dump(race_dict, outfile)

