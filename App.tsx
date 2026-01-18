import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Radio, Search } from 'lucide-react';
import { AppState, WeatherData, ForecastDay } from './types';
import { getWeatherData, getForecast } from './services/weather';
import { BootSequence } from './components/BootSequence';
import { Scanlines } from './components/CyberUI';
import { CurrentWeather, ForecastChart } from './components/WeatherWidgets';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.BOOTING);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize data
  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const [current, nextDays] = await Promise.all([
        getWeatherData({ latitude: lat, longitude: lon }),
        getForecast()
      ]);
      setWeather(current);
      setForecast(nextDays);
    } catch (e) {
      console.error("Data fetch error", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchByCity = async (city: string) => {
    if (!city.trim()) return;
    setIsLoading(true);
    try {
      const [current, nextDays] = await Promise.all([
        getWeatherData({ city }),
        getForecast()
      ]);
      setWeather(current);
      setForecast(nextDays);
    } catch (e) {
      console.error("Data fetch error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBootComplete = () => {
    setAppState(AppState.ACTIVE);
  };

  useEffect(() => {
    // Start geolocation immediately on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default fallback if denied
          fetchByCoords(35.6895, 139.6917); // Tokyo
        }
      );
    } else {
      fetchByCoords(35.6895, 139.6917);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchByCity(searchQuery);
  };

  if (appState === AppState.BOOTING) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-gray-200 font-mono relative selection:bg-cyber-green selection:text-black">
      <Scanlines />
      
      {/* Header */}
      <header className="fixed top-0 w-full z-40 border-b border-gray-800 bg-cyber-bg/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0">
            <Radio className="text-cyber-green animate-pulse" />
            <span className="font-display font-bold text-xl tracking-widest text-white hidden sm:inline">
              NEON<span className="text-cyber-blue">CAST</span>
            </span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4 relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={16} className="text-cyber-green/50 group-focus-within:text-cyber-green transition-colors" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ENTER_SECTOR_NAME..." 
              className="w-full bg-black/50 border border-cyber-green/30 rounded-sm py-2 pl-10 pr-4 text-sm text-cyber-green placeholder-cyber-green/30 focus:outline-none focus:border-cyber-green focus:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all font-mono uppercase"
            />
            <button 
              type="submit"
              className="absolute inset-y-0 right-0 px-4 text-xs font-bold text-cyber-green/50 hover:text-cyber-green hover:bg-cyber-green/10 transition-colors uppercase"
            >
              Scan
            </button>
          </form>

          <div className="flex items-center space-x-4 text-xs md:text-sm text-cyber-green shrink-0">
            <div className="hidden md:flex items-center">
              <MapPin size={14} className="mr-1" />
              <span className="max-w-[150px] truncate">{weather?.city || "LOCATING..."}</span>
            </div>
            <div className="px-2 py-1 border border-cyber-green/30 rounded bg-cyber-green/10">
              SYS.ONLINE
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto relative z-10">
        
        {/* Intro */}
        <div className="mb-8 flex justify-between items-end">
           <div>
             <h1 className="text-lg text-cyber-blue font-bold tracking-wider mb-2">DASHBOARD_V2.077</h1>
             <p className="text-gray-500 text-sm max-w-md">
               Real-time atmospheric monitoring system. 
             </p>
           </div>
        </div>

        {weather && !isLoading ? (
          <div className="grid grid-cols-12 gap-6">
            <CurrentWeather data={weather} />
            <ForecastChart forecast={forecast} />
            
            {/* Status Footer Panel */}
            <div className="col-span-12 mt-4 p-4 border-t border-gray-800 flex flex-col md:flex-row justify-between text-xs text-gray-600 font-mono">
               <div className="flex space-x-6">
                 <span>NET_LATENCY: 12ms</span>
                 <span>ENCRYPTION: AES-4096</span>
                 <span>SERVER: NODE-ALPHA</span>
               </div>
               <div className="mt-2 md:mt-0 text-right">
                 © 2077 NEONCAST INDUSTRIES. ALL RIGHTS RESERVED.
               </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-cyber-green animate-pulse tracking-widest font-bold">
              {isLoading ? "SCANNING SECTOR..." : "ACQUIRING DATA STREAM..."}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}