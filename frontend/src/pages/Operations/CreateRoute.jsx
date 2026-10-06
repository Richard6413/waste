// src/pages/Operations/CreateRoute.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2, MapPin, Truck, User, Clock } from 'lucide-react';

const CreateRoute = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    truck: '',
    driver: '',
    date: '',
    startTime: '',
    endTime: '',
    stops: [{ id: 1, name: '', address: '', time: '' }]
  });
  const [saving, setSaving] = useState(false);

  const handleAddStop = () => {
    setFormData({
      ...formData,
      stops: [...formData.stops, { id: formData.stops.length + 1, name: '', address: '', time: '' }]
    });
  };

  const handleRemoveStop = (id) => {
    if (formData.stops.length > 1) {
      setFormData({
        ...formData,
        stops: formData.stops.filter(s => s.id !== id)
      });
    }
  };

  const handleStopChange = (id, field, value) => {
    setFormData({
      ...formData,
      stops: formData.stops.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    navigate('/ops/routes');
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Create Route</h1>
          <p className="page-description">Plan a new collection route</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={() => navigate('/ops/routes')}>
            <X size={16} />Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} />{saving ? 'Saving...' : 'Save Route'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Route Details */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Route Details</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Route Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Colombo North A"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Truck</label>
                  <select
                    className="form-select"
                    value={formData.truck}
                    onChange={(e) => setFormData({...formData, truck: e.target.value})}
                  >
                    <option value="">Select truck</option>
                    <option value="UG-12">UG-12</option>
                    <option value="UG-07">UG-07</option>
                    <option value="UG-19">UG-19</option>
                    <option value="UG-03">UG-03</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Driver</label>
                  <select
                    className="form-select"
                    value={formData.driver}
                    onChange={(e) => setFormData({...formData, driver: e.target.value})}
                  >
                    <option value="">Select driver</option>
                    <option value="Kasun Perera">Kasun Perera</option>
                    <option value="Mary Silva">Mary Silva</option>
                    <option value="N. Fernando">N. Fernando</option>
                    <option value="I. Jayasuriya">I. Jayasuriya</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-input"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-input"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stops */}
          <div className="workspace-panel">
            <div className="panel-header">
              <div className="flex items-center justify-between">
                <h2 className="panel-title">Route Stops</h2>
                <button className="btn btn-secondary btn-sm" onClick={handleAddStop}>
                  <Plus size={14} />Add Stop
                </button>
              </div>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                {formData.stops.map((stop, index) => (
                  <div key={stop.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-500">Stop {index + 1}</span>
                      {formData.stops.length > 1 && (
                        <button
                          className="p-1 rounded hover:bg-red-100 text-red-500"
                          onClick={() => handleRemoveStop(stop.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Stop name"
                        value={stop.name}
                        onChange={(e) => handleStopChange(stop.id, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Address"
                        value={stop.address}
                        onChange={(e) => handleStopChange(stop.id, 'address', e.target.value)}
                      />
                      <input
                        type="time"
                        className="form-input"
                        value={stop.time}
                        onChange={(e) => handleStopChange(stop.id, 'time', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Route Summary</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <MapPin size={18} className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-slate-500">Total Stops</p>
                    <p className="font-semibold">{formData.stops.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Truck size={18} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-500">Truck</p>
                    <p className="font-semibold">{formData.truck || 'Not assigned'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <User size={18} className="text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-500">Driver</p>
                    <p className="font-semibold">{formData.driver || 'Not assigned'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Clock size={18} className="text-amber-600" />
                  <div>
                    <p className="text-sm text-slate-500">Estimated Duration</p>
                    <p className="font-semibold">
                      {formData.startTime && formData.endTime
                        ? `${formData.startTime} - ${formData.endTime}`
                        : 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Quick Tips</h2>
            </div>
            <div className="panel-body">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  Add all stops in the order they should be visited
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  Assign a truck and driver before saving
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  Set realistic time windows for each stop
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoute;
