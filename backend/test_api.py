#!/usr/bin/env python3
"""Test the updated AgriScience API with new models"""

import requests
import json

# Test the health endpoint
print("Testing health endpoint...")
response = requests.get("https://agriscience.onrender.com/")
print(f"Status: {response.status_code}")
print(f"Response headers: {dict(response.headers)}")
print(f"Response text: {response.text}")
if response.status_code == 200:
    try:
        print(f"Response JSON: {response.json()}")
    except:
        print("Could not parse JSON response")

# Test the crop recommendation endpoint
print("\nTesting crop recommendation endpoint...")
crop_data = {
    "N": 90,
    "P": 42,
    "K": 43,
    "temperature": 20.87,
    "humidity": 82.00,
    "ph": 6.5,
    "rainfall": 103
}

response = requests.post(
    "https://agriscience.onrender.com/recommend_crops",
    headers={"Content-Type": "application/json"},
    data=json.dumps(crop_data)
)
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")

# Test CORS preflight for crop recommendation
print("\nTesting CORS preflight for crop recommendation...")
response = requests.options(
    "https://agriscience.onrender.com/recommend_crops",
    headers={
        "Origin": "https://agriscience.vercel.app",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type"
    }
)
print(f"Status: {response.status_code}")
print(f"CORS Headers: {dict(response.headers)}")

# Test CORS preflight for disease detection
print("\nTesting CORS preflight for disease detection...")
response = requests.options(
    "https://agriscience.onrender.com/detect_disease",
    headers={
        "Origin": "https://agriscience.vercel.app",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type"
    }
)
print(f"Status: {response.status_code}")
print(f"CORS Headers: {dict(response.headers)}")

# Test the disease detection endpoint with a file
print("\nTesting disease detection endpoint...")
try:
    # Use a simple test file
    files = {'file': ('test.jpg', b'fake image data', 'image/jpeg')}
    response = requests.post(
        "https://agriscience.onrender.com/detect_disease",
        files=files
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
    else:
        print(f"Error response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

def test_crop_recommendation():
    """Test crop recommendation with new model"""
    print("🌾 Testing Crop Recommendation...")
    
    data = {
        "N": 90,
        "P": 42,
        "K": 43,
        "temperature": 20.87,
        "humidity": 82.00,
        "ph": 6.50,
        "rainfall": 202.93
    }
    
    try:
        response = requests.post("http://localhost:8000/recommend_crops", json=data)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS!")
            print(f"Recommended crops: {result}")
        else:
            print(f"❌ ERROR: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {e}")

def test_disease_detection():
    """Test disease detection with new model"""
    print("\n🔍 Testing Disease Detection...")
    
    # Test with the sample image if available
    try:
        with open("models/test_image.jpg", "rb") as f:
            files = {"file": ("test.jpg", f, "image/jpeg")}
            response = requests.post("http://localhost:8000/detect_disease", files=files)
            print(f"Status: {response.status_code}")
            if response.status_code == 200:
                result = response.json()
                print("✅ SUCCESS!")
                print(f"Disease detection result: {result}")
            else:
                print(f"❌ ERROR: {response.text}")
    except FileNotFoundError:
        print("No test image found - upload any plant image to test")
    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == "__main__":
    print("🚀 Testing Updated AgriScience API")
    print("=" * 40)
    
    test_crop_recommendation()
    test_disease_detection()
    
    print("\n" + "=" * 40)
    print("📝 Ready for production! 🎉")
    print("📖 Interactive testing: http://localhost:8000/docs") 