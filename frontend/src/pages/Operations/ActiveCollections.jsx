// src/pages/Operations/ActiveCollections.jsx
import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, MapPin, Truck, User } from 'lucide-react';

const ActiveCollections = () => {
  const [collections, setCollections] = useState([
    { id: 1, route: 'Colombo North A', truck: 'UG-12', driver: 'Kasun Perera', stops: 42, completed: 28, status: 'in-progress', eta: '12:30 PM' },
    { id: 2, route: 'Kandy East loop', truck: 'UG-07', driver: 'Mary Silva', stops: 31, completed: 31, status: 'completed', eta: 'Completed' },
    { id: 3, route: 'Galle Fort sweep', truck: 'UG-19', driver: 'N. Fernando', stops: 28, completed: 11, status: 'in-progress', eta: '02:15 PM' },
    { id: 4, route: 'Battaramulla residential', truck: 'UG-03', driver: 'I. Jayasuriya', stops: 55, completed: 6, status: 'in-progress', eta: '04:00 PM' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCollections = collections.filter(c =>
    c.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.truck.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleComplete = (id) => {
    setCollections(collections.map(c => c.id === id ? { ...c, status: 'completed', completed: c.stops, eta: 'Completed' } : c));
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this collection?')) {
      setCollections(collections.map(c => c.id === id ? { ...c, status: 'cancelled', eta: 'Cancelled' } : c));
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'in-progress': 'status-warning',
      completed: 'status-success',
      cancelled: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-progress': return <Clock size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Active Collections</h1>
          <p className="page-description">Live tracking of ongoing collection routes</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status status-success">
            <span className="status-dot status-dot-green" />
            {collections.filter(c => c.status === 'in-progress').length} Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Truck size={14} />Total Routes</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />In Progress</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.filter(c => c.status === 'in-progress').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.filter(c => c.status === 'completed').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><MapPin size={14} className="text-blue-500" />Total Stops</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.reduce((s, c) => s + c.stops, 0)}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search collections..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredCollections.map((collection) => (
          <div key={collection.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Truck size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{collection.route}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><User size={12} />{collection.driver}</span>
                    <span className="flex items-center gap-1"><Truck size={12} />{collection.truck}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{collection.stops} stops</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className={`status ${getStatusBadge(collection.status)}`}>
                    {getStatusIcon(collection.status)}
                    {collection.status}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">ETA: {collection.eta}</p>
                </div>
                <div className="flex items-center gap-2">
                  {collection.status === 'in-progress' && (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleComplete(collection.id)}
                      >
                        <CheckCircle size={14} />Complete
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(collection.id)}
                      >
                        <XCircle size={14} />Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500">Progress</span>
                <span className="font-semibold">{collection.completed}/{collection.stops} stops</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(collection.completed / collection.stops) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
        {filteredCollections.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Truck size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No active collections found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveCollections;
