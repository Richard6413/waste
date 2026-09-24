const forecasts = [
  { zone: 'Colombo 07', tomorrow: 'High overflow risk', confidence: '86%' },
  { zone: 'Kandy city', tomorrow: 'Normal load', confidence: '74%' },
  { zone: 'Galle Fort', tomorrow: 'Tourist spike — extra truck', confidence: '69%' },
];

export default function PredictiveAnalytics() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">Demand forecast</h1>
          <p className="page-description">Next-day fill and tourist-load predictions for dispatch.</p>
        </div>
      </div>
      <table className="saas-table rounded-2xl border bg-white overflow-hidden">
        <thead><tr><th>Zone</th><th>Outlook</th><th>Confidence</th></tr></thead>
        <tbody>
          {forecasts.map((f) => (
            <tr key={f.zone}><td className="font-semibold">{f.zone}</td><td>{f.tomorrow}</td><td>{f.confidence}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
