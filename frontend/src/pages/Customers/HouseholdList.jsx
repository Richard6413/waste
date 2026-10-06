// src/pages/Customers/HouseholdList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, X, Save, MapPin } from 'lucide-react';

const HouseholdList = () => {
  const [households, setHouseholds] = useState([
    { id: 'H-1022', name: 'N. Perera', address: '12 Flower Rd, Colombo 07', plan: 'Standard', balance: 2450, phone: '+94 77 123 4567' },
    { id: 'H-0881', name: 'A. Fernando', address: '88 Kandy Rd, Kadawatha', plan: 'Premium', balance: 0, phone: '+94 77 234 5678' },
    { id: 'H-2210', name: 'S. Jayawardena', address: '4 Lake Dr, Battaramulla', plan: 'Standard', balance: 4800, phone: '+94 77 345 6789' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingHousehold, setViewingHousehold] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    plan: 'Standard',
    phone: ''
  });

  const filteredHouseholds = households.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', address: '', plan: 'Standard', phone: '' });
    setShowModal(true);
  };

  const handleEdit = (household) => {
    setEditingId(household.id);
    setFormData({
      name: household.name,
      address: household.address,
      plan: household.plan,
      phone: household.phone
    });
    setShowModal(true);
  };

  const handleView = (household) => {
    setViewingHousehold(household);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this household?')) {
      setHouseholds(households.filter(h => h.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setHouseholds(households.map(h => h.id === editingId ? { ...h, ...formData } : h));
    } else {
      const newId = `H-${Math.floor(Math.random() * 9000) + 1000}`;
      setHouseholds([...households, { id: newId, balance: 0, ...formData }]);
    }
    setShowModal(false);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">CUSTOMERS</div>
          <h1 className="page-title">Households</h1>
          <p className="page-description">Registered service points on the network</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Household</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search households..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="saas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Plan</th>
                <th>Balance</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHouseholds.map((h) => (
                <tr key={h.id}>
                  <td className="font-mono text-xs">{h.id}</td>
                  <td className="font-semibold">{h.name}</td>
                  <td className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {h.address}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${h.plan === 'Premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {h.plan}
                    </span>
                  </td>
                  <td className={`font-semibold ${h.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    LKR {h.balance.toLocaleString()}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(h)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(h)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(h.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredHouseholds.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No households found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Household' : 'Add New Household'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Household Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-input" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Plan</label>
                  <select className="form-select" value={formData.plan} onChange={(e) => setFormData({...formData, plan: e.target.value})}>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />{editingId ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingHousehold && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Household Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Household ID</p>
                    <p className="font-semibold">{viewingHousehold.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold">{viewingHousehold.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-semibold">{viewingHousehold.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{viewingHousehold.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Plan</p>
                    <span className={`badge ${viewingHousehold.plan === 'Premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {viewingHousehold.plan}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Balance</p>
                    <p className={`font-semibold ${viewingHousehold.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      LKR {viewingHousehold.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingHousehold); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseholdList;
