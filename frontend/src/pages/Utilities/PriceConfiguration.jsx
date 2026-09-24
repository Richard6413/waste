const rates = [
  { plan: 'Residential standard', monthly: 2450, extraBag: 150 },
  { plan: 'Residential premium (twice weekly)', monthly: 4200, extraBag: 120 },
  { plan: 'SME commercial', monthly: 9800, extraBag: 300 },
];

export default function PriceConfiguration() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">BILLING</div>
          <h1 className="page-title">Price book</h1>
          <p className="page-description">Published LKR tariffs (ex-VAT).</p>
        </div>
      </div>
      <table className="saas-table rounded-2xl border bg-white overflow-hidden">
        <thead><tr><th>Plan</th><th>Monthly</th><th>Extra bag</th></tr></thead>
        <tbody>
          {rates.map((r) => (
            <tr key={r.plan}><td>{r.plan}</td><td>LKR {r.monthly.toLocaleString()}</td><td>LKR {r.extraBag}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
