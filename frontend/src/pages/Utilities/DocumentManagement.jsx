// src/pages/Utilities/DocumentManagement.jsx
import { useState } from 'react';
import { Plus, Search, Eye, Trash2, X, Save, Upload, FileText, Download, Calendar, User } from 'lucide-react';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Waste Collection Policy 2024.pdf', type: 'PDF', size: '2.4 MB', date: '2024-01-10', uploadedBy: 'admin@jemakwaste.com' },
    { id: 2, name: 'Service Agreement Template.docx', type: 'DOCX', size: '1.2 MB', date: '2024-01-08', uploadedBy: 'admin@jemakwaste.com' },
    { id: 3, name: 'Monthly Report - December 2023.xlsx', type: 'XLSX', size: '3.1 MB', date: '2024-01-05', uploadedBy: 'admin@jemakwaste.com' },
    { id: 4, name: 'Emergency Procedures.pdf', type: 'PDF', size: '1.8 MB', date: '2024-01-03', uploadedBy: 'admin@jemakwaste.com' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'PDF', description: '' });

  const filteredDocs = documents.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setFormData({ name: '', type: 'PDF', description: '' });
    setShowModal(true);
  };

  const handleView = (doc) => {
    setViewingDoc(doc);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const handleSave = () => {
    const newId = Math.max(...documents.map(d => d.id)) + 1;
    setDocuments([...documents, {
      id: newId,
      ...formData,
      size: '1.0 MB',
      date: new Date().toISOString().split('T')[0],
      uploadedBy: 'admin@jemakwaste.com'
    }]);
    setShowModal(false);
  };

  const handleDownload = (doc) => {
    const content = `Document: ${doc.name}\nType: ${doc.type}\nSize: ${doc.size}\nDate: ${doc.date}\nUploaded by: ${doc.uploadedBy}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTypeIcon = (type) => {
    const colors = {
      PDF: 'bg-red-100 text-red-700',
      DOCX: 'bg-blue-100 text-blue-700',
      XLSX: 'bg-emerald-100 text-emerald-700'
    };
    return colors[type] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">UTILITIES</div>
          <h1 className="page-title">Document Management</h1>
          <p className="page-description">Upload, manage, and organize system documents</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}><Plus size={16} />Upload Document</button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
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
                <th>Type</th>
                <th>Size</th>
                <th>Date</th>
                <th>Uploaded By</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td className="font-semibold">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-slate-400" />
                      {doc.name}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getTypeIcon(doc.type)}`}>{doc.type}</span>
                  </td>
                  <td>{doc.size}</td>
                  <td className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      {doc.date}
                    </div>
                  </td>
                  <td className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <User size={12} className="text-slate-400" />
                      {doc.uploadedBy}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(doc)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleDownload(doc)} title="Download"><Download size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(doc.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDocs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No documents found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Upload Document</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Document Name</label>
                  <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>PDF</option>
                    <option>DOCX</option>
                    <option>XLSX</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                  <Upload size={32} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-slate-500">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, DOCX, XLSX up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingDoc && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Document Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center">
                    <FileText size={28} className="text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{viewingDoc.name}</h4>
                    <span className={`badge ${getTypeIcon(viewingDoc.type)}`}>{viewingDoc.type}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Size</p>
                    <p className="font-semibold">{viewingDoc.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Type</p>
                    <p className="font-semibold">{viewingDoc.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Uploaded</p>
                    <p className="font-semibold">{viewingDoc.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Uploaded By</p>
                    <p className="font-semibold">{viewingDoc.uploadedBy}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => handleDownload(viewingDoc)}><Download size={16} />Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
