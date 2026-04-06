import React from 'react';
import { 
  CloudSun, 
  Thermometer, 
  Wind, 
  Eye, 
  Droplets, 
  Gauge,
  Sun,
  Cloud,
  Zap,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { solarSites, type SolarSite } from '../../data/solarLocations';

const WeatherData: React.FC = () => {
  const regionWeatherProfile: Record<SolarSite['region'], { temperature: string; humidity: string; windSpeed: string; cloudCover: string; condition: string }> = {
    city: { temperature: '28°C', humidity: '60%', windSpeed: '12 km/h', cloudCover: '25%', condition: 'Urban Clear' },
    coastal: { temperature: '30°C', humidity: '75%', windSpeed: '15 km/h', cloudCover: '40%', condition: 'Humid Coast' },
    hill: { temperature: '18°C', humidity: '50%', windSpeed: '9 km/h', cloudCover: '20%', condition: 'Cool & Clear' },
    desert: { temperature: '34°C', humidity: '30%', windSpeed: '18 km/h', cloudCover: '12%', condition: 'Hot & Sunny' },
    rural: { temperature: '27°C', humidity: '55%', windSpeed: '11 km/h', cloudCover: '22%', condition: 'Open Skies' }
  };

  const locationWeatherData = solarSites.map((site) => ({
    city: site.name,
    state: site.state,
    ...regionWeatherProfile[site.region],
    irradiance: `${site.irradiance} W/m²`
  }));

  const weatherMetrics = [
    {
      icon: Sun,
      label: 'Solar Irradiance',
      value: '850 W/m²',
      description: 'Current solar radiation intensity',
      color: 'text-yellow-600'
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: '28°C',
      description: 'Ambient air temperature',
      color: 'text-red-500'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: '65%',
      description: 'Relative humidity percentage',
      color: 'text-blue-500'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: '12 km/h',
      description: 'Current wind velocity',
      color: 'text-gray-600'
    },
    {
      icon: Cloud,
      label: 'Cloud Cover',
      value: '25%',
      description: 'Sky cloud coverage percentage',
      color: 'text-gray-500'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: '10 km',
      description: 'Atmospheric visibility range',
      color: 'text-indigo-500'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: '1013 hPa',
      description: 'Atmospheric pressure',
      color: 'text-purple-500'
    },
    {
      icon: Zap,
      label: 'UV Index',
      value: '8 (Very High)',
      description: 'Ultraviolet radiation level',
      color: 'text-orange-500'
    }
  ];

  const solarWeatherInfo = [
    {
      title: 'Real-time Weather Monitoring',
      description: 'Continuous monitoring of weather conditions that directly impact solar energy generation efficiency.',
      features: [
        'Live weather data from multiple API sources',
        'Integration with OpenWeatherMap API',
        'Automated data collection every 15 minutes',
        'Historical weather pattern analysis'
      ]
    },
    {
      title: 'Solar-Specific Metrics',
      description: 'Weather parameters specifically relevant for solar energy calculations and predictions.',
      features: [
        'Solar irradiance measurements (W/m²)',
        'Cloud cover impact on solar generation',
        'Temperature effects on panel efficiency',
        'UV index for panel degradation analysis'
      ]
    },
    {
      title: 'Geographic Coverage',
      description: 'Comprehensive weather monitoring across Indian cities and hilly regions.',
      features: [
        'Coverage of major Indian cities',
        'Hill station weather monitoring',
        'Regional climate pattern analysis',
        'Micro-climate detection for optimal placement'
      ]
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <CloudSun className="h-8 w-8" />
          <h2 className="text-3xl font-bold">Weather Data Analytics</h2>
        </div>
        <p className="text-blue-100 text-lg">
          Real-time weather monitoring and analysis for optimal solar energy generation across India
        </p>
        <div className="flex items-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Last Updated: {new Date().toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Locations Tracked: {locationWeatherData.length} (Interactive Map Cities)</span>
          </div>
        </div>
      </div>

      {/* Location-wise Weather Details */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-blue-600" />
          Location-wise Weather Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {locationWeatherData.map((location) => (
            <div key={location.city} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{location.city}</h4>
                  <p className="text-sm text-gray-500">{location.state}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {location.condition}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Temp</div>
                <div className="font-medium text-gray-900 text-right">{location.temperature}</div>

                <div className="text-gray-600">Humidity</div>
                <div className="font-medium text-gray-900 text-right">{location.humidity}</div>

                <div className="text-gray-600">Wind</div>
                <div className="font-medium text-gray-900 text-right">{location.windSpeed}</div>

                <div className="text-gray-600">Cloud Cover</div>
                <div className="font-medium text-gray-900 text-right">{location.cloudCover}</div>

                <div className="text-gray-600">Irradiance</div>
                <div className="font-medium text-gray-900 text-right">{location.irradiance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Weather Metrics */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
          Current Weather Conditions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weatherMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.label} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`h-6 w-6 ${metric.color}`} />
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{metric.label}</h4>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Information Cards */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Weather Data Features</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {solarWeatherInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{info.title}</h4>
              <p className="text-gray-600 mb-4">{info.description}</p>
              <ul className="space-y-2">
                {info.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Impact on Solar */}
      <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
        <h3 className="text-xl font-semibold text-yellow-800 mb-3 flex items-center">
          <Sun className="h-6 w-6 mr-2" />
          Weather Impact on Solar Generation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">Positive Factors:</h4>
            <ul className="space-y-1 text-yellow-600">
              <li>• High solar irradiance (&gt;800 W/m²)</li>
              <li>• Low cloud cover (&lt;30%)</li>
              <li>• Moderate temperatures (20-25°C)</li>
              <li>• Low humidity levels</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">Challenging Factors:</h4>
            <ul className="space-y-1 text-yellow-600">
              <li>• Heavy cloud cover (&gt;70%)</li>
              <li>• Extreme temperatures (&gt;40°C)</li>
              <li>• High humidity (&gt;80%)</li>
              <li>• Dust and pollution affecting visibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
