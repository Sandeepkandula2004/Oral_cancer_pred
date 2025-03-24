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

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://oral-cancer-prediction.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error("Error submitting form:", error);
      setPrediction("Error in prediction");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6">Oral Cancer Prediction</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Gender</span>
            <select name="gender" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Age</span>
            <input type="number" name="age" placeholder="Enter age" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md" />
          </label>

          <label className="block">
            <span className="text-gray-700">Tobacco Use</span>
            <select name="tobaccoUse" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Alcohol Use</span>
            <select name="alcoholUse" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Socioeconomic Status</span>
            <select name="socioeconomicStatus" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Middle">Middle</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Diagnosis Stage</span>
            <select name="diagnosisStage" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select</option>
              <option value="Early">Early</option>
              <option value="Moderate">Moderate</option>
              <option value="Late">Late</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">HPV Related</span>
            <select name="hpvRelated" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Country</span>
            <select name="country" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select Country</option>
              {countryOptions.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Treatment Type</span>
            <select name="treatmentType" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="">Select Treatment</option>
              {treatmentOptions.map((treatment) => (
                <option key={treatment} value={treatment}>{treatment}</option>
              ))}
            </select>
          </label>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </form>

        {prediction !== null && (
          <div className="mt-4 p-3 bg-gray-100 text-center rounded-md border">
            <strong>Prediction:</strong> {prediction}
          </div>
        )}
      </div>
    </div>
  );
}
