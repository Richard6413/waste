import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Mon', kg: 12.4 },
  { name: 'Tue', kg: 18.1 },
  { name: 'Wed', kg: 15.6 },
  { name: 'Thu', kg: 21.0 },
  { name: 'Fri', kg: 19.4 },
  { name: 'Sat', kg: 8.2 },
  { name: 'Sun', kg: 4.1 },
];

export default function AnalyticsDashboard() {
  const [zone, setZone] = useState('All');
  const total = useMemo(() => data.reduce((s, d) => s + d.kg, 0).toFixed(1), []);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">Performance analytics</h1>
          <p className="page-description">Tonnes collected this week by zone.</p>
        </div>
        <select className="select" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option>All</option><option>Colombo</option><option>Kandy</option><option>Galle</option>
        </select>
      </div>
      <p className="mb-4 text-sm text-slate-500">Total {total} t · view {zone}</p>
      <div className="h-72 rounded-2xl border border-slate-200 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="kg" fill="#059669" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
