import geopandas as gpd

shapefile_path = '/Users/clark/Desktop/truevoice/dataconfig/nv_race_2022_t.shp'
gdf = gpd.read_file(shapefile_path)

print(len(gdf))


# Calculate the area of each census tract
gdf['area'] = gdf.geometry.area

# Calculate the 90th percentile of area sizes
area_threshold = gdf['area'].quantile(0.92)

# Identify small tracts
small_tracts = gdf[gdf['area'] < area_threshold]

# Initialize a list to keep track of merged tracts
merged_tracts = []

# Loop through each small tract to merge
for index, tract in small_tracts.iterrows():
    # Find neighboring tracts and sort by area
    neighbors = gdf[gdf.geometry.touches(tract.geometry)]
    if not neighbors.empty:
        # Get the smallest neighbor by area
        smallest_neighbor_idx = neighbors['area'].idxmin()
        
        # Sum demographic data of the tract into its smallest neighbor
        for col in ['TOT_POP22', 'WHT_NHSP22', 'BLK_NHSP22', 'AIA_NHSP22', 'ASN_NHSP22', 'HSP_POP22', 'HPI_NHSP22', 'OTH_NHSP22']:
            gdf.at[smallest_neighbor_idx, col] += tract[col]
        
        # Merge the geometries
        gdf.at[smallest_neighbor_idx, 'geometry'] = gdf.at[smallest_neighbor_idx, 'geometry'].union(tract.geometry)
        
        # Mark the small tract for deletion
        merged_tracts.append(index)

        gdf = gdf.drop(index)
# Drop the merged tracts from the GeoDataFrame
# 

# Save the simplified map
# gdf.to_file('myJson.geojson', driver='GeoJSON')
# 

print(len(gdf))
import matplotlib.pyplot as plt
gdf.plot()
plt.show()