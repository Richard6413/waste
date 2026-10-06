// src/pages/Waste/RecyclingManagement.jsx
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, Save, Recycle, MapPin, Users, TrendingUp } from 'lucide-react';

const RecyclingManagement = () => {
  const [programs, setPrograms] = useState([
    { id: 1, name: 'Island-wide PET take-back', materials: 'PET bottles', households: 12400, diversion: '18 t / month', status: 'active' },
    { id: 2, name: 'Kandy composting clubs', materials: 'Kitchen organics', households: 2100, diversion: '6 t / month', status: 'active' },
    { id: 3, name: 'School e-waste days', materials: 'Phones, chargers', households: '80 schools', diversion: '1.2 t / quarter', status: 'active' },
    { id: 4, name: 'Office paper drive', materials: 'Paper, cardboard', households: '150 offices', diversion: '3 t / month', status: 'paused' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingProgram, setViewingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    materials: '',
    households: '',
    diversion: '',
    status: 'active'
  });

  const filteredPrograms = programs.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.materials.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', materials: '', households: '', diversion: '', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (program) => {
    setEditingId(program.id);
    setFormData({
      name: program.name,
      materials: program.materials,
      households: program.households,
      diversion: program.diversion,
      status: program.status
    });
    setShowModal(true);
  };

  const handleView = (program) => {
    setViewingProgram(program);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setPrograms(programs.map(p => p.id === editingId ? { ...p, ...formData } : p));
    } else {
      const newId = Math.max(...programs.map(p => p.id)) + 1;
      setPrograms([...programs, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'status-success',
      paused: 'status-warning',
      inactive: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE</div>
          <h1 className="page-title">Recycling Programmes</h1>
          <p className="page-description">Diversion programmes running with municipal partners</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Programme</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Recycle size={14} />Total Programmes</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{programs.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Recycle size={14} className="text-emerald-500" />Active</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{programs.filter(p => p.status === 'active').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Users size={14} className="text-blue-500" />Households</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{programs.reduce((s, p) => s + (parseInt(p.households) || 0), 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><TrendingUp size={14} className="text-purple-500" />Diversion</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{programs.length} streams</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search programmes..."
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
                <th>Programme</th>
                <th>Materials</th>
                <th>Reach</th>
                <th>Diverted</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((program) => (
                <tr key={program.id}>
                  <td className="font-semibold">{program.name}</td>
                  <td>{program.materials}</td>
                  <td>{program.households}</td>
                  <td className="font-semibold text-emerald-600">{program.diversion}</td>
                  <td><span className={`status ${getStatusBadge(program.status)}`}>{program.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(program)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(program)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(program.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPrograms.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No programmes found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Programme' : 'Add New Programme'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Programme Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Materials</label>
                  <input type="text" className="form-input" value={formData.materials} onChange={(e) => setFormData({...formData, materials: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Households Reached</label>
                    <input type="text" className="form-input" value={formData.households} onChange={(e) => setFormData({...formData, households: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Diversion Rate</label>
                    <input type="text" className="form-input" value={formData.diversion} onChange={(e) => setFormData({...formData, diversion: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="inactive">Inactive</option>
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
      {showViewModal && viewingProgram && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Programme Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Recycle size={28} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingProgram.name}</h4>
                    <span className={`status ${getStatusBadge(viewingProgram.status)}`}>{viewingProgram.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Materials</p>
                    <p className="font-semibold">{viewingProgram.materials}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Households Reached</p>
                    <p className="font-semibold">{viewingProgram.households}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Diversion Rate</p>
                    <p className="font-semibold text-emerald-600">{viewingProgram.diversion}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingProgram); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecyclingManagement;
