import { useState } from "react";

const countryOptions = [
  "Bangladesh", "Brazil", "China", "Colombia", "DR Congo", "Egypt", 
  "Ethiopia", "France", "Germany", "India", "Indonesia", "Iran",
  "Italy", "Japan", "Kenya", "Mexico", "Myanmar", "Nigeria",
  "Pakistan", "Philippines", "Russia", "South Africa", "South Korea",
  "Spain", "Tanzania", "Thailand", "Turkey", "United Kingdom",
  "United States", "Vietnam"
];

const treatmentOptions = ["Chemotherapy", "Combination", "Palliative", "Radiotherapy", "Surgery"];

export default function FormComponent() {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    tobaccoUse: "",
    alcoholUse: "",
    socioeconomicStatus: "",
    diagnosisStage: "",
    hpvRelated: "",
    country: "",
    treatmentType: "",
  });

  const [prediction, setPrediction] = useState(null); // State to store prediction result

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("https://oral-cancer-pred.onrender.com/api/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        setPrediction(result.prediction); // Store the prediction in state
    } catch (error) {
        console.error("Error submitting form:", error);
        setPrediction("Error in prediction");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold text-center mb-4">Oral Cancer Prediction</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Enter Patient Details</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="number" name="age" placeholder="Age" onChange={handleChange} required />

          <select name="tobaccoUse" onChange={handleChange} required>
            <option value="">Tobacco Use?</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select name="alcoholUse" onChange={handleChange} required>
            <option value="">Alcohol Use?</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select name="socioeconomicStatus" onChange={handleChange} required>
            <option value="">Socioeconomic Status</option>
            <option value="High">High</option>
            <option value="Middle">Middle</option>
            <option value="Low">Low</option>
          </select>

          <select name="diagnosisStage" onChange={handleChange} required>
            <option value="">Diagnosis Stage</option>
            <option value="Early">Early</option>
            <option value="Moderate">Moderate</option>
            <option value="Late">Late</option>
          </select>

          <select name="hpvRelated" onChange={handleChange} required>
            <option value="">HPV Related?</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>

          <select name="country" onChange={handleChange} required>
            <option value="">Select Country</option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <select name="treatmentType" onChange={handleChange} required>
            <option value="">Treatment Type</option>
            {treatmentOptions.map((treatment) => (
              <option key={treatment} value={treatment}>{treatment}</option>
            ))}
          </select>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Submit</button>
        </form>

        {/* Display the prediction result */}
        {prediction !== null && (
          <div className="mt-4 p-3 bg-gray-200 text-center rounded-lg">
            <strong>Prediction: </strong> {prediction}
          </div>
        )}
      </div>
    </div>
  );
}
