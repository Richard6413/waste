export default function ProfilePage({ session }) {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ACCOUNT</div>
          <h1 className="page-title">Profile</h1>
          <p className="page-description">Your JEMAK workspace identity.</p>
        </div>
      </div>
      <div className="max-w-xl rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
        <p><span className="text-slate-500 text-sm">Name</span><br /><strong>{session?.name || '—'}</strong></p>
        <p><span className="text-slate-500 text-sm">Email</span><br /><strong>{session?.email || '—'}</strong></p>
        <p><span className="text-slate-500 text-sm">Role</span><br /><strong className="capitalize">{session?.role || 'user'}</strong></p>
        {session?.demo && <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-3">You are using a local demo session. Firebase is optional.</p>}
      </div>
    </div>
  );
}
