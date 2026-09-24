import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { createServiceRequest, fetchCatalog, patchServiceRequest } from '../../services/catalogService';

export default function ServiceRequests() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ type: 'missed-pickup', household: '', address: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const data = await fetchCatalog();
    setItems(data.requests || []);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const created = await createServiceRequest(form);
    setItems((prev) => [created, ...prev]);
    setForm({ type: 'missed-pickup', household: '', address: '', notes: '' });
    setSaving(false);
  };

  const advance = async (id) => {
    await patchServiceRequest(id, 'scheduled');
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'scheduled' } : r)));
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">RESIDENTS</div>
          <h1 className="page-title">Service requests</h1>
          <p className="page-description">Missed pickups, bulky items, and bin repairs.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <form onSubmit={submit} className="lg:col-span-2 space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">New request</h2>
          <select className="select w-full" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="missed-pickup">Missed pickup</option>
            <option value="bulky-item">Bulky item</option>
            <option value="bin-repair">Bin repair</option>
            <option value="extra-bag">Extra bags</option>
          </select>
          <input className="input w-full" placeholder="Household name" value={form.household} onChange={(e) => setForm({ ...form, household: e.target.value })} required />
          <input className="input w-full" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
          <textarea className="input w-full min-h-[90px]" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button className="btn btn-primary w-full" disabled={saving}><Plus size={16} />{saving ? 'Submitting…' : 'Submit request'}</button>
        </form>

        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <table className="saas-table">
            <thead><tr><th>ID</th><th>Type</th><th>Household</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td className="capitalize">{String(r.type).replace('-', ' ')}</td>
                  <td>{r.household}<div className="text-xs text-slate-400">{r.address}</div></td>
                  <td><span className={`status ${r.status === 'open' ? 'status-warning' : 'status-success'}`}>{r.status}</span></td>
                  <td>{r.status === 'open' && <button className="btn btn-secondary text-xs" onClick={() => advance(r.id)}>Schedule</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
