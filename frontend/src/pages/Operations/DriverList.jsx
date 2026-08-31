// src/pages/Operations/DriverList.jsx
import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, User, Phone, Mail, Star, ChevronDown } from 'lucide-react';

const DriverList = () => {
  const [drivers] = useState([
    { id: 1, name: 'John Kamau', employeeId: 'DRV-001', phone: '+254 712 345 678', status: 'active', rating: 4.8, trips: 234 },
    { id: 2, name: 'Mary Wanjiru', employeeId: 'DRV-002', phone: '+254 723 456 789', status: 'active', rating: 4.9, trips: 198 },
    { id: 3, name: 'Peter Ochieng', employeeId: 'DRV-003', phone: '+254 734 567 890', status: 'on-leave', rating: 4.6, trips: 312 },
  ]);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div><div className="page-kicker">OPERATIONS</div><h1 className="page-title">Driver Management</h1><p className="page-description">Manage all drivers</p></div>
        <div className="command-bar"><button className="btn btn-primary"><Plus size={16} />Add Driver</button></div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>Driver</th><th>ID</th><th>Phone</th><th>Rating</th><th>Trips</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
          <tbody>{drivers.map((d) => (
            <tr key={d.id}><td><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold">{d.name.split(' ').map(n => n[0]).join('')}</div><span className="font-semibold">{d.name}</span></div></td><td className="font-mono text-xs">{d.employeeId}</td><td>{d.phone}</td><td><div className="flex items-center gap-1"><Star size={14} className="text-amber-500 fill-amber-500" /><span className="font-medium">{d.rating}</span></div></td><td className="text-center">{d.trips}</td><td><span className={`status ${d.status === 'active' ? 'status-success' : 'status-warning'}`}><span className="status-dot" />{d.status === 'on-leave' ? 'On Leave' : d.status.charAt(0).toUpperCase() + d.status.slice(1)}</span></td><td><div className="flex items-center justify-end gap-1"><button className="p-1.5 rounded-lg hover:bg-slate-100"><Eye size={16} /></button><button className="p-1.5 rounded-lg hover:bg-slate-100"><Edit size={16} /></button><button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={16} /></button></div></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};
export default DriverList;
