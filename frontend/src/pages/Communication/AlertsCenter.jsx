import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { fetchCatalog } from '../../services/catalogService';

export default function AlertsCenter() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => { fetchCatalog().then((d) => setAlerts(d.alerts || [])); }, []);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">COMMAND</div>
          <h1 className="page-title">Alerts</h1>
          <p className="page-description">Overflow, delays, and facility capacity in one place.</p>
        </div>
      </div>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className={`rounded-2xl border p-4 bg-white ${a.severity === 'high' ? 'border-red-200' : a.severity === 'medium' ? 'border-amber-200' : 'border-slate-200'}`}>
            <div className="flex items-start gap-3">
              <Bell className={a.severity === 'high' ? 'text-red-500' : 'text-amber-500'} size={18} />
              <div>
                <p className="font-semibold text-slate-900">{a.title}</p>
                <p className="text-sm text-slate-500 mt-1">{a.detail}</p>
                <p className="text-xs text-slate-400 mt-2">{a.zone} · {new Date(a.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
