const docs = [
  { name: 'Collection SOP 2026', type: 'PDF', updated: '12 Sep 2026' },
  { name: 'Hazardous waste licence', type: 'PDF', updated: '02 Aug 2026' },
  { name: 'Crew safety briefing', type: 'DOC', updated: '21 Sep 2026' },
];

export default function DocumentManagement() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUPPORT</div>
          <h1 className="page-title">Documents</h1>
          <p className="page-description">SOPs and licences for municipal operations.</p>
        </div>
      </div>
      <table className="saas-table rounded-2xl border bg-white overflow-hidden">
        <thead><tr><th>Document</th><th>Type</th><th>Updated</th></tr></thead>
        <tbody>
          {docs.map((d) => (
            <tr key={d.name}><td className="font-semibold">{d.name}</td><td>{d.type}</td><td>{d.updated}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
