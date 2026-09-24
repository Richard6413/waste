import { useParams, Link } from 'react-router-dom';

export default function RouteDetails() {
  const { id } = useParams();
  const stops = [
    { n: 1, bin: 'BIN-CMB-014', address: 'Independence Ave', done: true },
    { n: 2, bin: 'BIN-CMB-028', address: 'Havelock Road', done: true },
    { n: 3, bin: 'BIN-CMB-041', address: 'Galle Face Court', done: false },
    { n: 4, bin: 'BIN-CMB-052', address: 'Bauddhaloka Mawatha', done: false },
  ];

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Route {id || 'today'}</h1>
          <p className="page-description">Stop sequence and collection status.</p>
        </div>
        <Link to="/ops/routes" className="btn btn-secondary">Back to routes</Link>
      </div>
      <ol className="space-y-3">
        {stops.map((s) => (
          <li key={s.n} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold">{s.n}</span>
            <div className="flex-1">
              <p className="font-semibold">{s.bin}</p>
              <p className="text-sm text-slate-500">{s.address}</p>
            </div>
            <span className={`status ${s.done ? 'status-success' : 'status-warning'}`}>{s.done ? 'Collected' : 'Pending'}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
