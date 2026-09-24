import { useEffect, useState } from 'react';

export default function SystemHealthMonitor() {
  const [api, setApi] = useState('checking');

  useEffect(() => {
    fetch('/health')
      .then((r) => (r.ok ? setApi('up') : setApi('down')))
      .catch(() => setApi('down'));
  }, []);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">System health</h1>
          <p className="page-description">Heartbeat for the local API and catalog services.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-xs text-slate-500">API /health</p>
          <p className={`mt-2 text-xl font-bold ${api === 'up' ? 'text-emerald-600' : api === 'checking' ? 'text-slate-400' : 'text-red-600'}`}>{api}</p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-xs text-slate-500">Catalog</p>
          <p className="mt-2 text-xl font-bold text-emerald-600">in-memory</p>
        </div>
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-xs text-slate-500">MongoDB</p>
          <p className="mt-2 text-sm text-slate-500">Optional — whitelist this IP in Atlas to enable billing & auth APIs.</p>
        </div>
      </div>
    </div>
  );
}
