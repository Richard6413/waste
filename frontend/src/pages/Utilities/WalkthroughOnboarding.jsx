export default function WalkthroughOnboarding() {
  const steps = [
    'Sign in with a demo role (admin, collector, resident).',
    'Open Smart bins to see overflow risk.',
    'Create a service request for a missed pickup.',
    'Check drop-off centres before hauling recyclables yourself.',
    'Redeem recycle rewards after source-separation.',
  ];
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUPPORT</div>
          <h1 className="page-title">Getting started</h1>
          <p className="page-description">Five-minute tour of the JEMAK workspace.</p>
        </div>
      </div>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="rounded-2xl border bg-white p-4 flex gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-sm">{i + 1}</span>
            <p>{s}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
