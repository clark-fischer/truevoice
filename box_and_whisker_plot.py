import matplotlib.pyplot as plt
import numpy as np
import pandas as pd 
from utils import party_share_at_district_level, SMD_seat_allocation

nv_election_data = pd.read_csv('Nevada/2020-nv-precinct-general.csv', low_memory=False)

nv_ = party_share_at_district_level(nv_election_data, 'nv')

co_election_data = pd.read_csv('Colorado/2020-co-precinct-general.csv')
co_ = party_share_at_district_level(co_election_data, 'co')
ut_election_data = pd.read_csv('Utah/2020-ut-precinct-general.csv')
ut_ = party_share_at_district_level(ut_election_data, 'ut')

nv_ = party_share_at_district_level(nv_election_data, 'nv')

#co_election_data = pd.read_csv('Colorado/2020-co-precinct-general.csv')
#co_ = party_share_at_district_level(co_election_data, 'co')
#ut_election_data = pd.read_csv('Utah/2020-ut-precinct-general.csv')
#ut_ = party_share_at_district_level(ut_election_data, 'ut')


def box_and_whisker_plot(election_data, state, district_plan, mem_num):
    party_colors = {'DEMOCRAT': '#0015bc', 'REPUBLICAN': '#FF0000'}

    plt.figure(figsize=(10, 6))
    plt.axhspan(35, 55, color='#abf59c', alpha=0.5)

    
    np.random.seed(0)
    if state == 'Nevada' or state == 'Utah':
        box_data = [np.random.normal(loc, 2, 100) for loc in [10, 20, 30, 40]]  
        box_positions = [0, 1, 2, 3]  

    elif state == 'Colorado':
        box_data = [np.random.normal(loc, 2, 100) for loc in [10, 20,25, 30,35, 40,45]]  
        box_positions = [0, 1, 2, 3,4,5,6] 
    

 
    plt.boxplot(box_data, positions=box_positions, widths=0.05, patch_artist=True,
        boxprops=dict(facecolor='white', color='black'), 
        medianprops=dict(color='black'),
        whiskerprops=dict(color='black'), capprops=dict(color='black'))
    
    for party in election_data['party_simplified'].unique():
        party_data = election_data[election_data['party_simplified'] == party]
        party_data = party_data.sort_values(by='district')
        plt.scatter(party_data['district'], party_data['%'], 
                    color=party_colors[party], label=party, s=100)
        


   
    plt.xticks(box_positions , election_data['district'].unique())
    if district_plan == 'SMD':
        plt.title(f'{state}\'s {district_plan} Party Percentages', y=1.05)
    elif district_plan == 'MMD':
        plt.title(f'{state}\'s {district_plan} {mem_num} Repr. Party Percentages', y=1.05)
    plt.xlabel('District')
    plt.ylabel('Percentage of Votes (%)')
    plt.ylim(0, 100)
    plt.grid(True)
    plt.legend(title="Party")

    if district_plan == 'SMD':
        plt.savefig(f'box_and_whisker_plots/{state}_{district_plan}_box_and_whisker_plot.png')
    elif district_plan == 'MMD':
        plt.savefig(f'box_and_whisker_plots/{state}_{district_plan}_{mem_num}_rep_box_and_whisker_plot.png')




nv_smd = SMD_seat_allocation(nv_election_data)
co_smd = SMD_seat_allocation(co_election_data)
ut_smd = SMD_seat_allocation(ut_election_data)




box_and_whisker_plot(nv_, 'Nevada', 'SMD')
box_and_whisker_plot(co_, 'Colorado', 'SMD')
box_and_whisker_plot(ut_, 'Utah', 'SMD')

nv_smd = SMD_seat_allocation(nv_election_data)
#co_smd = SMD_seat_allocation(co_election_data)
#ut_smd = SMD_seat_allocation(ut_election_data)



print(nv_election_data.columns)
#box_and_whisker_plot(nv_, 'Nevada', 'SMD')
#box_and_whisker_plot(co_, 'Colorado', 'SMD')
#box_and_whisker_plot(ut_, 'Utah', 'SMD')

