from utils import MMD_seat_allocation, SMD_seat_allocation
import pandas as pd 
import matplotlib.pyplot as plt
import seaborn as sns





nv_election_data = pd.read_csv('Nevada/2020-nv-precinct-general.csv', low_memory=False)
co_election_data = pd.read_csv('Colorado/2020-co-precinct-general.csv')
ut_election_data = pd.read_csv('Utah/2020-ut-precinct-general.csv')

#SMD
nv_smd = SMD_seat_allocation(nv_election_data)
co_smd = SMD_seat_allocation(co_election_data)
ut_smd = SMD_seat_allocation(ut_election_data)
#MMD
nv_mmd_2, nv_mmd_3, nv_mmd_4 = MMD_seat_allocation(nv_election_data, 2, 'nv'), MMD_seat_allocation(nv_election_data, 3,'nv'), MMD_seat_allocation(nv_election_data, 4, 'nv')
co_mmd_2, co_mmd_3, co_mmd_4 = MMD_seat_allocation(co_election_data, 2, 'co'), MMD_seat_allocation(co_election_data, 3, 'co'), MMD_seat_allocation(co_election_data, 4, 'co')
ut_mmd_2, ut_mmd_3, ut_mmd_4 = MMD_seat_allocation(ut_election_data, 2, 'ut'), MMD_seat_allocation(ut_election_data, 3, 'ut'), MMD_seat_allocation(ut_election_data, 4,'ut')



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

def plot_pie_chart(seat_data, plan_type, state, rep_num):
    party_colors = {'DEMOCRAT': '#0015bc', 'REPUBLICAN': '#FF0000'}
    total_seats_by_party = seat_data.groupby('party_simplified')['seats'].sum()
    colors = [party_colors[party] for party in total_seats_by_party.index]
    # Plot the pie chart
    plt.figure(figsize=(7, 7))
    plt.pie(total_seats_by_party, labels=total_seats_by_party.index, autopct='%1.1f%%', colors=colors, textprops={'weight': 'bold'})

    plt.title(f'{state}\'s Total Seats Won by Party ({plan_type}) {rep_num} Rep.')
    
    plt.savefig(f'pie_chart/{state}_{plan_type}_{rep_num}_pie_chart.png')


'''
plot_bar(nv_mmd_2, 'MMD', 'Nevada', 2)
plot_bar(nv_mmd_3, 'MMD', 'Nevada', 3)
plot_bar(nv_mmd_4, 'MMD', 'Nevada', 4)
plot_bar(co_mmd_2, 'MMD', 'Colorado', 2)
plot_bar(co_mmd_3, 'MMD', 'Colorado', 3)
plot_bar(co_mmd_4, 'MMD', 'Colorado', 4)
plot_bar(ut_mmd_2, 'MMD', 'Utah', 2)
plot_bar(ut_mmd_3, 'MMD', 'Utah', 3)
plot_bar(ut_mmd_4, 'MMD', 'Utah', 4)


plot_bar(nv_smd, 'SMD', 'Nevada')
plot_bar(co_smd, 'SMD', 'Colorado')
plot_bar(ut_smd, 'SMD', 'Utah')
'''
#plot_pie_chart(nv_mmd_2, 'MMD', 'Nevada',2)
#plot_pie_chart(nv_mmd_3, 'MMD', 'Nevada',3)
#plot_pie_chart(nv_mmd_4, 'MMD', 'Nevada',4)
#plot_pie_chart(co_mmd_2, 'MMD', 'Colorado',2)
#plot_pie_chart(co_mmd_3, 'MMD', 'Colorado',3)
#plot_pie_chart(co_mmd_4, 'MMD', 'Colorado',4)
plot_pie_chart(ut_mmd_2, 'MMD', 'Utah',2)
plot_pie_chart(ut_mmd_3, 'MMD', 'Utah',3)
plot_pie_chart(ut_mmd_4, 'MMD', 'Utah',4)