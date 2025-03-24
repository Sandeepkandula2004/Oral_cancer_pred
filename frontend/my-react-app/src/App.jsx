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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("https://oral-cancer-prediction.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check if response is not empty and is JSON
      const text = await response.text();
      if (!text) throw new Error("Empty response from server");
      
      const result = JSON.parse(text);
      setPrediction(result.prediction);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h1 className="text-2xl font-semibold text-center mb-6">Oral Cancer Prediction</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Gender", name: "gender", options: ["Male", "Female"] },
            { label: "Tobacco Use", name: "tobaccoUse", options: ["1", "0"] },
            { label: "Alcohol Use", name: "alcoholUse", options: ["1", "0"] },
            { label: "Socioeconomic Status", name: "socioeconomicStatus", options: ["High", "Middle", "Low"] },
            { label: "Diagnosis Stage", name: "diagnosisStage", options: ["Early", "Moderate", "Late"] },
            { label: "HPV Related", name: "hpvRelated", options: ["1", "0"] },
            { label: "Country", name: "country", options: countryOptions },
            { label: "Treatment Type", name: "treatmentType", options: treatmentOptions },
          ].map(({ label, name, options }) => (
            <label key={name} className="block">
              <span className="text-gray-700">{label}</span>
              <select
                name={name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}

          <label className="block">
            <span className="text-gray-700">Age</span>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 text-center rounded-md border">
            {error}
          </div>
        )}

        {prediction !== null && !error && (
          <div className="mt-4 p-3 bg-gray-100 text-center rounded-md border">
            <strong>Prediction:</strong> {prediction}
          </div>
        )}
      </div>
    </div>
  );
}
