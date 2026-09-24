const rows = [
  { stream: 'Diesel fleet', t: 28.4, note: 'Collections' },
  { stream: 'Avoided landfill methane', t: -42.8, note: 'Diversion credit' },
  { stream: 'Compost substitution', t: -6.1, note: 'Vs chemical fertiliser' },
];

export default function CarbonTracking() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUSTAINABILITY</div>
          <h1 className="page-title">Carbon tracking</h1>
          <p className="page-description">Quarterly tCO₂e inventory (illustrative LCA factors).</p>
        </div>
      </div>
      <table className="saas-table rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <thead><tr><th>Source</th><th>tCO₂e</th><th></th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.stream}><td>{r.stream}</td><td className={r.t < 0 ? 'text-emerald-700 font-semibold' : ''}>{r.t}</td><td className="text-sm text-slate-500">{r.note}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
