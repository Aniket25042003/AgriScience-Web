from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.utils.crop_model import recommend_top_3_crops
from app.utils.disease_model import detect_disease_from_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://agriscience.onrender.com",
        "https://agriscience.vercel.app",
        "https://agriscience-web.vercel.app",
        "https://agriscience-web-git-main.vercel.app",
        "*"  # Allow all origins for development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AgriScience API is running", "status": "healthy"}

@app.get("/health")
def health_check():
    return {"message": "AgriScience API is running", "status": "healthy", "timestamp": "2025-01-05T02:57:23Z"}

@app.post("/test-cors")
def test_cors():
    print("Received POST request to /test-cors")
    return {"message": "CORS test successful", "method": "POST"}

class CropRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.options("/recommend_crops")
def recommend_crops_options():
    return {"message": "OK"}

@app.post("/recommend_crops")
def recommend_crops(data: CropRequest):
    print(f"Received crop recommendation request: {data}")
    result = recommend_top_3_crops(data)
    print(f"Returning recommendations: {result}")
    return {"recommended_crops": result}

@app.middleware("http")
async def log_requests(request: Request, call_next):
    if "/detect_disease" in str(request.url):
        print(f"Request method: {request.method}")
        print(f"Request URL: {request.url}")
        print(f"Request headers: {dict(request.headers)}")
    response = await call_next(request)
    return response

@app.get("/detect_disease")
def detect_disease_get():
    print("Received GET request for /detect_disease - This should not happen!")
    return {"error": "GET method not allowed. Use POST with file upload."}

@app.options("/detect_disease")
def detect_disease_options():
    print("Received OPTIONS request for /detect_disease")
    return {"message": "OK"}

@app.post("/detect_disease")
def detect_disease(file: UploadFile = File(...)):
    print(f"Received POST request for disease detection with file: {file.filename}")
    contents = file.file.read()
    result, confidence = detect_disease_from_image(contents)
    print(f"Detection result: {result}, confidence: {confidence}")
    return {"result": result, "confidence": confidence} 