// src/pages/Schedule/SpecialCollectionPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Calendar, Clock, MapPin, Package, CreditCard, User, Phone } from 'lucide-react';

const SpecialCollectionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    wasteType: 'Bulky Items',
    quantity: 1,
    notes: ''
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    navigate('/schedule/result?status=success');
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SCHEDULE</div>
          <h1 className="page-title">Request Special Collection</h1>
          <p className="page-description">Schedule a special waste collection for bulky or hazardous items</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={() => navigate('/schedule')}>
            <X size={16} />Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} />{saving ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Contact Information</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
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
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Collection Address</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Collection Details */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Collection Details</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time</label>
                  <select
                    className="form-select"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="">Select time slot</option>
                    <option>08:00 - 10:00</option>
                    <option>10:00 - 12:00</option>
                    <option>12:00 - 14:00</option>
                    <option>14:00 - 16:00</option>
                    <option>16:00 - 18:00</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Waste Type</label>
                  <select
                    className="form-select"
                    value={formData.wasteType}
                    onChange={(e) => setFormData({...formData, wasteType: e.target.value})}
                  >
                    <option>Bulky Items</option>
                    <option>Furniture</option>
                    <option>Appliances</option>
                    <option>E-waste</option>
                    <option>Hazardous Waste</option>
                    <option>Construction Debris</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Quantity</label>
                  <input
                    type="number"
                    className="form-input"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                  />
                </div>
                <div className="form-group md:col-span-2">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Any special instructions or notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Request Summary</h2>
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
                  <Phone size={18} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{formData.phone || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <MapPin size={18} className="text-purple-600" />
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-semibold">{formData.address || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Calendar size={18} className="text-amber-600" />
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold">{formData.date || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Clock size={18} className="text-red-600" />
                  <div>
                    <p className="text-sm text-slate-500">Time</p>
                    <p className="font-semibold">{formData.time || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Package size={18} className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-slate-500">Waste Type</p>
                    <p className="font-semibold">{formData.wasteType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Pricing</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Base Fee</span>
                  <span className="font-semibold">LKR 1,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Per Item</span>
                  <span className="font-semibold">LKR 500</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="font-semibold">Estimated Total</span>
                  <span className="font-bold text-lg text-emerald-600">
                    LKR {(1500 + (formData.quantity * 500)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCollectionPage;
