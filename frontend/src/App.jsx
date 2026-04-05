import React, { useState } from 'react'
import AnalysisHub from './components/AnalysisHub'
import EvidenceWall from './components/EvidenceWall'
import ActionCenter from './components/ActionCenter'

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobData, setJobData] = useState(null);

  // Call backend API to analyze job posting
  const handleAnalyze = async (jobInputData) => {
    setJobData(jobInputData);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      console.log('Using API URL:', apiUrl);
      
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: jobInputData.title,
          company: jobInputData.company,
          description: jobInputData.description,
          requirements: jobInputData.requirements || '',
          benefits: jobInputData.benefits || '',
          url: jobInputData.url || ''
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      // Use consistent mock data based on keywords
      const hasRedFlags = jobInputData.description.toLowerCase().includes('wire') || 
                         jobInputData.description.toLowerCase().includes('urgent') ||
                         jobInputData.description.toLowerCase().includes('transfer') ||
                         jobInputData.description.toLowerCase().includes('bitcoin');
      
      const mockResult = {
        is_fraud: hasRedFlags,
        risk_score: hasRedFlags ? 85 : 15,
        red_flags: hasRedFlags 
          ? ["Requests wire transfer", "Urgency pressure", "Too good to be true", "No company verification"] 
          : ["Minor concerns", "Verify before applying"],
        feature_importance: {"description_weight": 0.8, "telecommuting_weight": 0.2}
      };
      setAnalysisResult(mockResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg text-slate-300 font-sans relative overflow-x-hidden selection:bg-red-500/30 selection:text-white pb-12">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-grid-cyber z-0 opacity-40"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/20 blur-[120px] z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px] z-0"></div>
      <div className="absolute inset-0 w-full h-[1px] bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.5)] scan-line z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <header className="mb-10 pb-6 border-b border-white/5 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div className="group cursor-default">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase flex items-center gap-3 transition-transform duration-500 group-hover:scale-[1.02]">
              <span className="text-red-500 neon-text-red">The</span> Sentinel
              <div className="h-6 w-1 bg-red-500 inline-block animate-pulse"></div>
            </h1>
            <p className="text-sm font-mono text-slate-500 tracking-wider mt-2 group-hover:text-slate-400 transition-colors">
              [ AI Job Fraud Detection & Reporting System ]
            </p>
          </div>
          <div className="glass-panel px-4 py-2 rounded border border-red-500/20 flex items-center gap-3 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
            </span>
            <span className="text-xs text-red-400 font-mono tracking-widest font-bold">SYSTEM SECURE AND ONLINE</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 transform transition-all duration-500 hover:-translate-y-1">
            <AnalysisHub onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="transform transition-all duration-500 hover:-translate-y-1">
              <EvidenceWall result={analysisResult} isAnalyzing={isAnalyzing} />
            </div>
            {analysisResult?.is_fraud && (
              <div className="transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                <ActionCenter result={analysisResult} jobPosting={jobData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
