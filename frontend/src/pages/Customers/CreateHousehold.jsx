// src/pages/Customers/CreateHousehold.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, User, MapPin, Phone, CreditCard } from 'lucide-react';

const CreateHousehold = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    plan: 'Standard',
    wasteType: 'Mixed Waste',
    collectionDay: 'Monday',
    notes: ''
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    navigate('/customers/households');
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">CUSTOMERS</div>
          <h1 className="page-title">Register Household</h1>
          <p className="page-description">Add a new household to the service network</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={() => navigate('/customers/households')}>
            <X size={16} />Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} />{saving ? 'Saving...' : 'Save Household'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Personal Information</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., N. Perera"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Address</h2>
            </div>
            <div className="panel-body">
              <div className="form-group">
                <label className="form-label">Full Address</label>
                <textarea
                  className="form-textarea"
                  placeholder="Street, City, Postal Code"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Service Plan */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Service Plan</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Plan</label>
                  <select
                    className="form-select"
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Waste Type</label>
                  <select
                    className="form-select"
                    value={formData.wasteType}
                    onChange={(e) => setFormData({...formData, wasteType: e.target.value})}
                  >
                    <option>Mixed Waste</option>
                    <option>Recyclable</option>
                    <option>Organic</option>
                    <option>Hazardous</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Collection Day</label>
                  <select
                    className="form-select"
                    value={formData.collectionDay}
                    onChange={(e) => setFormData({...formData, collectionDay: e.target.value})}
                  >
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Summary</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <User size={18} className="text-emerald-600" />
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold">{formData.name || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <MapPin size={18} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-semibold">{formData.address || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Phone size={18} className="text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{formData.phone || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <CreditCard size={18} className="text-amber-600" />
                  <div>
                    <p className="text-sm text-slate-500">Plan</p>
                    <p className="font-semibold">{formData.plan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHousehold;
