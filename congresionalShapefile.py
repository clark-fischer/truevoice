import geopandas
import pandas as pd
import matplotlib.pyplot as plt
ny_cd = geopandas.read_file('ny_cong_adopted_2022.zip')



ny_cd.plot()
plt.show()