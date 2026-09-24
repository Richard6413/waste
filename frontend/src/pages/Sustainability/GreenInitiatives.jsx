const initiatives = [
  { title: 'Source-separation kits', status: 'Active', owner: 'Colombo MC' },
  { title: 'School composting', status: 'Pilot', owner: 'Kandy education office' },
  { title: 'Coastal clean + plastics', status: 'Seasonal', owner: 'Galle Fort' },
];

export default function GreenInitiatives() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUSTAINABILITY</div>
          <h1 className="page-title">Green initiatives</h1>
          <p className="page-description">Programmes the municipality is running this quarter.</p>
        </div>
      </div>
      <div className="space-y-3">
        {initiatives.map((i) => (
          <div key={i.title} className="rounded-2xl border border-slate-200 bg-white p-4 flex justify-between">
            <div>
              <p className="font-semibold">{i.title}</p>
              <p className="text-sm text-slate-500">{i.owner}</p>
            </div>
            <span className="status status-success">{i.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
