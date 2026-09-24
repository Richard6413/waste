const kpis = [
  { label: 'CO₂ avoided', value: '42.8 t', note: 'vs landfill baseline this quarter' },
  { label: 'Recycling rate', value: '31%', note: '+4 pts vs last quarter' },
  { label: 'Compost produced', value: '18 t', note: 'Kandy + Galle hubs' },
];

export default function SustainabilityDashboard() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUSTAINABILITY</div>
          <h1 className="page-title">Environmental impact</h1>
          <p className="page-description">Diversion and carbon outcomes for the municipality.</p>
        </div>
      </div>
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="kpi-card">
            <p className="kpi-label">{k.label}</p>
            <p className="kpi-value">{k.value}</p>
            <p className="text-xs text-slate-500 mt-2">{k.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
