import { useState } from 'react';
import { createIncident } from '../../services/catalogService';

export default function IncidentReports() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ type: 'hazard', title: '', zone: '', crew: '' });

  const submit = async (e) => {
    e.preventDefault();
    const created = await createIncident(form);
    setItems((prev) => [created, ...prev]);
    setForm({ type: 'hazard', title: '', zone: '', crew: '' });
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">FIELD</div>
          <h1 className="page-title">Crew incident reports</h1>
          <p className="page-description">Log hazards, blocked access, and vehicle issues from the field.</p>
        </div>
      </div>
      <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-4">
        <select className="select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="hazard">Hazard</option>
          <option value="access">Access blocked</option>
          <option value="vehicle">Vehicle issue</option>
        </select>
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="input" placeholder="Zone" value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} required />
        <button className="btn btn-primary">Log incident</button>
      </form>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>ID</th><th>Type</th><th>Title</th><th>Zone</th><th>Status</th></tr></thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={5} className="text-slate-500">No new incidents this session. Submit one above.</td></tr>}
            {items.map((i) => (
              <tr key={i.id}><td className="font-mono text-xs">{i.id}</td><td>{i.type}</td><td>{i.title}</td><td>{i.zone}</td><td>{i.status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
