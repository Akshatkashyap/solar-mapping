export interface SolarSite {
  id: string;
  name: string;
  position: [number, number];
  irradiance: number;
  efficiency: number;
  capacity: number;
  status: 'active' | 'maintenance' | 'offline';
  region: 'city' | 'hill' | 'rural' | 'coastal' | 'desert';
  state: string;
  climate: string;
  peakSunHours: number;
  seasonalVariation: string;
  challenges: string[];
  advantages: string[];
  bestMonths: string[];
  cityInfo?: {
    population: string;
    area: string;
    elevation: string;
    description: string;
  };
}

export const solarSites: SolarSite[] = [
  {
    id: '1',
    name: 'Chennai Solar Hub',
    position: [13.0827, 80.2707],
    irradiance: 875,
    efficiency: 88.3,
    capacity: 180,
    status: 'active',
    region: 'coastal',
    state: 'Tamil Nadu',
    climate: 'Tropical',
    peakSunHours: 5.8,
    seasonalVariation: 'Moderate (15-20%)',
    challenges: ['High humidity', 'Monsoon clouds', 'Salt corrosion'],
    advantages: ['Consistent temperature', 'Good infrastructure', 'Industrial support'],
    bestMonths: ['Feb', 'Mar', 'Apr', 'Nov', 'Dec'],
    cityInfo: {
      population: '11.3 million',
      area: '426 km²',
      elevation: '6.7 m',
      description: 'Major coastal city in South India, known as the "Detroit of India" with excellent solar potential despite coastal challenges.'
    }
  },
  {
    id: '2',
    name: 'Siliguri Mountain Station',
    position: [26.7271, 88.3953],
    irradiance: 820,
    efficiency: 86.2,
    capacity: 95,
    status: 'active',
    region: 'hill',
    state: 'West Bengal',
    climate: 'Subtropical Highland',
    peakSunHours: 4.9,
    seasonalVariation: 'High (25-35%)',
    challenges: ['Monsoon season', 'Fog and clouds', 'Terrain limitations'],
    advantages: ['Cool temperatures', 'Less dust', 'Good air quality'],
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    cityInfo: {
      population: '650,000',
      area: '260 km²',
      elevation: '122 m',
      description: 'Gateway to North-East India and Himalayas, strategic location with moderate solar potential in hilly terrain.'
    }
  },
  {
    id: '3',
    name: 'Kerala Coastal Array',
    position: [10.8505, 76.2711],
    irradiance: 795,
    efficiency: 84.7,
    capacity: 140,
    status: 'active',
    region: 'coastal',
    state: 'Kerala',
    climate: 'Tropical Monsoon',
    peakSunHours: 5.2,
    seasonalVariation: 'High (30-40%)',
    challenges: ['Heavy monsoons', 'High humidity', 'Cloud cover'],
    advantages: ['Stable grid', 'Tech-savvy population', 'Government support'],
    bestMonths: ['Dec', 'Jan', 'Feb', 'Mar'],
    cityInfo: {
      population: '3.5 million (state)',
      area: '38,852 km²',
      elevation: '0-2695 m',
      description: '"Gods Own Country" - tropical paradise with moderate solar potential, leading in rooftop solar adoption.'
    }
  },
  {
    id: '4',
    name: 'Delhi NCR Solar Park',
    position: [28.6139, 77.209],
    irradiance: 865,
    efficiency: 87.9,
    capacity: 220,
    status: 'active',
    region: 'city',
    state: 'Delhi',
    climate: 'Semi-arid',
    peakSunHours: 6.1,
    seasonalVariation: 'Moderate (20-25%)',
    challenges: ['Air pollution', 'Dust accumulation', 'Urban heat island'],
    advantages: ['Excellent infrastructure', 'Policy support', 'High demand'],
    bestMonths: ['Feb', 'Mar', 'Apr', 'Oct', 'Nov'],
    cityInfo: {
      population: '32.9 million (NCR)',
      area: '1,484 km²',
      elevation: '216 m',
      description: 'National capital region with strong solar policies and infrastructure, despite air quality challenges.'
    }
  },
  {
    id: '5',
    name: 'Rajasthan Desert Mega Plant',
    position: [27.0238, 74.2179],
    irradiance: 965,
    efficiency: 91.4,
    capacity: 350,
    status: 'active',
    region: 'desert',
    state: 'Rajasthan',
    climate: 'Hot Desert',
    peakSunHours: 7.2,
    seasonalVariation: 'Low (10-15%)',
    challenges: ['Sand storms', 'Extreme temperatures', 'Water scarcity'],
    advantages: ['Highest irradiance', 'Clear skies', 'Large land availability'],
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    cityInfo: {
      population: '78.3 million (state)',
      area: '342,239 km²',
      elevation: '200-1722 m',
      description: 'Largest state in India with the highest solar potential, home to major solar parks and renewable energy projects.'
    }
  },
  {
    id: '6',
    name: 'Mumbai Industrial Solar',
    position: [19.076, 72.8777],
    irradiance: 785,
    efficiency: 83.1,
    capacity: 190,
    status: 'maintenance',
    region: 'coastal',
    state: 'Maharashtra',
    climate: 'Tropical',
    peakSunHours: 5.4,
    seasonalVariation: 'High (25-30%)',
    challenges: ['Monsoon rains', 'Space constraints', 'High real estate cost'],
    advantages: ['Industrial demand', 'Financial hub', 'Tech infrastructure'],
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    cityInfo: {
      population: '20.4 million',
      area: '603 km²',
      elevation: '14 m',
      description: 'Financial capital of India with high energy demand and growing rooftop solar installations.'
    }
  },
  {
    id: '7',
    name: 'Bangalore Tech Park Solar',
    position: [12.9716, 77.5946],
    irradiance: 835,
    efficiency: 87.6,
    capacity: 160,
    status: 'active',
    region: 'city',
    state: 'Karnataka',
    climate: 'Tropical Savanna',
    peakSunHours: 5.7,
    seasonalVariation: 'Moderate (18-22%)',
    challenges: ['Monsoon clouds', 'Urban development', 'Grid integration'],
    advantages: ['Pleasant climate', 'Tech industry', 'Innovation hub'],
    bestMonths: ['Jan', 'Feb', 'Mar', 'Nov', 'Dec'],
    cityInfo: {
      population: '13.2 million',
      area: '741 km²',
      elevation: '920 m',
      description: 'Silicon Valley of India with moderate climate and strong tech ecosystem driving solar innovation.'
    }
  },
  {
    id: '8',
    name: 'Leh Ladakh High Altitude',
    position: [34.1526, 77.5771],
    irradiance: 940,
    efficiency: 93.2,
    capacity: 85,
    status: 'active',
    region: 'hill',
    state: 'Ladakh',
    climate: 'Cold Desert',
    peakSunHours: 6.8,
    seasonalVariation: 'Very High (40-50%)',
    challenges: ['Extreme cold', 'Seasonal access', 'Limited infrastructure'],
    advantages: ['Crystal clear skies', 'High efficiency', 'Low temperatures'],
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    cityInfo: {
      population: '290,000',
      area: '59,146 km²',
      elevation: '3,524 m',
      description: 'High altitude cold desert with exceptional solar irradiance and crystal clear skies, despite harsh conditions.'
    }
  },
  {
    id: '9',
    name: 'Gujarat Coastal Wind-Solar',
    position: [22.2587, 71.1924],
    irradiance: 905,
    efficiency: 89.7,
    capacity: 280,
    status: 'active',
    region: 'coastal',
    state: 'Gujarat',
    climate: 'Semi-arid',
    peakSunHours: 6.5,
    seasonalVariation: 'Low (12-18%)',
    challenges: ['Cyclones', 'Salt spray', 'Monsoon variability'],
    advantages: ['Hybrid potential', 'Industrial base', 'Policy support'],
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    cityInfo: {
      population: '60.4 million (state)',
      area: '196,244 km²',
      elevation: '0-1117 m',
      description: 'Leading state in renewable energy with excellent solar and wind resources, progressive policies.'
    }
  },
  {
    id: '10',
    name: 'Hyderabad IT Corridor Solar',
    position: [17.385, 78.4867],
    irradiance: 850,
    efficiency: 88.1,
    capacity: 175,
    status: 'active',
    region: 'city',
    state: 'Telangana',
    climate: 'Semi-arid',
    peakSunHours: 5.9,
    seasonalVariation: 'Moderate (15-20%)',
    challenges: ['Dust accumulation', 'Grid stability', 'Rapid urbanization'],
    advantages: ['IT industry demand', 'Government support', 'Good infrastructure'],
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    cityInfo: {
      population: '10.0 million',
      area: '650 km²',
      elevation: '542 m',
      description: 'Major IT hub known as "Cyberabad" with growing solar installations and strong government initiatives.'
    }
  }
];