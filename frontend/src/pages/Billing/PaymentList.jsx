// src/pages/Billing/PaymentList.jsx
import { useState } from 'react';
import { Search, Eye, X, Download, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';

const PaymentList = () => {
  const [payments, setPayments] = useState([
    { id: 'PAY-001', invoice: 'INV-8819', household: 'A. Fernando', amount: 2450, method: 'Card', status: 'completed', date: '15 Sep 2026' },
    { id: 'PAY-002', invoice: 'INV-8810', household: 'M. Silva', amount: 2450, method: 'Bank Transfer', status: 'completed', date: '05 Sep 2026' },
    { id: 'PAY-003', invoice: 'INV-8821', household: 'N. Perera', amount: 2450, method: 'Card', status: 'pending', date: '20 Sep 2026' },
    { id: 'PAY-004', invoice: 'INV-8805', household: 'K. Fernando', amount: 3600, method: 'Cash', status: 'failed', date: '18 Sep 2026' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingPayment, setViewingPayment] = useState(null);

  const filteredPayments = payments.filter(p =>
    p.household.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (payment) => {
    setViewingPayment(payment);
    setShowViewModal(true);
  };

  const handleExport = () => {
    const csv = [
      ['Payment ID', 'Invoice', 'Household', 'Amount', 'Method', 'Status', 'Date'],
      ...filteredPayments.map(p => [p.id, p.invoice, p.household, p.amount, p.method, p.status, p.date])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} className="text-green-500" />;
      case 'pending': return <Clock size={14} className="text-amber-500" />;
      case 'failed': return <XCircle size={14} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: 'status-success',
      pending: 'status-warning',
      failed: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">BILLING</div>
          <h1 className="page-title">Payments</h1>
          <p className="page-description">Track all payment transactions</p>
        </div>
        <button className="btn btn-secondary" onClick={handleExport}><Download size={16} />Export</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><DollarSign size={14} />Total Received</div>
          <p className="text-xl font-bold text-slate-900 mt-1">LKR {filteredPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Pending</div>
          <p className="text-xl font-bold text-slate-900 mt-1">LKR {filteredPayments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0).toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><XCircle size={14} className="text-red-500" />Failed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">LKR {filteredPayments.filter(p => p.status === 'failed').reduce((s, p) => s + p.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search payments..."
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
                <th>Payment ID</th>
                <th>Invoice</th>
                <th>Household</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td><span className="font-mono text-xs font-semibold text-slate-600">{payment.id}</span></td>
                  <td className="text-sm text-slate-600">{payment.invoice}</td>
                  <td className="font-semibold">{payment.household}</td>
                  <td className="font-semibold">LKR {payment.amount.toLocaleString()}</td>
                  <td className="text-sm text-slate-600">{payment.method}</td>
                  <td>
                    <span className={`status ${getStatusBadge(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </td>
                  <td className="text-sm text-slate-600">{payment.date}</td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors" onClick={() => handleView(payment)} title="View"><Eye size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">No payments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && viewingPayment && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Payment ID</p>
                    <p className="font-semibold">{viewingPayment.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Invoice</p>
                    <p className="font-semibold">{viewingPayment.invoice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Household</p>
                    <p className="font-semibold">{viewingPayment.household}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Amount</p>
                    <p className="font-semibold text-lg">LKR {viewingPayment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Method</p>
                    <p className="font-semibold">{viewingPayment.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${getStatusBadge(viewingPayment.status)}`}>
                      {getStatusIcon(viewingPayment.status)}
                      {viewingPayment.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-semibold">{viewingPayment.date}</p>
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

export default PaymentList;
