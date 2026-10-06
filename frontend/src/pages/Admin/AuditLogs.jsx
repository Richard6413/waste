// src/pages/Admin/AuditLogs.jsx
import { useState } from 'react';
import { Search, Eye, X, Download, Calendar, User, Activity, Filter } from 'lucide-react';

const AuditLogs = () => {
  const [logs, setLogs] = useState([
    { id: 1, user: 'admin@jemakwaste.com', action: 'Created user', target: 'collector@jemakwaste.com', date: '2024-01-15 10:30', ip: '192.168.1.1' },
    { id: 2, user: 'admin@jemakwaste.com', action: 'Updated route', target: 'RT-N1', date: '2024-01-15 09:15', ip: '192.168.1.1' },
    { id: 3, user: 'collector@jemakwaste.com', action: 'Completed collection', target: 'COL-2024-001', date: '2024-01-15 08:45', ip: '192.168.1.5' },
    { id: 4, user: 'admin@jemakwaste.com', action: 'Deleted invoice', target: 'INV-8801', date: '2024-01-14 16:20', ip: '192.168.1.1' },
    { id: 5, user: 'resident@jemakwaste.com', action: 'Updated profile', target: 'Own profile', date: '2024-01-14 14:10', ip: '192.168.1.10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingLog, setViewingLog] = useState(null);

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (log) => {
    setViewingLog(log);
    setShowViewModal(true);
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'User', 'Action', 'Target', 'Date', 'IP'],
      ...filteredLogs.map(l => [l.id, l.user, l.action, l.target, l.date, l.ip])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-description">System activity and audit trail</p>
        </div>
        <button className="btn btn-secondary" onClick={handleExport}><Download size={16} />Export</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs..."
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
                <th>User</th>
                <th>Action</th>
                <th>Target</th>
                <th>Date</th>
                <th>IP</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <User size={14} className="text-slate-600" />
                      </div>
                      <span className="font-semibold">{log.user}</span>
                    </div>
                  </td>
                  <td>{log.action}</td>
                  <td className="font-mono text-xs">{log.target}</td>
                  <td className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      {log.date}
                    </div>
                  </td>
                  <td className="font-mono text-xs text-slate-500">{log.ip}</td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(log)} title="View"><Eye size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No logs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && viewingLog && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Log Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">User</p>
                    <p className="font-semibold">{viewingLog.user}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Action</p>
                    <p className="font-semibold">{viewingLog.action}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Target</p>
                    <p className="font-semibold font-mono">{viewingLog.target}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold">{viewingLog.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">IP Address</p>
                    <p className="font-semibold font-mono">{viewingLog.ip}</p>
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

export default AuditLogs;
