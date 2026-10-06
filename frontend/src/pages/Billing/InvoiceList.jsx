// src/pages/Billing/InvoiceList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, X, Save, Download, DollarSign } from 'lucide-react';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([
    { id: 'INV-8821', household: 'N. Perera', amount: 2450, status: 'due', due: '30 Sep 2026', date: '01 Sep 2026' },
    { id: 'INV-8819', household: 'A. Fernando', amount: 2450, status: 'paid', due: '15 Sep 2026', date: '01 Sep 2026' },
    { id: 'INV-8814', household: 'S. Jayawardena', amount: 4800, status: 'overdue', due: '10 Sep 2026', date: '01 Aug 2026' },
    { id: 'INV-8810', household: 'M. Silva', amount: 2450, status: 'paid', due: '05 Sep 2026', date: '01 Aug 2026' },
    { id: 'INV-8805', household: 'K. Fernando', amount: 3600, status: 'due', due: '25 Aug 2026', date: '01 Aug 2026' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    household: '',
    amount: '',
    status: 'due',
    due: ''
  });

  const filteredInvoices = invoices.filter(i => {
    const matchesSearch = i.household.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ household: '', amount: '', status: 'due', due: '' });
    setShowModal(true);
  };

  const handleEdit = (invoice) => {
    setEditingId(invoice.id);
    setFormData({
      household: invoice.household,
      amount: invoice.amount,
      status: invoice.status,
      due: invoice.due
    });
    setShowModal(true);
  };

  const handleView = (invoice) => {
    setViewingInvoice(invoice);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (editingId) {
      setInvoices(invoices.map(i => i.id === editingId ? {
        ...i,
        ...formData,
        amount: parseFloat(formData.amount) || 0
      } : i));
    } else {
      const newId = `INV-${Math.floor(Math.random() * 9000) + 1000}`;
      setInvoices([...invoices, {
        id: newId,
        ...formData,
        amount: parseFloat(formData.amount) || 0,
        date: new Date().toISOString().split('T')[0]
      }]);
    }
    setShowModal(false);
  };

  const handleExport = () => {
    const csv = [
      ['Invoice', 'Household', 'Amount', 'Status', 'Due Date'],
      ...filteredInvoices.map(i => [i.id, i.household, i.amount, i.status, i.due])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    const colors = {
      paid: 'status-success',
      due: 'status-warning',
      overdue: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">BILLING</div>
          <h1 className="page-title">Invoices</h1>
          <p className="page-description">Manage and track all invoices</p>
        </div>
        <div className="command-bar">
          <button className="btn btn-secondary" onClick={handleExport}><Download size={16} />Export</button>
          <Link to="/billing/invoices/create" className="btn btn-primary"><Plus size={16} />Create Invoice</Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><DollarSign size={14} />Total Invoiced</div>
          <p className="text-xl font-bold text-slate-900 mt-1">LKR {filteredInvoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><DollarSign size={14} className="text-green-500" />Paid</div>
          <p className="text-xl font-bold text-slate-900 mt-1">LKR {filteredInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><DollarSign size={14} className="text-red-500" />Outstanding</div>
          <p className="text-xl font-bold text-slate-900 mt-1">LKR {filteredInvoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="select min-w-[140px]" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="due">Due</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Household</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td><span className="font-mono text-xs font-semibold text-slate-600">{invoice.id}</span></td>
                  <td className="font-semibold">{invoice.household}</td>
                  <td className="font-semibold">LKR {invoice.amount.toLocaleString()}</td>
                  <td className="text-sm text-slate-600">{invoice.due}</td>
                  <td><span className={`status ${getStatusBadge(invoice.status)}`}>{invoice.status}</span></td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(invoice)} title="View"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleEdit(invoice)} title="Edit"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" onClick={() => handleDelete(invoice.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">No invoices found</td>
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
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Invoice' : 'Create New Invoice'}</h3>
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
                    <label className="form-label">Amount (LKR)</label>
                    <input type="number" className="form-input" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="due">Due</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-input" value={formData.due} onChange={(e) => setFormData({...formData, due: e.target.value})} />
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
      {showViewModal && viewingInvoice && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Invoice Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Invoice ID</p>
                    <p className="font-semibold">{viewingInvoice.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Household</p>
                    <p className="font-semibold">{viewingInvoice.household}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Amount</p>
                    <p className="font-semibold text-lg">LKR {viewingInvoice.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(viewingInvoice.status)}`}>{viewingInvoice.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Issue Date</p>
                    <p className="font-semibold">{viewingInvoice.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className="font-semibold">{viewingInvoice.due}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setShowViewModal(false); handleEdit(viewingInvoice); }}><Edit size={16} />Edit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
