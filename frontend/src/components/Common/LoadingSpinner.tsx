import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Solar Mapping Platform</h2>
        <p className="text-gray-600">Initializing weather data and solar analysis...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
