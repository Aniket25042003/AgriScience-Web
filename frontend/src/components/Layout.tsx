import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-pulse delay-3000"></div>
      </div>

      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-16"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Layout;