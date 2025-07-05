# AgriScience Web Application

A modern web application for agricultural assistance using AI-powered crop recommendations and plant disease detection.

## Features

- **Crop Recommendation**: Get AI-powered crop suggestions based on soil and environmental conditions
- **Plant Disease Detection**: Analyze plant images to detect diseases with high accuracy
- **Real-time Analysis**: Instant results powered by machine learning models
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## Project Structure

```
AgriScience_Web/
├── backend/          # FastAPI backend with ML models
│   ├── app/          # Application code
│   ├── models/       # Pre-trained ML models
│   └── requirements.txt
├── frontend/         # React frontend
│   ├── src/          # Source code
│   └── package.json
└── README.md         # This file
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   python run.py
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Configuration

The frontend is configured to connect to the backend at `http://localhost:8000` by default. 

To change the API URL, create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Usage

### Crop Recommendation

1. Navigate to the "Crop Recommendation" page
2. Fill in the soil and environmental data:
   - Nitrogen (N) content in mg/kg
   - Phosphorus (P) content in mg/kg
   - Potassium (K) content in mg/kg
   - Temperature in °C
   - Humidity in %
   - pH Level
   - Rainfall in mm
3. Click "Get Recommendations" to receive AI-powered crop suggestions

### Disease Detection

1. Navigate to the "Disease Detection" page
2. Upload a clear image of a plant leaf by:
   - Clicking "Select Image" to browse files
   - Dragging and dropping an image file
3. Click "Analyze Plant" to detect diseases using AI

## API Endpoints

- `GET /` - Health check
- `POST /recommend_crops` - Get crop recommendations
- `POST /detect_disease` - Analyze plant images for disease detection

## Technologies Used

### Backend
- FastAPI - Modern Python web framework
- TensorFlow/Keras - Deep learning models
- Scikit-learn - Machine learning utilities
- Pillow - Image processing

### Frontend
- React 18 - Modern JavaScript framework
- TypeScript - Type-safe development
- Tailwind CSS - Utility-first styling
- Framer Motion - Smooth animations
- Firebase - Authentication and database

## Development

### Backend Development
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
npm run dev
```

## Testing

Test the API endpoints using the provided test script:
```bash
cd backend
python test_api.py
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License. 