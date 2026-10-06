// src/pages/Admin/SystemHealthMonitor.jsx
import { useState } from 'react';
import { Activity, Server, Database, Wifi, CheckCircle, XCircle, AlertTriangle, RefreshCw, Cpu, HardDrive, Clock } from 'lucide-react';

const SystemHealthMonitor = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [health, setHealth] = useState({
    status: 'healthy',
    uptime: '15 days, 4 hours',
    lastCheck: new Date().toISOString().replace('T', ' ').slice(0, 16),
    services: [
      { name: 'API Server', status: 'operational', uptime: '99.9%', responseTime: '45ms' },
      { name: 'Database', status: 'operational', uptime: '99.8%', responseTime: '12ms' },
      { name: 'Authentication', status: 'operational', uptime: '100%', responseTime: '23ms' },
      { name: 'File Storage', status: 'operational', uptime: '99.7%', responseTime: '156ms' },
      { name: 'Email Service', status: 'degraded', uptime: '98.5%', responseTime: '2.3s' },
    ],
    metrics: {
      cpu: 35,
      memory: 62,
      disk: 48,
      network: 28
    }
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setHealth({
        ...health,
        lastCheck: new Date().toISOString().replace('T', ' ').slice(0, 16)
      });
    }, 1000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'degraded': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'down': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      operational: 'status-success',
      degraded: 'status-warning',
      down: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">System Health</h1>
          <p className="page-description">Monitor system performance and service status</p>
        </div>
        <button className="btn btn-secondary" onClick={handleRefresh}>
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-emerald-500" />
            <span className="text-sm text-slate-500">Status</span>
          </div>
          <span className={`status ${health.status === 'healthy' ? 'status-success' : 'status-warning'}`}>
            {health.status}
          </span>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-blue-500" />
            <span className="text-sm text-slate-500">Uptime</span>
          </div>
          <p className="font-semibold">{health.uptime}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Server size={16} className="text-purple-500" />
            <span className="text-sm text-slate-500">Services</span>
          </div>
          <p className="font-semibold">{health.services.filter(s => s.status === 'operational').length}/{health.services.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wifi size={16} className="text-amber-500" />
            <span className="text-sm text-slate-500">Last Check</span>
          </div>
          <p className="font-semibold text-sm">{health.lastCheck}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={18} className="text-blue-600" />
              <span className="font-semibold">CPU Usage</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{health.metrics.cpu}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${health.metrics.cpu}%` }} />
            </div>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="flex items-center gap-2 mb-3">
              <Server size={18} className="text-purple-600" />
              <span className="font-semibold">Memory</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{health.metrics.memory}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-purple-500" style={{ width: `${health.metrics.memory}%` }} />
            </div>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive size={18} className="text-amber-600" />
              <span className="font-semibold">Disk Usage</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{health.metrics.disk}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${health.metrics.disk}%` }} />
            </div>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body">
            <div className="flex items-center gap-2 mb-3">
              <Wifi size={18} className="text-emerald-600" />
              <span className="font-semibold">Network I/O</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{health.metrics.network}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${health.metrics.network}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="workspace-panel">
        <div className="panel-header">
          <h2 className="panel-title">Service Status</h2>
        </div>
        <div className="panel-body">
          <div className="overflow-x-auto">
            <table className="saas-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Uptime</th>
                  <th>Response Time</th>
                </tr>
              </thead>
              <tbody>
                {health.services.map((service, index) => (
                  <tr key={index}>
                    <td className="font-semibold">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        {service.name}
                      </div>
                    </td>
                    <td><span className={`status ${getStatusBadge(service.status)}`}>{service.status}</span></td>
                    <td>{service.uptime}</td>
                    <td>{service.responseTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;
