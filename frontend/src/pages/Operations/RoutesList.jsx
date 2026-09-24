import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const routes = [
  { id: 'RT-N1', name: 'Colombo North A', truck: 'UG-12', driver: 'Kasun Perera', stops: 42, progress: 68, status: 'active' },
  { id: 'RT-E2', name: 'Kandy East loop', truck: 'UG-07', driver: 'Mary Silva', stops: 31, progress: 100, status: 'completed' },
  { id: 'RT-W3', name: 'Galle Fort sweep', truck: 'UG-19', driver: 'N. Fernando', stops: 28, progress: 40, status: 'delayed' },
  { id: 'RT-S4', name: 'Battaramulla residential', truck: 'UG-03', driver: 'I. Jayasuriya', stops: 55, progress: 12, status: 'planned' },
];

export default function RoutesList() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Collection routes</h1>
          <p className="page-description">Today’s planned and in-progress routes.</p>
        </div>
        <Link to="/ops/routes/create" className="btn btn-primary"><Plus size={16} />Create route</Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>Route</th><th>Truck</th><th>Driver</th><th>Stops</th><th>Progress</th><th>Status</th></tr></thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.id}>
                <td><Link className="font-semibold text-emerald-700" to={`/ops/routes/${r.id}`}>{r.name}</Link><div className="text-xs font-mono text-slate-400">{r.id}</div></td>
                <td>{r.truck}</td>
                <td>{r.driver}</td>
                <td>{r.stops}</td>
                <td>
                  <div className="h-1.5 w-24 rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${r.progress}%` }} /></div>
                </td>
                <td><span className={`status ${r.status === 'completed' ? 'status-success' : r.status === 'delayed' ? 'status-danger' : 'status-warning'}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
