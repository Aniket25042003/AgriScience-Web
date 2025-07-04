import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io

# Load the plant disease detection model
plant_model = load_model("models/DenseNet121_plant_model_v2.keras")

IMG_SIZE = (160, 160)

def detect_disease_from_image(file_bytes):
    """
    Detect disease from plant image using DenseNet121 model
    """
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    image = image.resize(IMG_SIZE)
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    prediction = plant_model.predict(img_array)[0][0]
    is_healthy = prediction < 0.5
    confidence = round((1 - prediction) * 100, 2) if is_healthy else round(prediction * 100, 2)
    result = "Healthy" if is_healthy else "Unhealthy"
    return result, confidence 