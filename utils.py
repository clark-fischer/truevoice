
import pandas as pd 

def party_winner(election_data):
    #dominant party at a US house of representative level
    election_data = election_data[election_data['office'] == 'US HOUSE']
    election_data = election_data[election_data['party_simplified'].isin(['DEMOCRAT', 'REPUBLICAN'])]
    votes_aggreatation = election_data.groupby('party_simplified')['votes'].sum().reset_index()
    party_winner = votes_aggreatation.loc[votes_aggreatation['votes'].idxmax()]
    return party_winner
def party_percentages(election_data):
    #the percenate of each party in a state at a house of represenatative level
    election_data = election_data[election_data['office'] == 'US HOUSE']
    votes_aggreatation = election_data.groupby('party_simplified')['votes'].sum().reset_index()
    total_votes = votes_aggreatation['votes'].sum()
    votes_aggreatation['%'] = round(votes_aggreatation['votes']/total_votes * 100,1)
    return votes_aggreatation

def state_vote_aggregation(election_data): 
    #percenatge of each party at a state level(filtered by house of representatives)
    election_data = election_data[election_data['office'].isin(['US HOUSE'])]
    votes_aggreatation = election_data.groupby('party_simplified')['votes'].sum().reset_index()
    total_votes = votes_aggreatation['votes'].sum()
    votes_aggreatation['vote_share'] = votes_aggreatation['votes']/total_votes * 100
    return votes_aggreatation 
def seat_share(election_data):
    #the party winner at a district level
    #sum all DEM, REP, NONP, OT for a the represenation of set shares
    election_data = election_data[election_data['office'].isin(['US HOUSE'])]
    election_data = election_data.groupby(['district', 'party_simplified']).agg({'votes': 'sum'}).reset_index()
    election_data['winner'] = election_data.groupby('district')['votes'].transform(max) == election_data['votes']
    district_winners = election_data[election_data['winner']]
    seat_share = district_winners.groupby('party_simplified').size().reset_index(name='seats')
    seat_share['seat_share'] = seat_share['seats'] / seat_share['seats'].sum() * 100
    return seat_share
def get_opposite_party(party):
    if party == 'DEMOCRAT':
        return 'REPUBLICAN'
    elif party == 'REPUBLICAN':
        return 'DEMOCRAT'
    return None
def party_share_at_district_level(election_data, state):
    #calculate the percentage of each party at a district level
    if state == 'nv' or state == 'ut':
        election_data = election_data[election_data['district'].isin(['001','002','003','004'])]
    elif state == 'co':
        election_data = election_data[election_data['district'].isin(['001','002','003','004','005','006','007'])]
    else:
        return None
    election_data = election_data.groupby(['district', 'party_simplified']).agg({'votes': 'sum'}).reset_index()
    district_vote_totals = election_data.groupby('district')['votes'].sum().reset_index()
    election_data['%'] = election_data.apply(
        lambda x: x['votes'] / district_vote_totals[district_vote_totals['district'] == x['district']]['votes'].iloc[0] * 100, axis=1)
    election_data = election_data[election_data['party_simplified'].isin(['DEMOCRAT','REPUBLICAN'])]
    return election_data
def SMD_seat_allocation(election_data):
    election_data = election_data[election_data['office'].isin(['US HOUSE'])]
    election_data = election_data.groupby(['district', 'party_simplified']).agg({'votes': 'sum'}).reset_index()
    election_data['winner'] = election_data.groupby('district')['votes'].transform(max) == election_data['votes']
    district_winners = election_data[election_data['winner']]
    district_winners =district_winners.rename(columns={'winner': 'seats'})
    district_winners['seats'] = district_winners['seats'].replace(True, 1)
    return district_winners
def MMD_seat_allocation(election_data, num_rep, state):
    
    election_data = election_data[election_data['office'].isin(['US HOUSE'])]
    election_data['district'] = election_data['district'].astype(str).str.split('.').str[0].str.zfill(3)
    if state == 'nv' or 'ut':
        election_data = election_data[election_data['district'].isin(['001','002','003','004'])]
    elif state == 'co':
        election_data = election_data[election_data['district'].isin(['001','002','003','004','005','006','007'])]
    else:
        return None
    election_data = election_data.groupby(['district', 'party_simplified']).agg({'votes': 'sum'}).reset_index()
    district_vote_totals = election_data.groupby('district')['votes'].sum().reset_index()
    election_data['seats'] = election_data.apply(
            lambda x: round((x['votes'] / district_vote_totals[district_vote_totals['district'] == x['district']]['votes'].iloc[0]) * num_rep), axis=1)
    election_data = election_data[election_data['seats'] > 0]
    return election_data