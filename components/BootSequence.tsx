import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const bootLogs = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL NETWORKS...",
  "CONNECTING TO SATELLITE UPLINK...",
  "BYPASSING SECURITY PROTOCOLS...",
  "GEOLOCATION: ACQUIRED...",
  "ENVIRONMENTAL SENSORS: ONLINE...",
  "SYSTEM OPTIMAL."
];

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    bootLogs.forEach((log, index) => {
      delay += Math.random() * 500 + 200;
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === bootLogs.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-cyber-bg flex items-center justify-center font-mono text-cyber-green z-[100]">
      <div className="w-full max-w-lg p-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-2 border-cyber-green p-4 bg-black/80 shadow-[0_0_20px_rgba(0,255,65,0.2)]"
        >
          <h1 className="text-2xl mb-4 animate-pulse"> > TERMINAL_ACCESS_GRANTED</h1>
          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="flex">
                <span className="mr-2">[{new Date().toLocaleTimeString()}]</span>
                <span className="typewriter">{log}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 w-full bg-gray-900 border border-cyber-green/30">
             <motion.div 
               className="h-full bg-cyber-green"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 4.5, ease: "linear" }}
             />
          </div>
        </motion.div>
      </div>
    </div>
  );
};