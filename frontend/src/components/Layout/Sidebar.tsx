import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  CloudSun, 
  BarChart3, 
  TrendingUp, 
  X,
  Info
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard,
    description: 'Overview of solar mapping data and key metrics'
  },
  { 
    name: 'Interactive Map', 
    href: '/map', 
    icon: Map,
    description: 'Real-time solar irradiance mapping across India'
  },
  { 
    name: 'Weather Data', 
    href: '/weather', 
    icon: CloudSun,
    description: 'Live weather conditions affecting solar energy generation'
  },
  { 
    name: 'Solar Analysis', 
    href: '/analysis', 
    icon: BarChart3,
    description: 'Comprehensive solar analysis including irradiance mapping, efficiency tracking, energy production analytics, and performance optimization insights'
  },
  { 
    name: 'Predictions', 
    href: '/predictions', 
    icon: TrendingUp,
    description: 'AI-powered solar energy forecasts using ML models'
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-solar-600">
          <span className="text-white font-semibold text-lg">Navigation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="group relative">
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-solar-100 text-solar-900 border-r-2 border-solar-500'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="flex-1">{item.name}</span>
                    <Info className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavLink>
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute left-full top-0 ml-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-[100] w-72 pointer-events-none">
                    <div className="font-semibold mb-2 text-white text-sm">{item.name}</div>
                    <div className="text-gray-300 mb-3 leading-relaxed">{item.description}</div>
                    
                    {/* Show sub-components for Solar Analysis */}
                    {item.name === 'Solar Analysis' && (
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="text-xs font-medium text-orange-400 mb-2">Available Components:</div>
                        <div className="grid grid-cols-1 gap-1">
                          <div className="text-xs text-gray-300">☀️ Solar Irradiance Mapping</div>
                          <div className="text-xs text-gray-300">⚡ Efficiency Analysis</div>
                          <div className="text-xs text-gray-300">📊 Energy Production Analytics</div>
                          <div className="text-xs text-gray-300">📈 Performance Metrics</div>
                          <div className="text-xs text-gray-300">📉 Visualization Tools</div>
                          <div className="text-xs text-gray-300">🎯 Optimization Insights</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Show sub-components for Weather Data */}
                    {item.name === 'Weather Data' && (
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="text-xs font-medium text-blue-400 mb-2">Key Features:</div>
                        <div className="grid grid-cols-1 gap-1">
                          <div className="text-xs text-gray-300">🌡️ Live Weather Monitoring</div>
                          <div className="text-xs text-gray-300">🌡️ Temperature Tracking</div>
                          <div className="text-xs text-gray-300">☁️ Humidity & Cloud Cover</div>
                          <div className="text-xs text-gray-300">💨 Wind Speed Analysis</div>
                          <div className="text-xs text-gray-300">☀️ Weather Impact on Solar</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Show sub-components for Predictions */}
                    {item.name === 'Predictions' && (
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="text-xs font-medium text-green-400 mb-2">ML Models:</div>
                        <div className="grid grid-cols-1 gap-1">
                          <div className="text-xs text-gray-300">🌳 Random Forest Model</div>
                          <div className="text-xs text-gray-300">🧠 LSTM Neural Network</div>
                          <div className="text-xs text-gray-300">🔮 Energy Forecasting</div>
                          <div className="text-xs text-gray-300">📊 Performance Predictions</div>
                          <div className="text-xs text-gray-300">🌤️ Weather Integration</div>
                        </div>
                      </div>
                    )}

                    {/* Show sub-components for Interactive Map */}
                    {item.name === 'Interactive Map' && (
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="text-xs font-medium text-purple-400 mb-2">Map Features:</div>
                        <div className="grid grid-cols-1 gap-1">
                          <div className="text-xs text-gray-300">🗺️ Real-time Irradiance Map</div>
                          <div className="text-xs text-gray-300">📍 Location-based Analysis</div>
                          <div className="text-xs text-gray-300">🏔️ Terrain Visualization</div>
                          <div className="text-xs text-gray-300">🌆 City Coverage</div>
                          <div className="text-xs text-gray-300">📊 Data Overlay Options</div>
                        </div>
                      </div>
                    )}

                    {/* Show sub-components for Dashboard */}
                    {item.name === 'Dashboard' && (
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="text-xs font-medium text-yellow-400 mb-2">Dashboard Elements:</div>
                        <div className="grid grid-cols-1 gap-1">
                          <div className="text-xs text-gray-300">📊 Key Performance Indicators</div>
                          <div className="text-xs text-gray-300">📈 Real-time Charts</div>
                          <div className="text-xs text-gray-300">🌡️ Weather Summary</div>
                          <div className="text-xs text-gray-300">⚡ Energy Generation Stats</div>
                          <div className="text-xs text-gray-300">🎯 Performance Goals</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Arrow pointer */}
                    <div className="absolute left-0 top-4 transform -translate-x-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-900"></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Information Panel */}
        <div className="mt-6 mx-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
          <div className="text-xs font-medium text-orange-800 mb-2">
            💡 Quick Info
          </div>
          <div className="text-xs text-orange-700 space-y-1">
            <div className="flex items-start space-x-1">
              <span className="text-orange-500">•</span>
              <span>Hover over navigation items for detailed information</span>
            </div>
            <div className="flex items-start space-x-1">
              <span className="text-orange-500">•</span>
              <span>Solar Analysis has 6 comprehensive tabs</span>
            </div>
            <div className="flex items-start space-x-1">
              <span className="text-orange-500">•</span>
              <span>Real-time data from 50+ Indian cities</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t">
          <div className="text-xs text-gray-500 text-center">
            <div className="font-semibold text-gray-600">Solar Mapping India v1.0</div>
            <div className="text-gray-500">Real-time Solar Analytics</div>
            <div className="text-xs text-gray-400 mt-1">
              🌞 Powered by AI & ML Models
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
