const faqs = [
  { q: 'When is my regular collection?', a: 'Most Colombo households are collected Tue and Fri before 11:00. Open Schedule for your zone.' },
  { q: 'How do I request a bulky pickup?', a: 'Use Service requests or Special collection. Items over 20 kg may require payment.' },
  { q: 'Why was my bin skipped?', a: 'Common causes: blocked access, contaminated recyclables, or a delayed truck. File a missed-pickup request.' },
  { q: 'How do I pay a bill?', a: 'Open Billing → outstanding invoices. Stripe checkout is used when enabled.' },
];

export default function HelpSupport() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUPPORT</div>
          <h1 className="page-title">Help centre</h1>
          <p className="page-description">Answers for residents, crews, and municipal staff.</p>
        </div>
      </div>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-500">Still stuck? Email ops-team@smartwaste.lk or call 1919.</p>
    </div>
  );
}
