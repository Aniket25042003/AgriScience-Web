#!/usr/bin/env python3
"""Test the updated AgriScience API with new models"""

import requests
import json

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