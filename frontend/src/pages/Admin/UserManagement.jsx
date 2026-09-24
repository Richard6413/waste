const users = [
  { name: 'Nimali Admin', email: 'admin@jemakwaste.com', role: 'admin' },
  { name: 'Kasun Collector', email: 'collector@jemakwaste.com', role: 'collector' },
  { name: 'Ishara Resident', email: 'resident@jemakwaste.com', role: 'user' },
];

export default function UserManagement() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">Users & roles</h1>
          <p className="page-description">Demo accounts plus Firebase-backed users when configured.</p>
        </div>
      </div>
      <table className="saas-table rounded-2xl overflow-hidden border border-slate-200 bg-white">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}><td className="font-semibold">{u.name}</td><td>{u.email}</td><td className="capitalize">{u.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
