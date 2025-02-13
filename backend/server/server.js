import express from "express";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url"; // Needed for __dirname in ES module
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Define the absolute path to your Python script

app.post("/api/predict", (req, res) => {
    const formData = req.body;
    console.log("Received data:", formData); // Debugging log

    const pythonProcess = spawn("python", ["app_ex.py", JSON.stringify(formData)]);

    pythonProcess.stdout.on("data", (data) => { 
        const prediction = data.toString().trim();
        console.log("Python Output:", prediction); // Debugging log
        res.json({ prediction });
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Error: ${data.toString()}`);
        res.status(500).json({ error: "Error executing the Python script.", details: data.toString() });
    });

    pythonProcess.on("exit", (code) => {
        console.log(`Python script exited with code ${code}`);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
