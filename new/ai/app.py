from flask import Flask, request, render_template
import joblib
import re
from sklearn.preprocessing import LabelEncoder

# Initialize Flask app
app = Flask(__name__)

# Load the model and vectorizer
model = joblib.load('logistic_regression_model.pkl')
tfidf = joblib.load('tfidf_vectorizer.pkl')

# Preprocess the text before prediction
def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove special characters
    text = re.sub(r'[^a-z\s]', '', text)
    return text

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Route to handle form submission and make predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Get the text input from the form
    input_text = request.form['text']
    
    # Preprocess the input text
    cleaned_text = preprocess_text(input_text)
    
    # Transform the text using the TF-IDF vectorizer
    transformed_text = tfidf.transform([cleaned_text])
    
    # Predict the sentiment
    prediction = model.predict(transformed_text)
    
    # Decode the prediction
    class_names = ['Negative', 'Neutral', 'Positive']  # Update this based on your actual classes
    predicted_label = class_names[prediction[0]]  # Get the label corresponding to the prediction
    
    return render_template('index.html', input_text=input_text, prediction=predicted_label)

if __name__ == "__main__":
    app.run(debug=True)
