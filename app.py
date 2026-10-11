from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained model and scaler
model = joblib.load("pcos_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/")
def home():
    return "PCOSence API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Convert input to DataFrame
    df = pd.DataFrame([data])

    # Scale the input
    df_scaled = scaler.transform(df)

    # Predict
    prediction = model.predict(df_scaled)[0]
    probability = model.predict_proba(df_scaled)[0][1]

    if prediction == 1:
        result = "High Risk of PCOS"
    else:
        result = "Low Risk of PCOS"

    return jsonify({
        "prediction": result,
        "probability": round(float(probability) * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)