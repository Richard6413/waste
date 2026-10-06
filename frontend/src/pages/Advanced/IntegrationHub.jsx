// src/pages/Advanced/IntegrationHub.jsx
import { useState } from 'react';
import { Plug, Plus, Search, Edit, Trash2, Eye, X, Save, CheckCircle, XCircle, Settings, ExternalLink, RefreshCw } from 'lucide-react';

const IntegrationHub = () => {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Stripe', description: 'Payment processing', status: 'connected', lastSync: '2024-01-15 10:30', icon: '💳' },
    { id: 2, name: 'Firebase', description: 'Authentication & database', status: 'connected', lastSync: '2024-01-15 10:30', icon: '🔥' },
    { id: 3, name: 'Twilio', description: 'SMS notifications', status: 'disconnected', lastSync: 'Never', icon: '📱' },
    { id: 4, name: 'Google Maps', description: 'Location services', status: 'connected', lastSync: '2024-01-15 09:00', icon: '🗺️' },
    { id: 5, name: 'SendGrid', description: 'Email delivery', status: 'error', lastSync: '2024-01-14 15:00', icon: '📧' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingIntegration, setViewingIntegration] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    apiKey: '',
    endpoint: ''
  });

  const filteredIntegrations = integrations.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setFormData({ name: '', description: '', apiKey: '', endpoint: '' });
    setShowModal(true);
  };

  const handleView = (integration) => {
    setViewingIntegration(integration);
    setShowViewModal(true);
  };

  const handleToggle = (id) => {
    setIntegrations(integrations.map(i => i.id === id ? {
      ...i,
      status: i.status === 'connected' ? 'disconnected' : 'connected',
      lastSync: i.status === 'disconnected' ? new Date().toISOString().replace('T', ' ').slice(0, 16) : i.lastSync
    } : i));
  };

  const handleSave = () => {
    const newId = Math.max(...integrations.map(i => i.id)) + 1;
    setIntegrations([...integrations, {
      id: newId,
      ...formData,
      status: 'disconnected',
      lastSync: 'Never',
      icon: '🔌'
    }]);
    setShowModal(false);
  };

  const handleSync = (id) => {
    setIntegrations(integrations.map(i => i.id === id ? {
      ...i,
      lastSync: new Date().toISOString().replace('T', ' ').slice(0, 16)
    } : i));
  };

  const getStatusBadge = (status) => {
    const colors = {
      connected: 'status-success',
      disconnected: 'status-neutral',
      error: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'disconnected': return <XCircle size={16} className="text-slate-400" />;
      case 'error': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADVANCED</div>
          <h1 className="page-title">Integration Hub</h1>
          <p className="page-description">Manage third-party integrations and APIs</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Add Integration</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search integrations..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                  {integration.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  <p className="text-sm text-slate-500">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(integration)} title="View"><Eye size={16} /></button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleSync(integration.id)} title="Sync"><RefreshCw size={16} /></button>
                <button
                  className={`p-1.5 rounded-lg transition-colors ${
                    integration.status === 'connected' ? 'hover:bg-red-50 text-red-500' : 'hover:bg-emerald-50 text-emerald-500'
                  }`}
                  onClick={() => handleToggle(integration.id)}
                  title={integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                >
                  <Plug size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(integration.status)}
                <span className={`status ${getStatusBadge(integration.status)}`}>{integration.status}</span>
              </div>
              <span className="text-xs text-slate-400">Last sync: {integration.lastSync}</span>
            </div>
          </div>
        ))}
        {filteredIntegrations.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-500">
            <Plug size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No integrations found</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Add New Integration</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Integration Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-input" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">API Key</label>
                  <input type="password" className="form-input" value={formData.apiKey} onChange={(e) => setFormData({...formData, apiKey: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Endpoint URL</label>
                  <input type="url" className="form-input" value={formData.endpoint} onChange={(e) => setFormData({...formData, endpoint: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />Add Integration</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingIntegration && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Integration Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-3xl">
                    {viewingIntegration.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingIntegration.name}</h4>
                    <p className="text-slate-500">{viewingIntegration.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(viewingIntegration.status)}
                      <span className={`status ${getStatusBadge(viewingIntegration.status)}`}>{viewingIntegration.status}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Last Sync</p>
                    <p className="font-semibold">{viewingIntegration.lastSync}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => handleSync(viewingIntegration.id)}>
                <RefreshCw size={16} />Sync Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationHub;
