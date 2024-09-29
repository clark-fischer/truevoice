import geopandas as gpd
import numpy as np
import json
import math

# Read the shapefile
shapefile_path = 'nv_race_2022_bg.shp'
gdf = gpd.read_file(shapefile_path)

print(gdf.columns)

# Get the centroid coordinates for each geometry
centroids = gdf.geometry.centroid

# Extract latitude and longitude
latitudes = centroids.y
longitudes = centroids.x

10000


print(latitudes)
print(longitudes)

print(gdf.columns)

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
for row_i, row in enumerate(all_races):
    race_dict[names[row_i]] =[]
    for i, perc in enumerate(row):
        if not math.isnan(perc):
            race_dict[names[row_i]].append( [latitudes[i], longitudes[i], perc])
    
with open("nv_race_chloro_data.json", "w") as outfile: 
    json.dump(race_dict, outfile)