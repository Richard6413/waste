// src/pages/Communication/AlertsCenter.jsx
import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Bell, Search, Filter, Calendar, MapPin, User, X, Check } from 'lucide-react';

const AlertsCenter = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Route Delay', message: 'Colombo North A route is delayed by 30 minutes due to traffic.', type: 'warning', date: '2024-01-15 09:30', location: 'Colombo 07', status: 'active' },
    { id: 2, title: 'Vehicle Breakdown', message: 'Truck UG-19 has broken down. Replacement being arranged.', type: 'critical', date: '2024-01-15 08:45', location: 'Kandy Rd', status: 'active' },
    { id: 3, title: 'Collection Completed', message: 'Kandy East loop collection completed successfully.', type: 'success', date: '2024-01-15 12:00', location: 'Kandy', status: 'resolved' },
    { id: 4, title: 'Weather Alert', message: 'Heavy rain expected. Collections may be delayed.', type: 'warning', date: '2024-01-14 18:00', location: 'All areas', status: 'resolved' },
    { id: 5, title: 'System Maintenance', message: 'Scheduled maintenance completed successfully.', type: 'info', date: '2024-01-14 02:00', location: 'System', status: 'resolved' },
  ]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter(a => {
    const matchesFilter = filter === 'all' || a.status === filter || a.type === filter;
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const resolveAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const dismissAlert = (id) => {
    if (window.confirm('Are you sure you want to dismiss this alert?')) {
      setAlerts(alerts.filter(a => a.id !== id));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical': return <XCircle size={16} className="text-red-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'success': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'info': return <Bell size={16} className="text-blue-500" />;
      default: return <Bell size={16} className="text-slate-500" />;
    }
  };

  const getTypeBg = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'success': return 'bg-emerald-50 border-emerald-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const activeCount = alerts.filter(a => a.status === 'active').length;

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">COMMUNICATION</div>
          <h1 className="page-title">Alerts Center</h1>
          <p className="page-description">System alerts and emergency notifications</p>
        </div>
        {activeCount > 0 && (
          <span className="status status-danger">
            <span className="status-dot status-dot-red" />
            {activeCount} Active Alert{activeCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Alerts</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-2xl border p-4 transition-all ${
              alert.status === 'active' ? getTypeBg(alert.type) : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getTypeIcon(alert.type)}
                </div>
                <div>
                  <h3 className={`font-semibold ${alert.status === 'active' ? 'text-slate-900' : 'text-slate-700'}`}>
                    {alert.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {alert.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {alert.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {alert.status === 'active' && (
                  <button
                    className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500 transition-colors"
                    onClick={() => resolveAlert(alert.id)}
                    title="Resolve"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                  onClick={() => dismissAlert(alert.id)}
                  title="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Bell size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No alerts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsCenter;
