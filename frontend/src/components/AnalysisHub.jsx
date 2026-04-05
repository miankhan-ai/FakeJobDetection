import React, { useState } from 'react';
import { ShieldAlert, Crosshair, Loader } from 'lucide-react';

export default function AnalysisHub({ onAnalyze, isAnalyzing }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    benefits: '',
    url: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <div className="glass-panel border-t-2 border-t-red-500/50 rounded-xl p-8 relative overflow-hidden group">
      {/* Scanning Overlay Animation */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-slate-950/80 z-20 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300">
            <div className="w-full h-1 bg-red-500/80 absolute top-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(239,68,68,0.9)]" />
            <Loader className="w-16 h-16 text-red-500 animate-spin mb-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <span className="text-red-500 font-mono text-sm tracking-widest animate-pulse font-bold neon-text-red">ANALYZING BI-LSTM TENSORS...</span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Crosshair className="text-red-400 w-6 h-6 group-hover:rotate-90 transition-transform duration-700" />
        <h2 className="text-xl font-bold text-white uppercase tracking-widest">Target Input</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group/input">
            <label className="block text-xs uppercase text-slate-400 mb-2 font-mono tracking-wider group-hover/input:text-red-400 transition-colors">Job Title</label>
            <input name="title" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/50 focus:outline-none transition-all placeholder-slate-600 font-mono text-sm shadow-inner" placeholder="e.g. Data Entry Assistant" />
          </div>
          <div className="group/input">
            <label className="block text-xs uppercase text-slate-400 mb-2 font-mono tracking-wider group-hover/input:text-red-400 transition-colors">Company Claimed</label>
            <input name="company" onChange={handleChange} required className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/50 focus:outline-none transition-all placeholder-slate-600 font-mono text-sm shadow-inner" placeholder="e.g. Globex Corp" />
          </div>
        </div>

        <div className="group/input">
          <label className="block text-xs uppercase text-slate-400 mb-2 font-mono tracking-wider group-hover/input:text-red-400 transition-colors">Target URL (Optional)</label>
          <input name="url" onChange={handleChange} type="url" className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/50 focus:outline-none transition-all font-mono text-sm placeholder-slate-600 shadow-inner" placeholder="https://linkedin.com/jobs/..." />
        </div>

        <div className="group/input">
          <label className="block text-xs uppercase text-slate-400 mb-2 font-mono tracking-wider group-hover/input:text-red-400 transition-colors">Job Description</label>
          <textarea name="description" onChange={handleChange} required rows={5} className="w-full bg-slate-900/50 border border-slate-700 rounded-md px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/50 focus:outline-none transition-all resize-none placeholder-slate-600 font-mono text-sm shadow-inner leading-relaxed custom-scrollbar" placeholder="Paste full description here..." />
        </div>

        <button 
          disabled={isAnalyzing}
          className="w-full bg-red-600/90 hover:bg-red-500 text-white font-bold py-4 px-4 rounded-md uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-red-400/50 hover:border-red-400"
        >
          <ShieldAlert className="w-5 h-5" />
          {isAnalyzing ? 'Scanning Targets...' : 'Engage BiLSTM Sweep'}
        </button>
      </form>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
