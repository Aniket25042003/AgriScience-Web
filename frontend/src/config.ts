const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://agriscience.onrender.com'
};

// Debug logging
console.log('API Base URL:', config.API_BASE_URL);
console.log('Environment variable:', import.meta.env.VITE_API_BASE_URL);

export default config; 