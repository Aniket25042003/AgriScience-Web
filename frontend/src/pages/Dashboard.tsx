import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Search, Microscope, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Empowering sustainable farming with AI.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const displayName = currentUser?.email?.split('@')[0] || 'Farmer';

  const features = [
    {
      title: 'Crop Recommendation',
      description: 'Get AI-powered crop suggestions based on soil conditions',
      icon: Search,
      path: '/app/crop',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Disease Detection',
      description: 'Identify plant diseases from leaf images instantly',
      icon: Microscope,
      path: '/app/disease',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  const howToUseSteps = [
    {
      feature: 'Crop Recommendation',
      icon: Search,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      steps: [
        'Navigate to the Crop Recommendation page',
        'Enter your soil data (N, P, K levels)',
        'Add environmental data (temperature, humidity, pH, rainfall)',
        'Click "Get Recommendations" to receive AI-powered crop suggestions'
      ]
    },
    {
      feature: 'Disease Detection',
      icon: Microscope,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      steps: [
        'Go to the Disease Detection page',
        'Upload a clear photo of a plant leaf',
        'Ensure the image is well-lit and shows the leaf clearly',
        'Click "Analyze Plant" to get instant disease detection results'
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Hello, {displayName}!
          </motion.h1>
          <div className="text-xl text-gray-600 h-8">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={feature.path} className="block">
                <div className={`${feature.bgColor} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* How to Use */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center mb-6">
            <BookOpen className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">How to Use AgriScience</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {howToUseSteps.map((guide, index) => (
              <motion.div
                key={guide.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-full mr-3 ${guide.bgColor}`}>
                    <guide.icon className={`h-5 w-5 ${guide.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{guide.feature}</h3>
                </div>
                
                <div className="space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-gray-600">{stepIndex + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    to={guide.feature === 'Crop Recommendation' ? '/app/crop' : '/app/disease'}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Try {guide.feature}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;