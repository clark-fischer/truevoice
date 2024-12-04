import json

# Load the original JSON file
input_file = "TrueVoiceUI/src/datafiles/nv_race_chloro_data2_precinct.json"
output_file = "updated_demographics.json"

with open(input_file, 'r') as f:
    original_data = json.load(f)

# Modify the data
updated_data = {}

for demographics in original_data.items():
    updated_demographics = {}
    for key, value in demographics.items():
        # Convert all 0 values to 0.0
        if value == 0:
            value = 0.0

        # Rename the "native" field to "nativeA"
        if key == "native":
            key = "nativeA"

        # Add the updated key-value pair
        updated_demographics[key] = value

    # Add the updated demographics to the result
    updated_data[demographics] = updated_demographics

# Save the modified data to a new JSON file
with open(output_file, 'w') as f:
    json.dump(updated_data, f, indent=4)

print(f"Data with 'native' renamed to 'nativeA' and all 0s converted to 0.0 has been saved to {output_file}")
