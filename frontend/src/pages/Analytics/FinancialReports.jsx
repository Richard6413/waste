// src/pages/Analytics/FinancialReports.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, RefreshCw, DollarSign, TrendingUp, CreditCard, Wallet } from 'lucide-react';

const FinancialReports = () => {
  const [period, setPeriod] = useState('month');
  const [refreshing, setRefreshing] = useState(false);

  const monthlyData = [
    { name: 'Jan', revenue: 2100000, expenses: 1400000, profit: 700000 },
    { name: 'Feb', revenue: 2300000, expenses: 1450000, profit: 850000 },
    { name: 'Mar', revenue: 2450000, expenses: 1500000, profit: 950000 },
    { name: 'Apr', revenue: 2350000, expenses: 1480000, profit: 870000 },
    { name: 'May', revenue: 2600000, expenses: 1550000, profit: 1050000 },
    { name: 'Jun', revenue: 2750000, expenses: 1600000, profit: 1150000 },
  ];

  const expenseBreakdown = [
    { name: 'Fuel', value: 35, color: '#3b82f6' },
    { name: 'Salaries', value: 40, color: '#10b981' },
    { name: 'Maintenance', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 10, color: '#8b5cf6' },
  ];

  const metrics = [
    { label: 'Total Revenue', value: 'LKR 2.75M', change: '+12%', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Total Expenses', value: 'LKR 1.6M', change: '+5%', icon: Wallet, color: 'text-red-600' },
    { label: 'Net Profit', value: 'LKR 1.15M', change: '+18%', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Outstanding', value: 'LKR 840K', change: '-8%', icon: CreditCard, color: 'text-amber-600' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleExport = () => {
    const csv = [
      ['Month', 'Revenue', 'Expenses', 'Profit'],
      ...monthlyData.map(d => [d.name, d.revenue, d.expenses, d.profit])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">Financial Reports</h1>
          <p className="page-description">Track revenue, expenses, and profitability</p>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Revenue vs Expenses</h2>
          </div>
          <div className="panel-body">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `LKR ${value.toLocaleString()}`} />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Expense Breakdown</h2>
          </div>
          <div className="panel-body">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
