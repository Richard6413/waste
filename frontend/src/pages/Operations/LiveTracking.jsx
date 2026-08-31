// src/pages/Operations/LiveTracking.jsx
import { useState } from 'react';
import { MapPin, Truck, RefreshCw, Filter, Clock, Navigation, Users } from 'lucide-react';

const LiveTracking = () => {
  const [vehicles] = useState([
    { id: 1, name: 'Truck #001', driver: 'John Kamau', speed: 45, status: 'moving', route: 'North Zone A', progress: 65 },
    { id: 2, name: 'Truck #002', driver: 'Mary Wanjiru', speed: 0, status: 'stopped', route: 'East Side B', progress: 100 },
    { id: 3, name: 'Truck #003', driver: 'Peter Ochieng', speed: 30, status: 'moving', route: 'West District C', progress: 45 },
  ]);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div><div className="page-kicker">OPERATIONS</div><h1 className="page-title">Live Tracking</h1><p className="page-description">Real-time GPS tracking of all active vehicles</p></div>
        <div className="command-bar"><button className="command-button"><RefreshCw size={16} className="animate-spin" />Auto-refresh</button><button className="command-button"><Filter size={16} />Filter</button></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Truck size={14} />Active Vehicles</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.length}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Navigation size={14} className="text-emerald-500" />Moving</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.filter(v => v.status === 'moving').length}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Stopped</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.filter(v => v.status === 'stopped').length}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Users size={14} />Active Drivers</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.length}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="rounded-2xl border bg-white p-4">
            <div className="flex items-start justify-between">
              <div><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${v.status === 'moving' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} /><h3 className="font-semibold text-slate-900">{v.name}</h3></div><p className="text-sm text-slate-500">Driver: {v.driver}</p><p className="text-sm text-slate-500">{v.route}</p></div>
              <div className="text-right"><div className="text-lg font-bold text-slate-900">{v.speed} km/h</div><div className="text-xs text-slate-400">{v.progress}%</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LiveTracking;
