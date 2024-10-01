
import pandas as pd 
import geopandas as gpd
import matplotlib.pyplot as plt
import mplcursors
import matplotlib
from utils import party_winner, party_percentages

matplotlib.use('TkAgg') 

nv_election_data = pd.read_csv('Nevada/2020-nv-precinct-general.csv',low_memory=False)
co_election_data = pd.read_csv('Colorado/2020-co-precinct-general.csv', low_memory=False)
ut_election_data = pd.read_csv('Utah/2020-ut-precinct-general.csv', low_memory=False)

nv_party_percentages = party_percentages(nv_election_data)
co_party_percentages = party_percentages(co_election_data)
ut_party_percentages = party_percentages(ut_election_data)


def plot_election_party_winner():
    nv_party_winner = party_winner(nv_election_data)
    co_party_winner = party_winner(co_election_data)
    ut_party_winner = party_winner(ut_election_data)
    
    us_states = gpd.read_file('https://www2.census.gov/geo/tiger/GENZ2021/shp/cb_2021_us_state_500k.zip')
    us_states = us_states[~us_states['NAME'].isin(['Alaska'])]
    us_states['geometry'] = us_states['geometry'].simplify(tolerance=0.01, preserve_topology=True)
    key_states = us_states[us_states['NAME'].isin(['Nevada', 'Colorado', 'Utah'])]


    party_colors = {'DEMOCRAT': '#0015bc', 'REPUBLICAN': '#FF0000'}
    election_data = {
        'Nevada' : nv_party_winner['party_simplified'],
        'Colorado' : co_party_winner['party_simplified'],
        'Utah' : ut_party_winner['party_simplified']
    }
    vote_percentages = {
        'Nevada':   {'DEMOCRAT': nv_party_percentages.loc[nv_party_percentages['party_simplified'] == 'DEMOCRAT', '%'][0], 'REPUBLICAN': nv_party_percentages.loc[nv_party_percentages['party_simplified'] == 'REPUBLICAN', '%'][3]},
        'Colorado': {'DEMOCRAT': co_party_percentages.loc[co_party_percentages['party_simplified'] == 'DEMOCRAT', '%'][0], 'REPUBLICAN': co_party_percentages.loc[co_party_percentages['party_simplified'] == 'REPUBLICAN', '%'][4]},  
        'Utah':     {'DEMOCRAT': ut_party_percentages.loc[ut_party_percentages['party_simplified'] == 'DEMOCRAT', '%'][0], 'REPUBLICAN': ut_party_percentages.loc[ut_party_percentages['party_simplified'] == 'REPUBLICAN', '%'][3]}  
    }
    state_note = {
        'Nevada': f"Nevada\n"
                f"{vote_percentages['Nevada']['DEMOCRAT']}% Democrat\n"
                f"{vote_percentages['Nevada']['REPUBLICAN']}% Republican",
        'Colorado': f"Colorado\n"
                    f"{vote_percentages['Colorado']['DEMOCRAT']}% Democrat\n"
                    f"{vote_percentages['Colorado']['REPUBLICAN']}% Republican",
        'Utah': f"Utah\n"
                f"{vote_percentages['Utah']['DEMOCRAT']}% Democrat\n"
                f"{vote_percentages['Utah']['REPUBLICAN']}% Republican"
    }
    fig, ax = plt.subplots(figsize=(25, 50))
    us_states.plot(ax=ax, color='lightgrey', edgecolor='#74787a', linewidth=1)

    patches = []
    for idx, row in key_states.iterrows():
        patch = plt.Polygon(list(row['geometry'].exterior.coords), 
                            facecolor=party_colors[election_data[row['NAME']]],
                            edgecolor='#74787a', linewidth=1)
        patch.state_name = row['NAME']  
        ax.add_patch(patch)
        patches.append(patch)


    ax.set_xlim([-130, -60])
    ax.set_ylim([20, 55])
    ax.set_axis_off()

    font_dict = {'family': 'Comic Sans MS', 'size': 30}
    ax.set_title("US HOUSE OF REPRESENTATIVES",fontdict=font_dict, y=0.93)

    cursor = mplcursors.cursor(patches, hover=True)
    cursor.connect("add", lambda sel: sel.annotation.set_text(state_note[sel.artist.state_name]))
    
    cursor.connect("add", lambda sel: sel.annotation.set(
        bbox=dict(boxstyle="square,pad=0.3", fc="white", ec="black", lw=1)))

    plt.show()
plot_election_party_winner()