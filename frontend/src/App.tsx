import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import MapView from './components/Map/MapView';
import WeatherData from './components/Weather/WeatherData';
import SolarAnalysis from './components/Analysis/SolarAnalysis';
import Predictions from './components/Predictions/Predictions';
import { WeatherProvider } from './contexts/WeatherContext';
import { SolarDataProvider } from './contexts/SolarDataContext';
import LoadingSpinner from './components/Common/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <WeatherProvider>
      <SolarDataProvider>
        <Router>
          <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/weather" element={<WeatherData />} />
                  <Route path="/analysis" element={<SolarAnalysis />} />
                  <Route path="/predictions" element={<Predictions />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </SolarDataProvider>
    </WeatherProvider>
  );
}

export default App;
