const programs = [
  { name: 'Island-wide PET take-back', materials: 'PET bottles', households: 12400, diversion: '18 t / month' },
  { name: 'Kandy composting clubs', materials: 'Kitchen organics', households: 2100, diversion: '6 t / month' },
  { name: 'School e-waste days', materials: 'Phones, chargers', households: 80 schools, diversion: '1.2 t / quarter' },
];

export default function RecyclingManagement() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE</div>
          <h1 className="page-title">Recycling programmes</h1>
          <p className="page-description">Diversion programmes running with municipal partners.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>Programme</th><th>Materials</th><th>Reach</th><th>Diverted</th></tr></thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.name}><td className="font-semibold">{p.name}</td><td>{p.materials}</td><td>{p.households}</td><td>{p.diversion}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
