

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
