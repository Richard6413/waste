import { Link } from 'react-router-dom';
import { Recycle, Scale } from 'lucide-react';

const types = [
  { name: 'Mixed residual', fee: 'LKR 450 / household', handling: 'Landfill / RDF', color: 'bg-slate-800' },
  { name: 'Recyclable', fee: 'LKR 0 (source-separated)', handling: 'MRF sorting', color: 'bg-emerald-600' },
  { name: 'Organic', fee: 'LKR 120', handling: 'Compost hub', color: 'bg-lime-600' },
  { name: 'Hazardous', fee: 'Special booking', handling: 'Licensed contractor', color: 'bg-red-600' },
  { name: 'E-waste', fee: 'Drop-off only', handling: 'WEEE partner', color: 'bg-indigo-600' },
  { name: 'Bulky', fee: 'LKR 1,500 + tax', handling: 'Special collection', color: 'bg-amber-600' },
];

export default function WasteTypesList() {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE</div>
          <h1 className="page-title">Waste types</h1>
          <p className="page-description">How JEMAK classifies, prices, and processes each stream.</p>
        </div>
        <Link to="/waste/drop-off" className="btn btn-secondary">Drop-off centres</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {types.map((t) => (
          <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4">
            <div className={`h-10 w-10 rounded-xl ${t.color} text-white flex items-center justify-center`}><Recycle size={18} /></div>
            <div>
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Scale size={14} />{t.fee}</p>
              <p className="text-xs text-slate-400 mt-1">{t.handling}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
