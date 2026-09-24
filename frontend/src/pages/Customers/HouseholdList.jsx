const households = [
  { id: 'H-1022', name: 'N. Perera', address: '12 Flower Rd, Colombo 07', plan: 'Standard', balance: 2450 },
  { id: 'H-0881', name: 'A. Fernando', address: '88 Kandy Rd, Kadawatha', plan: 'Premium', balance: 0 },
  { id: 'H-2210', name: 'S. Jayawardena', address: '4 Lake Dr, Battaramulla', plan: 'Standard', balance: 4800 },
];

export default function HouseholdList() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">CUSTOMERS</div>
          <h1 className="page-title">Households</h1>
          <p className="page-description">Registered service points on the network.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>ID</th><th>Name</th><th>Address</th><th>Plan</th><th>Balance</th></tr></thead>
          <tbody>
            {households.map((h) => (
              <tr key={h.id}>
                <td className="font-mono text-xs">{h.id}</td>
                <td className="font-semibold">{h.name}</td>
                <td>{h.address}</td>
                <td>{h.plan}</td>
                <td>LKR {h.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
