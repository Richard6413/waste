#!/bin/bash

echo "📁 Creating missing Operations pages..."

cd frontend || exit

# ============================================================
# 1. Create ManageCollectionOpsPage
# ============================================================
mkdir -p src/pages/ManageCollectionOps

cat > src/pages/ManageCollectionOps/ManageCollectionOpsPage.jsx << 'EOF'
// src/pages/ManageCollectionOps/ManageCollectionOpsPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, MapPin, CalendarClock, Users, 
  Route as RouteIcon, Clock, CheckCircle,
  AlertTriangle, ArrowRight, Plus,
  BarChart3, Package, Activity
} from 'lucide-react';

const ManageCollectionOpsPage = () => {
  const [stats] = useState({
    activeRoutes: 8,
    totalCollections: 156,
    completionRate: 94.2,
    activeCrews: 14,
    pendingCollections: 23,
    delayedRoutes: 3
  });

  const quickActions = [
    { title: 'View Routes', icon: RouteIcon, to: '/ops/routes', color: 'bg-emerald-500' },
    { title: 'Create Route', icon: Plus, to: '/ops/routes/create', color: 'bg-blue-500' },
    { title: 'Active Collections', icon: Activity, to: '/ops/collections/in-progress', color: 'bg-amber-500' },
    { title: 'View Records', icon: Package, to: '/ops/collections', color: 'bg-purple-500' },
    { title: 'Driver Management', icon: Users, to: '/ops/drivers', color: 'bg-indigo-500' },
    { title: 'Live Tracking', icon: MapPin, to: '/ops/vehicles/tracking', color: 'bg-red-500' },
  ];

  const recentRoutes = [
    { id: 1, name: 'North Zone A', driver: 'John Kamau', progress: 75, status: 'active' },
    { id: 2, name: 'East Side B', driver: 'Mary Wanjiru', progress: 100, status: 'completed' },
    { id: 3, name: 'West District C', driver: 'Peter Ochieng', progress: 45, status: 'delayed' },
    { id: 4, name: 'South Region D', driver: 'Grace Akinyi', progress: 90, status: 'active' },
  ];

  return (
    <div className="workspace-content fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">Collection Operations</h1>
          <p className="page-description">
            Plan, dispatch and monitor collection routes across the network
          </p>
        </div>
        <div className="command-bar">
          <Link to="/ops/routes/create" className="btn btn-primary">
            <Plus size={16} />
            New Route
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Truck size={14} />Active Routes</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.activeRoutes}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Completed Today</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.totalCollections}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><AlertTriangle size={14} className="text-amber-500" />Delayed</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.delayedRoutes}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs"><Users size={14} />Active Crews</div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.activeCrews}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} to={action.to} className={`flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${action.color} text-white`}>
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-medium text-slate-700 text-center">{action.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Routes Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Active Routes</h3>
            <p className="panel-description">Real-time progress of today's collections</p>
          </div>
          <Link to="/ops/routes" className="panel-action">View All →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="saas-table">
            <thead><tr><th>Route</th><th>Driver</th><th>Progress</th><th>Status</th></tr></thead>
            <tbody>
              {recentRoutes.map((route) => (
                <tr key={route.id}>
                  <td className="font-semibold">{route.name}</td>
                  <td>{route.driver}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${route.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">{route.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status ${route.status === 'active' ? 'status-success' : route.status === 'completed' ? 'status-neutral' : 'status-warning'}`}>
                      <span className="status-dot" />
                      {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                    </span>
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

export default ManageCollectionOpsPage;
EOF

echo "✅ Created ManageCollectionOpsPage.jsx"

# ============================================================
# 2. Create RoutesList.jsx (if you have RouteList, rename it)
# ============================================================
if [ ! -f "src/pages/Operations/RoutesList.jsx" ]; then
  if [ -f "src/pages/Operations/RouteList.jsx" ]; then
    mv src/pages/Operations/RouteList.jsx src/pages/Operations/RoutesList.jsx
    echo "✅ Renamed RouteList.jsx → RoutesList.jsx"
  else
    cat > src/pages/Operations/RoutesList.jsx << 'EOF'
// src/pages/Operations/RoutesList.jsx
import { useState } from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2, MapPin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoutesList = () => {
  const [routes] = useState([
    { id: 1, name: 'North Zone A', region: 'North', driver: 'John Kamau', stops: 45, status: 'active' },
    { id: 2, name: 'East Side B', region: 'East', driver: 'Mary Wanjiru', stops: 38, status: 'scheduled' },
    { id: 3, name: 'West District C', region: 'West', driver: 'Peter Ochieng', stops: 52, status: 'delayed' },
    { id: 4, name: 'South Region D', region: 'South', driver: 'Grace Akinyi', stops: 40, status: 'active' },
  ]);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div><div className="page-kicker">OPERATIONS</div><h1 className="page-title">Collection Routes</h1><p className="page-description">Manage all collection routes</p></div>
        <div className="command-bar">
          <Link to="/ops/routes/create" className="btn btn-primary"><Plus size={16} />New Route</Link>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <table className="saas-table">
          <thead><tr><th>Route Name</th><th>Region</th><th>Driver</th><th>Stops</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
          <tbody>{routes.map((r) => (
            <tr key={r.id}><td><div className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /><span className="font-semibold">{r.name}</span></div></td><td>{r.region}</td><td>{r.driver}</td><td className="text-center">{r.stops}</td><td><span className={`status ${r.status === 'active' ? 'status-success' : r.status === 'delayed' ? 'status-warning' : 'status-neutral'}`}><span className="status-dot" />{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td><td><div className="flex items-center justify-end gap-1"><button className="p-1.5 rounded-lg hover:bg-slate-100"><Eye size={16} /></button><button className="p-1.5 rounded-lg hover:bg-slate-100"><Edit size={16} /></button><button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={16} /></button></div></td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};
export default RoutesList;
EOF
    echo "✅ Created RoutesList.jsx"
  fi
fi

# ============================================================
# 3. Create DriverList.jsx
# ============================================================
cat > src/pages/Operations/DriverList.jsx << 'EOF'
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
EOF
echo "✅ Created DriverList.jsx"

# ============================================================
# 4. Create Fleet/VehicleList.jsx
# ============================================================
mkdir -p src/pages/Fleet

cat > src/pages/Fleet/VehicleList.jsx << 'EOF'
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
EOF
echo "✅ Created Fleet/VehicleList.jsx"

# ============================================================
# 5. Create LiveTracking.jsx (if missing)
# ============================================================
if [ ! -f "src/pages/Operations/LiveTracking.jsx" ]; then
  cat > src/pages/Operations/LiveTracking.jsx << 'EOF'
// src/pages/Operations/LiveTracking.jsx
import { useState } from 'react';
import { MapPin, Truck, RefreshCw, Filter, Clock, Navigation, Users } from 'lucide-react';

const LiveTracking = () => {
  const [vehicles] = useState([
    { id: 1, name: 'Truck #001', driver: 'John Kamau', speed: 45, status: 'moving', route: 'North Zone A', progress: 65 },
    { id: 2, name: 'Truck #002', driver: 'Mary Wanjiru', speed: 0, status: 'stopped', route: 'East Side B', progress: 100 },
    { id: 3, name: 'Truck #003', driver: 'Peter Ochieng', speed: 30, status: 'moving', route: 'West District C', progress: 45 },
  ]);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div><div className="page-kicker">OPERATIONS</div><h1 className="page-title">Live Tracking</h1><p className="page-description">Real-time GPS tracking of all active vehicles</p></div>
        <div className="command-bar"><button className="command-button"><RefreshCw size={16} className="animate-spin" />Auto-refresh</button><button className="command-button"><Filter size={16} />Filter</button></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Truck size={14} />Active Vehicles</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.length}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Navigation size={14} className="text-emerald-500" />Moving</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.filter(v => v.status === 'moving').length}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14} className="text-amber-500" />Stopped</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.filter(v => v.status === 'stopped').length}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Users size={14} />Active Drivers</div><p className="text-xl font-bold text-slate-900 mt-1">{vehicles.length}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="rounded-2xl border bg-white p-4">
            <div className="flex items-start justify-between">
              <div><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${v.status === 'moving' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} /><h3 className="font-semibold text-slate-900">{v.name}</h3></div><p className="text-sm text-slate-500">Driver: {v.driver}</p><p className="text-sm text-slate-500">{v.route}</p></div>
              <div className="text-right"><div className="text-lg font-bold text-slate-900">{v.speed} km/h</div><div className="text-xs text-slate-400">{v.progress}%</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LiveTracking;
EOF
  echo "✅ Created LiveTracking.jsx"
fi

echo ""
echo "========================================"
echo "✅ All missing pages created!"
echo "========================================"
echo ""
echo "📁 Created:"
echo "  - ManageCollectionOpsPage.jsx"
echo "  - RoutesList.jsx (renamed from RouteList if existed)"
echo "  - DriverList.jsx"
echo "  - Fleet/VehicleList.jsx"
echo "  - LiveTracking.jsx"
echo ""
echo "🚀 Now run: npm run dev"