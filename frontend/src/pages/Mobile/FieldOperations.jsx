// src/pages/Mobile/FieldOperations.jsx
import { useState } from 'react';
import { MapPin, Clock, CheckCircle, AlertTriangle, Camera, MessageCircle, Phone, User, Truck } from 'lucide-react';

const FieldOperations = () => {
  const [operations] = useState([
    { id: 1, type: 'Collection', location: '123 Main St, Colombo 07', time: '08:30 AM', status: 'completed', notes: 'Regular collection completed' },
    { id: 2, type: 'Collection', location: '456 Oak Ave, Colombo 07', time: '09:15 AM', status: 'completed', notes: 'Recyclables collected' },
    { id: 3, type: 'Special Pickup', location: '789 Pine Rd, Colombo 07', time: '10:00 AM', status: 'in-progress', notes: 'Bulky items pickup' },
    { id: 4, type: 'Collection', location: '101 Elm St, Colombo 07', time: '10:30 AM', status: 'pending', notes: '' },
  ]);

  const [selectedOp, setSelectedOp] = useState(null);

  const handleComplete = (id) => {
    // In a real app, this would update the backend
    alert('Operation marked as completed!');
  };

  const handleReportIssue = (id) => {
    const issue = prompt('Describe the issue:');
    if (issue) {
      alert('Issue reported. Support will be notified.');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: 'status-success',
      'in-progress': 'status-warning',
      pending: 'status-neutral'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">MOBILE</div>
          <h1 className="page-title">Field Operations</h1>
          <p className="page-description">Manage field operations and tasks</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
          <p className="text-2xl font-bold text-emerald-600">{operations.filter(o => o.status === 'completed').length}</p>
          <p className="text-xs text-slate-500">Completed</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">{operations.filter(o => o.status === 'in-progress').length}</p>
          <p className="text-xs text-slate-500">In Progress</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
          <p className="text-2xl font-bold text-slate-600">{operations.filter(o => o.status === 'pending').length}</p>
          <p className="text-xs text-slate-500">Pending</p>
        </div>
      </div>

      {/* Operations List */}
      <div className="space-y-3">
        {operations.map((op) => (
          <div
            key={op.id}
            className={`rounded-2xl border p-4 ${
              op.status === 'in-progress' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  op.status === 'completed' ? 'bg-emerald-100' :
                  op.status === 'in-progress' ? 'bg-amber-100' : 'bg-slate-100'
                }`}>
                  {op.status === 'completed' ? <CheckCircle size={16} className="text-emerald-600" /> :
                   op.status === 'in-progress' ? <Clock size={16} className="text-amber-600" /> :
                   <MapPin size={16} className="text-slate-600" />}
                </div>
                <div>
                  <p className="font-semibold">{op.type}</p>
                  <p className="text-sm text-slate-500">{op.location}</p>
                </div>
              </div>
              <span className={`status ${getStatusBadge(op.status)}`}>{op.status}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
              <span className="flex items-center gap-1"><Clock size={12} />{op.time}</span>
              <span className="flex items-center gap-1"><MapPin size={12} />{op.location}</span>
            </div>
            {op.notes && (
              <p className="text-sm text-slate-600 mb-3 p-2 bg-slate-50 rounded-lg">{op.notes}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {op.status === 'in-progress' && (
                <button className="btn btn-primary btn-sm" onClick={() => handleComplete(op.id)}>
                  <CheckCircle size={14} />Complete
                </button>
              )}
              <button className="btn btn-secondary btn-sm" onClick={() => handleReportIssue(op.id)}>
                <AlertTriangle size={14} />Report Issue
              </button>
              <button className="btn btn-secondary btn-sm">
                <Camera size={14} />Add Photo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldOperations;
