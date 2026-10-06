// src/pages/Admin/BackupManagement.jsx
import { useState } from 'react';
import { Plus, Download, Trash2, X, Save, Database, Clock, HardDrive, CheckCircle } from 'lucide-react';

const BackupManagement = () => {
  const [backups, setBackups] = useState([
    { id: 1, name: 'backup-2024-01-15.sql', size: '45.2 MB', date: '2024-01-15 02:00', status: 'completed', type: 'automatic' },
    { id: 2, name: 'backup-2024-01-14.sql', size: '44.8 MB', date: '2024-01-14 02:00', status: 'completed', type: 'automatic' },
    { id: 3, name: 'backup-2024-01-13.sql', size: '44.5 MB', date: '2024-01-13 02:00', status: 'completed', type: 'automatic' },
    { id: 4, name: 'manual-backup-2024-01-12.sql', size: '44.1 MB', date: '2024-01-12 15:30', status: 'completed', type: 'manual' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleCreateBackup = async () => {
    setCreating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newId = Math.max(...backups.map(b => b.id)) + 1;
    setBackups([{
      id: newId,
      name: `manual-backup-${new Date().toISOString().split('T')[0]}.sql`,
      size: '45.5 MB',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'completed',
      type: 'manual'
    }, ...backups]);
    setCreating(false);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this backup?')) {
      setBackups(backups.filter(b => b.id !== id));
    }
  };

  const handleDownload = (backup) => {
    const content = `-- Backup: ${backup.name}\n-- Date: ${backup.date}\n-- Size: ${backup.size}\n\n-- Database backup content would go here`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = backup.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">Backup Management</h1>
          <p className="page-description">Manage system backups and recovery points</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={16} />Create Backup</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Database size={14} />Total Backups</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{backups.length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><HardDrive size={14} className="text-blue-500" />Total Size</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{backups.reduce((s, b) => s + parseFloat(b.size), 0).toFixed(1)} MB</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{backups.filter(b => b.status === 'completed').length}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Last Backup</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{backups[0]?.date.split(' ')[0] || 'Never'}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Backup Name</th>
                <th>Size</th>
                <th>Date</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((backup) => (
                <tr key={backup.id}>
                  <td className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Database size={14} className="text-slate-400" />
                      {backup.name}
                    </div>
                  </td>
                  <td>{backup.size}</td>
                  <td className="text-sm text-slate-600">{backup.date}</td>
                  <td>
                    <span className={`badge ${backup.type === 'automatic' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {backup.type}
                    </span>
                  </td>
                  <td><span className="status status-success">{backup.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleDownload(backup)} title="Download"><Download size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(backup.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Backup Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Create New Backup</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Database size={24} className="text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-900">Create Database Backup</p>
                      <p className="text-sm text-blue-700">This will create a full backup of the current database state.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• Backup includes all collections and documents</p>
                  <p>• Estimated size: ~45 MB</p>
                  <p>• Backup will be stored securely</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateBackup} disabled={creating}>
                <Save size={16} />{creating ? 'Creating...' : 'Create Backup'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupManagement;
