export interface WeatherData {
  temp: number;
  condition: 'Clear' | 'Rain' | 'Clouds' | 'Storm' | 'Snow';
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  feelsLike: number;
  description: string;
  city: string;
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: 'Clear' | 'Rain' | 'Clouds' | 'Storm' | 'Snow';
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum AppState {
  BOOTING = 'BOOTING',
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR'
}
