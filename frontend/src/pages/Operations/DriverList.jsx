// src/pages/Operations/DriverList.jsx
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X, Save, User, Phone, Truck } from 'lucide-react';

const DriverList = () => {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Kasun Perera', phone: '+94 77 123 4567', license: 'B1234567', truck: 'UG-12', status: 'active', trips: 45 },
    { id: 2, name: 'Mary Silva', phone: '+94 77 234 5678', license: 'B7654321', truck: 'UG-07', status: 'active', trips: 38 },
    { id: 3, name: 'N. Fernando', phone: '+94 77 345 6789', license: 'B1122334', truck: 'UG-19', status: 'on-leave', trips: 22 },
    { id: 4, name: 'I. Jayasuriya', phone: '+94 77 456 7890', license: 'B5566778', truck: 'UG-03', status: 'active', trips: 51 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingDriver, setViewingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    license: '',
    truck: '',
    status: 'active'
  });

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', phone: '', license: '', truck: '', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (driver) => {
    setEditingId(driver.id);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      license: driver.license,
      truck: driver.truck,
      status: driver.status
    });
    setShowModal(true);
  };

  const handleView = (driver) => {
    setViewingDriver(driver);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setDrivers(drivers.map(d => d.id === editingId ? { ...d, ...formData } : d));
    } else {
      const newId = Math.max(...drivers.map(d => d.id)) + 1;
      setDrivers([...drivers, { id: newId, trips: 0, ...formData }]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'status-success',
      'on-leave': 'status-warning',
      inactive: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Drivers</h1>
          <p className="page-description">Manage driver assignments and status</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Driver</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search drivers..."
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
                <th>Name</th>
                <th>Phone</th>
                <th>License</th>
                <th>Assigned Truck</th>
                <th>Trips</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <User size={14} className="text-emerald-600" />
                      </div>
                      {driver.name}
                    </div>
                  </td>
                  <td className="text-sm text-slate-600">{driver.phone}</td>
                  <td className="font-mono text-xs">{driver.license}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Truck size={14} className="text-slate-400" />
                      {driver.truck}
                    </div>
                  </td>
                  <td className="font-semibold">{driver.trips}</td>
                  <td><span className={`status ${getStatusBadge(driver.status)}`}>{driver.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(driver)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(driver)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(driver.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDrivers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">No drivers found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Driver' : 'Add New Driver'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">License Number</label>
                    <input type="text" className="form-input" value={formData.license} onChange={(e) => setFormData({...formData, license: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Assigned Truck</label>
                    <input type="text" className="form-input" value={formData.truck} onChange={(e) => setFormData({...formData, truck: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="inactive">Inactive</option>
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
      {showViewModal && viewingDriver && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Driver Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User size={28} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingDriver.name}</h4>
                    <span className={`status ${getStatusBadge(viewingDriver.status)}`}>{viewingDriver.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{viewingDriver.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">License</p>
                    <p className="font-semibold font-mono">{viewingDriver.license}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Assigned Truck</p>
                    <p className="font-semibold">{viewingDriver.truck}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Trips</p>
                    <p className="font-semibold">{viewingDriver.trips}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingDriver); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverList;
