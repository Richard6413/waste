// src/pages/Operations/ActiveCollections.jsx
import { useState } from 'react';
import { MapPin, Truck, Clock, CheckCircle, AlertTriangle, RefreshCw, Filter, Users } from 'lucide-react';

const ActiveCollections = () => {
  const [collections] = useState([
    {
      id: 1,
      route: 'North Zone A',
      driver: 'John Kamau',
      vehicle: 'Truck #001',
      status: 'in-progress',
      progress: 65,
      stops: { total: 45, completed: 29 },
      estimatedCompletion: '14:30',
      lastUpdate: '2 min ago'
    },
    {
      id: 2,
      route: 'East Side B',
      driver: 'Mary Wanjiru',
      vehicle: 'Truck #003',
      status: 'in-progress',
      progress: 40,
      stops: { total: 38, completed: 15 },
      estimatedCompletion: '15:45',
      lastUpdate: '1 min ago'
    },
    {
      id: 3,
      route: 'West District C',
      driver: 'Peter Ochieng',
      vehicle: 'Truck #005',
      status: 'delayed',
      progress: 30,
      stops: { total: 52, completed: 16 },
      estimatedCompletion: '16:20',
      lastUpdate: '5 min ago'
    }
  ]);

  const delayedRoutes = collections.filter(c => c.status === 'delayed').length;

  return (
    <div className="workspace-content fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Live Collections</h1>
          <p className="page-description">
            Real-time tracking of active collections across the network
          </p>
        </div>
        <div className="command-bar">
          <button className="command-button">
            <RefreshCw size={16} className="animate-spin" />
            Auto-refresh
          </button>
          <button className="command-button">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Truck size={14} />
            Active Routes
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <CheckCircle size={14} className="text-emerald-500" />
            Completed Today
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">87</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <AlertTriangle size={14} className="text-amber-500" />
            Delayed
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">{delayedRoutes}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Users size={14} />
            Active Drivers
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">18</p>
        </div>
      </div>

      {/* Collection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {collections.map((collection, index) => (
          <div 
            key={collection.id}
            className="rounded-2xl border bg-white p-5 slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">{collection.route}</h3>
                  <span className={`status ${
                    collection.status === 'in-progress' ? 'status-success' : 'status-warning'
                  }`}>
                    <span className="status-dot animate-pulse" />
                    {collection.status === 'in-progress' ? 'Active' : 'Delayed'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-slate-600">Driver: {collection.driver}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-sm text-slate-600">{collection.vehicle}</span>
                </div>
              </div>
              <button className="p-2 rounded-xl hover:bg-slate-50 text-slate-400">
                <MapPin size={18} />
              </button>
            </div>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-500">Progress</span>
                <span className="font-semibold text-slate-900">{collection.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    collection.status === 'delayed' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${collection.progress}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded-lg bg-slate-50 p-2 text-center">
                <p className="text-xs text-slate-500">Stops</p>
                <p className="text-sm font-bold text-slate-900">{collection.stops.total}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 text-center">
                <p className="text-xs text-slate-500">Completed</p>
                <p className="text-sm font-bold text-emerald-600">{collection.stops.completed}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 text-center">
                <p className="text-xs text-slate-500">ETA</p>
                <p className="text-sm font-bold text-slate-900">{collection.estimatedCompletion}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">Updated {collection.lastUpdate}</span>
              <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCollections;