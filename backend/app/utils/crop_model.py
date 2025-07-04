import numpy as np
import joblib

# Load the crop recommendation model and label encoder
crop_model = joblib.load("models/crop_recommendation_rf.pkl")
label_encoder = joblib.load("models/crop_label_encoder.pkl")

def recommend_top_3_crops(data):
    """
    Recommend top 3 crops based on soil and weather conditions
    """
    input_data = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])
    probabilities = crop_model.predict_proba(input_data)
    top_3_indices = np.argsort(probabilities[0])[-3:][::-1]
    top_3_encoded_crops = crop_model.classes_[top_3_indices]
    top_3_probs = probabilities[0][top_3_indices]
    
    # Decode the encoded crop labels back to readable names
    top_3_crops = label_encoder.inverse_transform(top_3_encoded_crops)
    
    recommendations = [(str(crop), round(float(prob) * 100, 2)) for crop, prob in zip(top_3_crops, top_3_probs)]
    return recommendations 