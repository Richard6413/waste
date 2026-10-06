// src/pages/Operations/RoutesList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, X, Save, MapPin } from 'lucide-react';

const RoutesList = () => {
  const [routes, setRoutes] = useState([
    { id: 'RT-N1', name: 'Colombo North A', truck: 'UG-12', driver: 'Kasun Perera', stops: 42, progress: 68, status: 'active' },
    { id: 'RT-E2', name: 'Kandy East loop', truck: 'UG-07', driver: 'Mary Silva', stops: 31, progress: 100, status: 'completed' },
    { id: 'RT-W3', name: 'Galle Fort sweep', truck: 'UG-19', driver: 'N. Fernando', stops: 28, progress: 40, status: 'delayed' },
    { id: 'RT-S4', name: 'Battaramulla residential', truck: 'UG-03', driver: 'I. Jayasuriya', stops: 55, progress: 12, status: 'planned' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingRoute, setViewingRoute] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    truck: '',
    driver: '',
    stops: '',
    status: 'planned'
  });

  const filteredRoutes = routes.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', truck: '', driver: '', stops: '', status: 'planned' });
    setShowModal(true);
  };

  const handleEdit = (route) => {
    setEditingId(route.id);
    setFormData({
      name: route.name,
      truck: route.truck,
      driver: route.driver,
      stops: route.stops,
      status: route.status
    });
    setShowModal(true);
  };

  const handleView = (route) => {
    setViewingRoute(route);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setRoutes(routes.map(r => r.id === editingId ? {
        ...r,
        ...formData,
        stops: parseInt(formData.stops) || 0,
        progress: r.progress
      } : r));
    } else {
      const newId = `RT-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9) + 1}`;
      setRoutes([...routes, {
        id: newId,
        ...formData,
        stops: parseInt(formData.stops) || 0,
        progress: 0
      }]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'status-success',
      completed: 'status-success',
      delayed: 'status-danger',
      planned: 'status-warning'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Collection routes</h1>
          <p className="page-description">Today's planned and in-progress routes</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Create Route</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search routes..."
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
                <th>Stops</th>
                <th>Progress</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to={`/ops/routes/${r.id}`}>{r.name}</Link>
                    <div className="text-xs font-mono text-slate-400">{r.id}</div>
                  </td>
                  <td>{r.truck}</td>
                  <td>{r.driver}</td>
                  <td>{r.stops}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${r.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{r.progress}%</span>
                    </div>
                  </td>
                  <td><span className={`status ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(r)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(r)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(r.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">No routes found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Route' : 'Create New Route'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Route Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
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
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="delayed">Delayed</option>
                    </select>
                  </div>
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
      {showViewModal && viewingRoute && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Route Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Route ID</p>
                    <p className="font-semibold">{viewingRoute.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold">{viewingRoute.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Truck</p>
                    <p className="font-semibold">{viewingRoute.truck}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Driver</p>
                    <p className="font-semibold">{viewingRoute.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Stops</p>
                    <p className="font-semibold">{viewingRoute.stops}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(viewingRoute.status)}`}>{viewingRoute.status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${viewingRoute.progress}%` }} />
                    </div>
                    <span className="text-sm font-semibold">{viewingRoute.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingRoute); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesList;
