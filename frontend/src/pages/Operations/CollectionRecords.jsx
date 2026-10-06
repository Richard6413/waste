// src/pages/Operations/CollectionRecords.jsx
import { useState } from 'react';
import { 
  Search, Filter, Plus, Download, 
  Calendar, Truck, User, Package,
  ChevronDown, Eye, Edit, Trash2,
  CheckCircle, XCircle, Clock, AlertTriangle,
  X, Save
} from 'lucide-react';

const CollectionRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [collections, setCollections] = useState([
    {
      id: 1,
      collectionId: 'COL-2024-001',
      household: 'John Doe',
      address: '123 Main St',
      region: 'North',
      wasteType: 'Mixed Waste',
      weight: 32.5,
      status: 'completed',
      driver: 'John Kamau',
      vehicle: 'Truck #001',
      date: '2024-01-15',
      time: '08:30 AM',
      notes: 'Regular collection'
    },
    {
      id: 2,
      collectionId: 'COL-2024-002',
      household: 'Jane Smith',
      address: '456 Oak Ave',
      region: 'East',
      wasteType: 'Recyclable',
      weight: 28.0,
      status: 'verified',
      driver: 'Mary Wanjiru',
      vehicle: 'Truck #003',
      date: '2024-01-15',
      time: '09:15 AM',
      notes: 'Recyclable materials separated'
    },
    {
      id: 3,
      collectionId: 'COL-2024-003',
      household: 'Bob Johnson',
      address: '789 Pine Rd',
      region: 'West',
      wasteType: 'Hazardous',
      weight: 15.2,
      status: 'pending',
      driver: 'Peter Ochieng',
      vehicle: 'Truck #005',
      date: '2024-01-15',
      time: '10:00 AM',
      notes: 'Special handling required'
    },
    {
      id: 4,
      collectionId: 'COL-2024-004',
      household: 'Alice Brown',
      address: '101 Elm St',
      region: 'South',
      wasteType: 'Organic',
      weight: 42.8,
      status: 'failed',
      driver: 'Grace Akinyi',
      vehicle: 'Truck #007',
      date: '2024-01-14',
      time: '11:30 AM',
      notes: 'Access blocked - rescheduled'
    },
    {
      id: 5,
      collectionId: 'COL-2024-005',
      household: 'Charlie Wilson',
      address: '202 Maple Dr',
      region: 'North',
      wasteType: 'Mixed Waste',
      weight: 23.4,
      status: 'completed',
      driver: 'John Kamau',
      vehicle: 'Truck #001',
      date: '2024-01-14',
      time: '02:15 PM',
      notes: ''
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingCollection, setViewingCollection] = useState(null);
  const [formData, setFormData] = useState({
    household: '',
    address: '',
    region: 'North',
    wasteType: 'Mixed Waste',
    weight: '',
    status: 'pending',
    driver: '',
    vehicle: '',
    notes: ''
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: 'status-success',
      verified: 'status-success',
      pending: 'status-warning',
      failed: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircle size={14} />,
      verified: <CheckCircle size={14} />,
      pending: <Clock size={14} />,
      failed: <XCircle size={14} />
    };
    return icons[status] || <AlertTriangle size={14} />;
  };

  const filteredCollections = collections.filter(c => {
    const matchesSearch = c.collectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.household.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesDate = !filterDate || c.date === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalCollections = filteredCollections.length;
  const completedCount = filteredCollections.filter(c => c.status === 'completed' || c.status === 'verified').length;
  const pendingCount = filteredCollections.filter(c => c.status === 'pending').length;
  const totalWeight = filteredCollections.reduce((sum, c) => sum + c.weight, 0);

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      household: '',
      address: '',
      region: 'North',
      wasteType: 'Mixed Waste',
      weight: '',
      status: 'pending',
      driver: '',
      vehicle: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEdit = (collection) => {
    setEditingId(collection.id);
    setFormData({
      household: collection.household,
      address: collection.address,
      region: collection.region,
      wasteType: collection.wasteType,
      weight: collection.weight,
      status: collection.status,
      driver: collection.driver,
      vehicle: collection.vehicle,
      notes: collection.notes
    });
    setShowModal(true);
  };

  const handleView = (collection) => {
    setViewingCollection(collection);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collection record?')) {
      setCollections(collections.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setCollections(collections.map(c => c.id === editingId ? {
        ...c,
        ...formData,
        weight: parseFloat(formData.weight) || 0
      } : c));
    } else {
      const newId = Math.max(...collections.map(c => c.id)) + 1;
      const newCollection = {
        id: newId,
        collectionId: `COL-2024-${String(newId).padStart(3, '0')}`,
        ...formData,
        weight: parseFloat(formData.weight) || 0,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setCollections([...collections, newCollection]);
    }
    setShowModal(false);
  };

  const handleExport = () => {
    const csv = [
      ['Collection ID', 'Household', 'Address', 'Waste Type', 'Weight', 'Status', 'Driver', 'Date'],
      ...filteredCollections.map(c => [c.collectionId, c.household, c.address, c.wasteType, c.weight, c.status, c.driver, c.date])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collection-records.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Collection Records</h1>
          <p className="page-description">Complete history of all waste collections across the network</p>
        </div>
        <div className="command-bar">
          <button className="btn btn-secondary" onClick={handleExport}><Download size={16} />Export</button>
          <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Log Collection</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} />Total Collections</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{totalCollections}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{completedCount}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Pending</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{pendingCount}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} className="text-blue-500" />Total Weight</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{totalWeight.toFixed(1)} kg</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by ID, household, or address..." className="input pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <select className="select min-w-[140px] appearance-none pr-10" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <input type="date" className="select min-w-[160px]" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
          </div>
          <button className="btn btn-secondary" onClick={() => { setSearchTerm(''); setFilterStatus('all'); setFilterDate(''); }}><Filter size={16} />Clear Filters</button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Collection ID</th>
                <th>Household</th>
                <th>Address</th>
                <th>Waste Type</th>
                <th className="text-center">Weight</th>
                <th>Driver</th>
                <th>Date/Time</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollections.map((collection) => (
                <tr key={collection.id} className="slide-up">
                  <td><span className="font-mono text-xs font-semibold text-slate-600">{collection.collectionId}</span></td>
                  <td>{collection.household}</td>
                  <td className="text-sm">{collection.address}</td>
                  <td>{collection.wasteType}</td>
                  <td className="text-center font-medium">{collection.weight} kg</td>
                  <td>{collection.driver}</td>
                  <td>
                    <div className="text-sm">{collection.date}</div>
                    <div className="text-xs text-slate-400">{collection.time}</div>
                  </td>
                  <td>
                    <span className={`status ${getStatusColor(collection.status)}`}>
                      {getStatusIcon(collection.status)}
                      {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(collection)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(collection)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(collection.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCollections.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-slate-500">No collection records found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Collection' : 'Log New Collection'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Household</label>
                  <input type="text" className="form-input" value={formData.household} onChange={(e) => setFormData({...formData, household: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-input" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Region</label>
                  <select className="form-select" value={formData.region} onChange={(e) => setFormData({...formData, region: e.target.value})}>
                    <option>North</option>
                    <option>East</option>
                    <option>West</option>
                    <option>South</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Waste Type</label>
                  <select className="form-select" value={formData.wasteType} onChange={(e) => setFormData({...formData, wasteType: e.target.value})}>
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
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="verified">Verified</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Driver</label>
                  <input type="text" className="form-input" value={formData.driver} onChange={(e) => setFormData({...formData, driver: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Vehicle</label>
                  <input type="text" className="form-input" value={formData.vehicle} onChange={(e) => setFormData({...formData, vehicle: e.target.value})} />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Notes</label>
                  <textarea className="form-textarea" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />{editingId ? 'Update' : 'Save'}</button>
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
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-slate-500">Collection ID</p><p className="font-semibold">{viewingCollection.collectionId}</p></div>
                <div><p className="text-sm text-slate-500">Status</p><span className={`status ${getStatusColor(viewingCollection.status)}`}>{viewingCollection.status}</span></div>
                <div><p className="text-sm text-slate-500">Household</p><p className="font-semibold">{viewingCollection.household}</p></div>
                <div><p className="text-sm text-slate-500">Address</p><p className="font-semibold">{viewingCollection.address}</p></div>
                <div><p className="text-sm text-slate-500">Region</p><p className="font-semibold">{viewingCollection.region}</p></div>
                <div><p className="text-sm text-slate-500">Waste Type</p><p className="font-semibold">{viewingCollection.wasteType}</p></div>
                <div><p className="text-sm text-slate-500">Weight</p><p className="font-semibold">{viewingCollection.weight} kg</p></div>
                <div><p className="text-sm text-slate-500">Driver</p><p className="font-semibold">{viewingCollection.driver}</p></div>
                <div><p className="text-sm text-slate-500">Vehicle</p><p className="font-semibold">{viewingCollection.vehicle}</p></div>
                <div><p className="text-sm text-slate-500">Date</p><p className="font-semibold">{viewingCollection.date} {viewingCollection.time}</p></div>
                <div className="col-span-2"><p className="text-sm text-slate-500">Notes</p><p className="font-semibold">{viewingCollection.notes || '—'}</p></div>
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

export default CollectionRecords;
