from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.utils.crop_model import recommend_top_3_crops
from app.utils.disease_model import detect_disease_from_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://agriscience.vercel.app",
        "https://agriscience-web.vercel.app",
        "http://localhost:3000",
        "https://agriscience.onrender.com",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AgriScience API is running", "status": "healthy"}

@app.get("/health")
def health_check():
    return {"message": "AgriScience API is running", "status": "healthy"}

class CropRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.post("/recommend_crops")
def recommend_crops(data: CropRequest):
    result = recommend_top_3_crops(data)
    return {"recommended_crops": result}

@app.post("/detect_disease")
def detect_disease(file: UploadFile = File(...)):
    contents = file.file.read()
    result, confidence = detect_disease_from_image(contents)
    return {"result": result, "confidence": confidence} 