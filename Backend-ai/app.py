
from flask import Flask, request, render_template, redirect, url_for, session, flash
from flask_session import Session
import numpy as np
import joblib
import uuid
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# Load the trained model and scaler
model = joblib.load('best_model.joblib')
scaler = joblib.load('scaler.joblib')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_id = str(uuid.uuid4())[:8]
        name = request.form['name']
        age = float(request.form['age'])
        systolic_bp = float(request.form['systolic_bp'])
        diastolic_bp = float(request.form['diastolic_bp'])
        bs = float(request.form['bs'])
        body_temp = float(request.form['body_temp'])
        heart_rate = float(request.form['heart_rate'])

        input_data = np.array([[age, systolic_bp, diastolic_bp, bs, body_temp, heart_rate]])
        scaled_data = scaler.transform(input_data)
        prediction = model.predict(scaled_data)
        risk_mapping = {0: 'Low Risk', 1: 'Mid Risk', 2: 'High Risk'}
        result = risk_mapping[prediction[0]]

        user_data = {
            'user_id': user_id,
            'name': name,
            'age': age,
            'systolic_bp': systolic_bp,
            'diastolic_bp': diastolic_bp,
            'bs': bs,
            'body_temp': body_temp,
            'heart_rate': heart_rate,
            'risk': result
        }
        session['user_data'] = user_data

        return redirect(url_for('result'))
    
    return render_template('index.html')

@app.route('/result')
def result():
    user_data = session.get('user_data')
    if user_data is None:
        return redirect(url_for('index'))
    return render_template('result.html', user_data=user_data)

@app.route('/appointment', methods=['GET', 'POST'])
def appointment():
    user_data = session.get('user_data')
    if user_data is None:
        return redirect(url_for('index'))

    if request.method == 'POST':
        appointment_id = str(uuid.uuid4())[:8]
        date = request.form['date']
        time = request.form['time']
        
        appointment_data = {
            'id': appointment_id,
            'user_id': user_data['user_id'],
            'name': user_data['name'],
            'date': date,
            'time': time,
            'risk': user_data['risk']
        }
        
        if 'appointments' not in session:
            session['appointments'] = []
        
        session['appointments'].append(appointment_data)
        flash('Appointment booked successfully!', 'success')
        return render_template('appointment_confirmation.html', appointment=appointment_data)
    
    return render_template('appointment.html', user_data=user_data)

@app.route('/appointments')
def appointments():
    appointments = session.get('appointments', [])
    return render_template('appointments.html', appointments=appointments)

@app.route('/appointment/<appointment_id>')
def appointment_detail(appointment_id):
    appointments = session.get('appointments', [])
    appointment = next((a for a in appointments if a['id'] == appointment_id), None)
    if appointment is None:
        flash('Appointment not found', 'error')
        return redirect(url_for('appointments'))
    return render_template('appointment_detail.html', appointment=appointment)

@app.route('/features')
def features():
    return render_template('features.html')

if __name__ == '__main__':
    app.run(debug=True)
