import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreateRoute() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ city: 'Colombo', zone: '07', truck: 'UG-12', threshold: 70 });
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => navigate('/ops/routes'), 900);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Create collection route</h1>
          <p className="page-description">Optimise a greedy nearest-neighbour path for trucks over fill threshold.</p>
        </div>
      </div>
      <form onSubmit={submit} className="max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <label className="block text-sm font-medium">City
          <select className="select mt-1 w-full" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
            <option>Colombo</option><option>Kandy</option><option>Galle</option><option>Nuwara Eliya</option>
          </select>
        </label>
        <label className="block text-sm font-medium">Zone
          <input className="input mt-1 w-full" value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} />
        </label>
        <label className="block text-sm font-medium">Truck
          <input className="input mt-1 w-full" value={form.truck} onChange={(e) => setForm({ ...form, truck: e.target.value })} />
        </label>
        <label className="block text-sm font-medium">Bin fill threshold (%)
          <input type="number" min="40" max="95" className="input mt-1 w-full" value={form.threshold} onChange={(e) => setForm({ ...form, threshold: e.target.value })} />
        </label>
        <button className="btn btn-primary" disabled={done}>{done ? 'Route queued…' : 'Optimise & save'}</button>
      </form>
    </div>
  );
}
