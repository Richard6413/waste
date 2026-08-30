// src/pages/Billing/BillingPage.jsx
import { useState } from 'react';

const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-slate-200">
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'invoices' 
              ? 'border-b-2 border-emerald-500 text-emerald-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'payments' 
              ? 'border-b-2 border-emerald-500 text-emerald-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        {activeTab === 'invoices' && (
          <div>
            <h3 className="font-semibold text-slate-900">Invoices</h3>
            <p className="text-sm text-slate-500 mt-1">Your invoice history will appear here.</p>
          </div>
        )}
        {activeTab === 'payments' && (
          <div>
            <h3 className="font-semibold text-slate-900">Payments</h3>
            <p className="text-sm text-slate-500 mt-1">Your payment history will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingPage;