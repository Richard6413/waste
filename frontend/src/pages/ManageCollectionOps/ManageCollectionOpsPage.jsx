// src/pages/ManageCollectionOps/ManageCollectionOpsPage.jsx
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, Save, MapPin, Truck, User, Clock, CheckCircle, XCircle } from 'lucide-react';

const ManageCollectionOpsPage = () => {
  const [collections, setCollections] = useState([
    { id: 1, route: 'Colombo North A', truck: 'UG-12', driver: 'Kasun Perera', stops: 42, completed: 28, status: 'in-progress', startTime: '08:00', eta: '12:30' },
    { id: 2, route: 'Kandy East loop', truck: 'UG-07', driver: 'Mary Silva', stops: 31, completed: 31, status: 'completed', startTime: '08:00', eta: 'Completed' },
    { id: 3, route: 'Galle Fort sweep', truck: 'UG-19', driver: 'N. Fernando', stops: 28, completed: 11, status: 'in-progress', startTime: '09:00', eta: '14:00' },
    { id: 4, route: 'Battaramulla residential', truck: 'UG-03', driver: 'I. Jayasuriya', stops: 55, completed: 6, status: 'in-progress', startTime: '08:30', eta: '16:00' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingCollection, setViewingCollection] = useState(null);
  const [formData, setFormData] = useState({
    route: '',
    truck: '',
    driver: '',
    stops: '',
    startTime: '',
    status: 'planned'
  });

  const filteredCollections = collections.filter(c =>
    c.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.truck.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ route: '', truck: '', driver: '', stops: '', startTime: '', status: 'planned' });
    setShowModal(true);
  };

  const handleEdit = (collection) => {
    setEditingId(collection.id);
    setFormData({
      route: collection.route,
      truck: collection.truck,
      driver: collection.driver,
      stops: collection.stops,
      startTime: collection.startTime,
      status: collection.status
    });
    setShowModal(true);
  };

  const handleView = (collection) => {
    setViewingCollection(collection);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      setCollections(collections.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setCollections(collections.map(c => c.id === editingId ? {
        ...c,
        ...formData,
        stops: parseInt(formData.stops) || 0,
        completed: c.completed
      } : c));
    } else {
      const newId = Math.max(...collections.map(c => c.id)) + 1;
      setCollections([...collections, {
        id: newId,
        ...formData,
        stops: parseInt(formData.stops) || 0,
        completed: 0,
        eta: 'TBD'
      }]);
    }
    setShowModal(false);
  };

  const handleComplete = (id) => {
    setCollections(collections.map(c => c.id === id ? { ...c, status: 'completed', completed: c.stops, eta: 'Completed' } : c));
  };

  const getStatusBadge = (status) => {
    const colors = {
      'in-progress': 'status-warning',
      completed: 'status-success',
      planned: 'status-info',
      cancelled: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Manage Collection Ops</h1>
          <p className="page-description">Create and manage collection operations</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Create Collection</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Truck size={14} />Total</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />In Progress</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.filter(c => c.status === 'in-progress').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.filter(c => c.status === 'completed').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><MapPin size={14} className="text-blue-500" />Total Stops</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{collections.reduce((s, c) => s + c.stops, 0)}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search collections..."
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
                <th>Route</th>
                <th>Truck</th>
                <th>Driver</th>
                <th>Progress</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollections.map((collection) => (
                <tr key={collection.id}>
                  <td className="font-semibold">{collection.route}</td>
                  <td>{collection.truck}</td>
                  <td>{collection.driver}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(collection.completed / collection.stops) * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{collection.completed}/{collection.stops}</span>
                    </div>
                  </td>
                  <td><span className={`status ${getStatusBadge(collection.status)}`}>{collection.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(collection)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(collection)} title="Edit"><Edit size={16} /></button>
                      {collection.status === 'in-progress' && (
                        <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500 transition-colors" onClick={() => handleComplete(collection.id)} title="Complete"><CheckCircle size={16} /></button>
                      )}
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(collection.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCollections.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No collections found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Collection' : 'Create New Collection'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Route Name</label>
                  <input type="text" className="form-input" value={formData.route} onChange={(e) => setFormData({...formData, route: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Truck</label>
                    <input type="text" className="form-input" value={formData.truck} onChange={(e) => setFormData({...formData, truck: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Driver</label>
                    <input type="text" className="form-input" value={formData.driver} onChange={(e) => setFormData({...formData, driver: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Number of Stops</label>
                    <input type="number" className="form-input" value={formData.stops} onChange={(e) => setFormData({...formData, stops: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input type="time" className="form-input" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
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
      {showViewModal && viewingCollection && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Collection Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Route</p>
                    <p className="font-semibold">{viewingCollection.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(viewingCollection.status)}`}>{viewingCollection.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Truck</p>
                    <p className="font-semibold">{viewingCollection.truck}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Driver</p>
                    <p className="font-semibold">{viewingCollection.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Stops</p>
                    <p className="font-semibold">{viewingCollection.completed}/{viewingCollection.stops}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">ETA</p>
                    <p className="font-semibold">{viewingCollection.eta}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(viewingCollection.completed / viewingCollection.stops) * 100}%` }} />
                    </div>
                    <span className="text-sm font-semibold">{Math.round((viewingCollection.completed / viewingCollection.stops) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingCollection); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCollectionOpsPage;
