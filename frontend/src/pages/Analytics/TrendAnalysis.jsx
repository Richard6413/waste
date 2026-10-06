// src/pages/Analytics/TrendAnalysis.jsx
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Download, Calendar, RefreshCw, TrendingUp, TrendingDown, Package, Users, Truck, Leaf } from 'lucide-react';

const TrendAnalysis = () => {
  const [period, setPeriod] = useState('month');
  const [refreshing, setRefreshing] = useState(false);

  const trendData = [
    { name: 'Jan', waste: 120, recycling: 45, efficiency: 85, customers: 1200 },
    { name: 'Feb', waste: 115, recycling: 48, efficiency: 87, customers: 1250 },
    { name: 'Mar', waste: 125, recycling: 52, efficiency: 86, customers: 1300 },
    { name: 'Apr', waste: 118, recycling: 55, efficiency: 88, customers: 1350 },
    { name: 'May', waste: 130, recycling: 58, efficiency: 89, customers: 1400 },
    { name: 'Jun', waste: 125, recycling: 62, efficiency: 91, customers: 1450 },
  ];

  const metrics = [
    { label: 'Waste Collected', value: '125 t', change: '+4%', icon: Package, color: 'text-blue-600' },
    { label: 'Recycling Rate', value: '49.6%', change: '+8%', icon: Leaf, color: 'text-emerald-600' },
    { label: 'Efficiency', value: '91%', change: '+3%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Active Customers', value: '1,450', change: '+12%', icon: Users, color: 'text-amber-600' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    const csv = [
      ['Month', 'Waste (t)', 'Recycling (%)', 'Efficiency (%)', 'Customers'],
      ...trendData.map(d => [d.name, d.waste, d.recycling, d.efficiency, d.customers])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trend-analysis.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">Trend Analysis</h1>
          <p className="page-description">Analyze trends and patterns over time</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="select" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="month">Last 6 Months</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
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
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="workspace-panel">
              <div className="panel-body">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">{metric.label}</span>
                  <Icon size={18} className={metric.color} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                <p className={`text-sm ${metric.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {metric.change} vs last period
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Waste & Recycling Trends</h2>
          </div>
          <div className="panel-body">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="waste" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  <Line type="monotone" dataKey="recycling" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Efficiency & Customer Growth</h2>
          </div>
          <div className="panel-body">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="efficiency" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="customers" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;
