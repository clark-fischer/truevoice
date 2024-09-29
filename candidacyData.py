import pandas as pd 


df = pd.read_csv('weball22.txt', sep='|',header=None)
df = df[:20] 
def applydollars(df):
    if 'TTL_RECEIPTS' in df.columns:
        df['TTL_RECEIPTS'] = df['TTL_RECEIPTS'].apply(format)
    return df
def filterby(df, field, constraint):
    if constraint:
        if field in df.columns:
            parameter = df[field] != constraint
            filter_by_constraint = df[parameter]
            return filter_by_constraint
        else:
            print(f'field {field} not found in dataframe / Constraint {constraint} not in dataframe')

    else:
        if field in df.columns:
            return df.sort_values(field, ascending=True)
        else:
            print(f'field {field} not found in dataframe')
def format(x):
    return "${:.2f}M".format(x/1000000)
def capped(df, cap_num):
    if 'TTL_RECEIPTS' in df.columns:
        df['TTL_RECEIPTS'] = pd.to_numeric(df['TTL_RECEIPTS'], errors='coerce')
        filtered_df = df[df['TTL_RECEIPTS'] > cap_num]
        return filtered_df
def sort_by_Dollar_amount(df):
    if 'TTL_RECEIPTS' in df.columns:
        return df.sort_values('TTL_RECEIPTS', ascending=True)
    else:
        print("Column 'TTL_RECEIPTS' not found in DataFrame.")
def changeNames(df):
    df = df.drop(columns=[6,7,8,9,10,11,12,13,14,15,16,17,19,20,22,24,25,26,27,28,29])
    columns_names = ['CAND_ID','CAND_NAME','CAND_ICI','PTY_CD','CAND_PTY_AFFILIATION','TTL_RECEIPTS','CAND_OFFICE_ST','PRIM_ELECTION','GEN_ELECTION']
    df.columns = columns_names
    return df

df = changeNames(df)
df= sort_by_Dollar_amount(df)
#df = capped(df, 80000000)
df = filterby(df, 'CAND_PTY_AFFILIATION', 'LIB')
df = applydollars(df)

print(df)