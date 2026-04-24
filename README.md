# SmartMamaCare 🤱
Machine Learning-powered maternal & child mortality risk prediction system

A full-stack application built as a Computer Science final year project. 
Uses machine learning to predict maternal and child mortality risk, 
designed to support data-driven decision-making in healthcare settings.

The Problem
Maternal and child mortality remains one of the most preventable 
public health crises globally. Early identification of high-risk 
cases can save lives. This project builds a predictive tool to 
support that goal.

What I Built
- ML Pipeline: Data preprocessing, EDA, feature engineering, 
  model training and evaluation
- AI Backend: REST API serving model predictions in real time
- **Frontend: Web interface for healthcare workers to input patient 
  data and receive risk assessments

Tech Stack & Methods
- Data:Python, pandas, NumPy, SciPy
- Visualisation: Matplotlib, Seaborn
- ML Models: Scikit-learn, XGBoost
- Deep Learning: TensorFlow
- **Imbalanced Data Handling: imbalanced-learn (SMOTE/resampling)
- Backend: Python (Flask/FastAPI)
- Frontend: HTML/CSS/JavaScript

Key ML Techniques Applied
- Supervised classification for mortality risk prediction
- Handling class imbalance in medical datasets (imbalanced-learn)
- Gradient boosting (XGBoost) for improved prediction accuracy
- Deep learning model (TensorFlow) as alternative approach
- Model evaluation: accuracy, precision, recall, AUC-ROC

 Project Structure
- Backend-ai/ — ML models, training notebooks, API
- frontend/ — Web interface
- requirements.txt — Dependencies
