// src/pages/Waste/WasteRecords.jsx
import { useState } from 'react';
import { Plus, Search, Eye, Trash2, X, Save, Download, Package, Calendar, MapPin } from 'lucide-react';

const WasteRecords = () => {
  const [records, setRecords] = useState([
    { id: 'WR-001', household: 'N. Perera', type: 'Mixed Waste', weight: 32.5, date: '2024-01-15', location: 'Colombo 07', status: 'completed' },
    { id: 'WR-002', household: 'A. Fernando', type: 'Recyclable', weight: 28.0, date: '2024-01-15', location: 'Kadawatha', status: 'completed' },
    { id: 'WR-003', household: 'S. Jayawardena', type: 'Organic', weight: 42.8, date: '2024-01-14', location: 'Battaramulla', status: 'completed' },
    { id: 'WR-004', household: 'M. Silva', type: 'Hazardous', weight: 15.2, date: '2024-01-14', location: 'Colombo 03', status: 'pending' },
    { id: 'WR-005', household: 'K. Fernando', type: 'E-waste', weight: 8.5, date: '2024-01-13', location: 'Kandy', status: 'completed' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [formData, setFormData] = useState({
    household: '',
    type: 'Mixed Waste',
    weight: '',
    location: '',
    date: ''
  });

  const filteredRecords = records.filter(r =>
    r.household.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setFormData({ household: '', type: 'Mixed Waste', weight: '', location: '', date: '' });
    setShowModal(true);
  };

  const handleView = (record) => {
    setViewingRecord(record);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    const newId = `WR-${String(records.length + 1).padStart(3, '0')}`;
    setRecords([...records, {
      id: newId,
      ...formData,
      weight: parseFloat(formData.weight) || 0,
      status: 'pending'
    }]);
    setShowModal(false);
  };

  const handleExport = () => {
    const csv = [
      ['Record ID', 'Household', 'Type', 'Weight', 'Date', 'Location', 'Status'],
      ...filteredRecords.map(r => [r.id, r.household, r.type, r.weight, r.date, r.location, r.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waste-records.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalWeight = filteredRecords.reduce((sum, r) => sum + r.weight, 0);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE</div>
          <h1 className="page-title">Waste Records</h1>
          <p className="page-description">Complete history of waste collection records</p>
        </div>
        <div className="command-bar">
          <button className="btn btn-secondary" onClick={handleExport}><Download size={16} />Export</button>
          <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Record</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} />Total Records</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{filteredRecords.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} className="text-blue-500" />Total Weight</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{totalWeight.toFixed(1)} kg</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} className="text-emerald-500" />Completed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{filteredRecords.filter(r => r.status === 'completed').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} className="text-amber-500" />Pending</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{filteredRecords.filter(r => r.status === 'pending').length}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search records..."
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
                <th>Record ID</th>
                <th>Household</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td><span className="font-mono text-xs font-semibold text-slate-600">{record.id}</span></td>
                  <td className="font-semibold">{record.household}</td>
                  <td>{record.type}</td>
                  <td className="font-semibold">{record.weight} kg</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {record.location}
                    </div>
                  </td>
                  <td className="text-sm text-slate-600">{record.date}</td>
                  <td>
                    <span className={`status ${record.status === 'completed' ? 'status-success' : 'status-warning'}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(record)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(record.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">No waste records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Add Waste Record</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Household</label>
                  <input type="text" className="form-input" value={formData.household} onChange={(e) => setFormData({...formData, household: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Waste Type</label>
                    <select className="form-select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option>Mixed Waste</option>
                      <option>Recyclable</option>
                      <option>Organic</option>
                      <option>Hazardous</option>
                      <option>E-waste</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input type="number" className="form-input" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />Save Record</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingRecord && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Waste Record Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Record ID</p>
                    <p className="font-semibold">{viewingRecord.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${viewingRecord.status === 'completed' ? 'status-success' : 'status-warning'}`}>{viewingRecord.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Household</p>
                    <p className="font-semibold">{viewingRecord.household}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Type</p>
                    <p className="font-semibold">{viewingRecord.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Weight</p>
                    <p className="font-semibold">{viewingRecord.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-semibold">{viewingRecord.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold">{viewingRecord.date}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteRecords;
