// src/pages/Mobile/IncidentReports.jsx
import { useState } from 'react';
import { Plus, Search, Eye, X, Save, AlertTriangle, MapPin, Calendar, User, CheckCircle, Clock } from 'lucide-react';

const IncidentReports = () => {
  const [incidents, setIncidents] = useState([
    { id: 1, title: 'Vehicle Breakdown', description: 'Truck UG-19 broke down on Kandy Rd', location: 'Kandy Rd', date: '2024-01-15 08:45', status: 'open', reportedBy: 'Kasun Perera' },
    { id: 2, title: 'Access Blocked', description: 'Cannot access collection point due to construction', location: '123 Main St', date: '2024-01-14 10:30', status: 'in-progress', reportedBy: 'Mary Silva' },
    { id: 3, title: 'Missed Collection', description: 'Resident reports missed collection', location: '456 Oak Ave', date: '2024-01-13 15:00', status: 'resolved', reportedBy: 'N. Perera' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingIncident, setViewingIncident] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'medium'
  });

  const filteredIncidents = incidents.filter(i =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setFormData({ title: '', description: '', location: '', severity: 'medium' });
    setShowModal(true);
  };

  const handleView = (incident) => {
    setViewingIncident(incident);
    setShowViewModal(true);
  };

  const handleResolve = (id) => {
    setIncidents(incidents.map(i => i.id === id ? { ...i, status: 'resolved' } : i));
  };

  const handleSave = () => {
    const newId = Math.max(...incidents.map(i => i.id)) + 1;
    setIncidents([...incidents, {
      id: newId,
      ...formData,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'open',
      reportedBy: 'Current User'
    }]);
    setShowModal(false);
  };

  const getStatusBadge = (status) => {
    const colors = {
      open: 'status-danger',
      'in-progress': 'status-warning',
      resolved: 'status-success'
    };
    return colors[status] || 'status-neutral';
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-amber-100 text-amber-700',
      high: 'bg-red-100 text-red-700'
    };
    return colors[severity] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">MOBILE</div>
          <h1 className="page-title">Incident Reports</h1>
          <p className="page-description">Report and track field incidents</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Report Incident</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search incidents..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  incident.status === 'open' ? 'bg-red-100' :
                  incident.status === 'in-progress' ? 'bg-amber-100' : 'bg-emerald-100'
                }`}>
                  <AlertTriangle size={16} className={
                    incident.status === 'open' ? 'text-red-600' :
                    incident.status === 'in-progress' ? 'text-amber-600' : 'text-emerald-600'
                  } />
                </div>
                <div>
                  <p className="font-semibold">{incident.title}</p>
                  <p className="text-sm text-slate-500">{incident.location}</p>
                </div>
              </div>
              <span className={`status ${getStatusBadge(incident.status)}`}>{incident.status}</span>
            </div>
            <p className="text-sm text-slate-600 mb-3">{incident.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
              <span className="flex items-center gap-1"><Calendar size={10} />{incident.date}</span>
              <span className="flex items-center gap-1"><User size={10} />{incident.reportedBy}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-secondary btn-sm" onClick={() => handleView(incident)}>
                <Eye size={14} />View
              </button>
              {incident.status !== 'resolved' && (
                <button className="btn btn-primary btn-sm" onClick={() => handleResolve(incident.id)}>
                  <CheckCircle size={14} />Resolve
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredIncidents.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <AlertTriangle size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No incidents found</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Report New Incident</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Severity</label>
                  <select className="form-select" value={formData.severity} onChange={(e) => setFormData({...formData, severity: e.target.value})}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />Submit Report</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingIncident && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Incident Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    viewingIncident.status === 'open' ? 'bg-red-100' :
                    viewingIncident.status === 'in-progress' ? 'bg-amber-100' : 'bg-emerald-100'
                  }`}>
                    <AlertTriangle size={28} className={
                      viewingIncident.status === 'open' ? 'text-red-600' :
                      viewingIncident.status === 'in-progress' ? 'text-amber-600' : 'text-emerald-600'
                    } />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingIncident.title}</h4>
                    <span className={`status ${getStatusBadge(viewingIncident.status)}`}>{viewingIncident.status}</span>
                  </div>
                </div>
                <p className="text-slate-600">{viewingIncident.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-semibold">{viewingIncident.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold">{viewingIncident.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Reported By</p>
                    <p className="font-semibold">{viewingIncident.reportedBy}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              {viewingIncident.status !== 'resolved' && (
                <button className="btn btn-primary" onClick={() => { handleResolve(viewingIncident.id); setShowViewModal(false); }}>
                  <CheckCircle size={16} />Resolve
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReports;
