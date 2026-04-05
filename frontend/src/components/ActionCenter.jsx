import React, { useState } from 'react';
import { Share2, Copy, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ActionCenter({ result, jobPosting }) {
  const [copied, setCopied] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [reportStatus, setReportStatus] = useState(null);

  const reportText = `URGENT FRAUD REVIEW REQUEST\n\nBased on Sentinel AI analysis, this posting shows a Risk Score of ${result.risk_score}/100.\n\nEVIDENCE:\n${result.red_flags.map(f => `- ${f}`).join('\n')}\n\nPlease review and investigate.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReportToPlatform = async () => {
    setReporting(true);
    setReportStatus(null);
    
    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/report-incident`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: jobPosting?.title || 'Unknown',
          company: jobPosting?.company || 'Unknown',
          risk_score: result.risk_score,
          red_flags: result.red_flags,
          target_platform: 'email'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setReportStatus({
          type: 'success',
          message: '✓ Fraud report sent to miankhan.dev@gmail.com'
        });
        setTimeout(() => setReportStatus(null), 5000);
      } else {
        setReportStatus({
          type: 'error',
          message: `Error: ${data.detail || 'Failed to send report'}`
        });
      }
    } catch (error) {
      setReportStatus({
        type: 'error',
        message: `Network error: ${error.message}`
      });
    } finally {
      setReporting(false);
    }
  };

  return (
    <div className="glass-panel border-l-4 border-l-red-600 rounded-xl p-8 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]" />

      <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-3">
        <Share2 className="text-red-500 w-5 h-5 group-hover:scale-110 transition-transform" />
        Action Center
      </h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Threat confirmed. Generate and dispatch a takedown notice to platform moderators directly through secure channels.
      </p>

      <div className="bg-slate-950/80 rounded-md border border-slate-800 p-5 font-mono text-xs text-slate-300 mb-6 h-36 overflow-y-auto whitespace-pre-wrap selection:bg-red-500/30 custom-scrollbar shadow-inner">
        {reportText}
      </div>

      {reportStatus && (
        <div className={`mb-4 p-4 rounded-md flex items-center gap-2 ${
          reportStatus.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
            : 'bg-red-500/20 border border-red-500/50 text-red-300'
        }`}>
          {reportStatus.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm">{reportStatus.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white py-3 px-4 rounded-md font-medium border border-slate-600 transition-all shadow-sm"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
          {copied ? "Copied to Clipboard" : "Copy Evidence"}
        </button>
        <button 
          onClick={handleReportToPlatform}
          disabled={reporting}
          className="flex items-center justify-center gap-2 bg-red-600/90 hover:bg-red-500 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md uppercase tracking-widest neon-border-red hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] transition-all"
        >
          <FileText className="w-4 h-4" />
          {reporting ? 'Sending...' : 'Report to Platform'}
        </button>
      </div>
    </div>
  );
}
