// src/pages/Analytics/CustomReportBuilder.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Save, Download, Plus, Trash2, Calendar, Filter, RefreshCw, FileText, BarChart3 } from 'lucide-react';

const CustomReportBuilder = () => {
  const [reportName, setReportName] = useState('My Custom Report');
  const [selectedMetrics, setSelectedMetrics] = useState(['collections', 'efficiency']);
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-01-31' });
  const [groupBy, setGroupBy] = useState('day');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const availableMetrics = [
    { id: 'collections', label: 'Total Collections', color: '#3b82f6' },
    { id: 'efficiency', label: 'Efficiency %', color: '#10b981' },
    { id: 'revenue', label: 'Revenue', color: '#8b5cf6' },
    { id: 'customers', label: 'Active Customers', color: '#f59e0b' },
    { id: 'waste', label: 'Waste Collected (kg)', color: '#ef4444' },
    { id: 'recycling', label: 'Recycling Rate %', color: '#06b6d4' },
  ];

  const sampleData = [
    { name: 'Week 1', collections: 320, efficiency: 92, revenue: 180000, customers: 1250, waste: 12500, recycling: 45 },
    { name: 'Week 2', collections: 345, efficiency: 94, revenue: 195000, customers: 1280, waste: 13200, recycling: 48 },
    { name: 'Week 3', collections: 310, efficiency: 91, revenue: 175000, customers: 1265, waste: 12800, recycling: 46 },
    { name: 'Week 4', collections: 365, efficiency: 95, revenue: 210000, customers: 1320, waste: 14100, recycling: 52 },
  ];

  const toggleMetric = (metricId) => {
    setSelectedMetrics(prev =>
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExport = () => {
    const csv = [
      ['Period', ...selectedMetrics.map(id => availableMetrics.find(m => m.id === id)?.label || id)],
      ...sampleData.map(row => [
        row.name,
        ...selectedMetrics.map(id => row[id] || 0)
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.replace(/\s+/g, '-').toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">Custom Report Builder</h1>
          <p className="page-description">Build and customize your own reports</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={handleExport} disabled={selectedMetrics.length === 0}>
            <Download size={16} />Export
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={selectedMetrics.length === 0}>
            <Save size={16} />{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Report'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="space-y-6">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Report Configuration</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Report Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">From</label>
                    <input
                      type="date"
                      className="form-input"
                      value={dateRange.from}
                      onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">To</label>
                    <input
                      type="date"
                      className="form-input"
                      value={dateRange.to}
                      onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Group By</label>
                  <select className="form-select" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Select Metrics</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-2">
                {availableMetrics.map((metric) => (
                  <label
                    key={metric.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={() => toggleMetric(metric.id)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Report Preview</h2>
            </div>
            <div className="panel-body">
              {selectedMetrics.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <BarChart3 size={48} className="mx-auto mb-4 text-slate-300" />
                  <p>Select metrics to preview your report</p>
                </div>
              ) : (
                <>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        {selectedMetrics.map((metricId) => {
                          const metric = availableMetrics.find(m => m.id === metricId);
                          return (
                            <Bar
                              key={metricId}
                              dataKey={metricId}
                              fill={metric?.color || '#3b82f6'}
                              radius={[4, 4, 0, 0]}
                            />
                          );
                        })}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {selectedMetrics.map((metricId) => {
                      const metric = availableMetrics.find(m => m.id === metricId);
                      return (
                        <div key={metricId} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric?.color }} />
                          <span className="text-sm text-slate-600">{metric?.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomReportBuilder;
