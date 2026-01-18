import { WeatherData, ForecastDay, Coordinates } from '../types';

// Mock service to guarantee data availability
// In a production app, this would fetch from OpenWeatherMap using process.env.OWM_KEY

const CONDITIONS: WeatherData['condition'][] = ['Clear', 'Rain', 'Clouds', 'Storm', 'Snow'];

function getRandomCondition(): WeatherData['condition'] {
  return CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)];
}

function generateRandomTemp(base: number, variance: number): number {
  return Math.round(base + (Math.random() * variance * 2 - variance));
}

interface WeatherParams {
  city?: string;
  latitude?: number;
  longitude?: number;
}

export const getWeatherData = async (params: WeatherParams): Promise<WeatherData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  let city = params.city;
  
  if (!city) {
    if (params.latitude && params.longitude) {
      city = `Sector ${Math.floor(params.latitude % 100)}-${Math.floor(Math.abs(params.longitude % 100))}`;
    } else {
      city = "Unknown Sector";
    }
  }

  // Generate consistent pseudo-random data based on city name length if possible, or just random
  const seed = city.length;
  const baseTemp = 15 + (seed % 15); 
  
  return {
    city: city,
    temp: generateRandomTemp(baseTemp, 5),
    condition: getRandomCondition(),
    humidity: Math.floor(Math.random() * 60) + 40,
    windSpeed: Math.floor(Math.random() * 30) + 5,
    uvIndex: Math.floor(Math.random() * 11),
    feelsLike: generateRandomTemp(baseTemp, 3),
    description: "Atmospheric anomalies detected",
  };
};

export const getForecast = async (): Promise<ForecastDay[]> => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  return days.map(day => ({
    day,
    temp: generateRandomTemp(20, 8),
    condition: getRandomCondition(),
  }));
};