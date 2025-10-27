# Solar Mapping India - Real-time Solar Energy Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

A comprehensive, production-ready platform for real-time solar mapping across India, featuring advanced weather data integration, ML-powered solar irradiance analysis, and energy output predictions optimized for both urban cities and hilly terrains.

## 🌟 Key Features

### 🗺️ Interactive Solar Mapping
- **Custom Map Implementation**: Built from scratch using Leaflet.js
- **Real-time Data Visualization**: Live solar irradiance and weather overlays
- **Multi-terrain Support**: Optimized for Indian cities, hills, and rural areas
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🤖 AI-Powered Predictions
- **Random Forest Model**: High-accuracy solar irradiance predictions
- **LSTM Neural Networks**: Time-series forecasting for energy output
- **Ensemble Predictions**: Combined model approach for enhanced accuracy
- **Real-time Training**: Models adapt to new data automatically

### ☀️ Comprehensive Solar Analysis
- **Irradiance Calculations**: Advanced algorithms considering terrain and weather
- **Efficiency Monitoring**: Real-time system performance tracking
- **Regional Optimization**: Specialized analysis for different Indian regions
- **Peak Hour Analysis**: Optimal solar collection time identification

### 🌤️ Live Weather Integration
- **OpenWeatherMap API**: Real-time weather data
- **Historical Analysis**: Weather pattern analysis and trends
- **Forecast Integration**: 7-day weather predictions
- **Multiple Parameters**: Temperature, humidity, cloud cover, UV index, and more

### 📊 Advanced Analytics Dashboard
- **Real-time Metrics**: Live generation and efficiency statistics
- **Interactive Charts**: Powered by Recharts with responsive design
- **Performance Insights**: Detailed analytics and recommendations
- **Export Capabilities**: Data export in multiple formats

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React.js      │    │    Node.js       │    │   Python ML     │
│   Frontend      │◄──►│    Backend       │◄──►│     API         │
│                 │    │                  │    │                 │
│ • Interactive   │    │ • REST APIs      │    │ • Random Forest │
│   Maps          │    │ • Weather Data   │    │ • LSTM Models   │
│ • Dashboards    │    │ • Authentication │    │ • Predictions   │
│ • Charts        │    │ • Rate Limiting  │    │ • Training      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │    MongoDB       │
                    │   Database       │
                    │                  │
                    │ • Solar Data     │
                    │ • Weather Data   │
                    │ • User Sessions  │
                    │ • Analytics      │
                    └──────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- MongoDB (or use Docker)
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/solar-mapping-india.git
   cd solar-mapping-india
   ```

2. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Add your API keys to .env
   OPENWEATHER_API_KEY=your_api_key_here
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Install Dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   ```

4. **Start Development Environment**
   ```bash
   # Start all services
   npm run dev
   ```

   Or using Docker:
   ```bash
   # Start with Docker Compose
   docker-compose -f deployment/docker-compose.yml up -d
   ```

### Access the Platform

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **ML API**: http://localhost:5001
- **API Documentation**: http://localhost:5000/api/docs

## 📱 Platform Screenshots

### Interactive Solar Map
- Real-time solar irradiance visualization
- Multi-layer weather overlays
- Responsive design for all devices
- Custom markers for different terrains

### Analytics Dashboard
- Live performance metrics
- Interactive charts and graphs
- Regional comparison tools
- Export capabilities

### Prediction Interface
- AI-powered forecasting
- Model comparison views
- Confidence intervals
- Historical accuracy tracking

## 🔧 Configuration

### Environment Variables

```bash
# Backend Configuration
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/solar_mapping
REDIS_URL=redis://localhost:6379

# API Keys
OPENWEATHER_API_KEY=your_key_here
JWT_SECRET=your_secret_here

# ML Configuration
PYTHON_PATH=/usr/bin/python3
MODEL_UPDATE_INTERVAL=3600

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ML_API_URL=http://localhost:5001
```

### Docker Configuration

The platform includes production-ready Docker configuration:

- **Multi-stage builds** for optimized images
- **Health checks** for all services
- **Volume mounting** for persistent data
- **Network isolation** for security
- **Load balancing** with Nginx

## 🛠️ Development

### Project Structure

```
solar-mapping-india/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # React contexts
│   │   ├── services/         # API services
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   └── config/          # Configuration
│   └── package.json
├── ml-models/               # Python ML models
│   ├── random_forest_model.py
│   ├── lstm_model.py
│   ├── api.py              # Flask API
│   └── requirements.txt
├── deployment/              # Docker configuration
│   ├── docker-compose.yml
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── Dockerfile.ml
└── data/                   # Sample data
```

### Adding New Features

1. **Frontend Components**: Add to `frontend/src/components/`
2. **API Endpoints**: Add to `backend/src/routes/`
3. **ML Models**: Add to `ml-models/`
4. **Database Models**: Add to `backend/src/models/`

### Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# Python tests
cd ml-models && python -m pytest
```

## 📊 ML Models

### Random Forest Model
- **Features**: 10 weather and location parameters
- **Accuracy**: R² score > 0.85
- **Performance**: Sub-second predictions
- **Use Case**: Real-time irradiance estimation

### LSTM Neural Network
- **Architecture**: 3-layer LSTM with dropout
- **Sequence Length**: 24 hours historical data
- **Accuracy**: MAE < 50 W/m²
- **Use Case**: Time-series forecasting

### Model Training
```bash
# Train Random Forest
python ml-models/random_forest_model.py

# Train LSTM
python ml-models/lstm_model.py

# API-based retraining
curl -X POST http://localhost:5001/model/retrain
```

## 🌍 Regional Optimization

### City Deployments
- **Pollution factors**: Air quality impact modeling
- **Urban heat islands**: Temperature correction algorithms
- **Building shadows**: Obstruction analysis

### Hill Stations
- **Altitude corrections**: Atmospheric density adjustments
- **Terrain modeling**: Slope and aspect calculations
- **Cloud behavior**: Orographic cloud patterns

### Rural Areas
- **Clear sky models**: Minimal obstruction scenarios
- **Seasonal variations**: Agricultural impact considerations
- **Dust factors**: Seasonal dust storm modeling

## 🔒 Security Features

- **Rate Limiting**: API protection against abuse
- **Input Validation**: Comprehensive data sanitization
- **CORS Configuration**: Secure cross-origin requests
- **Helmet.js**: Security headers
- **JWT Authentication**: Secure user sessions
- **Environment Variables**: Secure configuration management

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading for components
- **Caching**: Redis for API response caching
- **CDN Ready**: Static asset optimization
- **Database Indexing**: MongoDB performance tuning
- **Compression**: Gzip compression for all responses
- **Image Optimization**: WebP format support

## 🚀 Deployment

### Production Deployment

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy with Docker**
   ```bash
   docker-compose -f deployment/docker-compose.yml up -d
   ```

3. **Scale Services**
   ```bash
   docker-compose up -d --scale backend=3
   ```

### Cloud Deployment Options

- **AWS**: ECS, EC2, RDS
- **Google Cloud**: Cloud Run, GKE
- **Azure**: Container Instances, AKS
- **DigitalOcean**: App Platform, Droplets

## 📝 API Documentation

### Weather Endpoints
```bash
GET /api/weather?lat=28.6139&lon=77.2090
GET /api/weather/forecast?lat=28.6139&lon=77.2090&days=7
GET /api/weather/historical?lat=28.6139&lon=77.2090&start=2023-01-01&end=2023-01-31
```

### Solar Endpoints
```bash
GET /api/solar?lat=28.6139&lon=77.2090
GET /api/solar/predictions?lat=28.6139&lon=77.2090&days=7
POST /api/solar/analyze
```

### ML Endpoints
```bash
POST /ml/predict/random-forest
POST /ml/predict/lstm
POST /ml/predict/combined
GET /ml/model/status
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.solar-mapping.com](https://docs.solar-mapping.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/solar-mapping-india/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/solar-mapping-india/discussions)
- **Email**: support@solar-mapping.com

## 🙏 Acknowledgments

- **OpenWeatherMap**: Weather data API
- **Leaflet**: Open-source mapping library
- **React Community**: Component libraries and tools
- **TensorFlow**: Machine learning framework
- **scikit-learn**: Machine learning library

## 🔮 Roadmap

- [ ] Satellite imagery integration
- [ ] Mobile application (React Native)
- [ ] Advanced terrain modeling
- [ ] IoT sensor integration
- [ ] Multi-language support
- [ ] Offline capability
- [ ] Advanced analytics and reporting
- [ ] Integration with solar panel manufacturers

---

**Made with ❤️ for sustainable energy in India**
