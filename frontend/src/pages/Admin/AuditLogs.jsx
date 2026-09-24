const logs = [
  { t: '10:12', actor: 'Kasun Collector', action: 'Logged collection COL-2044' },
  { t: '09:48', actor: 'Nimali Admin', action: 'Scheduled missed pickup SR-2041' },
  { t: '09:02', actor: 'System', action: 'Bin BIN-CMB-014 crossed 90% fill' },
  { t: '08:15', actor: 'Ishara Resident', action: 'Opened special collection request' },
];

export default function AuditLogs() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">Audit log</h1>
          <p className="page-description">Recent operational events.</p>
        </div>
      </div>
      <ul className="space-y-2">
        {logs.map((l) => (
          <li key={l.t + l.action} className="rounded-xl border border-slate-200 bg-white px-4 py-3 flex gap-4">
            <span className="font-mono text-xs text-slate-400 w-12">{l.t}</span>
            <span className="text-sm"><strong>{l.actor}</strong> — {l.action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
