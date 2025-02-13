import sys
import json
import pandas as pd
import joblib
import pickle
import numpy as np

# Load the trained model and encoders
with open("SGD.joblib", "rb") as file:
    sgd = joblib.load(file)

with open("label_encoders.pkl", "rb") as file:
    encoders = pickle.load(file)

with open("onehot_encoder.pkl", "rb") as file:
    ohe = pickle.load(file)

with open("StandardScaler.pkl", "rb") as file:
    sc = pickle.load(file)

# Read JSON input from Express
input_data = json.loads(sys.argv[1])

# Extract inputs
age = int(input_data["age"])
tobacco_use = int(input_data["tobaccoUse"])
alcohol_use = int(input_data["alcoholUse"])
hpv_related = int(input_data["hpvRelated"])
gender = input_data["gender"]
socioeconomic_status = input_data["socioeconomicStatus"]
diagnosis_stage = input_data["diagnosisStage"]
country = input_data["country"]
treatment_type = input_data["treatmentType"]

# Encode categorical variables
label_data = pd.DataFrame([[gender, socioeconomic_status, diagnosis_stage]], 
                          columns=["Gender", "Socioeconomic_Status", "Diagnosis_Stage"])

for col in label_data.columns:
    label_data[col] = encoders[col].transform(label_data[col])

# One-hot encoding for country & treatment type
encode_data = pd.DataFrame([[country, treatment_type]], columns=["Country", "Treatment_Type"])
encoded_array = ohe.transform(encode_data).toarray()
encoded_df = pd.DataFrame(encoded_array, columns=ohe.get_feature_names_out())

# Combine all inputs
final_input = pd.DataFrame({
    "Gender": label_data["Gender"],
    "Age": [age],
    "Tobacco_Use": [tobacco_use],
    "Alcohol_Use": [alcohol_use],
    "Socioeconomic_Status": label_data["Socioeconomic_Status"],
    "Diagnosis_Stage": label_data["Diagnosis_Stage"],
    "HPV_Related": [hpv_related]
})

final_input = pd.concat([final_input.reset_index(drop=True), encoded_df], axis=1)

# Scale input
input_scaled = sc.transform(final_input)

# Predict
prediction = sgd.predict(input_scaled)[0]

print(prediction)


