// src/pages/Sustainability/GreenInitiatives.jsx
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, Save, Leaf, Users, Calendar, TrendingUp } from 'lucide-react';

const GreenInitiatives = () => {
  const [initiatives, setInitiatives] = useState([
    { id: 1, name: 'Community Composting Program', description: 'Teaching communities to compost organic waste', participants: 250, status: 'active', startDate: '2024-01-01', impact: '500 kg/month diverted' },
    { id: 2, name: 'School Recycling Education', description: 'Educating students about recycling practices', participants: 1200, status: 'active', startDate: '2024-02-01', impact: '200 kg/month recycled' },
    { id: 3, name: 'Plastic-Free Markets', description: 'Reducing single-use plastics in local markets', participants: 80, status: 'active', startDate: '2024-03-01', impact: '1000 plastic bags saved/month' },
    { id: 4, name: 'Tree Planting Drive', description: 'Planting trees in urban areas', participants: 500, status: 'completed', startDate: '2023-12-01', impact: '500 trees planted' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingInitiative, setViewingInitiative] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    participants: '',
    status: 'active',
    startDate: '',
    impact: ''
  });

  const filteredInitiatives = initiatives.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', participants: '', status: 'active', startDate: '', impact: '' });
    setShowModal(true);
  };

  const handleEdit = (initiative) => {
    setEditingId(initiative.id);
    setFormData({
      name: initiative.name,
      description: initiative.description,
      participants: initiative.participants,
      status: initiative.status,
      startDate: initiative.startDate,
      impact: initiative.impact
    });
    setShowModal(true);
  };

  const handleView = (initiative) => {
    setViewingInitiative(initiative);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this initiative?')) {
      setInitiatives(initiatives.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setInitiatives(initiatives.map(i => i.id === editingId ? { ...i, ...formData, participants: parseInt(formData.participants) || 0 } : i));
    } else {
      const newId = Math.max(...initiatives.map(i => i.id)) + 1;
      setInitiatives([...initiatives, { id: newId, ...formData, participants: parseInt(formData.participants) || 0 }]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'status-success',
      completed: 'status-info',
      paused: 'status-warning'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUSTAINABILITY</div>
          <h1 className="page-title">Green Initiatives</h1>
          <p className="page-description">Environmental programs and community initiatives</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Initiative</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Leaf size={14} />Total Initiatives</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{initiatives.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Leaf size={14} className="text-emerald-500" />Active</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{initiatives.filter(i => i.status === 'active').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Users size={14} className="text-blue-500" />Participants</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{initiatives.reduce((s, i) => s + i.participants, 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><TrendingUp size={14} className="text-purple-500" />Impact</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{initiatives.length} programs</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search initiatives..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInitiatives.map((initiative) => (
          <div key={initiative.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Leaf size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{initiative.name}</h3>
                  <span className={`status ${getStatusBadge(initiative.status)}`}>{initiative.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(initiative)} title="View"><Eye size={16} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(initiative)} title="Edit"><Edit size={16} /></button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(initiative.id)} title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">{initiative.description}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Users size={12} />{initiative.participants} participants</span>
              <span className="flex items-center gap-1"><Calendar size={12} />{initiative.startDate}</span>
            </div>
            <div className="mt-3 p-2 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700"><strong>Impact:</strong> {initiative.impact}</p>
            </div>
          </div>
        ))}
        {filteredInitiatives.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-500">
            <Leaf size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No initiatives found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Initiative' : 'Add New Initiative'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Initiative Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Participants</label>
                    <input type="number" className="form-input" value={formData.participants} onChange={(e) => setFormData({...formData, participants: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input type="date" className="form-input" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Impact</label>
                  <input type="text" className="form-input" value={formData.impact} onChange={(e) => setFormData({...formData, impact: e.target.value})} />
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
      {showViewModal && viewingInitiative && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Initiative Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Leaf size={28} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingInitiative.name}</h4>
                    <span className={`status ${getStatusBadge(viewingInitiative.status)}`}>{viewingInitiative.status}</span>
                  </div>
                </div>
                <p className="text-slate-600">{viewingInitiative.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Participants</p>
                    <p className="font-semibold">{viewingInitiative.participants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Start Date</p>
                    <p className="font-semibold">{viewingInitiative.startDate}</p>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-sm text-emerald-700"><strong>Impact:</strong> {viewingInitiative.impact}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingInitiative); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenInitiatives;
