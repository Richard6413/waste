// src/pages/Customers/HouseholdDetails.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save, X, User, MapPin, Phone, CreditCard, Calendar, Package } from 'lucide-react';

const HouseholdDetails = () => {
  const navigate = useNavigate();
  const [household, setHousehold] = useState({
    id: 'H-1022',
    name: 'N. Perera',
    address: '12 Flower Rd, Colombo 07',
    phone: '+94 77 123 4567',
    email: 'n.perera@email.com',
    plan: 'Standard',
    balance: 2450,
    collectionDay: 'Monday',
    wasteType: 'Mixed Waste',
    notes: 'Regular collection schedule'
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(household);

  const handleSave = () => {
    setHousehold(formData);
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this household?')) {
      navigate('/customers/households');
    }
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => navigate('/customers/households')}>
            <ArrowLeft size={16} />Back to Households
          </button>
          <div className="page-kicker">CUSTOMERS</div>
          <h1 className="page-title">{household.name}</h1>
          <p className="page-description">{household.id} · {household.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} />Delete
          </button>
          <button className="btn btn-primary" onClick={() => editing ? handleSave() : setEditing(true)}>
            {editing ? <><Save size={16} />Save Changes</> : <><Edit size={16} />Edit Household</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Household Info */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Household Information</h2>
            </div>
            <div className="panel-body">
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="form-group md:col-span-2">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-input" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Plan</label>
                    <select className="form-select" value={formData.plan} onChange={(e) => setFormData({...formData, plan: e.target.value})}>
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold">{household.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{household.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-semibold">{household.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-semibold">{household.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Plan</p>
                    <span className="badge bg-blue-100 text-blue-700">{household.plan}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Balance</p>
                    <p className={`font-semibold ${household.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      LKR {household.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Service Details</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-emerald-600" />
                    <span className="text-sm font-semibold">Collection Day</span>
                  </div>
                  <p className="font-semibold">{household.collectionDay}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold">Waste Type</span>
                  </div>
                  <p className="font-semibold">{household.wasteType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Balance Card */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Balance</h2>
            </div>
            <div className="panel-body">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">LKR {household.balance.toLocaleString()}</p>
                <p className="text-sm text-slate-500 mt-1">Outstanding Balance</p>
                {household.balance > 0 && (
                  <button className="btn btn-primary w-full mt-4">
                    <CreditCard size={16} />Pay Now
                  </button>
                )}
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
                  <Calendar size={16} />Schedule Pickup
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <Package size={16} />Request Collection
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <CreditCard size={16} />View Billing History
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
              <p className="text-sm text-slate-600">{household.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdDetails;
