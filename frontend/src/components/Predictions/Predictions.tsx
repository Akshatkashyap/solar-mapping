import React from 'react';
import { 
  TrendingUp, 
  Brain, 
  Zap, 
  Target,
  Clock,
  BarChart2,
  Activity,
  Layers,
  Cpu,
  Database,
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  Cloud
} from 'lucide-react';

const Predictions: React.FC = () => {
  const predictionMetrics = [
    {
      icon: TrendingUp,
      label: 'Next Hour Forecast',
      value: '142 kWh',
      confidence: '94%',
      trend: 'increasing',
      description: 'Predicted energy generation for next hour'
    },
    {
      icon: Calendar,
      label: 'Daily Forecast',
      value: '1,245 kWh',
      confidence: '87%',
      trend: 'stable',
      description: 'Expected total daily energy output'
    },
    {
      icon: BarChart2,
      label: 'Weekly Outlook',
      value: '8,730 kWh',
      confidence: '79%',
      trend: 'variable',
      description: 'Projected weekly energy generation'
    },
    {
      icon: Activity,
      label: 'Model Accuracy',
      value: '91.5%',
      confidence: '99%',
      trend: 'improving',
      description: 'Current prediction model accuracy'
    }
  ];

  const mlModels = [
    {
      name: 'Random Forest',
      type: 'Ensemble Learning',
      accuracy: '89.2%',
      useCase: 'Short-term predictions (1-24 hours)',
      features: [
        'Weather pattern analysis',
        'Historical data correlation',
        'Feature importance ranking',
        'Robust to outliers',
        'Fast prediction speed'
      ],
      icon: Layers,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      name: 'LSTM Neural Network',
      type: 'Deep Learning',
      accuracy: '93.7%',
      useCase: 'Long-term forecasting (1-30 days)',
      features: [
        'Time series pattern recognition',
        'Seasonal trend analysis',
        'Complex weather interactions',
        'Memory of past patterns',
        'Adaptive learning capability'
      ],
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const predictionFactors = [
    {
      category: 'Weather Parameters',
      factors: [
        'Solar irradiance levels',
        'Cloud cover percentage',
        'Temperature variations',
        'Humidity and atmospheric pressure',
        'Wind speed and direction'
      ],
      icon: Cloud,
      color: 'text-blue-600'
    },
    {
      category: 'Historical Patterns',
      factors: [
        'Seasonal energy trends',
        'Daily generation cycles',
        'Weather pattern correlations',
        'Equipment performance history',
        'Maintenance schedule impacts'
      ],
      icon: Database,
      color: 'text-indigo-600'
    },
    {
      category: 'System Factors',
      factors: [
        'Panel efficiency ratings',
        'Installation angle and orientation',
        'Shading and obstruction analysis',
        'Equipment degradation rates',
        'Grid connection parameters'
      ],
      icon: Settings,
      color: 'text-gray-600'
    }
  ];

  const timeHorizons = [
    {
      period: 'Real-time',
      duration: '15 minutes',
      accuracy: '96%',
      model: 'Random Forest',
      description: 'Immediate generation adjustments'
    },
    {
      period: 'Short-term',
      duration: '1-24 hours',
      accuracy: '91%',
      model: 'Random Forest + Weather API',
      description: 'Day-ahead energy planning'
    },
    {
      period: 'Medium-term',
      duration: '1-7 days',
      accuracy: '85%',
      model: 'LSTM + Weather Forecast',
      description: 'Weekly energy scheduling'
    },
    {
      period: 'Long-term',
      duration: '1-30 days',
      accuracy: '78%',
      model: 'LSTM + Climate Data',
      description: 'Monthly energy planning'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-8 w-8" />
          <h2 className="text-3xl font-bold">AI-Powered Solar Predictions</h2>
        </div>
        <p className="text-purple-100 text-lg">
          Advanced machine learning models for accurate solar energy generation forecasting using Random Forest and LSTM algorithms
        </p>
        <div className="flex items-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-1">
            <Cpu className="h-4 w-4" />
            <span>Models: Random Forest + LSTM</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Updated: Every 15 minutes</span>
          </div>
        </div>
      </div>

      {/* Current Predictions */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <Target className="h-6 w-6 mr-2 text-purple-600" />
          Current Predictions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {predictionMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.label} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-6 w-6 text-purple-600" />
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Confidence</div>
                    <div className="text-sm font-medium text-green-600">{metric.confidence}</div>
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

      {/* ML Models */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Machine Learning Models</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mlModels.map((model, index) => {
            const IconComponent = model.icon;
            return (
              <div key={index} className={`rounded-lg shadow-md p-6 border ${model.bgColor} ${model.borderColor}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <IconComponent className={`h-8 w-8 ${model.color}`} />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{model.name}</h4>
                    <p className="text-sm text-gray-600">{model.type}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-gray-500">Accuracy</div>
                    <div className={`text-lg font-bold ${model.color}`}>{model.accuracy}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Primary Use Case:</div>
                  <div className="text-sm text-gray-600 mb-3">{model.useCase}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Key Features:</div>
                  {model.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prediction Time Horizons */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Prediction Time Horizons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeHorizons.map((horizon, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{horizon.period}</h4>
                <div className="text-lg font-bold text-purple-600">{horizon.accuracy}</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{horizon.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-medium text-xs">{horizon.model}</span>
                </div>
                <p className="text-gray-600 mt-2">{horizon.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Factors */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Prediction Input Factors</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {predictionFactors.map((factor, index) => {
            const IconComponent = factor.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <IconComponent className={`h-6 w-6 ${factor.color}`} />
                  <h4 className="text-lg font-semibold text-gray-800">{factor.category}</h4>
                </div>
                <ul className="space-y-2">
                  {factor.factors.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Model Performance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Model Performance Status
          </h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li>• Random Forest model running optimally</li>
            <li>• LSTM model updated with latest data</li>
            <li>• Prediction accuracy within target range</li>
            <li>• All weather data feeds operational</li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Prediction Alerts
          </h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Weather forecast uncertainty for next 3 days</li>
            <li>• Model retraining scheduled for tonight</li>
            <li>• New seasonal patterns detected</li>
            <li>• Consider equipment maintenance schedule</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Predictions;
