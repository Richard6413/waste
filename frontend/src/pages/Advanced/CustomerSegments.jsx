// src/pages/Advanced/CustomerSegments.jsx
import { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Eye, X, Save, User, MapPin, CreditCard, TrendingUp } from 'lucide-react';

const CustomerSegments = () => {
  const [segments, setSegments] = useState([
    { id: 1, name: 'High-Value Residential', description: 'Premium plan households with high engagement', count: 245, avgBalance: 3500, retention: 95 },
    { id: 2, name: 'Standard Residential', description: 'Standard plan households', count: 1250, avgBalance: 1200, retention: 88 },
    { id: 3, name: 'Commercial', description: 'Business and commercial accounts', count: 85, avgBalance: 8500, retention: 92 },
    { id: 4, name: 'At-Risk', description: 'Accounts with overdue payments', count: 32, avgBalance: 4800, retention: 65 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingSegment, setViewingSegment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    criteria: ''
  });

  const filteredSegments = segments.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', criteria: '' });
    setShowModal(true);
  };

  const handleEdit = (segment) => {
    setEditingId(segment.id);
    setFormData({
      name: segment.name,
      description: segment.description,
      criteria: segment.description
    });
    setShowModal(true);
  };

  const handleView = (segment) => {
    setViewingSegment(segment);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this segment?')) {
      setSegments(segments.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setSegments(segments.map(s => s.id === editingId ? { ...s, ...formData } : s));
    } else {
      const newId = Math.max(...segments.map(s => s.id)) + 1;
      setSegments([...segments, { id: newId, count: 0, avgBalance: 0, retention: 0, ...formData }]);
    }
    setShowModal(false);
  };

  const getRetentionColor = (retention) => {
    if (retention >= 90) return 'text-emerald-600';
    if (retention >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADVANCED</div>
          <h1 className="page-title">Customer Segments</h1>
          <p className="page-description">Manage customer segmentation and targeting</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Segment</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search segments..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSegments.map((segment) => (
          <div key={segment.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users size={18} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{segment.name}</h3>
                  <p className="text-sm text-slate-500">{segment.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(segment)} title="View"><Eye size={16} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(segment)} title="Edit"><Edit size={16} /></button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(segment.id)} title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-center">
                <p className="text-lg font-bold text-slate-900">{segment.count}</p>
                <p className="text-xs text-slate-500">Customers</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg text-center">
                <p className="text-lg font-bold text-slate-900">LKR {segment.avgBalance.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Avg Balance</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg text-center">
                <p className={`text-lg font-bold ${getRetentionColor(segment.retention)}`}>{segment.retention}%</p>
                <p className="text-xs text-slate-500">Retention</p>
              </div>
            </div>
          </div>
        ))}
        {filteredSegments.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-500">
            <Users size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No segments found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Segment' : 'Add New Segment'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Segment Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Criteria</label>
                  <textarea className="form-textarea" value={formData.criteria} onChange={(e) => setFormData({...formData, criteria: e.target.value})} />
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
      {showViewModal && viewingSegment && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Segment Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Users size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingSegment.name}</h4>
                    <p className="text-slate-500">{viewingSegment.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <p className="text-2xl font-bold">{viewingSegment.count}</p>
                    <p className="text-sm text-slate-500">Customers</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <p className="text-2xl font-bold">LKR {viewingSegment.avgBalance.toLocaleString()}</p>
                    <p className="text-sm text-slate-500">Avg Balance</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-center">
                    <p className={`text-2xl font-bold ${getRetentionColor(viewingSegment.retention)}`}>{viewingSegment.retention}%</p>
                    <p className="text-sm text-slate-500">Retention</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingSegment); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSegments;
