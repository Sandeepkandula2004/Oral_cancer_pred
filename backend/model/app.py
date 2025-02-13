import streamlit as st
import pandas as pd
import joblib
import pickle

with open("SGD.joblib",'rb') as file:
    sgd = joblib.load(file)

with open("label_encoders.pkl",'rb') as file:
    encoders = pickle.load(file)

with open("onehot_encoder.pkl",'rb') as file:
    ohe = pickle.load(file)

with open("StandardScaler.pkl",'rb') as file:
    sc = pickle.load(file)


st.title("Oral Cancer Prediction")

# Streamlit UI to get user input
age = st.slider("Enter age",20,89)
Tobacco_use = st.selectbox("Tobacco usage",[0,1])
alcohol_use = st.selectbox("ALcohol_usage",[0,1])
HPV_related = st.selectbox("HPV_related",[0,1])
gender = st.selectbox("Select a Gender:",["Male","Female"])
socioeconomic_status = st.selectbox("Select a Socioeconomic_Status:", ["High", "Middle", "Low"])
stage = st.selectbox("Select a Stage:", ["Early", "Moderate", "Late"])
country = st.selectbox("select a country", ohe.categories_[0])
therapy_type = st.selectbox("select a therapy",ohe.categories_[1])


# Define categorical columns
label_cols = ["Gender", "Socioeconomic_Status","Diagnosis_Stage"]

# Create a DataFrame from user input
label_data = pd.DataFrame([[gender, socioeconomic_status, stage]], columns=label_cols)

# Apply LabelEncoder transformation
for col in label_cols:
    label_data[col] = encoders[col].transform(label_data[col])

with open("onehot_encoder.pkl", "rb") as file:
    ohe = pickle.load(file)

# Define the categorical columns used during training
ohe_cols = ["Country", "Treatment_Type"]


encode_data = pd.DataFrame([[country, therapy_type]], columns=ohe_cols)


encoded_array = ohe.transform(encode_data).toarray()


encoded_df = pd.DataFrame(encoded_array, columns=ohe.get_feature_names_out())

input_data = pd.DataFrame({
    'Gender' : label_data['Gender'],
    'Age' : [age],
    'Tobacco_Use' : [Tobacco_use],
    'Alcohol_Use' : [alcohol_use],
    'Socioeconomic_Status' : label_data["Socioeconomic_Status"],
    'Diagnosis_Stage' : label_data["Diagnosis_Stage"],
    'HPV_Related' : [HPV_related]
})

input_data = pd.concat([input_data.reset_index(drop = True),encoded_df],axis=1)

input_scaled = sc.transform(input_data)

prediction = sgd.predict(input_scaled)

st.write(prediction)

if prediction > 0.5:
    st.write("Survives")
else:
    st.write("Die")








