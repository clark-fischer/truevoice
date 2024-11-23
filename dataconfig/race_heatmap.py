import geopandas as gpd
import numpy as np
import json
import pprint

# Read the shapefile
shapefile_path = '/Users/clark/Desktop/truevoice/dataconfig/nv_race_2022_cnty.shp'


import geopandas
myshpfile = geopandas.read_file(shapefile_path)
myshpfile.to_file('/Users/clark/Desktop/truevoice/TrueVoiceUI/src/datafiles/myJson.json', driver='GeoJSON')


gdf = gpd.read_file(shapefile_path)

print(gdf.columns)

# Get the centroid coordinates for each geometry
centroids = gdf.geometry.centroid

# Extract latitude and longitude
latitudes = centroids.y
longitudes = centroids.x


print(latitudes)
print(longitudes)

print(gdf.columns)
print(gdf["GEOID"][1])

total_population = gdf['TOT_POP22']
white = gdf['WHT_NHSP22']
black = gdf['BLK_NHSP22']
native = gdf['AIA_NHSP22']
asian = gdf['ASN_NHSP22']
hispanic = gdf['HSP_POP22']
hawaiian = gdf['HPI_NHSP22']
other = gdf['OTH_NHSP22']



tt = white + black + native + asian + hispanic + hawaiian + other

names = ['white', 'black', 'native', 'asian', 'hispanic', 'hawaiian', 'other', 'total_population']
all_races = np.divide(np.array([white, black, native, asian, hispanic, hawaiian, other, tt]), np.array(total_population))
all_races = np.round(all_races,2)

race_dict = {}
for idx, geoid in enumerate(gdf['GEOID']):

    race_dict[geoid] = {
        'white': float(np.nan_to_num(all_races[0][idx])),
        'black': float(np.nan_to_num(all_races[1][idx])),
        'native': float(np.nan_to_num(all_races[2][idx])),
        'asian': float(np.nan_to_num(all_races[3][idx])),
        'hispanic': float(np.nan_to_num(all_races[4][idx])),
        'hawaiian': float(np.nan_to_num(all_races[5][idx])),
        'other': float(np.nan_to_num(all_races[6][idx])),
        'total_population': float(np.nan_to_num(total_population[idx]))
    }

pprint.pprint(race_dict)

with open("nv_race_chloro_data2_precinct.json", "w") as outfile: 
    json.dump(race_dict, outfile)

