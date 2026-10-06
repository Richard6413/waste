// src/pages/Billing/InvoiceDetails.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save, X, Download, DollarSign, User, Calendar, CreditCard } from 'lucide-react';

const InvoiceDetails = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    id: 'INV-8821',
    household: 'N. Perera',
    amount: 2450,
    status: 'due',
    due: '30 Sep 2026',
    date: '01 Sep 2026',
    items: [
      { description: 'Monthly Collection', quantity: 1, unitPrice: 2000 },
      { description: 'Recycling Fee', quantity: 1, unitPrice: 450 }
    ],
    tax: 0,
    notes: 'Regular monthly collection'
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(invoice);

  const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = subtotal * (formData.tax / 100);
  const total = subtotal + taxAmount;

  const handleSave = () => {
    setInvoice(formData);
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      navigate('/billing/invoices');
    }
  };

  const handleDownload = () => {
    const content = `
INVOICE
=======
Invoice ID: ${invoice.id}
Household: ${invoice.household}
Date: ${invoice.date}
Due Date: ${invoice.due}

ITEMS
-----
${invoice.items.map(item => `${item.description} x${item.quantity} - LKR ${item.unitPrice}`).join('\n')}

Subtotal: LKR ${subtotal}
Tax: LKR ${taxAmount}
Total: LKR ${total}

Status: ${invoice.status}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.id}.txt`;
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
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => navigate('/billing/invoices')}>
            <ArrowLeft size={16} />Back to Invoices
          </button>
          <div className="page-kicker">BILLING</div>
          <h1 className="page-title">Invoice {invoice.id}</h1>
          <p className="page-description">{invoice.household} · {invoice.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={handleDownload}>
            <Download size={16} />Download
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} />Delete
          </button>
          <button className="btn btn-primary" onClick={() => editing ? handleSave() : setEditing(true)}>
            {editing ? <><Save size={16} />Save Changes</> : <><Edit size={16} />Edit Invoice</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Info */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Invoice Information</h2>
            </div>
            <div className="panel-body">
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Household</label>
                    <input type="text" className="form-input" value={formData.household} onChange={(e) => setFormData({...formData, household: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="due">Due</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Issue Date</label>
                    <input type="date" className="form-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-input" value={formData.due} onChange={(e) => setFormData({...formData, due: e.target.value})} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Invoice ID</p>
                    <p className="font-semibold">{invoice.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Household</p>
                    <p className="font-semibold">{invoice.household}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(invoice.status)}`}>{invoice.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Issue Date</p>
                    <p className="font-semibold">{invoice.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className="font-semibold">{invoice.due}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Amount</p>
                    <p className="font-semibold text-lg">LKR {invoice.amount.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Line Items</h2>
            </div>
            <div className="panel-body">
              <table className="saas-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th className="text-center">Qty</th>
                    <th className="text-right">Unit Price</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.description}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">LKR {item.unitPrice.toLocaleString()}</td>
                      <td className="text-right font-semibold">LKR {(item.quantity * item.unitPrice).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Summary</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="font-semibold">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Tax ({formData.tax}%)</span>
                  <span className="font-semibold">LKR {taxAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-emerald-600">LKR {total.toLocaleString()}</span>
                </div>
                {invoice.status !== 'paid' && (
                  <button className="btn btn-primary w-full mt-4">
                    <CreditCard size={16} />Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Quick Actions</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-2">
                <button className="btn btn-secondary w-full justify-start">
                  <Download size={16} />Download PDF
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <CreditCard size={16} />Send Reminder
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <User size={16} />Contact Household
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Notes</h2>
            </div>
            <div className="panel-body">
              <p className="text-sm text-slate-600">{invoice.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
