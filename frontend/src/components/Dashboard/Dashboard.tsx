import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Zap, TrendingUp, MapPin, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardStats {
  totalGeneration: number;
  averageIrradiance: number;
  efficiency: number;
  activeSites: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalGeneration: 0,
    averageIrradiance: 0,
    efficiency: 0,
    activeSites: 0
  });

  const [chartData, setChartData] = useState([
    { time: '00:00', irradiance: 0, generation: 0 },
    { time: '06:00', irradiance: 200, generation: 150 },
    { time: '09:00', irradiance: 600, generation: 480 },
    { time: '12:00', irradiance: 1000, generation: 850 },
    { time: '15:00', irradiance: 800, generation: 680 },
    { time: '18:00', irradiance: 300, generation: 240 },
    { time: '21:00', irradiance: 0, generation: 0 },
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats({
        totalGeneration: Math.random() * 1000 + 2000,
        averageIrradiance: Math.random() * 200 + 700,
        efficiency: Math.random() * 10 + 85,
        activeSites: Math.floor(Math.random() * 50) + 150
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Total Generation',
      value: `${stats.totalGeneration.toFixed(1)} MWh`,
      icon: Zap,
      color: 'bg-green-500',
      change: '+12.5%'
    },
    {
      title: 'Avg Irradiance',
      value: `${stats.averageIrradiance.toFixed(0)} W/m²`,
      icon: Sun,
      color: 'bg-yellow-500',
      change: '+8.2%'
    },
    {
      title: 'System Efficiency',
      value: `${stats.efficiency.toFixed(1)}%`,
      icon: Activity,
      color: 'bg-blue-500',
      change: '+2.1%'
    },
    {
      title: 'Active Sites',
      value: stats.activeSites.toString(),
      icon: MapPin,
      color: 'bg-purple-500',
      change: '+15'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Solar Mapping Dashboard
        </h1>
        <p className="text-gray-600">
          Real-time solar energy monitoring across India
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {card.change}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solar Irradiance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Solar Irradiance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="irradiance" 
                stroke="#f97316" 
                fill="#fed7aa" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Power Generation Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Power Generation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="generation" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Cloud className="h-8 w-8 text-blue-500 mb-2 mx-auto" />
            <p className="font-medium">Weather Analysis</p>
            <p className="text-sm text-gray-600">View detailed weather data</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-8 w-8 text-green-500 mb-2 mx-auto" />
            <p className="font-medium">Generate Predictions</p>
            <p className="text-sm text-gray-600">ML-powered forecasting</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="h-8 w-8 text-purple-500 mb-2 mx-auto" />
            <p className="font-medium">Explore Map</p>
            <p className="text-sm text-gray-600">Interactive solar mapping</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
