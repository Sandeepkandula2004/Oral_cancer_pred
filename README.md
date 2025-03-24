# Oral Cancer Prediction

This repository contains a full-stack web application for oral cancer prediction using a machine learning model. The project consists of a backend (Node.js with Express) and a frontend (React.js) to facilitate prediction services.

## Installation and Setup

Follow these steps to set up and run the project on your local machine:

### 1. Clone the Repository
```sh
git clone https://github.com/Sandeepkandula2004/Oral_cancer_pred.git
cd Oral_cancer_pred
```

### 2. Backend Setup
```sh
cd backend
python -m venv venv  # Create a virtual environment
source venv/bin/activate  # Activate (Linux/macOS)
venv\Scripts\activate  # Activate (Windows)
```

#### Install Dependencies
```sh
pip install -r requirements.txt
npm install  # Install Node.js dependencies
```

### 3. Frontend Setup
```sh
cd ../my-react-app
npm install  # Install React dependencies
```

### 4. Running the Application
#### Open two terminal windows:

**Terminal 1 (Backend)**
```sh
cd backend
nodemon server.js
```

**Terminal 2 (Frontend - inside `my-react-app` folder)**
```sh
npm run dev
```

### 5. API Endpoint Update
To run the application on a local machine, update the `fetch` call in `App.jsx`:

#### Modify `App.jsx`
Replace the render API endpoint with:
```js
http://localhost:3000/api/predict
```

## Usage
Once the setup is complete, visit the React application in your browser to use the oral cancer prediction service.

## License
This project is licensed under the MIT License.

## Contributors
- [Sandeep Kandula](https://github.com/Sandeepkandula2004)

