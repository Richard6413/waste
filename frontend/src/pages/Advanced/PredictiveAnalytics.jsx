// src/pages/Advanced/PredictiveAnalytics.jsx
import { useState } from 'react';
import { TrendingUp, TrendingDown, Brain, Calendar, MapPin, Package, AlertTriangle, RefreshCw, Download } from 'lucide-react';

const PredictiveAnalytics = () => {
  const [period, setPeriod] = useState('week');
  const [refreshing, setRefreshing] = useState(false);

  const predictions = [
    { id: 1, title: 'Waste Volume Forecast', description: 'Expected to increase by 15% next week due to festival season', confidence: 85, trend: 'up', category: 'volume' },
    { id: 2, title: 'Route Optimization', description: 'AI suggests rerouting Truck UG-12 to save 2 hours daily', confidence: 92, trend: 'up', category: 'efficiency' },
    { id: 3, title: 'Bin Overflow Alert', description: '15 bins in Colombo North likely to overflow within 2 days', confidence: 78, trend: 'warning', category: 'alert' },
    { id: 4, title: 'Fuel Consumption', description: 'Fuel costs expected to decrease by 8% with optimized routes', confidence: 88, trend: 'down', category: 'cost' },
  ];

  const metrics = [
    { label: 'Prediction Accuracy', value: '87%', change: '+5%', trend: 'up' },
    { label: 'Cost Savings', value: 'LKR 45,000', change: '+12%', trend: 'up' },
    { label: 'Time Saved', value: '24 hrs/week', change: '+8%', trend: 'up' },
    { label: 'Efficiency Gain', value: '15%', change: '+3%', trend: 'up' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    const csv = [
      ['Prediction', 'Description', 'Confidence', 'Trend'],
      ...predictions.map(p => [p.title, p.description, `${p.confidence}%`, p.trend])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'predictions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp size={16} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={16} className="text-red-500" />;
    return <AlertTriangle size={16} className="text-amber-500" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      volume: 'bg-blue-100 text-blue-700',
      efficiency: 'bg-emerald-100 text-emerald-700',
      alert: 'bg-amber-100 text-amber-700',
      cost: 'bg-purple-100 text-purple-700'
    };
    return colors[category] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADVANCED</div>
          <h1 className="page-title">Predictive Analytics</h1>
          <p className="page-description">AI-powered insights and predictions</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="select" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="btn btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />Export
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="workspace-panel">
            <div className="panel-body">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">{metric.label}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp size={16} className="text-emerald-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
              </div>
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <p className={`text-sm ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {metric.change} vs last period
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Predictions */}
      <div className="workspace-panel">
        <div className="panel-header">
          <h2 className="panel-title">AI Predictions & Insights</h2>
        </div>
        <div className="panel-body">
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                      <Brain size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{prediction.title}</h3>
                      <span className={`badge ${getCategoryColor(prediction.category)}`}>{prediction.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(prediction.trend)}
                    <span className="text-sm font-semibold">{prediction.confidence}% confidence</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{prediction.description}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Confidence Level</span>
                    <span>{prediction.confidence}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${prediction.confidence}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
