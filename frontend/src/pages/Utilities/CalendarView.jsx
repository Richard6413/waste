import { useMemo, useState } from 'react';

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function CalendarView() {
  const now = new Date();
  const [month] = useState(now.getMonth());
  const [year] = useState(now.getFullYear());
  const days = daysInMonth(year, month);
  const start = new Date(year, month, 1).getDay();
  const pickups = useMemo(() => ({ 2: 'Organic', 4: 'Mixed', 9: 'Recyclable', 11: 'Mixed', 16: 'Organic', 18: 'Mixed', 23: 'Recyclable', 25: 'Mixed' }), []);

  const cells = [];
  for (let i = 0; i < start; i += 1) cells.push(null);
  for (let d = 1; d <= days; d += 1) cells.push(d);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SCHEDULE</div>
          <h1 className="page-title">Collection calendar</h1>
          <p className="page-description">{now.toLocaleString('en-LK', { month: 'long', year: 'numeric' })} pickup days.</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="text-xs font-semibold text-slate-500 text-center py-1">{d}</div>)}
        {cells.map((d, i) => (
          <div key={i} className="min-h-[72px] rounded-xl border border-slate-200 bg-white p-2">
            {d && <div className="text-sm font-semibold">{d}</div>}
            {d && pickups[d] && <div className="mt-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-700">{pickups[d]}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
