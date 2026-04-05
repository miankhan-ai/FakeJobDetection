import React from 'react';
import RiskMeter from './RiskMeter';
import { AlertOctagon, Terminal } from 'lucide-react';

export default function EvidenceWall({ result, isAnalyzing }) {
  if (!result && !isAnalyzing) {
    return (
      <div className="glass-panel border-t-2 border-t-slate-700/50 rounded-xl p-8 h-full flex items-center justify-center flex-col text-slate-500 opacity-60 transition-all duration-500">
        <Terminal className="w-16 h-16 mb-4 opacity-50 stroke-1" />
        <p className="font-mono text-sm uppercase tracking-widest">Awaiting target parameters...</p>
      </div>
    );
  }

  return (
    <div className={`glass-panel border-t-2 ${result?.is_fraud ? 'border-t-red-500 shadow-[0_0_30px_rgba(220,38,38,0.1)]' : 'border-t-green-500'} rounded-xl p-8 transition-all duration-700`}>
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <AlertOctagon className={result?.is_fraud ? "text-red-500 w-6 h-6 animate-pulse" : "text-green-500 w-6 h-6"} />
        <h2 className="text-xl font-bold text-white uppercase tracking-widest">Live Pulse Monitor</h2>
      </div>

      <div className="flex flex-col items-center justify-center mb-10 mt-4">
        <RiskMeter score={result?.risk_score || 0} isAnalyzing={isAnalyzing} />
      </div>

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6">
          <h3 className="text-xs uppercase text-slate-400 font-mono mb-4 tracking-wider flex items-center gap-2">
            <span className="w-4 h-[1px] bg-slate-500 inline-block"></span>
            Detected Red Flags
            <span className="flex-1 h-[1px] bg-slate-800 inline-block"></span>
          </h3>
          {result.red_flags.length > 0 ? (
            <ul className="space-y-3">
              {result.red_flags.map((flag, idx) => (
                <li key={idx} className="bg-red-950/30 border border-red-900/30 rounded-md px-4 py-3 flex items-center gap-3 text-red-300 font-mono text-sm hover:bg-red-900/40 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)] flex-shrink-0"></span>
                  {flag}
                </li>
              ))}
            </ul>
          ) : (
             <div className="bg-green-950/30 border border-green-900/30 rounded-md px-4 py-4 text-green-400 font-mono text-sm flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)] flex-shrink-0"></div>
               No critical anomalies detected. Target appears benign.
             </div>
          )}
        </div>
      )}
    </div>
  );
}
