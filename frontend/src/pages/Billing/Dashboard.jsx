import { Link } from 'react-router-dom';

const invoices = [
  { id: 'INV-8821', household: 'N. Perera', amount: 2450, status: 'due', due: '30 Sep 2026' },
  { id: 'INV-8819', household: 'A. Fernando', amount: 2450, status: 'paid', due: '15 Sep 2026' },
  { id: 'INV-8814', household: 'S. Jayawardena', amount: 4800, status: 'overdue', due: '10 Sep 2026' },
];

export default function BillingDashboard() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">BILLING</div>
          <h1 className="page-title">Billing</h1>
          <p className="page-description">Invoices, payments, and outstanding municipal charges.</p>
        </div>
        <Link to="/billing/invoices/create" className="btn btn-primary">Generate invoice</Link>
      </div>
      <div className="kpi-grid mb-6">
        <div className="kpi-card"><p className="kpi-label">Collected this month</p><p className="kpi-value">LKR 2.1M</p></div>
        <div className="kpi-card"><p className="kpi-label">Outstanding</p><p className="kpi-value">LKR 8.4M</p></div>
        <div className="kpi-card"><p className="kpi-label">Overdue accounts</p><p className="kpi-value">31</p></div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>Invoice</th><th>Household</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id}>
                <td className="font-mono text-xs">{i.id}</td>
                <td>{i.household}</td>
                <td>LKR {i.amount.toLocaleString()}</td>
                <td>{i.due}</td>
                <td><span className={`status ${i.status === 'paid' ? 'status-success' : i.status === 'overdue' ? 'status-danger' : 'status-warning'}`}>{i.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
