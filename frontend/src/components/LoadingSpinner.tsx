import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="p-3 bg-green-100 rounded-full mb-4"
      >
        <Leaf className="h-8 w-8 text-green-600" />
      </motion.div>
      <p className="text-green-700 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;