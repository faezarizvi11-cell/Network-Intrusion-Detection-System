# Network Intrusion Detection System

## Overview

A machine learning-based Network Intrusion Detection System (IDS) that classifies network traffic as either **Benign** or **DoS Attack**.

The project uses network-flow features from the CICFlowMeter DoS Thursday 2018 dataset and provides a complete end-to-end pipeline:

**Data → Machine Learning → FastAPI → Web Interface → Deployment**
## Problem Statement

Denial-of-Service (DoS) attacks can disrupt network services by generating malicious traffic.

The goal of this project is to build a machine learning model that can identify whether a network flow is benign or represents a DoS attack.
## Dataset

The project uses network-flow data generated using CICFlowMeter from the DoS Thursday 2018 traffic dataset.

The dataset contains:

- **Benign:** 743,498 flows
- **DoS-GoldenEye:** 41,406 flows
- **DoS-Slowloris:** 9,908 flows

For this project, the two DoS attack categories were combined into a single **DoS Attack** class.

### Binary Classification

| Class | Number of Flows |
|---|---:|
| Benign | 743,498 |
| DoS Attack | 51,314 |
| **Total** | **794,812** |

The resulting dataset is highly imbalanced, with DoS attacks representing approximately **6.46%** of the total traffic.
## Objective

The main objectives of the project are to:

- Detect DoS attacks from network-flow data.
- Handle the class imbalance between benign and attack traffic.
- Compare multiple machine learning models.
- Evaluate models using metrics suitable for imbalanced classification.
- Identify important network-flow features contributing to predictions.
- Deploy the trained model through a FastAPI backend.
- Provide a simple web interface for making predictions.

- ## Machine Learning Workflow

The project follows an end-to-end machine learning workflow:

1. Data loading and exploration
2. Data cleaning
3. Exploratory Data Analysis (EDA)
4. Feature preprocessing
5. Feature engineering and selection
6. Handling class imbalance
7. Model training
8. Cross-validation
9. Hyperparameter tuning
10. Model evaluation
11. Model interpretation
12. Model saving
13. FastAPI integration
14. Web deployment

## Models Evaluated

Multiple classification models were evaluated during development, including:

- Logistic Regression
- Random Forest

Model performance was evaluated using metrics such as:

- Accuracy
- Precision
- Recall
- F1-score
- Balanced Accuracy
- ROC-AUC

Because the dataset is imbalanced, particular attention was given to **recall, F1-score, balanced accuracy, and ROC-AUC** rather than relying only on accuracy.

## Model Results

The final Random Forest model achieved very strong performance on the test data.

| Metric | Random Forest |
|---|---:|
| Balanced Accuracy | 0.9999 |
| F1-score | 0.9991 |
| ROC-AUC | 0.9999 |

For comparison, Logistic Regression achieved approximately:

| Metric | Logistic Regression |
|---|---:|
| Balanced Accuracy | 0.8395 |
| Recall | 0.8543 |
| ROC-AUC | 0.9401 |

The Random Forest model was selected as the final model based on its evaluation performance.

## Feature Importance

The Random Forest model identified several network-flow features that contributed strongly to the classification:

- **Fwd Seg Size Min** — 0.1911
- **Init Fwd Win Bytes** — 0.0853
- **Flow Packets/s** — 0.0691

These features provide useful information about the characteristics of network traffic and help the model distinguish between benign and attack flows.
## FastAPI Backend

The trained machine learning model is integrated into a FastAPI backend.

The backend provides:

- `/` — API welcome endpoint
- `/health` — health check for the deployed service
- `/demo-samples` — provides sample network-flow data
- `/NetworkFlow` — accepts network-flow features and returns the prediction

The `/NetworkFlow` endpoint returns:

- Predicted class
- Classification (`Benign` or `DoS Attack`)
- Prediction confidence
- ## Web Interface

A simple web interface was developed using:

- HTML
- CSS
- JavaScript

Users can select a sample network flow and check whether it is classified as benign or a DoS attack.

The interface displays the predicted classification and confidence score.

## Deployment

The application is deployed using Render.

### Backend

FastAPI backend and the trained ML model are deployed as a Render Web Service.

### Frontend

The frontend is deployed as a Render Static Site.

### Live Demo

**Frontend:**  
https://network-intrusion-detection-frontend.onrender.com/demo.html

**Backend:**  
https://network-intrusion-detection-system-3ev3.onrender.com

The deployed application was tested using both Benign Traffic and DoS Attack sample flows.

## Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- FastAPI
- Pydantic
- Joblib
- HTML
- CSS
- JavaScript
- Git & GitHub
- Render

- ## Project Structure

```text
Network-Intrusion-Detection-System/
│
├── backend/
│   ├── main.py
│   ├── final_model.pkl
│   ├── preprocessor.pkl
│   ├── ids_demo_samples1.csv
│   └── requirements_deploy.txt
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── demo.html
│   └── demo.js
│
├── .gitignore
└── README.md

