// src/pages/Waste/DropOffCentres.jsx
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, Save, MapPin, Clock, Phone, Package } from 'lucide-react';

const DropOffCentres = () => {
  const [centres, setCentres] = useState([
    { id: 1, name: 'Colombo Central Centre', address: '123 Main St, Colombo 07', phone: '+94 11 234 5678', hours: '8:00 AM - 6:00 PM', materials: 'All types', status: 'open' },
    { id: 2, name: 'Kandy Recycling Hub', address: '456 Kandy Rd, Kandy', phone: '+94 81 234 5678', hours: '9:00 AM - 5:00 PM', materials: 'Recyclables, E-waste', status: 'open' },
    { id: 3, name: 'Galle Drop-off Point', address: '789 Galle Rd, Galle', phone: '+94 91 234 5678', hours: '8:00 AM - 4:00 PM', materials: 'All types', status: 'closed' },
    { id: 4, name: 'Battaramulla Centre', address: '321 Battaramulla Rd, Battaramulla', phone: '+94 11 345 6789', hours: '8:00 AM - 6:00 PM', materials: 'Recyclables, Organic', status: 'open' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingCentre, setViewingCentre] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    hours: '',
    materials: '',
    status: 'open'
  });

  const filteredCentres = centres.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.materials.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', address: '', phone: '', hours: '', materials: '', status: 'open' });
    setShowModal(true);
  };

  const handleEdit = (centre) => {
    setEditingId(centre.id);
    setFormData({
      name: centre.name,
      address: centre.address,
      phone: centre.phone,
      hours: centre.hours,
      materials: centre.materials,
      status: centre.status
    });
    setShowModal(true);
  };

  const handleView = (centre) => {
    setViewingCentre(centre);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this centre?')) {
      setCentres(centres.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setCentres(centres.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      const newId = Math.max(...centres.map(c => c.id)) + 1;
      setCentres([...centres, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    return status === 'open' ? 'status-success' : 'status-danger';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE</div>
          <h1 className="page-title">Drop-off Centres</h1>
          <p className="page-description">Manage waste drop-off locations and facilities</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Centre</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><MapPin size={14} />Total Centres</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{centres.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><MapPin size={14} className="text-emerald-500" />Open</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{centres.filter(c => c.status === 'open').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><MapPin size={14} className="text-red-500" />Closed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{centres.filter(c => c.status === 'closed').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} className="text-blue-500" />Materials</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{centres.reduce((s, c) => s + c.materials.split(',').length, 0)}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search centres..."
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
                <th>Centre</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Hours</th>
                <th>Materials</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCentres.map((centre) => (
                <tr key={centre.id}>
                  <td className="font-semibold">{centre.name}</td>
                  <td className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {centre.address}
                    </div>
                  </td>
                  <td className="text-sm text-slate-600">{centre.phone}</td>
                  <td className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      {centre.hours}
                    </div>
                  </td>
                  <td className="text-sm text-slate-600">{centre.materials}</td>
                  <td><span className={`status ${getStatusBadge(centre.status)}`}>{centre.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(centre)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(centre)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(centre.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCentres.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">No centres found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Centre' : 'Add New Centre'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Centre Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-input" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hours</label>
                    <input type="text" className="form-input" value={formData.hours} onChange={(e) => setFormData({...formData, hours: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Accepted Materials</label>
                  <input type="text" className="form-input" value={formData.materials} onChange={(e) => setFormData({...formData, materials: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
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
      {showViewModal && viewingCentre && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Centre Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                    <MapPin size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingCentre.name}</h4>
                    <span className={`status ${getStatusBadge(viewingCentre.status)}`}>{viewingCentre.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-semibold">{viewingCentre.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{viewingCentre.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Hours</p>
                    <p className="font-semibold">{viewingCentre.hours}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Materials</p>
                    <p className="font-semibold">{viewingCentre.materials}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingCentre); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropOffCentres;
