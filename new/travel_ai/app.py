import os
from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import pickle

# Initialize the Flask app
app = Flask(__name__)

# Load the trained model and label encoders
model = pickle.load(open('travel_exp_model.pkl', 'rb'))
le_country = pickle.load(open('le_country.pkl', 'rb'))
le_season = pickle.load(open('le_season.pkl', 'rb'))
le_month = pickle.load(open('le_month.pkl', 'rb'))

# Route to serve the homepage
@app.route('/')
def home():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    country = request.form['country']
    season = request.form['season']
    month = request.form['month']

    print(f"Received Input - Country: {country}, Season: {season}, Month: {month}")

    try:
        country_encoded = le_country.transform([country])[0]
    except ValueError:
        return jsonify({'error': f"Country '{country}' not found. Please try another."})

    season_encoded = le_season.transform([season])[0]
    month_encoded = le_month.transform([month])[0]

    # Create the input array for prediction
    input_data = np.array([[country_encoded, season_encoded, month_encoded]])

    # Predict the cost
    predicted_cost = model.predict(input_data)[0]
    print(f"Predicted Cost: {predicted_cost}")  # Log the predicted cost

    # Return the result as JSON
    return jsonify({'predicted_cost': predicted_cost})


if __name__ == '__main__':
    app.run(debug=True)
