// src/pages/Operations/CollectionRecords.jsx
import { useState } from 'react';
import { 
  Search, Filter, Plus, Download, 
  Calendar, Truck, User, Package,
  ChevronDown, Eye, Edit, Trash2,
  CheckCircle, XCircle, Clock, AlertTriangle
} from 'lucide-react';

const CollectionRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  const collections = [
    {
      id: 1,
      collectionId: 'COL-2024-001',
      household: 'John Doe',
      address: '123 Main St',
      region: 'North',
      wasteType: 'Mixed Waste',
      weight: 32.5,
      status: 'completed',
      driver: 'John Kamau',
      vehicle: 'Truck #001',
      date: '2024-01-15',
      time: '08:30 AM',
      notes: 'Regular collection'
    },
    {
      id: 2,
      collectionId: 'COL-2024-002',
      household: 'Jane Smith',
      address: '456 Oak Ave',
      region: 'East',
      wasteType: 'Recyclable',
      weight: 28.0,
      status: 'verified',
      driver: 'Mary Wanjiru',
      vehicle: 'Truck #003',
      date: '2024-01-15',
      time: '09:15 AM',
      notes: 'Recyclable materials separated'
    },
    {
      id: 3,
      collectionId: 'COL-2024-003',
      household: 'Bob Johnson',
      address: '789 Pine Rd',
      region: 'West',
      wasteType: 'Hazardous',
      weight: 15.2,
      status: 'pending',
      driver: 'Peter Ochieng',
      vehicle: 'Truck #005',
      date: '2024-01-15',
      time: '10:00 AM',
      notes: 'Special handling required'
    },
    {
      id: 4,
      collectionId: 'COL-2024-004',
      household: 'Alice Brown',
      address: '101 Elm St',
      region: 'South',
      wasteType: 'Organic',
      weight: 42.8,
      status: 'failed',
      driver: 'Grace Akinyi',
      vehicle: 'Truck #007',
      date: '2024-01-14',
      time: '11:30 AM',
      notes: 'Access blocked - rescheduled'
    },
    {
      id: 5,
      collectionId: 'COL-2024-005',
      household: 'Charlie Wilson',
      address: '202 Maple Dr',
      region: 'North',
      wasteType: 'Mixed Waste',
      weight: 23.4,
      status: 'completed',
      driver: 'John Kamau',
      vehicle: 'Truck #001',
      date: '2024-01-14',
      time: '02:15 PM',
      notes: ''
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'status-success',
      verified: 'status-success',
      pending: 'status-warning',
      failed: 'status-danger'
    };
    return colors[status] || 'status-neutral';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircle size={14} />,
      verified: <CheckCircle size={14} />,
      pending: <Clock size={14} />,
      failed: <XCircle size={14} />
    };
    return icons[status] || <AlertTriangle size={14} />;
  };

  const totalCollections = collections.length;
  const completedCount = collections.filter(c => c.status === 'completed' || c.status === 'verified').length;
  const pendingCount = collections.filter(c => c.status === 'pending').length;
  const failedCount = collections.filter(c => c.status === 'failed').length;
  const totalWeight = collections.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Collection Records</h1>
          <p className="page-description">Complete history of all waste collections across the network</p>
        </div>
        <div className="command-bar">
          <button className="btn btn-secondary"><Download size={16} />Export</button>
          <button className="btn btn-primary"><Plus size={16} />Log Collection</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} />Total Collections</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{totalCollections}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{completedCount}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Pending</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{pendingCount}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Package size={14} className="text-blue-500" />Total Weight</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{totalWeight.toFixed(1)} kg</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by ID, household, or address..." className="input pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <select className="select min-w-[140px] appearance-none pr-10" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <input type="date" className="select min-w-[160px]" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
          </div>
          <button className="btn btn-secondary"><Filter size={16} />Filters</button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="saas-table">
            <thead>
              <tr>
                <th>Collection ID</th>
                <th>Household</th>
                <th>Address</th>
                <th>Waste Type</th>
                <th className="text-center">Weight</th>
                <th>Driver</th>
                <th>Date/Time</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <tr key={collection.id} className="slide-up">
                  <td><span className="font-mono text-xs font-semibold text-slate-600">{collection.collectionId}</span></td>
                  <td>{collection.household}</td>
                  <td className="text-sm">{collection.address}</td>
                  <td>{collection.wasteType}</td>
                  <td className="text-center font-medium">{collection.weight} kg</td>
                  <td>{collection.driver}</td>
                  <td>
                    <div className="text-sm">{collection.date}</div>
                    <div className="text-xs text-slate-400">{collection.time}</div>
                  </td>
                  <td>
                    <span className={`status ${getStatusColor(collection.status)}`}>
                      {getStatusIcon(collection.status)}
                      {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Eye size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Edit size={16} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollectionRecords;