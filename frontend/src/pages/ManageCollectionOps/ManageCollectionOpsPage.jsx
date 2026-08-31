// src/pages/ManageCollectionOps/ManageCollectionOpsPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, MapPin, CalendarClock, Users, 
  Route as RouteIcon, Clock, CheckCircle,
  AlertTriangle, ArrowRight, Plus,
  BarChart3, Package, Activity
} from 'lucide-react';

const ManageCollectionOpsPage = () => {
  const [stats] = useState({
    activeRoutes: 8,
    totalCollections: 156,
    completionRate: 94.2,
    activeCrews: 14,
    pendingCollections: 23,
    delayedRoutes: 3
  });

  const quickActions = [
    { title: 'View Routes', icon: RouteIcon, to: '/ops/routes', color: 'bg-emerald-500' },
    { title: 'Create Route', icon: Plus, to: '/ops/routes/create', color: 'bg-blue-500' },
    { title: 'Active Collections', icon: Activity, to: '/ops/collections/in-progress', color: 'bg-amber-500' },
    { title: 'View Records', icon: Package, to: '/ops/collections', color: 'bg-purple-500' },
    { title: 'Driver Management', icon: Users, to: '/ops/drivers', color: 'bg-indigo-500' },
    { title: 'Live Tracking', icon: MapPin, to: '/ops/vehicles/tracking', color: 'bg-red-500' },
  ];

  const recentRoutes = [
    { id: 1, name: 'North Zone A', driver: 'John Kamau', progress: 75, status: 'active' },
    { id: 2, name: 'East Side B', driver: 'Mary Wanjiru', progress: 100, status: 'completed' },
    { id: 3, name: 'West District C', driver: 'Peter Ochieng', progress: 45, status: 'delayed' },
    { id: 4, name: 'South Region D', driver: 'Grace Akinyi', progress: 90, status: 'active' },
  ];

  return (
    <div className="workspace-content fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Collection Operations</h1>
          <p className="page-description">
            Plan, dispatch and monitor collection routes across the network
          </p>
        </div>
        <div className="command-bar">
          <Link to="/ops/routes/create" className="btn btn-primary">
            <Plus size={16} />
            New Route
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Truck size={14} />Active Routes</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.activeRoutes}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed Today</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.totalCollections}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><AlertTriangle size={14} className="text-amber-500" />Delayed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.delayedRoutes}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Users size={14} />Active Crews</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.activeCrews}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} to={action.to} className={`flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${action.color} text-white`}>
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-medium text-slate-700 text-center">{action.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Routes Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Active Routes</h3>
            <p className="panel-description">Real-time progress of today's collections</p>
          </div>
          <Link to="/ops/routes" className="panel-action">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="saas-table">
            <thead><tr><th>Route</th><th>Driver</th><th>Progress</th><th>Status</th></tr></thead>
            <tbody>
              {recentRoutes.map((route) => (
                <tr key={route.id}>
                  <td className="font-semibold">{route.name}</td>
                  <td>{route.driver}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${route.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">{route.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status ${route.status === 'active' ? 'status-success' : route.status === 'completed' ? 'status-neutral' : 'status-warning'}`}>
                      <span className="status-dot" />
                      {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCollectionOpsPage;
