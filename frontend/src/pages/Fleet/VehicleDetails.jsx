// src/pages/Fleet/VehicleDetails.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save, X, Truck, Fuel, Wrench, Calendar, User, Gauge } from 'lucide-react';

const VehicleDetails = () => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    id: 1,
    name: 'Truck #001',
    registration: 'KAA 123A',
    model: 'Isuzu NPR',
    capacity: '5 tons',
    status: 'active',
    driver: 'John Kamau',
    fuel: 65,
    temperature: 24,
    mileage: 45230,
    lastService: '2024-01-10',
    nextService: '2024-04-10',
    insurance: '2024-12-31',
    notes: 'Regular maintenance schedule followed'
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(vehicle);

  const handleSave = () => {
    setVehicle(formData);
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      navigate('/fleet/vehicles');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'status-success',
      maintenance: 'status-warning',
      inactive: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => navigate('/fleet/vehicles')}>
            <ArrowLeft size={16} />Back to Vehicles
          </button>
          <div className="page-kicker">FLEET</div>
          <h1 className="page-title">{vehicle.name}</h1>
          <p className="page-description">{vehicle.registration} · {vehicle.model}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} />Delete
          </button>
          <button className="btn btn-primary" onClick={() => editing ? handleSave() : setEditing(true)}>
            {editing ? <><Save size={16} />Save Changes</> : <><Edit size={16} />Edit Vehicle</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Info */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Vehicle Information</h2>
            </div>
            <div className="panel-body">
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Vehicle Name</label>
                    <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Registration</label>
                    <input type="text" className="form-input" value={formData.registration} onChange={(e) => setFormData({...formData, registration: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Model</label>
                    <input type="text" className="form-input" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Capacity</label>
                    <input type="text" className="form-input" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assigned Driver</label>
                    <input type="text" className="form-input" value={formData.driver} onChange={(e) => setFormData({...formData, driver: e.target.value})} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Registration</p>
                    <p className="font-semibold">{vehicle.registration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Model</p>
                    <p className="font-semibold">{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Capacity</p>
                    <p className="font-semibold">{vehicle.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(vehicle.status)}`}>{vehicle.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Driver</p>
                    <p className="font-semibold">{vehicle.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Mileage</p>
                    <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Maintenance */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Maintenance & Insurance</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold">Last Service</span>
                  </div>
                  <p className="font-semibold">{vehicle.lastService}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-amber-600" />
                    <span className="text-sm font-semibold">Next Service</span>
                  </div>
                  <p className="font-semibold">{vehicle.nextService}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-green-600" />
                    <span className="text-sm font-semibold">Insurance Valid Until</span>
                  </div>
                  <p className="font-semibold">{vehicle.insurance}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge size={16} className="text-purple-600" />
                    <span className="text-sm font-semibold">Mileage</span>
                  </div>
                  <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Current Status</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Fuel Level</span>
                    <span className="font-semibold">{vehicle.fuel}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${vehicle.fuel > 50 ? 'bg-emerald-500' : vehicle.fuel > 20 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${vehicle.fuel}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Engine Temp</span>
                    <span className="font-semibold">{vehicle.temperature}°C</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${(vehicle.temperature / 100) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Quick Actions</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-2">
                <button className="btn btn-secondary w-full justify-start">
                  <Calendar size={16} />Schedule Maintenance
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <Fuel size={16} />Log Fuel Refill
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <User size={16} />Reassign Driver
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Notes</h2>
            </div>
            <div className="panel-body">
              <p className="text-sm text-slate-600">{vehicle.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
