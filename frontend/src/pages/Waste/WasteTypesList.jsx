// src/pages/Waste/WasteTypesList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Scale, Plus, Search, Edit, Trash2, Eye, X, Save } from 'lucide-react';

const WasteTypesList = () => {
  const [types, setTypes] = useState([
    { id: 1, name: 'Mixed residual', fee: 'LKR 450 / household', handling: 'Landfill / RDF', color: 'bg-slate-800' },
    { id: 2, name: 'Recyclable', fee: 'LKR 0 (source-separated)', handling: 'MRF sorting', color: 'bg-emerald-600' },
    { id: 3, name: 'Organic', fee: 'LKR 120', handling: 'Compost hub', color: 'bg-lime-600' },
    { id: 4, name: 'Hazardous', fee: 'Special booking', handling: 'Licensed contractor', color: 'bg-red-600' },
    { id: 5, name: 'E-waste', fee: 'Drop-off only', handling: 'WEEE partner', color: 'bg-indigo-600' },
    { id: 6, name: 'Bulky', fee: 'LKR 1,500 + tax', handling: 'Special collection', color: 'bg-amber-600' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingType, setViewingType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fee: '',
    handling: '',
    color: 'bg-slate-800'
  });

  const filteredTypes = types.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.handling.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', fee: '', handling: '', color: 'bg-slate-800' });
    setShowModal(true);
  };

  const handleEdit = (type) => {
    setEditingId(type.id);
    setFormData({
      name: type.name,
      fee: type.fee,
      handling: type.handling,
      color: type.color
    });
    setShowModal(true);
  };

  const handleView = (type) => {
    setViewingType(type);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this waste type?')) {
      setTypes(types.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setTypes(types.map(t => t.id === editingId ? { ...t, ...formData } : t));
    } else {
      const newId = Math.max(...types.map(t => t.id)) + 1;
      setTypes([...types, { id: newId, ...formData }]);
    }
    setShowModal(false);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE</div>
          <h1 className="page-title">Waste types</h1>
          <p className="page-description">How JEMAK classifies, prices, and processes each stream</p>
        </div>
        <div className="command-bar">
          <Link to="/waste/drop-off" className="btn btn-secondary">Drop-off centres</Link>
          <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Waste Type</button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search waste types..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTypes.map((t) => (
          <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4">
            <div className={`h-10 w-10 rounded-xl ${t.color} text-white flex items-center justify-center flex-shrink-0`}>
              <Recycle size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{t.name}</h3>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(t)} title="View"><Eye size={16} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(t)} title="Edit"><Edit size={16} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(t.id)} title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                <Scale size={14} />{t.fee}
              </p>
              <p className="text-xs text-slate-400 mt-1">{t.handling}</p>
            </div>
          </div>
        ))}
        {filteredTypes.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-500">
            <Recycle size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No waste types found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Waste Type' : 'Add New Waste Type'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Waste Type Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Fee</label>
                  <input type="text" className="form-input" value={formData.fee} onChange={(e) => setFormData({...formData, fee: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Handling Method</label>
                  <input type="text" className="form-input" value={formData.handling} onChange={(e) => setFormData({...formData, handling: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Color</label>
                  <select className="form-select" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})}>
                    <option value="bg-slate-800">Dark</option>
                    <option value="bg-emerald-600">Green</option>
                    <option value="bg-lime-600">Lime</option>
                    <option value="bg-red-600">Red</option>
                    <option value="bg-indigo-600">Indigo</option>
                    <option value="bg-amber-600">Amber</option>
                    <option value="bg-blue-600">Blue</option>
                    <option value="bg-purple-600">Purple</option>
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
      {showViewModal && viewingType && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Waste Type Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`h-16 w-16 rounded-xl ${viewingType.color} text-white flex items-center justify-center`}>
                    <Recycle size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingType.name}</h4>
                    <p className="text-slate-500">{viewingType.handling}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Fee</p>
                    <p className="font-semibold">{viewingType.fee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Handling</p>
                    <p className="font-semibold">{viewingType.handling}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingType); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteTypesList;
