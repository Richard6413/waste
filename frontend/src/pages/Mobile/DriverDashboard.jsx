// src/pages/Mobile/DriverDashboard.jsx
import { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle, XCircle, Navigation, User, Phone, AlertTriangle, MessageCircle } from 'lucide-react';

const DriverDashboard = () => {
  const [driver] = useState({
    name: 'Kasun Perera',
    truck: 'UG-12',
    route: 'Colombo North A',
    phone: '+94 77 123 4567'
  });

  const [stops, setStops] = useState([
    { id: 1, name: '123 Main St', address: '123 Main St, Colombo 07', status: 'completed', time: '08:30' },
    { id: 2, name: '456 Oak Ave', address: '456 Oak Ave, Colombo 07', status: 'completed', time: '09:15' },
    { id: 3, name: '789 Pine Rd', address: '789 Pine Rd, Colombo 07', status: 'current', time: '10:00' },
    { id: 4, name: '101 Elm St', address: '101 Elm St, Colombo 07', status: 'pending', time: '10:30' },
    { id: 5, name: '202 Maple Dr', address: '202 Maple Dr, Colombo 07', status: 'pending', time: '11:00' },
  ]);

  const handleComplete = (id) => {
    setStops(stops.map(s => s.id === id ? { ...s, status: 'completed', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } : s));
    const nextPending = stops.find(s => s.status === 'pending' && s.id > id);
    if (nextPending) {
      setStops(prev => prev.map(s => s.id === nextPending.id ? { ...s, status: 'current' } : s));
    }
  };

  const handleSkip = (id) => {
    if (window.confirm('Skip this stop?')) {
      setStops(stops.map(s => s.id === id ? { ...s, status: 'skipped' } : s));
      const nextPending = stops.find(s => s.status === 'pending' && s.id > id);
      if (nextPending) {
        setStops(prev => prev.map(s => s.id === nextPending.id ? { ...s, status: 'current' } : s));
      }
    }
  };

  const completedCount = stops.filter(s => s.status === 'completed').length;
  const progress = (completedCount / stops.length) * 100;

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">MOBILE</div>
          <h1 className="page-title">Driver Dashboard</h1>
          <p className="page-description">Route: {driver.route} · Truck: {driver.truck}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status status-success">
            <span className="status-dot status-dot-green" />
            On Route
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="workspace-panel mb-6">
        <div className="panel-body">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">Route Progress</span>
            <span className="font-semibold">{completedCount}/{stops.length} stops</span>
          </div>
          <div className="h-3 rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Current Stop */}
      {stops.find(s => s.status === 'current') && (
        <div className="workspace-panel mb-6 border-2 border-emerald-500">
          <div className="panel-header bg-emerald-50">
            <h2 className="panel-title">Current Stop</h2>
          </div>
          <div className="panel-body">
            {(() => {
              const current = stops.find(s => s.status === 'current');
              return (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <MapPin size={20} className="text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{current.name}</h3>
                      <p className="text-slate-500">{current.address}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-primary" onClick={() => handleComplete(current.id)}>
                      <CheckCircle size={16} />Complete
                    </button>
                    <button className="btn btn-secondary" onClick={() => handleSkip(current.id)}>
                      <XCircle size={16} />Skip
                    </button>
                    <button className="btn btn-secondary">
                      <Navigation size={16} />Navigate
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* All Stops */}
      <div className="workspace-panel">
        <div className="panel-header">
          <h2 className="panel-title">All Stops</h2>
        </div>
        <div className="panel-body">
          <div className="space-y-3">
            {stops.map((stop) => (
              <div
                key={stop.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  stop.status === 'current' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stop.status === 'completed' ? 'bg-emerald-100' :
                    stop.status === 'current' ? 'bg-amber-100' :
                    stop.status === 'skipped' ? 'bg-red-100' : 'bg-slate-100'
                  }`}>
                    {stop.status === 'completed' ? <CheckCircle size={16} className="text-emerald-600" /> :
                     stop.status === 'current' ? <Clock size={16} className="text-amber-600" /> :
                     stop.status === 'skipped' ? <XCircle size={16} className="text-red-600" /> :
                     <MapPin size={16} className="text-slate-600" />}
                  </div>
                  <div>
                    <p className="font-semibold">{stop.name}</p>
                    <p className="text-sm text-slate-500">{stop.address}</p>
                    {stop.time && <p className="text-xs text-slate-400">{stop.time}</p>}
                  </div>
                </div>
                <span className={`status ${
                  stop.status === 'completed' ? 'status-success' :
                  stop.status === 'current' ? 'status-warning' :
                  stop.status === 'skipped' ? 'status-danger' : 'status-neutral'
                }`}>
                  {stop.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
