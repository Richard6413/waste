// src/pages/Analytics/OperationalReports.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, Calendar, Filter, RefreshCw, TrendingUp, Clock, CheckCircle, Truck } from 'lucide-react';

const OperationalReports = () => {
  const [period, setPeriod] = useState('week');
  const [refreshing, setRefreshing] = useState(false);

  const weeklyData = [
    { name: 'Mon', collections: 45, completed: 42, efficiency: 93 },
    { name: 'Tue', collections: 52, completed: 50, efficiency: 96 },
    { name: 'Wed', collections: 48, completed: 45, efficiency: 94 },
    { name: 'Thu', collections: 55, completed: 53, efficiency: 96 },
    { name: 'Fri', collections: 50, completed: 48, efficiency: 96 },
    { name: 'Sat', collections: 35, completed: 34, efficiency: 97 },
    { name: 'Sun', collections: 28, completed: 27, efficiency: 96 },
  ];

  const metrics = [
    { label: 'Total Collections', value: '313', change: '+12%', icon: Truck, color: 'text-blue-600' },
    { label: 'Completion Rate', value: '95.2%', change: '+2.1%', icon: CheckCircle, color: 'text-emerald-600' },
    { label: 'Avg Response Time', value: '4.2 min', change: '-15%', icon: Clock, color: 'text-amber-600' },
    { label: 'Efficiency', value: '95%', change: '+3%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    const csv = [
      ['Day', 'Collections', 'Completed', 'Efficiency'],
      ...weeklyData.map(d => [d.name, d.collections, d.completed, d.efficiency])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'operational-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">Operational Reports</h1>
          <p className="page-description">Track operational performance and efficiency</p>
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
            <h2 className="panel-title">Collections per Day</h2>
          </div>
          <div className="panel-body">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="collections" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Efficiency Trend</h2>
          </div>
          <div className="panel-body">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalReports;
