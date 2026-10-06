// src/pages/Advanced/AIRouteOptimization.jsx
import { useState } from 'react';
import { Zap, Play, Pause, RotateCcw, Download, TrendingUp, Clock, MapPin, Truck, Fuel, Leaf } from 'lucide-react';

const AIRouteOptimization = () => {
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOptimize = () => {
    setOptimizing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setOptimizing(false);
          setOptimized(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setOptimized(false);
    setProgress(0);
  };

  const handleExport = () => {
    const csv = [
      ['Metric', 'Before', 'After', 'Improvement'],
      ['Total Distance (km)', '142', '118', '-17%'],
      ['Fuel Consumption (L)', '45', '38', '-16%'],
      ['Time (hours)', '8.5', '7.2', '-15%'],
      ['CO2 Emissions (kg)', '120', '100', '-17%'],
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'route-optimization-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const beforeMetrics = [
    { label: 'Total Distance', value: '142 km', icon: MapPin, color: 'text-blue-600' },
    { label: 'Fuel Consumption', value: '45 L', icon: Fuel, color: 'text-amber-600' },
    { label: 'Time', value: '8.5 hrs', icon: Clock, color: 'text-purple-600' },
    { label: 'CO2 Emissions', value: '120 kg', icon: Leaf, color: 'text-emerald-600' },
  ];

  const afterMetrics = [
    { label: 'Total Distance', value: '118 km', icon: MapPin, color: 'text-blue-600' },
    { label: 'Fuel Consumption', value: '38 L', icon: Fuel, color: 'text-amber-600' },
    { label: 'Time', value: '7.2 hrs', icon: Clock, color: 'text-purple-600' },
    { label: 'CO2 Emissions', value: '100 kg', icon: Leaf, color: 'text-emerald-600' },
  ];

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADVANCED</div>
          <h1 className="page-title">AI Route Optimization</h1>
          <p className="page-description">Machine learning-powered route optimization</p>
        </div>
        <div className="flex items-center gap-2">
          {optimized && (
            <button className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />Reset
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleExport} disabled={!optimized}>
            <Download size={16} />Export
          </button>
          <button className="btn btn-primary" onClick={handleOptimize} disabled={optimizing}>
            {optimizing ? <><Pause size={16} />Optimizing...</> : <><Play size={16} />Run Optimization</>}
          </button>
        </div>
      </div>

      {/* Progress */}
      {optimizing && (
        <div className="workspace-panel mb-6">
          <div className="panel-body">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Optimization Progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-slate-500 mt-2">AI is analyzing routes, traffic patterns, and collection points...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {optimized && (
        <div className="workspace-panel mb-6 border-2 border-emerald-500">
          <div className="panel-header bg-emerald-50">
            <h2 className="panel-title">Optimization Results</h2>
          </div>
          <div className="panel-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-slate-500">Before Optimization</h3>
                <div className="space-y-3">
                  {beforeMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={metric.color} />
                          <span className="text-sm">{metric.label}</span>
                        </div>
                        <span className="font-semibold">{metric.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-emerald-600">After Optimization</h3>
                <div className="space-y-3">
                  {afterMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={metric.color} />
                          <span className="text-sm">{metric.label}</span>
                        </div>
                        <span className="font-semibold text-emerald-600">{metric.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-emerald-600" />
                <span className="font-semibold text-emerald-900">Overall Improvement</span>
              </div>
              <p className="text-sm text-emerald-700">
                Route optimization has reduced distance by 17%, fuel consumption by 16%, and CO2 emissions by 17%. 
                Estimated annual savings: LKR 180,000.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="workspace-panel">
        <div className="panel-header">
          <h2 className="panel-title">How AI Optimization Works</h2>
        </div>
        <div className="panel-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <MapPin size={20} className="text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Data Collection</h3>
              <p className="text-sm text-slate-500">Analyzes historical routes, traffic patterns, and collection data</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Zap size={20} className="text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">AI Processing</h3>
              <p className="text-sm text-slate-500">Machine learning algorithms find the most efficient routes</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                <Truck size={20} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-1">Route Deployment</h3>
              <p className="text-sm text-slate-500">Optimized routes are deployed to drivers automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRouteOptimization;
