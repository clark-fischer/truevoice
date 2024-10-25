from utils import state_vote_aggregation, seat_share
import pandas as pd 
import matplotlib.pyplot as plt

nv_election_data = pd.read_csv('Nevada/2020-nv-precinct-general.csv',low_memory=False)
co_election_data = pd.read_csv('Colorado/2020-co-precinct-general.csv', low_memory=False)
ut_election_data = pd.read_csv('Utah/2020-ut-precinct-general.csv', low_memory=False)


nv_votes = state_vote_aggregation(nv_election_data)
nv_seat = seat_share(nv_election_data)
nevada = pd.merge(nv_votes, nv_seat, on='party_simplified', how='inner')

co_votes = state_vote_aggregation(co_election_data)
co_seat = seat_share(co_election_data)
colorado = pd.merge(co_votes, co_seat, on='party_simplified', how='inner')

ut_votes = state_vote_aggregation(ut_election_data)
ut_seat = seat_share(ut_election_data)
utah = pd.merge(ut_votes, ut_seat, on='party_simplified', how='inner')


def plot_seats_votes_SMD(state_results, state):
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
    plt.savefig(f'seats_vs_votes_graphs_SMD/{state}_sets_vs_votes.png')
def plot_seats_votes_MMD():
    return 0



plot_seats_votes_SMD(nevada, 'Nevada')
plot_seats_votes_SMD(colorado, 'Colorado')
plot_seats_votes_SMD(utah, 'Utah')
