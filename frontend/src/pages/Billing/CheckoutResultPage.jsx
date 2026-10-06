// src/pages/Billing/CheckoutResultPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowLeft, Download, CreditCard, Calendar, User } from 'lucide-react';

const CheckoutResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'success';
  const sessionId = searchParams.get('session_id') || 'demo-session';

  const [payment, setPayment] = useState({
    id: 'PAY-001',
    invoice: 'INV-8821',
    household: 'N. Perera',
    amount: 2450,
    method: 'Card',
    status: status === 'success' ? 'completed' : status === 'cancel' ? 'cancelled' : 'pending',
    date: new Date().toISOString().split('T')[0],
    transactionId: sessionId
  });

  const handleDownloadReceipt = () => {
    const content = `
PAYMENT RECEIPT
===============
Payment ID: ${payment.id}
Invoice: ${payment.invoice}
Household: ${payment.household}
Amount: LKR ${payment.amount.toLocaleString()}
Method: ${payment.method}
Status: ${payment.status}
Date: ${payment.date}
Transaction ID: ${payment.transactionId}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${payment.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle size={48} className="text-emerald-500" />,
          title: 'Payment Successful!',
          message: 'Your payment has been processed successfully.',
          bg: 'bg-emerald-50'
        };
      case 'cancelled':
        return {
          icon: <XCircle size={48} className="text-red-500" />,
          title: 'Payment Cancelled',
          message: 'Your payment was cancelled. Please try again.',
          bg: 'bg-red-50'
        };
      default:
        return {
          icon: <Clock size={48} className="text-amber-500" />,
          title: 'Payment Pending',
          message: 'Your payment is being processed. Please wait.',
          bg: 'bg-amber-50'
        };
    }
  };

  const statusConfig = getStatusConfig(payment.status);

  return (
    <div className="workspace-content fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => navigate('/billing')}>
            <ArrowLeft size={16} />Back to Billing
          </button>
          <div className={`w-24 h-24 rounded-full ${statusConfig.bg} flex items-center justify-center mx-auto mb-4`}>
            {statusConfig.icon}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{statusConfig.title}</h1>
          <p className="text-slate-500">{statusConfig.message}</p>
        </div>

        <div className="workspace-panel mb-6">
          <div className="panel-header">
            <h2 className="panel-title">Payment Details</h2>
          </div>
          <div className="panel-body">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Payment ID</p>
                  <p className="font-semibold">{payment.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Invoice</p>
                  <p className="font-semibold">{payment.invoice}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Household</p>
                  <p className="font-semibold">{payment.household}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-semibold text-lg">LKR {payment.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Method</p>
                  <p className="font-semibold">{payment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-semibold">{payment.date}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Transaction ID</p>
                  <p className="font-semibold font-mono text-xs">{payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span className={`status ${payment.status === 'completed' ? 'status-success' : payment.status === 'cancelled' ? 'status-danger' : 'status-warning'}`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="btn btn-secondary" onClick={handleDownloadReceipt}>
            <Download size={16} />Download Receipt
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/billing/invoices')}>
            <CreditCard size={16} />View Invoices
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutResultPage;
