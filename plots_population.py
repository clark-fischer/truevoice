import matplotlib.pyplot as plt
import numpy as np
import pandas as pd 
from utils import *

#functions to populate the graphs 
def box_and_whisker_plot(election_data, state, district_plan, mem_num=1):
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
def plot_seats_votes(state_results, state, district_plan, mem_num=1):
    party_colors = {'DEMOCRAT': '#0015bc', 'REPUBLICAN': '#FF0000'}
    colors = state_results['party_simplified'].map(party_colors)
    plt.figure(figsize=(8, 6))

    plt.scatter(state_results['vote_share'], state_results['seat_share'], color=colors, s=100)

    plt.plot([0, 100], [0, 100], 'k--', label='Proportionality Line')

    plt.xlabel('Vote Share (%)')
    plt.ylabel('Seat Share (%)')
    plt.title(f'Seats vs. Votes Symmetry Graph for {state}')

    for party, color in party_colors.items():
        plt.scatter([], [], color=color, label=party)

    plt.legend()
    plt.grid(True)
    if district_plan == 'SMD':
        plt.savefig(f'seats_vs_votes_graphs/{state}_{district_plan}_seats_vs_votes.png')
    elif district_plan == 'MMD':
        plt.savefig(f'seats_vs_votes_graphs/{state}_{district_plan}_{mem_num}_seats_vs_votes.png')
def plot_pie_chart(seat_data, plan_type, state, rep_num=1):
    party_colors = {'DEMOCRAT': '#0015bc', 'REPUBLICAN': '#FF0000'}
    total_seats_by_party = seat_data.groupby('party_simplified')['seats'].sum()
    colors = [party_colors[party] for party in total_seats_by_party.index]
    # Plot the pie chart
    plt.figure(figsize=(7, 7))
    plt.pie(total_seats_by_party, labels=total_seats_by_party.index, autopct='%1.1f%%', colors=colors, textprops={'weight': 'bold'})

    plt.title(f'{state}\'s Total Seats Won by Party ({plan_type}) {rep_num} Rep.')
    
    plt.savefig(f'pie_chart/{state}_{plan_type}_{rep_num}_pie_chart.png')
def plot_bar(data, plan_type, state, rep_num=1):
    seat_data_grouped = data.groupby(['district', 'party_simplified'])['seats'].sum().unstack().fillna(0)
    seat_data_grouped.plot(kind='bar', stacked=True, figsize=(10, 6), color=['#0015bc', '#FF0000'])

    if plan_type == 'MMD':
        plt.title(f'{state}\'s Seats Distribution by Party ({plan_type}) {rep_num} Rep')
    else:
        plt.title(f'{state}\'s Seats Distribution by Party ({plan_type})')
    plt.xlabel('District')
    plt.ylabel('Seats Allocated')
    if state == 'Nevada' or state == 'Utah':
        plt.xticks([0,1,2,3],rotation=0)
    else: 
        plt.xticks([0,1,2,3,4,5,6],rotation=0)
    plt.legend(title='Party', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()

    if plan_type == 'MMD':
        plt.savefig(f'bar_plots/{state}_{plan_type}_{rep_num}_rep_bar_plot.png')
    else: 
        plt.savefig(f'bar_plots/{state}_{plan_type}_bar_plot.png')


#data set up for nevada
nv_election_data = pd.read_csv('Nevada/2020-nv-precinct-general.csv', low_memory=False)
nv_ = party_share_at_district_level(nv_election_data, 'nv')
nv_votes = state_vote_aggregation(nv_election_data)
nv_seat = seat_share(nv_election_data)
nevada = pd.merge(nv_votes, nv_seat, on='party_simplified', how='inner')
nv_smd = SMD_seat_allocation(nv_election_data)
nv_mmd_2, nv_mmd_3, nv_mmd_4 = MMD_seat_allocation(nv_election_data, 2, 'nv'), MMD_seat_allocation(nv_election_data, 3,'nv'), MMD_seat_allocation(nv_election_data, 4, 'nv')

#data set up for Colorado
co_election_data = pd.read_csv('Colorado/2020-co-precinct-general.csv', low_memory=False)
co_ = party_share_at_district_level(co_election_data, 'co')
co_votes = state_vote_aggregation(co_election_data)
co_seat = seat_share(co_election_data)
colorado = pd.merge(co_votes, co_seat, on='party_simplified', how='inner')
co_smd = SMD_seat_allocation(co_election_data)
co_mmd_2, co_mmd_3, co_mmd_4 = MMD_seat_allocation(co_election_data, 2, 'co'), MMD_seat_allocation(co_election_data, 3, 'co'), MMD_seat_allocation(co_election_data, 4, 'co')


#Populate graphs SMD/MMD
box_and_whisker_plot(nv_, 'Nevada', 'SMD')
box_and_whisker_plot(co_, 'Colorado', 'SMD')

plot_seats_votes(nevada, 'Nevada', 'SMD')
plot_seats_votes(colorado, 'Colorado', 'SMD')


plot_pie_chart(nv_mmd_2, 'MMD', 'Nevada',2)
plot_pie_chart(nv_mmd_3, 'MMD', 'Nevada',3)
plot_pie_chart(nv_mmd_4, 'MMD', 'Nevada',4)
plot_pie_chart(co_mmd_2, 'MMD', 'Colorado',2)
plot_pie_chart(co_mmd_3, 'MMD', 'Colorado',3)
plot_pie_chart(co_mmd_4, 'MMD', 'Colorado',4)


plot_bar(nv_smd, 'SMD', 'Nevada')
plot_bar(co_smd, 'SMD', 'Colorado')
plot_bar(nv_mmd_2, 'MMD', 'Nevada', 2)
plot_bar(nv_mmd_3, 'MMD', 'Nevada', 3)
plot_bar(nv_mmd_4, 'MMD', 'Nevada', 4)
plot_bar(co_mmd_2, 'MMD', 'Colorado', 2)
plot_bar(co_mmd_3, 'MMD', 'Colorado', 3)
plot_bar(co_mmd_4, 'MMD', 'Colorado', 4)