import pandas as pd 
import geopandas as gpd
import matplotlib.pyplot as plt
from gerrychain import Graph, Partition
from gerrychain.updaters import Tally
#from pyrankvote import Candidate, Ballot, ElectionResults



def candiates_names(data):
    candidate_list = clean_candidate_names(data['candidate'].unique())
    for i in candidate_list:
        votes = total_votes_by_candidates(data,i)
        if votes > 0:
            print(f'candiate: {i}, total votes: {votes}\n')
def votes_per_party(data):
    return data.groupby('party_simplified')['votes'].sum()
def party_winner(data):
    votes_per_party = data.groupby('party_simplified')['votes'].sum()
    return votes_per_party.idxmax(), votes_per_party.max()
def clean_candidate_names(candidates):
    cleaned_candidates = [name.split(' - ')[0] for name in candidates]
    return list(set(cleaned_candidates))
def total_votes_by_candidates(data, candidate):
    candidate_data = data[data['candidate'] == candidate]
    return candidate_data['votes'].sum()
def list_different_parties(data):
    return data.groupby('party_simplified')



def data_cleaning():
    election_data = pd.read_csv('Nevada/2020-nv-precinct-general.csv')
    precinct_boundaries = gpd.read_file('Nevada/tl_2020_08_vtd20.zip')
    congressional_districts = gpd.read_file('Nevada/tl_rd22_08_cd118_split_block.zip')
    #make all negative votes 0
    election_data['votes'] = election_data['votes'].apply(lambda x: max(x, 0))

    election_data['precinct'] = election_data['precinct'].str.zfill(6).astype(str).str.strip()
    precinct_boundaries['VTDST20'] = precinct_boundaries['VTDST20'].astype(str).str.strip()
    merged_ED_CD_data = precinct_boundaries.merge(election_data, left_on='VTDST20', right_on='precinct')


    #spatial joint to aggregate the votes at the district level for SMD analysis
    merged_with_districts = gpd.sjoin(merged_ED_CD_data, congressional_districts, how="left", predicate="intersects")
    #clean up inconsistensis with district records
    non_district_keywords = ['DEPARTMENT', 'SEAT', 'STATEWIDE']
    merged_with_districts = merged_with_districts[~merged_with_districts['district'].str.contains('|'.join(non_district_keywords), case=False)]
    merged_with_districts['district'] = merged_with_districts['district'].apply(lambda x: x.lstrip('0') if x.isdigit() else x)


    return merged_ED_CD_data, merged_with_districts
def votes_aggreatation(merged_with_districts):
    #democarat votes
    merged_with_districts['DEM_V'] = merged_with_districts.apply(
    lambda row: row['votes'] if row['party_simplified'] == 'DEMOCRAT' else 0, axis= 1
    )
    #republican votes
    merged_with_districts['REP_V'] = merged_with_districts.apply(
    lambda row: row['votes'] if row['party_simplified'] == 'REPUBLICAN' else 0, axis = 1
    )
    #group by district and aggregate votes by party
    district_aggregated = merged_with_districts.groupby('district').agg({
    'REP_V': 'sum',
    'DEM_V': 'sum',
    'votes': 'sum'
    }).reset_index()
    return district_aggregated
def MMD_simulation(merged_ED_CD_data):
    #create MMD column
    #use pyrankvote to simulate RCV (rank-choice-voting)
    #group precints into MMD and aggregate votes
    MMD_aggregated = merged_ED_CD_data.groupby('precinct').agg({
        'REP_V': 'sum',
        'DEM_V': 'sum',
        'votes': 'sum'
    }).reset_index()
    #use MGGG to generate ramdom MMD plans
    return 0
    
def MMD():
    precinct_boundaries = gpd.read_file('Nevada/tl_2020_08_vtd20.zip')
    sldl_boundaries = gpd.read_file('Nevada/tl_rd22_08_sldl_whole_block.zip')

    print(precinct_boundaries.head())
    print(sldl_boundaries.head())


    precinct_boundaries = precinct_boundaries.to_crs(sldl_boundaries.crs)
    recincts_in_sldl = gpd.sjoin(precinct_boundaries, sldl_boundaries, how='left', predicate='within')
 
    print(recincts_in_sldl.head())
    # mmd_precincts = recincts_in_sldl.groupby('SLDL_ID')

    # Check for districts that are MMDs (you would need to know which districts elect multiple members)
    # Here you can analyze or output those groups
    #for sldl_id, group in mmd_precincts:
        #print(f"District {sldl_id} precincts:", group['precinct_name'].tolist())
def MMD_genration(merged_ED_CD_data):
    #use MGGG to ramdomly generate MMD
    precinct_boundaries = gpd.read_file('Nevada/tl_2020_08_vtd20.zip')

    aggregated_election_data = merged_ED_CD_data.groupby('VTDST20').agg({'votes': 'sum'}).reset_index()
   

    precinct_boundaries['population'] = precinct_boundaries.set_index('VTDST20').join(
                                      aggregated_election_data)['votes']
    print(precinct_boundaries.head())
    
    #print(precinct_boundaries[['VTDST20', 'population']].head())
    #initial partition based on existing district
    #initial_partition = Partition(
        #precinct_boundaries,
        #assignment='VTDST20',  
        #updaters={'population': Tally('')}  # Replace with the correct population column
    #)
    return 0


def ramdom_district_plan_generation():
    #implement MGGG and MCMC to generate ramdom district plans
    return 0
def MMD_winner():
    #implement ranked-choice voting RCV
    return 0
def SMD_winner():
    #implement 'winner take all'
    return 0
def political_fairness_plot():
    #seats vs votes 
    #calculation of how minorities population (in MMD and SMD) are being represented in each district plan
    return 0
merged_ED_CD_data, merged_with_districts = data_cleaning()
#MMD_genration(merged_ED_CD_data)



boundary_data = gpd.read_file('Nevada/nv_pl2020_b.zip')
vtd_boundaries = gpd.read_file('Nevada/nv_vtd_2020_bound.zip')
election_results = pd.read_csv('Nevada/2020-nv-precinct-general.csv')
