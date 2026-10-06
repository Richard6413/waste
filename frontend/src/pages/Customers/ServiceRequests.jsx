// src/pages/Customers/ServiceRequests.jsx
import { useState } from 'react';
import { Plus, Search, Eye, CheckCircle, XCircle, Clock, X, Save, Calendar, User, Phone } from 'lucide-react';

const ServiceRequests = () => {
  const [requests, setRequests] = useState([
    { id: 'SR-001', customer: 'N. Perera', type: 'Special Collection', status: 'pending', date: '2024-01-15', phone: '+94 77 123 4567', notes: 'Bulky items pickup' },
    { id: 'SR-002', customer: 'A. Fernando', type: 'Complaint', status: 'in-progress', date: '2024-01-14', phone: '+94 77 234 5678', notes: 'Missed collection' },
    { id: 'SR-003', customer: 'S. Jayawardena', type: 'New Connection', status: 'completed', date: '2024-01-13', phone: '+94 77 345 6789', notes: 'New household registration' },
    { id: 'SR-004', customer: 'M. Silva', type: 'Billing Issue', status: 'pending', date: '2024-01-12', phone: '+94 77 456 7890', notes: 'Incorrect charges' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [formData, setFormData] = useState({
    customer: '',
    type: 'Special Collection',
    phone: '',
    notes: ''
  });

  const filteredRequests = requests.filter(r =>
    r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setFormData({ customer: '', type: 'Special Collection', phone: '', notes: '' });
    setShowModal(true);
  };

  const handleView = (request) => {
    setViewingRequest(request);
    setShowViewModal(true);
  };

  const handleComplete = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'completed' } : r));
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      setRequests(requests.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
    }
  };

  const handleSave = () => {
    const newId = `SR-${String(requests.length + 1).padStart(3, '0')}`;
    setRequests([...requests, {
      id: newId,
      ...formData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    }]);
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'status-warning',
      'in-progress': 'status-info',
      completed: 'status-success',
      cancelled: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'in-progress': return <Clock size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">CUSTOMERS</div>
          <h1 className="page-title">Service Requests</h1>
          <p className="page-description">Manage customer service requests and complaints</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />New Request</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Pending</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{requests.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-blue-500" />In Progress</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{requests.filter(r => r.status === 'in-progress').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{requests.filter(r => r.status === 'completed').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><XCircle size={14} className="text-red-500" />Cancelled</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{requests.filter(r => r.status === 'cancelled').length}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search requests..."
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
                <th>Request ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td><span className="font-mono text-xs font-semibold text-slate-600">{request.id}</span></td>
                  <td className="font-semibold">{request.customer}</td>
                  <td>{request.type}</td>
                  <td className="text-sm text-slate-600">{request.date}</td>
                  <td>
                    <span className={`status ${getStatusBadge(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(request)} title="View"><Eye size={16} /></button>
                      {request.status === 'pending' && (
                        <>
                          <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500 transition-colors" onClick={() => handleComplete(request.id)} title="Complete"><CheckCircle size={16} /></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleCancel(request.id)} title="Cancel"><XCircle size={16} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No service requests found</td>
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
              <h3 className="text-lg font-semibold">New Service Request</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Customer Name</label>
                  <input type="text" className="form-input" value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Request Type</label>
                  <select className="form-select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>Special Collection</option>
                    <option>Complaint</option>
                    <option>New Connection</option>
                    <option>Billing Issue</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-textarea" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />Create Request</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingRequest && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Request Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Request ID</p>
                    <p className="font-semibold">{viewingRequest.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(viewingRequest.status)}`}>{viewingRequest.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Customer</p>
                    <p className="font-semibold">{viewingRequest.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Type</p>
                    <p className="font-semibold">{viewingRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{viewingRequest.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold">{viewingRequest.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Notes</p>
                  <p className="font-semibold">{viewingRequest.notes}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              {viewingRequest.status === 'pending' && (
                <button className="btn btn-primary" onClick={() => { handleComplete(viewingRequest.id); setShowViewModal(false); }}>
                  <CheckCircle size={16} />Mark Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequests;
