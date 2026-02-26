import React, { useState } from 'react';
import { 
  BarChart3, 
  Sun, 
  Zap, 
  TrendingUp, 
  Activity,
  PieChart,
  LineChart,
  Target,
  Award,
  Battery,
  Gauge,
  Calendar,
  MapPin,
  Info,
  Settings,
  Database,
  Eye
} from 'lucide-react';

const SolarAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationTabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Eye,
      description: 'General analysis dashboard and key metrics'
    },
    { 
      id: 'irradiance', 
      label: 'Irradiance Mapping', 
      icon: Sun,
      description: 'Solar radiation analysis across regions'
    },
    { 
      id: 'efficiency', 
      label: 'Efficiency Analysis', 
      icon: Activity,
      description: 'Performance and efficiency calculations'
    },
    { 
      id: 'production', 
      label: 'Energy Production', 
      icon: Zap,
      description: 'Energy generation analytics and trends'
    },
    { 
      id: 'data', 
      label: 'Data Management', 
      icon: Database,
      description: 'Data sources and quality metrics'
    },
    { 
      id: 'settings', 
      label: 'Analysis Settings', 
      icon: Settings,
      description: 'Configure analysis parameters'
    }
  ];

  const analysisMetrics = [
    {
      icon: Sun,
      label: 'Daily Solar Irradiance',
      value: '6.2 kWh/m²',
      change: '+12%',
      trend: 'up',
      description: 'Average daily solar energy received'
    },
    {
      icon: Zap,
      label: 'Energy Generation',
      value: '145 kWh',
      change: '+8%',
      trend: 'up',
      description: 'Total energy generated today'
    },
    {
      icon: Gauge,
      label: 'Panel Efficiency',
      value: '18.5%',
      change: '-2%',
      trend: 'down',
      description: 'Current solar panel efficiency'
    },
    {
      icon: Battery,
      label: 'Capacity Factor',
      value: '23.8%',
      change: '+5%',
      trend: 'up',
      description: 'Actual vs theoretical energy output'
    }
  ];

  const analysisFeatures = [
    {
      title: 'Solar Irradiance Mapping',
      description: 'Comprehensive analysis of solar radiation patterns across different regions and time periods.',
      features: [
        'Real-time irradiance measurements',
        'Historical data comparison',
        'Seasonal variation analysis',
        'Geographic radiation mapping',
        'Peak sun hours calculation'
      ],
      icon: Sun,
      color: 'text-yellow-600'
    },
    {
      title: 'Efficiency Analysis',
      description: 'Detailed performance metrics and efficiency calculations for solar installations.',
      features: [
        'Panel performance monitoring',
        'Temperature coefficient analysis',
        'Shading impact assessment',
        'Degradation rate tracking',
        'Maintenance recommendations'
      ],
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'Energy Production Analytics',
      description: 'Advanced analytics for energy generation patterns and optimization opportunities.',
      features: [
        'Daily/monthly energy reports',
        'Peak production analysis',
        'Load matching optimization',
        'Grid interaction analysis',
        'Financial performance metrics'
      ],
      icon: Zap,
      color: 'text-blue-600'
    }
  ];

  const chartTypes = [
    {
      icon: LineChart,
      title: 'Time Series Analysis',
      description: 'Track solar generation and irradiance over time'
    },
    {
      icon: BarChart3,
      title: 'Comparative Analysis',
      description: 'Compare performance across different locations'
    },
    {
      icon: PieChart,
      title: 'Energy Distribution',
      description: 'Visualize energy generation breakdown'
    },
    {
      icon: Target,
      title: 'Performance Targets',
      description: 'Monitor achievement against set goals'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="h-8 w-8" />
          <h2 className="text-3xl font-bold">Solar Analysis Dashboard</h2>
        </div>
        <p className="text-orange-100 text-lg">
          Comprehensive solar irradiance analysis and efficiency calculations for optimal energy generation
        </p>
        <div className="flex items-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Analysis Period: Last 30 Days</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Coverage: 50+ Indian Cities</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <nav className="flex space-x-1">
          {navigationTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                title={tab.description}
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <Award className="h-6 w-6 mr-2 text-orange-600" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysisMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.label} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-6 w-6 text-orange-600" />
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{metric.label}</h4>
                <p className="text-xs text-gray-600">{metric.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Features */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Analysis Capabilities</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {analysisFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Types */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Visualization Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {chartTypes.map((chart, index) => {
            const IconComponent = chart.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                <IconComponent className="h-8 w-8 text-orange-600 mb-3" />
                <h4 className="font-semibold text-gray-800 mb-2">{chart.title}</h4>
                <p className="text-sm text-gray-600">{chart.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Insights */}
      <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
          <Info className="h-6 w-6 mr-2" />
          Key Analysis Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-orange-700 mb-3">Optimization Opportunities</h4>
            <ul className="space-y-2 text-sm text-orange-700">
              <li className="flex items-start space-x-2">
                <Target className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Panel orientation adjustments can increase efficiency by 15%</span>
              </li>
              <li className="flex items-start space-x-2">
                <Target className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Regular cleaning schedules improve output by 8-12%</span>
              </li>
              <li className="flex items-start space-x-2">
                <Target className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Shading mitigation can recover 20% lost generation</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-700 mb-3">Regional Performance</h4>
            <ul className="space-y-2 text-sm text-orange-700">
              <li className="flex items-start space-x-2">
                <Award className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Rajasthan shows highest solar potential (6.8 kWh/m²/day)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Award className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Hill stations offer consistent generation patterns</span>
              </li>
              <li className="flex items-start space-x-2">
                <Award className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Coastal areas face humidity-related efficiency challenges</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Irradiance Mapping Tab */}
      {activeTab === 'irradiance' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Sun className="h-6 w-6 mr-2 text-yellow-600" />
            Solar Irradiance Mapping
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Real-time Measurements</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Global Horizontal Irradiance (GHI)</li>
                <li>• Direct Normal Irradiance (DNI)</li>
                <li>• Diffuse Horizontal Irradiance (DHI)</li>
                <li>• Plane of Array Irradiance (POA)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Regional Analysis</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• State-wise irradiance comparison</li>
                <li>• Seasonal variation patterns</li>
                <li>• Climate zone analysis</li>
                <li>• Geographic optimization</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Efficiency Analysis Tab */}
      {activeTab === 'efficiency' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Activity className="h-6 w-6 mr-2 text-green-600" />
            Efficiency Analysis
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Performance Metrics</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Panel efficiency tracking</li>
                <li>• Temperature coefficients</li>
                <li>• Performance ratio (PR)</li>
                <li>• Capacity factor analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Loss Analysis</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Shading losses</li>
                <li>• Soiling impact</li>
                <li>• Inverter losses</li>
                <li>• System degradation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Optimization</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Tilt angle optimization</li>
                <li>• Azimuth adjustment</li>
                <li>• Maintenance scheduling</li>
                <li>• Upgrade recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Energy Production Tab */}
      {activeTab === 'production' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-blue-600" />
            Energy Production Analytics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Production Metrics</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Daily energy generation</li>
                <li>• Monthly production trends</li>
                <li>• Peak generation analysis</li>
                <li>• Load matching efficiency</li>
                <li>• Grid export/import balance</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Financial Analytics</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Revenue generation</li>
                <li>• Cost per kWh</li>
                <li>• Return on investment</li>
                <li>• Payback period</li>
                <li>• Carbon offset value</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Data Management Tab */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Database className="h-6 w-6 mr-2 text-purple-600" />
            Data Management
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Data Sources</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Satellite imagery data</li>
                <li>• Ground weather stations</li>
                <li>• IoT sensor networks</li>
                <li>• Historical climate data</li>
                <li>• Real-time monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Data Quality</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Data validation protocols</li>
                <li>• Quality assurance checks</li>
                <li>• Missing data handling</li>
                <li>• Anomaly detection</li>
                <li>• Data accuracy metrics</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="h-6 w-6 mr-2 text-gray-600" />
            Analysis Settings
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Analysis Parameters</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Time period selection</li>
                <li>• Geographic boundaries</li>
                <li>• Data resolution settings</li>
                <li>• Calculation methods</li>
                <li>• Benchmark comparisons</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Export Options</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• PDF report generation</li>
                <li>• CSV data export</li>
                <li>• Chart image downloads</li>
                <li>• API data access</li>
                <li>• Scheduled reports</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SolarAnalysis;
