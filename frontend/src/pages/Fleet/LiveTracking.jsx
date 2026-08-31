// src/pages/Fleet/LiveTracking.jsx
import { useState } from 'react';
import { 
  MapPin, Truck, RefreshCw, Filter,
  Clock, Navigation, AlertTriangle,
  CheckCircle, Users, Gauge,
  Eye, Activity, Radio
} from 'lucide-react';

const LiveTracking = () => {
  const [vehicles] = useState([
    {
      id: 1,
      name: 'Truck #001',
      registration: 'KAA 123A',
      driver: 'John Kamau',
      location: { lat: -1.286, lng: 36.817 },
      speed: 45,
      status: 'moving',
      route: 'North Zone A',
      progress: 65,
      lastUpdate: '2 min ago',
      fuelLevel: 65,
      temperature: 24
    },
    {
      id: 2,
      name: 'Truck #002',
      registration: 'KBB 456B',
      driver: 'Mary Wanjiru',
      location: { lat: -1.292, lng: 36.825 },
      speed: 0,
      status: 'stopped',
      route: 'East Side B',
      progress: 100,
      lastUpdate: '5 min ago',
      fuelLevel: 42,
      temperature: 22
    },
    {
      id: 3,
      name: 'Truck #003',
      registration: 'KCC 789C',
      driver: 'Peter Ochieng',
      location: { lat: -1.278, lng: 36.810 },
      speed: 30,
      status: 'moving',
      route: 'West District C',
      progress: 45,
      lastUpdate: '1 min ago',
      fuelLevel: 78,
      temperature: 26
    },
    {
      id: 4,
      name: 'Van #004',
      registration: 'KDD 012D',
      driver: 'Grace Akinyi',
      location: { lat: -1.295, lng: 36.830 },
      speed: 55,
      status: 'moving',
      route: 'South Region D',
      progress: 80,
      lastUpdate: '3 min ago',
      fuelLevel: 23,
      temperature: 25
    },
    {
      id: 5,
      name: 'Truck #005',
      registration: 'KEE 345E',
      driver: 'James Mwangi',
      location: { lat: -1.270, lng: 36.815 },
      speed: 0,
      status: 'idle',
      route: 'Central Zone E',
      progress: 0,
      lastUpdate: '15 min ago',
      fuelLevel: 89,
      temperature: 21
    },
    {
      id: 6,
      name: 'Truck #006',
      registration: 'KFF 678F',
      driver: 'Susan Wanjiku',
      location: { lat: -1.288, lng: 36.820 },
      speed: 20,
      status: 'moving',
      route: 'North Zone A',
      progress: 35,
      lastUpdate: '4 min ago',
      fuelLevel: 56,
      temperature: 23
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const activeVehicles = vehicles.filter(v => v.status === 'moving' || v.status === 'stopped').length;
  const movingVehicles = vehicles.filter(v => v.status === 'moving').length;

  const getStatusColor = (status) => {
    const colors = {
      moving: 'text-emerald-500 bg-emerald-50',
      stopped: 'text-amber-500 bg-amber-50',
      idle: 'text-slate-400 bg-slate-50'
    };
    return colors[status] || 'text-slate-400 bg-slate-50';
  };

  const getStatusDot = (status) => {
    const colors = {
      moving: 'bg-emerald-500 animate-pulse',
      stopped: 'bg-amber-500',
      idle: 'bg-slate-400'
    };
    return colors[status] || 'bg-slate-400';
  };

  const getStatusLabel = (status) => {
    const labels = {
      moving: 'Moving',
      stopped: 'Stopped',
      idle: 'Idle'
    };
    return labels[status] || status;
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">FLEET MANAGEMENT</div>
          <h1 className="page-title">Live Tracking</h1>
          <p className="page-description">
            Real-time GPS tracking of all active vehicles across the network
          </p>
        </div>
        <div className="command-bar">
          <div className="flex gap-1">
            <button 
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                viewMode === 'list' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button 
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                viewMode === 'map' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'
              }`}
              onClick={() => setViewMode('map')}
            >
              Map View
            </button>
          </div>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Truck size={14} />Active Vehicles</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{activeVehicles}</p>
          <p className="text-xs text-slate-400">Total: {vehicles.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Navigation size={14} className="text-emerald-500" />Moving</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{movingVehicles}</p>
          <p className="text-xs text-emerald-600">↑ Active on routes</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Stopped</div>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {vehicles.filter(v => v.status === 'stopped').length}
          </p>
          <p className="text-xs text-amber-600">At collection points</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Users size={14} className="text-blue-500" />Active Drivers</div>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {vehicles.filter(v => v.status !== 'idle').length}
          </p>
          <p className="text-xs text-slate-400">On duty</p>
        </div>
      </div>

      {viewMode === 'map' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden mb-6">
          <div className="relative h-[500px] bg-gradient-to-br from-emerald-50/30 to-slate-50 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-emerald-600 mx-auto mb-2" />
              <p className="text-slate-500 font-medium">Interactive Map View</p>
              <p className="text-sm text-slate-400 mt-1">
                {activeVehicles} vehicles currently active
              </p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {vehicles.slice(0, 4).map((v) => (
                  <div 
                    key={v.id} 
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs ${
                      v.status === 'moving' ? 'bg-emerald-50 text-emerald-700' : 
                      v.status === 'stopped' ? 'bg-amber-50 text-amber-700' :
                      'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${getStatusDot(v.status)}`} />
                    {v.name}
                  </div>
                ))}
                {vehicles.length > 4 && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs">
                    +{vehicles.length - 4} more
                  </div>
                )}
              </div>
              <div className="mt-6 flex gap-4 justify-center text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Moving</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Stopped</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>Idle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.id}
              className={`rounded-2xl border bg-white p-4 slide-up hover:shadow-md transition-shadow cursor-pointer ${
                selectedVehicle?.id === vehicle.id ? 'ring-2 ring-emerald-400 border-emerald-300' : 'border-slate-200'
              }`}
              onClick={() => setSelectedVehicle(selectedVehicle?.id === vehicle.id ? null : vehicle)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    vehicle.status === 'moving' ? 'bg-emerald-50 text-emerald-600' :
                    vehicle.status === 'stopped' ? 'bg-amber-50 text-amber-600' :
                    'bg-slate-50 text-slate-400'
                  }`}>
                    <Truck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">{vehicle.name}</h4>
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(vehicle.status)}`} />
                    </div>
                    <p className="text-xs text-slate-400">{vehicle.registration}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(vehicle.status)}`}>
                  {getStatusLabel(vehicle.status)}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-slate-400">Driver</p>
                  <p className="text-sm font-medium text-slate-900">{vehicle.driver}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Route</p>
                  <p className="text-sm font-medium text-slate-900 truncate">{vehicle.route}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Speed</p>
                  <p className="text-sm font-bold text-slate-900">{vehicle.speed} km/h</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${vehicle.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{vehicle.progress}%</span>
                  </div>
                </div>
              </div>

              {selectedVehicle?.id === vehicle.id && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-slate-400">Fuel Level</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              vehicle.fuelLevel > 60 ? 'bg-emerald-500' :
                              vehicle.fuelLevel > 30 ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{vehicle.fuelLevel}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Temperature</p>
                      <p className="font-medium">{vehicle.temperature}°C</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Last Update: {vehicle.lastUpdate}</span>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                      <Eye size={14} className="inline mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveTracking;