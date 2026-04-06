import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Search, Layers, Filter, Download } from 'lucide-react';
import { solarSites, type SolarSite } from '../../data/solarLocations';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<SolarSite | null>(null);
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const center: LatLngExpression = [20.5937, 78.9629]; // Center of India

  const filteredSites = solarSites.filter(site => {
    const matchesRegion = filterRegion === 'all' || site.region === filterRegion;
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const getMarkerIcon = (site: SolarSite) => {
    let color = '#10b981'; // green for active
    if (site.status === 'maintenance') color = '#f59e0b'; // yellow
    if (site.status === 'offline') color = '#ef4444'; // red

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z" fill="${color}"/>
          <circle cx="12.5" cy="12.5" r="8" fill="white"/>
          <circle cx="12.5" cy="12.5" r="5" fill="${color}"/>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [0, -41],
    });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Interactive Solar Map</h2>
          
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Regions</option>
                <option value="city">Cities</option>
                <option value="coastal">Coastal</option>
                <option value="hill">Hills</option>
                <option value="desert">Desert</option>
                <option value="rural">Rural</option>
              </select>
            </div>

            {/* Layer Toggle */}
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              <Layers className="h-4 w-4" />
              Layers
            </button>

            {/* Export */}
            <button className="flex items-center gap-2 px-3 py-2 bg-solar-500 text-white rounded-lg hover:bg-solar-600 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={5}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredSites.map((site) => (
            <Marker
              key={site.id}
              position={site.position}
              icon={getMarkerIcon(site)}
              eventHandlers={{
                click: () => setSelectedSite(site),
              }}
            >
              <Popup maxWidth={350} maxHeight={400}>
                <div className="p-3 min-w-[300px] max-h-[380px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-orange-700">{site.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      site.status === 'active' ? 'bg-green-100 text-green-700' :
                      site.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {site.status}
                    </span>
                  </div>
                  
                  {site.cityInfo && (
                    <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-1">📍 Location Info</h4>
                      <p className="text-xs text-blue-700 mb-2">{site.cityInfo.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-blue-600">Population:</span> {site.cityInfo.population}</div>
                        <div><span className="text-blue-600">Area:</span> {site.cityInfo.area}</div>
                        <div><span className="text-blue-600">Elevation:</span> {site.cityInfo.elevation}</div>
                        <div><span className="text-blue-600">State:</span> {site.state}</div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-orange-50 p-2 rounded">
                        <div className="text-orange-600 font-medium">☀️ Solar Data</div>
                        <div className="text-xs space-y-1 mt-1">
                          <div>Irradiance: <span className="font-medium">{site.irradiance} W/m²</span></div>
                          <div>Efficiency: <span className="font-medium">{site.efficiency}%</span></div>
                          <div>Peak Hours: <span className="font-medium">{site.peakSunHours}h</span></div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-green-600 font-medium">⚡ Generation</div>
                        <div className="text-xs space-y-1 mt-1">
                          <div>Capacity: <span className="font-medium">{site.capacity} MW</span></div>
                          <div>Climate: <span className="font-medium">{site.climate}</span></div>
                          <div>Region: <span className="font-medium capitalize">{site.region}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-2 rounded">
                      <div className="text-yellow-700 font-medium mb-1">📊 Performance Insights</div>
                      <div className="text-xs space-y-1">
                        <div>Seasonal Variation: <span className="font-medium">{site.seasonalVariation}</span></div>
                        <div>Best Months: <span className="font-medium">{site.bestMonths.join(', ')}</span></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-red-50 p-2 rounded">
                        <div className="text-red-600 font-medium text-xs mb-1">⚠️ Challenges</div>
                        <ul className="text-xs space-y-0.5">
                          {site.challenges.slice(0, 3).map((challenge, idx) => (
                            <li key={idx} className="text-red-700">• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-green-600 font-medium text-xs mb-1">✅ Advantages</div>
                        <ul className="text-xs space-y-0.5">
                          {site.advantages.slice(0, 3).map((advantage, idx) => (
                            <li key={idx} className="text-green-700">• {advantage}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Comprehensive Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-xl p-4 z-[1000] max-w-sm max-h-[calc(100vh-8rem)] overflow-y-auto border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-800 flex items-center">
              🗺️ Interactive Map Guide
            </h4>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Live Data
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Status Legend */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <h5 className="font-semibold text-sm text-gray-800 mb-2 flex items-center">
                🔄 System Status
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                    <span className="font-medium text-green-700">Active</span>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {filteredSites.filter(s => s.status === 'active').length} sites
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                    <span className="font-medium text-yellow-700">Maintenance</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {filteredSites.filter(s => s.status === 'maintenance').length} sites
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                    <span className="font-medium text-red-700">Offline</span>
                  </div>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {filteredSites.filter(s => s.status === 'offline').length} sites
                  </span>
                </div>
              </div>
            </div>

            {/* Region Analysis */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="font-semibold text-sm text-blue-800 mb-2 flex items-center">
                🌍 Regional Distribution
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏙️</span>
                    <div>
                      <div className="font-medium text-gray-700">Metropolitan Cities</div>
                      <div className="text-gray-500">High demand, infrastructure</div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {solarSites.filter(s => s.region === 'city').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌊</span>
                    <div>
                      <div className="font-medium text-gray-700">Coastal Regions</div>
                      <div className="text-gray-500">Moderate irradiance, humidity</div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {solarSites.filter(s => s.region === 'coastal').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⛰️</span>
                    <div>
                      <div className="font-medium text-gray-700">Hill Stations</div>
                      <div className="text-gray-500">Cool climate, clear skies</div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {solarSites.filter(s => s.region === 'hill').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏜️</span>
                    <div>
                      <div className="font-medium text-gray-700">Desert Areas</div>
                      <div className="text-gray-500">Highest irradiance, clear skies</div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                    {solarSites.filter(s => s.region === 'desert').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="bg-orange-50 p-3 rounded-lg">
              <h5 className="font-semibold text-sm text-orange-800 mb-2 flex items-center">
                📊 Performance Analytics
              </h5>
              <div className="space-y-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-700">Total Installed Capacity</span>
                    <span className="text-orange-700 font-bold">{solarSites.reduce((sum, site) => sum + site.capacity, 0)} MW</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-700">Average Solar Irradiance</span>
                    <span className="text-orange-700 font-bold">{Math.round(solarSites.reduce((sum, site) => sum + site.irradiance, 0) / solarSites.length)} W/m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Range:</span>
                    <span className="text-xs text-gray-600">{Math.min(...solarSites.map(s => s.irradiance))} - {Math.max(...solarSites.map(s => s.irradiance))} W/m²</span>
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-700">System Efficiency</span>
                    <span className="text-orange-700 font-bold">{Math.round(solarSites.reduce((sum, site) => sum + site.efficiency, 0) / solarSites.length * 10) / 10}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Peak Efficiency:</span>
                    <span className="text-xs text-gray-600">{Math.max(...solarSites.map(s => s.efficiency))}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Regions */}
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-semibold text-sm text-green-800 mb-2 flex items-center">
                🏆 Top Performing Sites
              </h5>
              <div className="space-y-1 text-xs">
                {solarSites
                  .sort((a, b) => b.irradiance - a.irradiance)
                  .slice(0, 3)
                  .map((site, idx) => (
                    <div key={site.id} className="flex items-center justify-between bg-white p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-600">#{idx + 1}</span>
                        <div>
                          <div className="font-medium text-gray-700">{site.name.split(' ')[0]}</div>
                          <div className="text-gray-500">{site.state}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-700">{site.irradiance} W/m²</div>
                        <div className="text-green-600">{site.efficiency}%</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Climate Information */}
            <div className="bg-purple-50 p-3 rounded-lg">
              <h5 className="font-semibold text-sm text-purple-800 mb-2 flex items-center">
                🌤️ Climate Insights
              </h5>
              <div className="space-y-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-700 mb-1">Peak Solar Season</div>
                  <div className="text-gray-600">October - March (Clear skies, optimal temperature)</div>
                </div>
                
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-700 mb-1">Monsoon Impact</div>
                  <div className="text-gray-600">June - September (20-40% generation reduction)</div>
                </div>
                
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-700 mb-1">Regional Advantages</div>
                  <ul className="text-gray-600 space-y-0.5">
                    <li>• Desert: Highest irradiance (900+ W/m²)</li>
                    <li>• Hills: Cool temps, better efficiency</li>
                    <li>• Coastal: Stable generation, good grid</li>
                    <li>• Cities: High demand, policy support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Map Instructions */}
            <div className="bg-gray-100 p-3 rounded-lg border-t-2 border-gray-300">
              <h5 className="font-semibold text-sm text-gray-800 mb-2 flex items-center">
                💡 How to Use This Map
              </h5>
              <ul className="space-y-1 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Click markers to view detailed site information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Use filters to show specific regions or status</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Search for specific locations in the search bar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Hover over markers for quick performance preview</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Site Info Panel */}
        {selectedSite && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 z-[1000] max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-orange-700">{selectedSite.name}</h3>
                <p className="text-sm text-gray-600">{selectedSite.state}, India</p>
              </div>
              <button
                onClick={() => setSelectedSite(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="flex items-center justify-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedSite.status === 'active' ? 'bg-green-100 text-green-700' :
                  selectedSite.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedSite.status.toUpperCase()}
                </span>
              </div>

              {/* City Information */}
              {selectedSite.cityInfo && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    📍 Location Details
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">{selectedSite.cityInfo.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-blue-600">
                      <span className="font-medium">Population:</span>
                      <div className="text-blue-800">{selectedSite.cityInfo.population}</div>
                    </div>
                    <div className="text-blue-600">
                      <span className="font-medium">Area:</span>
                      <div className="text-blue-800">{selectedSite.cityInfo.area}</div>
                    </div>
                    <div className="text-blue-600">
                      <span className="font-medium">Elevation:</span>
                      <div className="text-blue-800">{selectedSite.cityInfo.elevation}</div>
                    </div>
                    <div className="text-blue-600">
                      <span className="font-medium">Climate:</span>
                      <div className="text-blue-800">{selectedSite.climate}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Solar Performance */}
              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                  ☀️ Solar Performance
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-orange-600">Irradiance:</span>
                    <div className="font-semibold text-orange-800">{selectedSite.irradiance} W/m²</div>
                  </div>
                  <div>
                    <span className="text-orange-600">Efficiency:</span>
                    <div className="font-semibold text-orange-800">{selectedSite.efficiency}%</div>
                  </div>
                  <div>
                    <span className="text-orange-600">Peak Sun Hours:</span>
                    <div className="font-semibold text-orange-800">{selectedSite.peakSunHours}h/day</div>
                  </div>
                  <div>
                    <span className="text-orange-600">Capacity:</span>
                    <div className="font-semibold text-orange-800">{selectedSite.capacity} MW</div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-orange-200">
                  <div className="text-orange-600 text-sm">
                    <span className="font-medium">Seasonal Variation:</span> {selectedSite.seasonalVariation}
                  </div>
                  <div className="text-orange-600 text-sm">
                    <span className="font-medium">Best Months:</span> {selectedSite.bestMonths.join(', ')}
                  </div>
                </div>
              </div>

              {/* Challenges & Advantages */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    ⚠️ Key Challenges
                  </h4>
                  <ul className="text-sm space-y-1">
                    {selectedSite.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-red-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    ✅ Key Advantages
                  </h4>
                  <ul className="text-sm space-y-1">
                    {selectedSite.advantages.map((advantage, idx) => (
                      <li key={idx} className="text-green-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="pt-3 border-t space-y-2">
                <button className="w-full bg-solar-500 text-white py-2 rounded-lg hover:bg-solar-600 transition-colors flex items-center justify-center">
                  <span>📊 Detailed Analysis</span>
                </button>
                <button className="w-full border border-solar-500 text-solar-600 py-2 rounded-lg hover:bg-solar-50 transition-colors flex items-center justify-center">
                  <span>📈 Performance History</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
