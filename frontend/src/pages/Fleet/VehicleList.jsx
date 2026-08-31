// src/pages/Fleet/VehicleList.jsx
import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Truck, Wrench, ChevronDown, Fuel } from 'lucide-react';

const VehicleList = () => {
  const [vehicles] = useState([
    { id: 1, name: 'Truck #001', registration: 'KAA 123A', type: 'Truck', status: 'active', driver: 'John Kamau', utilization: 92 },
    { id: 2, name: 'Truck #002', registration: 'KBB 456B', type: 'Truck', status: 'maintenance', driver: 'Mary Wanjiru', utilization: 0 },
    { id: 3, name: 'Van #003', registration: 'KCC 789C', type: 'Van', status: 'active', driver: 'Peter Ochieng', utilization: 88 },
  ]);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div><div className="page-kicker">FLEET</div><h1 className="page-title">Vehicle Management</h1><p className="page-description">Manage all vehicles</p></div>
        <div className="command-bar"><button className="btn btn-primary"><Plus size={16} />Add Vehicle</button></div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>Vehicle</th><th>Registration</th><th>Type</th><th>Driver</th><th>Utilization</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
          <tbody>{vehicles.map((v) => (
            <tr key={v.id}><td><div className="flex items-center gap-2"><div className={`flex h-8 w-8 items-center justify-center rounded-lg ${v.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}><Truck size={16} /></div><span className="font-semibold">{v.name}</span></div></td><td className="font-mono text-sm">{v.registration}</td><td>{v.type}</td><td>{v.driver}</td><td>{v.utilization}%</td><td><span className={`status ${v.status === 'active' ? 'status-success' : 'status-warning'}`}><span className="status-dot" />{v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span></td><td><div className="flex items-center justify-end gap-1"><button className="p-1.5 rounded-lg hover:bg-slate-100"><Eye size={16} /></button><button className="p-1.5 rounded-lg hover:bg-slate-100"><Edit size={16} /></button><button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={16} /></button></div></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};
export default VehicleList;
