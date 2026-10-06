// src/pages/Analytics/ComplianceReports.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Calendar, RefreshCw, CheckCircle, XCircle, AlertTriangle, Shield, FileText } from 'lucide-react';

const ComplianceReports = () => {
  const [period, setPeriod] = useState('month');
  const [refreshing, setRefreshing] = useState(false);

  const complianceData = [
    { name: 'Waste Disposal', compliant: 95, violations: 3, pending: 2 },
    { name: 'Recycling Targets', compliant: 88, violations: 5, pending: 7 },
    { name: 'Safety Standards', compliant: 98, violations: 1, pending: 1 },
    { name: 'Environmental', compliant: 92, violations: 4, pending: 4 },
    { name: 'Licensing', compliant: 100, violations: 0, pending: 0 },
  ];

  const metrics = [
    { label: 'Overall Compliance', value: '94.6%', change: '+2.3%', icon: Shield, color: 'text-emerald-600' },
    { label: 'Violations', value: '13', change: '-15%', icon: XCircle, color: 'text-red-600' },
    { label: 'Pending Reviews', value: '14', change: '-8%', icon: AlertTriangle, color: 'text-amber-600' },
    { label: 'Documents', value: '156', change: '+12%', icon: FileText, color: 'text-blue-600' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    const csv = [
      ['Category', 'Compliant', 'Violations', 'Pending'],
      ...complianceData.map(d => [d.name, d.compliant, d.violations, d.pending])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compliance-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">Compliance Reports</h1>
          <p className="page-description">Monitor regulatory compliance and violations</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="select" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
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

      {/* Chart */}
      <div className="workspace-panel">
        <div className="panel-header">
          <h2 className="panel-title">Compliance by Category</h2>
        </div>
        <div className="panel-body">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="compliant" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="violations" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pending" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-600">Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-slate-600">Violations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-600">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReports;
