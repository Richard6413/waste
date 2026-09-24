import { useEffect, useState } from 'react';
import { Clock, Recycle } from 'lucide-react';
import { fetchCatalog } from '../../services/catalogService';

export default function DropOffCentres() {
  const [centres, setCentres] = useState([]);
  useEffect(() => { fetchCatalog().then((d) => setCentres(d.centres || [])); }, []);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">COMMUNITY</div>
          <h1 className="page-title">Drop-off centres</h1>
          <p className="page-description">Where residents can take recyclables and bulky waste today.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {centres.map((c) => (
          <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-emerald-600"><Recycle size={18} /><h3 className="font-semibold text-slate-900">{c.name}</h3></div>
            <p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><Clock size={14} />{c.hours} · wait {c.wait}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(c.accepts || []).map((a) => <span key={a} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">{a}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
