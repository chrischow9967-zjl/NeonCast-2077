import React from 'react';
import { motion } from 'framer-motion';

export const GlitchText: React.FC<{ text: string; className?: string; as?: 'h1' | 'h2' | 'p' | 'span' }> = ({ text, className = '', as = 'span' }) => {
  const Tag = as as any;
  
  return (
    <div className={`relative inline-block group ${className}`}>
      <Tag className="relative z-10">{text}</Tag>
      <Tag className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-red opacity-70 animate-glitch-1 hidden group-hover:block sm:block" aria-hidden="true">
        {text}
      </Tag>
      <Tag className="absolute top-0 left-0 -z-10 w-full h-full text-cyber-blue opacity-70 animate-glitch-2 hidden group-hover:block sm:block" aria-hidden="true">
        {text}
      </Tag>
    </div>
  );
};

export const CyberCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`
        relative bg-cyber-glass backdrop-blur-md border border-gray-800 
        shadow-[0_0_15px_rgba(0,243,255,0.1)] 
        rounded-sm overflow-hidden ${className}
      `}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-green/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyber-green/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyber-green/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-green/50" />
      
      {children}
    </motion.div>
  );
};

export const Scanlines = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-full w-full">
    {/* Scanline bar */}
    <div className="w-full h-1 bg-white opacity-5 animate-scanline absolute top-0" />
    {/* CRT Grid */}
    <div className="w-full h-full" style={{
      backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
      backgroundSize: '100% 2px, 3px 100%'
    }} />
  </div>
);
