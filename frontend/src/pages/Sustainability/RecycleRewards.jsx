import { Award, Recycle } from 'lucide-react';
import { useState } from 'react';

const ledger = [
  { id: 1, action: 'Sorted recyclables at Biyagama', points: 40, date: '24 Sep' },
  { id: 2, action: 'On-time bill payment', points: 15, date: '18 Sep' },
  { id: 3, action: 'Reported illegal dump', points: 25, date: '12 Sep' },
];

export default function RecycleRewards() {
  const [claimed, setClaimed] = useState(false);
  const total = ledger.reduce((s, r) => s + r.points, 0);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">RESIDENTS</div>
          <h1 className="page-title">Recycle rewards</h1>
          <p className="page-description">Earn points for sorting, reporting dumps, and paying on time.</p>
        </div>
      </div>
      <div className="kpi-grid mb-6">
        <div className="kpi-card">
          <div className="kpi-header">
            <div>
              <p className="kpi-label">Balance</p>
              <p className="kpi-value">{total} pts</p>
            </div>
            <div className="kpi-icon kpi-icon-green"><Award size={20} /></div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold mb-3">Activity</h2>
        <ul className="space-y-3">
          {ledger.map((r) => (
            <li key={r.id} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2"><Recycle size={14} className="text-emerald-600" />{r.action}</span>
              <span className="font-semibold text-emerald-700">+{r.points}</span>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary mt-5" disabled={claimed} onClick={() => setClaimed(true)}>
          {claimed ? 'Coupon reserved — check email' : 'Redeem 50 pts for compost bag'}
        </button>
      </div>
    </div>
  );
}
