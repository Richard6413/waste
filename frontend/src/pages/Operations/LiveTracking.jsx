// src/pages/Operations/LiveTracking.jsx
import { useState } from 'react';
import { MapPin, Truck, User, Clock, Navigation, RefreshCw, Layers, ZoomIn, ZoomOut } from 'lucide-react';

const LiveTracking = () => {
  const [vehicles] = useState([
    { id: 1, plate: 'UG-12', driver: 'Kasun Perera', lat: 6.9271, lng: 79.8612, speed: 35, status: 'moving', lastUpdate: '2 min ago' },
    { id: 2, plate: 'UG-07', driver: 'Mary Silva', lat: 7.2906, lng: 80.6337, speed: 0, status: 'idle', lastUpdate: '5 min ago' },
    { id: 3, plate: 'UG-19', driver: 'N. Fernando', lat: 6.0535, lng: 80.2210, speed: 42, status: 'moving', lastUpdate: '1 min ago' },
    { id: 4, plate: 'UG-03', driver: 'I. Jayasuriya', lat: 6.9026, lng: 79.8718, speed: 28, status: 'moving', lastUpdate: '30 sec ago' },
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status) => {
    return status === 'moving' ? 'bg-emerald-500' : 'bg-amber-500';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Live Tracking</h1>
          <p className="page-description">Real-time GPS tracking of all fleet vehicles</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="font-semibold">Live Map</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" title="Zoom In">
                  <ZoomIn size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" title="Zoom Out">
                  <ZoomOut size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" title="Layers">
                  <Layers size={16} />
                </button>
              </div>
            </div>
            <div className="relative h-96 bg-slate-100">
              {/* Placeholder Map */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-500">Interactive Map View</p>
                  <p className="text-sm text-slate-400 mt-1">Real-time vehicle positions</p>
                </div>
              </div>
              {/* Vehicle Markers */}
              {vehicles.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${25 + index * 15}%`,
                    top: `${30 + index * 10}%`,
                  }}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className={`w-8 h-8 rounded-full ${getStatusColor(vehicle.status)} text-white flex items-center justify-center shadow-lg border-2 border-white`}>
                    <Truck size={14} />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-semibold whitespace-nowrap">
                    {vehicle.plate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="font-semibold mb-4">Active Vehicles</h3>
            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedVehicle?.id === vehicle.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${getStatusColor(vehicle.status)} text-white flex items-center justify-center`}>
                        <Truck size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{vehicle.plate}</p>
                        <p className="text-xs text-slate-500">{vehicle.driver}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{vehicle.speed} km/h</p>
                      <p className="text-xs text-slate-400">{vehicle.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-semibold mb-4">Vehicle Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Plate</span>
                  <span className="font-semibold">{selectedVehicle.plate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Driver</span>
                  <span className="font-semibold">{selectedVehicle.driver}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Speed</span>
                  <span className="font-semibold">{selectedVehicle.speed} km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className={`status ${selectedVehicle.status === 'moving' ? 'status-success' : 'status-warning'}`}>
                    {selectedVehicle.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Last Update</span>
                  <span className="font-semibold">{selectedVehicle.lastUpdate}</span>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <button className="btn btn-primary w-full">
                    <Navigation size={16} />
                    Navigate to Vehicle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
