import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BatteryCharging, MapPin, RefreshCw, Truck } from 'lucide-react';
import { fetchCatalog } from '../../services/catalogService';

export default function BinNetwork() {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchCatalog();
    setBins(data.bins || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Smart bin network</h1>
          <p className="page-description">Live fill levels across municipal bins. Dispatch before overflow.</p>
        </div>
        <div className="command-bar">
          <button className="btn btn-secondary" onClick={load}><RefreshCw size={16} />Refresh</button>
          <Link to="/ops/routes/create" className="btn btn-primary"><Truck size={16} />Build pickup route</Link>
        </div>
      </div>

      {loading ? <p className="text-slate-500">Loading bins…</p> : (
        <div className="grid gap-4 md:grid-cols-2">
          {bins.map((bin) => (
            <div key={bin.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-slate-500">{bin.id}</p>
                  <h3 className="mt-1 font-semibold text-slate-900">{bin.zone}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={14} />{bin.address}</p>
                </div>
                <span className={`status ${bin.fill >= 85 ? 'status-danger' : bin.fill >= 70 ? 'status-warning' : 'status-success'}`}>
                  {bin.fill >= 85 ? <AlertTriangle size={12} /> : <BatteryCharging size={12} />}
                  {bin.fill}%
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full ${bin.fill >= 85 ? 'bg-red-500' : bin.fill >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${bin.fill}%` }} />
              </div>
              <p className="mt-3 text-xs text-slate-400">{bin.type} waste · last collected {bin.lastCollected ? new Date(bin.lastCollected).toLocaleString() : 'today'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
