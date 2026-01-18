import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { Cloud, CloudRain, Sun, CloudLightning, Snowflake, Wind, Droplets, ThermometerSun } from 'lucide-react';
import { WeatherData, ForecastDay } from '../types';
import { CyberCard, GlitchText } from './CyberUI';

export const WeatherIcon: React.FC<{ condition: WeatherData['condition'], size?: number, className?: string }> = ({ condition, size = 48, className = '' }) => {
  const props = { size, className: `text-cyber-blue ${className}` };
  
  switch (condition) {
    case 'Clear': return <Sun {...props} className={`text-cyber-yellow ${className} animate-spin-slow`} />;
    case 'Rain': return <CloudRain {...props} />;
    case 'Storm': return <CloudLightning {...props} className={`text-cyber-blue ${className} animate-pulse`} />;
    case 'Snow': return <Snowflake {...props} />;
    default: return <Cloud {...props} />;
  }
};

export const CurrentWeather: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <CyberCard className="col-span-12 md:col-span-6 lg:col-span-4 p-6 min-h-[300px] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
           <h2 className="text-cyber-green font-mono text-sm tracking-wider mb-1">LOCAL_SECTOR</h2>
           <div className="text-3xl font-display font-bold text-white uppercase">{data.city}</div>
        </div>
        <WeatherIcon condition={data.condition} size={64} />
      </div>

      <div className="mt-8">
        <div className="flex items-baseline">
          <GlitchText text={`${data.temp}°`} as="h1" className="text-8xl font-display font-black text-cyber-blue" />
        </div>
        <div className="text-cyber-red font-mono mt-2 tracking-widest uppercase text-xl">
           {data.condition}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 border-t border-gray-800 pt-4 text-sm font-mono text-gray-400">
        <div className="flex flex-col items-center">
          <Wind size={16} className="mb-1 text-cyber-green" />
          <span>{data.windSpeed} KM/H</span>
        </div>
        <div className="flex flex-col items-center">
          <Droplets size={16} className="mb-1 text-cyber-blue" />
          <span>{data.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <ThermometerSun size={16} className="mb-1 text-cyber-red" />
          <span>UV {data.uvIndex}</span>
        </div>
      </div>
    </CyberCard>
  );
};

export const ForecastChart: React.FC<{ forecast: ForecastDay[] }> = ({ forecast }) => {
  return (
    <CyberCard className="col-span-12 md:col-span-6 lg:col-span-8 p-6 min-h-[300px] flex flex-col" delay={0.2}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-cyber-green font-mono tracking-wider">PREDICTIVE_MODEL_5D</h3>
        <div className="flex space-x-2">
           <span className="w-3 h-3 bg-cyber-red rounded-full animate-pulse"></span>
           <span className="w-3 h-3 bg-cyber-blue rounded-full animate-pulse delay-75"></span>
           <span className="w-3 h-3 bg-cyber-green rounded-full animate-pulse delay-150"></span>
        </div>
      </div>
      
      <div className="flex-grow w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#666', fontFamily: 'JetBrains Mono', fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              hide 
              domain={['dataMin - 5', 'dataMax + 5']} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#050505', borderColor: '#00ff41', color: '#00ff41', fontFamily: 'JetBrains Mono' }}
              itemStyle={{ color: '#00f3ff' }}
              cursor={{ stroke: '#ff003c', strokeWidth: 1 }}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#00f3ff" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#050505', stroke: '#00f3ff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ff003c', stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
         {forecast.map((day, i) => (
           <div key={i} className="text-center">
             <div className="flex justify-center mb-2 opacity-80">
                <WeatherIcon condition={day.condition} size={20} />
             </div>
             <div className="font-mono text-xs text-gray-500">{day.condition}</div>
           </div>
         ))}
      </div>
    </CyberCard>
  );
};
