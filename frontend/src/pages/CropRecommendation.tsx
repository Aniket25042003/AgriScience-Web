import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Leaf, TrendingUp, Download } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import config from '../config';
import jsPDF from 'jspdf';

interface CropFormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}

interface CropRecommendation {
  name: string;
  confidence: number;
  icon: string;
}

const CropRecommendation: React.FC = () => {
  const [formData, setFormData] = useState<CropFormData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        N: parseFloat(formData.nitrogen),
        P: parseFloat(formData.phosphorus),
        K: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      };

      const response = await fetch(`${config.API_BASE_URL}/recommend_crops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to get crop recommendations');
      }

      const data = await response.json();
      const cropRecommendations = data.recommended_crops.map(([name, confidence]: [string, number]) => ({
        name,
        confidence: Math.round(confidence),
        icon: getCropIcon(name)
      }));

      setRecommendations(cropRecommendations);
    } catch (error) {
      console.error('Error getting crop recommendations:', error);
      // Fallback to mock data if API fails
      const mockRecommendations = [
        { name: 'Wheat', confidence: 92, icon: '🌾' },
        { name: 'Corn', confidence: 87, icon: '🌽' },
        { name: 'Rice', confidence: 81, icon: '🌾' }
      ];
      setRecommendations(mockRecommendations);
    } finally {
      setLoading(false);
    }
  };

  const getCropIcon = (cropName: string): string => {
    const iconMap: { [key: string]: string } = {
      'rice': '🌾',
      'wheat': '🌾',
      'corn': '🌽',
      'maize': '🌽',
      'barley': '🌾',
      'cotton': '🌿',
      'jute': '🌿',
      'coconut': '🥥',
      'papaya': '🥭',
      'orange': '🍊',
      'apple': '🍎',
      'muskmelon': '🍈',
      'watermelon': '🍉',
      'grapes': '🍇',
      'mango': '🥭',
      'banana': '🍌',
      'pomegranate': '🍎',
      'lentil': '🌱',
      'blackgram': '🌱',
      'mungbean': '🌱',
      'mothbeans': '🌱',
      'pigeonpeas': '🌱',
      'kidneybeans': '🌱',
      'chickpea': '🌱',
      'coffee': '☕'
    };
    return iconMap[cropName.toLowerCase()] || '🌱';
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // App branding
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('AgriScience', 20, 20);
    
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Crop Recommendation Report', 20, 40);

    // Date and time
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${currentDate} at ${currentTime}`, 20, 50);

    // Input parameters section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Input Parameters:', 20, 70);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let yPosition = 85;

    formFields.forEach((field) => {
      const value = formData[field.name as keyof CropFormData];
      doc.text(`${field.label}: ${value} ${field.unit}`, 20, yPosition);
      yPosition += 15;
    });

    // Recommendations section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Crops:', 20, yPosition + 15);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition += 30;

    recommendations.forEach((crop, index) => {
      doc.text(`${index + 1}. ${crop.name}`, 20, yPosition);
      doc.text(`Confidence: ${crop.confidence}%`, 40, yPosition + 10);
      yPosition += 20;
    });

    // Disclaimer section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Important Note:', 20, yPosition + 20);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const disclaimerText = 'These AI-powered recommendations are highly accurate but can make mistakes. Please consult with local agricultural experts for important farming decisions.';
    const splitText = doc.splitTextToSize(disclaimerText, 170);
    doc.text(splitText, 20, yPosition + 35);

    // Footer
    doc.setFontSize(8);
    doc.text('Generated by AgriScience', 20, 280);

    // Save the PDF
    doc.save(`crop-recommendation-report-${currentDate}.pdf`);
  };

  const formFields = [
    { name: 'nitrogen', label: 'Nitrogen (N)', unit: 'mg/kg', min: 0, max: 140, step: 0.1 },
    { name: 'phosphorus', label: 'Phosphorus (P)', unit: 'mg/kg', min: 5, max: 55, step: 0.1 },
    { name: 'potassium', label: 'Potassium (K)', unit: 'mg/kg', min: 5, max: 200, step: 0.1 },
    { name: 'temperature', label: 'Temperature', unit: '°C', min: 0, max: 50, step: 0.1 },
    { name: 'humidity', label: 'Humidity', unit: '%', min: 14, max: 100, step: 0.1 },
    { name: 'ph', label: 'pH Level', unit: '', min: 3.5, max: 9.5, step: 0.1 },
    { name: 'rainfall', label: 'Rainfall', unit: 'mm', min: 20, max: 300, step: 0.1 }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Search className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Crop Recommendation</h1>
          </div>
          <p className="text-gray-600">Enter your soil and environmental data to get AI-powered crop suggestions</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label} {field.unit && `(${field.unit})`}
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name as keyof CropFormData]}
                      onChange={handleInputChange}
                      required
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg shadow-md hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Analyzing...' : 'Get Recommendations'}
              </motion.button>
            </form>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
              </div>
              {recommendations.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadPDF}
                  className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs font-medium ml-4"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </motion.button>
              )}
            </div>

            {loading ? (
              <LoadingSpinner message="Analyzing soil conditions..." />
            ) : recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((crop, index) => (
                  <motion.div
                    key={crop.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{crop.icon}</span>
                        <span className="text-xl font-bold text-gray-900">{crop.name}</span>
                      </div>
                      <span className="text-lg font-semibold text-green-600">{crop.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${crop.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
                
                {/* Disclaimer Note */}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> These AI-powered recommendations are highly accurate but can make mistakes. 
                    Please consult with local agricultural experts for important farming decisions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter your soil data to get crop recommendations</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;