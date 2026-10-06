// src/pages/Fleet/VehicleList.jsx
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, Save, Truck, Fuel, Wrench } from 'lucide-react';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: 'UG-12', model: 'Isuzu NPR', capacity: '5 tons', status: 'active', driver: 'Kasun Perera', fuel: 75, lastService: '2024-01-10' },
    { id: 2, plate: 'UG-07', model: 'Hino 500', capacity: '3 tons', status: 'active', driver: 'Mary Silva', fuel: 60, lastService: '2024-01-08' },
    { id: 3, plate: 'UG-19', model: 'Tata LPT', capacity: '7 tons', status: 'maintenance', driver: 'N. Fernando', fuel: 30, lastService: '2023-12-15' },
    { id: 4, plate: 'UG-03', model: 'Mitsubishi Fuso', capacity: '4 tons', status: 'active', driver: 'I. Jayasuriya', fuel: 85, lastService: '2024-01-12' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingVehicle, setViewingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    capacity: '',
    status: 'active',
    driver: '',
    fuel: 100
  });

  const filteredVehicles = vehicles.filter(v =>
    v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ plate: '', model: '', capacity: '', status: 'active', driver: '', fuel: 100 });
    setShowModal(true);
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);
    setFormData({
      plate: vehicle.plate,
      model: vehicle.model,
      capacity: vehicle.capacity,
      status: vehicle.status,
      driver: vehicle.driver,
      fuel: vehicle.fuel
    });
    setShowModal(true);
  };

  const handleView = (vehicle) => {
    setViewingVehicle(vehicle);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setVehicles(vehicles.map(v => v.id === editingId ? { ...v, ...formData } : v));
    } else {
      const newId = Math.max(...vehicles.map(v => v.id)) + 1;
      setVehicles([...vehicles, { id: newId, lastService: new Date().toISOString().split('T')[0], ...formData }]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'status-success',
      maintenance: 'status-warning',
      inactive: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">FLEET</div>
          <h1 className="page-title">Vehicles</h1>
          <p className="page-description">Manage fleet vehicles and assignments</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Vehicle</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search vehicles..."
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
                <th>Plate</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Driver</th>
                <th>Fuel</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="font-mono text-xs font-semibold">{vehicle.plate}</td>
                  <td className="font-semibold">{vehicle.model}</td>
                  <td>{vehicle.capacity}</td>
                  <td>{vehicle.driver}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${vehicle.fuel > 50 ? 'bg-emerald-500' : vehicle.fuel > 20 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${vehicle.fuel}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{vehicle.fuel}%</span>
                    </div>
                  </td>
                  <td><span className={`status ${getStatusBadge(vehicle.status)}`}>{vehicle.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(vehicle)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(vehicle)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(vehicle.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">No vehicles found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Plate Number</label>
                    <input type="text" className="form-input" value={formData.plate} onChange={(e) => setFormData({...formData, plate: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Model</label>
                    <input type="text" className="form-input" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Capacity</label>
                    <input type="text" className="form-input" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assigned Driver</label>
                    <input type="text" className="form-input" value={formData.driver} onChange={(e) => setFormData({...formData, driver: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fuel Level (%)</label>
                    <input type="number" min="0" max="100" className="form-input" value={formData.fuel} onChange={(e) => setFormData({...formData, fuel: parseInt(e.target.value) || 0})} />
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
      {showViewModal && viewingVehicle && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Vehicle Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Truck size={28} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingVehicle.plate}</h4>
                    <p className="text-slate-500">{viewingVehicle.model}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Capacity</p>
                    <p className="font-semibold">{viewingVehicle.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(viewingVehicle.status)}`}>{viewingVehicle.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Driver</p>
                    <p className="font-semibold">{viewingVehicle.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Fuel Level</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${viewingVehicle.fuel > 50 ? 'bg-emerald-500' : viewingVehicle.fuel > 20 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${viewingVehicle.fuel}%` }} />
                      </div>
                      <span className="text-sm font-semibold">{viewingVehicle.fuel}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Last Service</p>
                    <p className="font-semibold">{viewingVehicle.lastService}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingVehicle); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
