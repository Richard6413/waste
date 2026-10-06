// src/pages/Sustainability/CarbonTracking.jsx
import { useState } from 'react';
import { TrendingDown, TrendingUp, Leaf, Car, Factory, TreePine, Download, Calendar } from 'lucide-react';

const CarbonTracking = () => {
  const [period, setPeriod] = useState('month');

  const data = {
    totalSaved: 1250,
    trend: 'up',
    change: 12.5,
    breakdown: [
      { source: 'Recycling', amount: 450, icon: Leaf, color: 'text-emerald-600' },
      { source: 'Route Optimization', amount: 380, icon: Car, color: 'text-blue-600' },
      { source: 'Waste Reduction', amount: 280, icon: Factory, color: 'text-purple-600' },
      { source: 'Composting', amount: 140, icon: TreePine, color: 'text-amber-600' },
    ],
    history: [
      { month: 'Jan', amount: 980 },
      { month: 'Feb', amount: 1050 },
      { month: 'Mar', amount: 1100 },
      { month: 'Apr', amount: 1150 },
      { month: 'May', amount: 1200 },
      { month: 'Jun', amount: 1250 },
    ]
  };

  const handleExport = () => {
    const csv = [
      ['Month', 'CO2 Saved (kg)'],
      ...data.history.map(h => [h.month, h.amount])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carbon-tracking.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUSTAINABILITY</div>
          <h1 className="page-title">Carbon Tracking</h1>
          <p className="page-description">Monitor your carbon footprint reduction</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="select" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total CO₂ Saved</p>
                <p className="text-3xl font-bold text-slate-900">{data.totalSaved.toLocaleString()} kg</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Leaf size={24} className="text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Trend</p>
                <p className="text-3xl font-bold text-emerald-600">+{data.change}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp size={24} className="text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Equivalent Trees</p>
                <p className="text-3xl font-bold text-slate-900">{Math.round(data.totalSaved / 20)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <TreePine size={24} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">CO₂ Savings by Source</h2>
          </div>
          <div className="panel-body">
            <div className="space-y-4">
              {data.breakdown.map((item) => {
                const Icon = item.icon;
                const percentage = (item.amount / data.totalSaved) * 100;
                return (
                  <div key={item.source} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Icon size={18} className={item.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{item.source}</span>
                        <span className="text-sm text-slate-500">{item.amount} kg ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* History Chart */}
        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Monthly Trend</h2>
          </div>
          <div className="panel-body">
            <div className="flex items-end gap-2 h-48">
              {data.history.map((item) => {
                const max = Math.max(...data.history.map(h => h.amount));
                const height = (item.amount / max) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-slate-500">{item.amount}</span>
                    <div
                      className="w-full rounded-t-lg bg-emerald-500 transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-slate-500">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTracking;
