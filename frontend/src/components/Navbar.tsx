import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Home, Search, Microscope, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (!currentUser) return null;

  const navItems = [
    { path: '/app/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/app/crop', icon: Search, label: 'Crop Recommendation' },
    { path: '/app/disease', icon: Microscope, label: 'Disease Detection' },
    { path: '/app/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/app/dashboard" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="p-2 bg-green-100 rounded-full"
            >
              <Leaf className="h-6 w-6 text-green-600" />
            </motion.div>
            <span className="text-xl font-bold text-green-800">AgriScience</span>
          </Link>

          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;