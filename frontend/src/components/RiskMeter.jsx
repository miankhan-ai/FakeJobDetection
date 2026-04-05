import React from 'react';

export default function RiskMeter({ score, isAnalyzing }) {
  // Map score 0-100 to rotation degrees (-90 to 90)
  const rotation = isAnalyzing ? 0 : -90 + (score * 1.8);
  const color = score > 75 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 
                score > 40 ? 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]' : 
                'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]';

  return (
    <div className="relative w-48 h-24 overflow-hidden mb-2">
      {/* Gauge Arc */}
      <div className="w-48 h-48 rounded-full border-[1.5rem] border-gray-800 border-b-transparent border-r-transparent border-t-green-500/20 border-l-red-500/20 transform rotate-45 relative">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-[1.5rem] border-transparent border-t-yellow-500/20 transform -rotate-45 hidden"></div>
      </div>
      
      {/* Needle Container */}
      <div 
        className="absolute bottom-0 left-1/2 w-48 h-2 -ml-24 origin-bottom transition-transform duration-1000 ease-out flex justify-end"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="w-1/2 h-1 bg-white relative top-1 rounded"></div>
      </div>
      
      {/* Center Pivot */}
      <div className={`absolute bottom-[-8px] left-[calc(50%-10px)] w-5 h-5 rounded-full ${color} z-10 transition-colors duration-1000`}></div>

      {/* Score Text */}
      <div className="absolute bottom-2 w-full text-center">
        <span className="font-mono text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-400 to-white">
          {isAnalyzing ? '--' : score.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
