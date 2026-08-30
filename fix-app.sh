#!/bin/bash

# ============================================================
# JEMAK Waste Management - Fix Script
# This script creates all missing files and installs dependencies
# ============================================================

echo "🚀 Starting JEMAK Waste Management Fix..."

# Change to frontend directory
cd frontend || exit

# ============================================================
# 1. Install Missing Dependencies
# ============================================================
echo ""
echo "📦 Installing missing dependencies..."
npm install recharts @mui/material @emotion/react @emotion/styled @mui/icons-material lucide-react jspdf xlsx --save

# ============================================================
# 2. Create Missing Pages
# ============================================================
echo ""
echo "📁 Creating missing pages..."

# Create pages directory structure
mkdir -p src/pages/fleet
mkdir -p src/pages/admin
mkdir -p src/pages/advanced
mkdir -p src/pages/operations
mkdir -p src/pages/analytics
mkdir -p src/pages/billing
mkdir -p src/pages/customers
mkdir -p src/pages/waste
mkdir -p src/pages/sustainability
mkdir -p src/pages/utilities
mkdir -p src/pages/Auth
mkdir -p src/pages/Dashboards
mkdir -p src/pages/Schedule
mkdir -p src/pages/ManageCollectionOps
mkdir -p src/components/layout

# ============================================================
# 3. Create Home Page
# ============================================================
echo ""
echo "🏠 Creating Home page..."
cat > src/pages/Home.jsx << 'EOF'
// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, MapPinned, CalendarClock, 
  BarChart3, Truck, Route as RouteIcon, 
  Gauge, WalletCards, Users, 
  ArrowUpRight, CheckCircle2, AlertTriangle,
  PackageCheck, Activity, Clock3, Recycle,
  CircleDollarSign, ClipboardCheck
} from 'lucide-react';

const Home = ({ session }) => {
  const stats = [
    { label: 'Collections Today', value: '148', change: '+12.4%', description: 'vs. yesterday', icon: Truck, type: 'green' },
    { label: 'Active Routes', value: '18', change: '14 crews', description: 'currently deployed', icon: RouteIcon, type: 'blue' },
    { label: 'Completion Rate', value: '94.2%', change: '+2.5%', description: 'vs. last month', icon: Gauge, type: 'amber' },
    { label: 'Outstanding Balance', value: 'UGX 8.4M', change: '31 accounts', description: 'require attention', icon: WalletCards, type: 'red' },
  ];

  const quickActions = [
    { title: 'Plan Collection', description: 'Create or optimize routes', icon: MapPinned, to: '/ops' },
    { title: 'View Schedule', description: 'Review upcoming pickups', icon: CalendarClock, to: '/schedule' },
    { title: 'Collection Teams', description: 'Monitor field activity', icon: Users, to: '/ops' },
    { title: 'View Reports', description: 'Analyze performance', icon: BarChart3, to: '/analytics' },
  ];

  const activity = [
    { icon: CheckCircle2, title: 'Route KLA-07 completed successfully', time: '12 minutes ago', type: 'green' },
    { icon: Truck, title: 'Collection vehicle SW-014 started route', time: '28 minutes ago', type: 'blue' },
    { icon: AlertTriangle, title: '3 customer accounts require payment follow-up', time: '41 minutes ago', type: 'amber' },
    { icon: PackageCheck, title: '126 scheduled collections confirmed', time: '1 hour ago', type: 'green' },
  ];

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">Command Center</div>
          <h1 className="page-title">Good day{session?.name ? `, ${session.name.split(' ')[0]}` : ''}</h1>
          <p className="page-description">Here's what's happening across your waste collection network today.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status status-success"><span className="status-dot bg-emerald-500" />Operations normal</span>
          <Link to="/ops" className="btn btn-primary"><MapPinned className="h-4 w-4" />Open Operations</Link>
        </div>
      </div>

      <section className="kpi-grid">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="kpi-card">
              <div className="kpi-header">
                <div>
                  <p className="kpi-label">{stat.label}</p>
                  <p className="kpi-value">{stat.value}</p>
                </div>
                <div className={\`kpi-icon kpi-icon-\${stat.type}\`}><Icon className="h-5 w-5" /></div>
              </div>
              <div className="kpi-meta">
                <span className={stat.type === 'red' ? 'text-amber-600 font-semibold' : 'kpi-positive'}>{stat.change}</span>
                <span className="kpi-neutral">{stat.description}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="workspace-panel mt-5">
        <div className="panel-header">
          <div><h2 className="panel-title">Quick actions</h2><p className="panel-description">Common operational tasks</p></div>
        </div>
        <div className="panel-body">
          <div className="action-grid">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.to} className="action-tile">
                  <div className="action-tile-icon"><Icon className="h-4 w-4" /></div>
                  <div>
                    <div className="action-tile-title">{action.title}</div>
                    <div className="action-tile-description">{action.description}</div>
                  </div>
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-slate-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="workspace-panel panel-span-8">
          <div className="panel-header">
            <div><h2 className="panel-title">Today's collection activity</h2><p className="panel-description">Live overview of current field operations</p></div>
            <Link to="/ops" className="panel-action">Open operations</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="saas-table">
              <thead><tr><th>Route</th><th>Vehicle</th><th>Collections</th><th>Progress</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td className="font-semibold">KLA-07</td><td>SW-014</td><td>34 / 40</td>
                  <td><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: '85%' }} /></div><span className="text-[10px] font-semibold text-slate-500">85%</span></div></td>
                  <td><span className="status status-success"><span className="status-dot bg-emerald-500" />Active</span></td></tr>
                <tr><td className="font-semibold">KLA-03</td><td>SW-009</td><td>29 / 32</td>
                  <td><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: '91%' }} /></div><span className="text-[10px] font-semibold text-slate-500">91%</span></div></td>
                  <td><span className="status status-success"><span className="status-dot bg-emerald-500" />Active</span></td></tr>
                <tr><td className="font-semibold">KLA-11</td><td>SW-021</td><td>42 / 42</td>
                  <td><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} /></div><span className="text-[10px] font-semibold text-slate-500">100%</span></div></td>
                  <td><span className="status status-neutral"><span className="status-dot bg-slate-400" />Complete</span></td></tr>
                <tr><td className="font-semibold">KLA-15</td><td>SW-018</td><td>17 / 28</td>
                  <td><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-amber-500" style={{ width: '61%' }} /></div><span className="text-[10px] font-semibold text-slate-500">61%</span></div></td>
                  <td><span className="status status-warning"><span className="status-dot bg-amber-500" />Delayed</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="workspace-panel panel-span-4">
          <div className="panel-header">
            <div><h2 className="panel-title">Recent activity</h2><p className="panel-description">Latest system events</p></div>
            <Activity className="h-4 w-4 text-slate-400" />
          </div>
          <div className="activity-list">
            {activity.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="activity-item">
                  <div className={\`activity-icon \${item.type === 'green' ? 'bg-emerald-50 text-emerald-600' : item.type === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}\`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">{item.title}</p>
                    <p className="activity-time">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="workspace-grid">
        <section className="workspace-panel panel-span-8">
          <div className="panel-header">
            <div><h2 className="panel-title">Network performance</h2><p className="panel-description">Collection completion trend</p></div>
            <span className="status status-success">+2.5% this month</span>
          </div>
          <div className="panel-body">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2"><ClipboardCheck className="h-4 w-4 text-emerald-600" /><span className="text-xs font-semibold text-slate-500">Completed</span></div><p className="mt-2 text-xl font-bold text-slate-900">1,247</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-amber-600" /><span className="text-xs font-semibold text-slate-500">Pending</span></div><p className="mt-2 text-xl font-bold text-slate-900">84</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><div className="flex items-center gap-2"><Recycle className="h-4 w-4 text-blue-600" /><span className="text-xs font-semibold text-slate-500">Efficiency</span></div><p className="mt-2 text-xl font-bold text-slate-900">91.8%</p></div>
            </div>
          </div>
        </section>

        <section className="workspace-panel panel-span-4">
          <div className="panel-header">
            <div><h2 className="panel-title">Account attention</h2><p className="panel-description">Items requiring review</p></div>
          </div>
          <div className="panel-body space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-amber-600"><CircleDollarSign className="h-4 w-4" /></div>
              <div className="flex-1"><p className="text-xs font-bold text-slate-800">Outstanding payments</p><p className="text-[11px] text-slate-500">31 accounts</p></div>
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-600"><AlertTriangle className="h-4 w-4" /></div>
              <div className="flex-1"><p className="text-xs font-bold text-slate-800">Route exceptions</p><p className="text-[11px] text-slate-500">3 require attention</p></div>
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
EOF

# ============================================================
# 4. Create Fleet Pages
# ============================================================
echo ""
echo "🚛 Creating Fleet pages..."

# Fleet Dashboard
cat > src/pages/fleet/Dashboard.jsx << 'EOF'
// src/pages/fleet/Dashboard.jsx
import { useState } from 'react';
import { Truck, Wrench, AlertTriangle, CheckCircle, Fuel, Gauge, Calendar, Clock, ChevronDown, Download, Filter, TrendingUp, TrendingDown, MapPin, Users, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const FleetDashboard = () => {
  const [timeframe, setTimeframe] = useState('week');
  const fleetStats = { total: 12, active: 9, maintenance: 2, idle: 1, utilization: 87.5, avgFuelConsumption: 12.4, totalTrips: 234, totalDistance: 4567 };
  const vehicleStatus = [
    { id: 1, name: 'Truck #001', status: 'active', driver: 'John Kamau', utilization: 92, fuel: 65, lastService: '2024-01-10' },
    { id: 2, name: 'Truck #002', status: 'active', driver: 'Mary Wanjiru', utilization: 88, fuel: 42, lastService: '2024-01-08' },
    { id: 3, name: 'Truck #003', status: 'maintenance', driver: 'Peter Ochieng', utilization: 0, fuel: 78, lastService: '2024-01-12' },
    { id: 4, name: 'Truck #004', status: 'active', driver: 'Grace Akinyi', utilization: 95, fuel: 23, lastService: '2024-01-09' },
    { id: 5, name: 'Truck #005', status: 'idle', driver: 'James Mwangi', utilization: 15, fuel: 89, lastService: '2024-01-05' },
    { id: 6, name: 'Truck #006', status: 'active', driver: 'Susan Wanjiku', utilization: 78, fuel: 56, lastService: '2024-01-11' }
  ];
  const weeklyData = [
    { day: 'Mon', trips: 45, distance: 890, fuel: 112 },
    { day: 'Tue', trips: 52, distance: 980, fuel: 134 },
    { day: 'Wed', trips: 48, distance: 920, fuel: 128 },
    { day: 'Thu', trips: 56, distance: 1050, fuel: 145 },
    { day: 'Fri', trips: 43, distance: 820, fuel: 108 },
    { day: 'Sat', trips: 38, distance: 720, fuel: 95 },
    { day: 'Sun', trips: 25, distance: 450, fuel: 62 }
  ];

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">FLEET MANAGEMENT</div>
          <h1 className="page-title">Fleet Dashboard</h1>
          <p className="page-description">Real-time monitoring of vehicle fleet performance and maintenance</p>
        </div>
        <div className="command-bar">
          <div className="relative">
            <select className="select min-w-[140px] appearance-none pr-10" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="week">This Week</option><option value="month">This Month</option><option value="quarter">This Quarter</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <button className="btn btn-secondary"><Download size={16} />Export</button>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card slide-up">
          <div className="kpi-header"><div className="kpi-icon kpi-icon-green"><Truck size={20} /></div><span className="kpi-label">Total Vehicles</span></div>
          <div className="kpi-value">{fleetStats.total}</div>
          <div className="kpi-meta"><span className="kpi-positive">↑ {fleetStats.active} active</span><span>now</span></div>
        </div>
        <div className="kpi-card slide-up" style={{ animationDelay: '0.05s' }}>
          <div className="kpi-header"><div className="kpi-icon kpi-icon-blue"><Gauge size={20} /></div><span className="kpi-label">Utilization Rate</span></div>
          <div className="kpi-value">{fleetStats.utilization}%</div>
          <div className="kpi-meta"><span className="kpi-positive">↑ 4.2%</span><span>vs last week</span></div>
        </div>
        <div className="kpi-card slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="kpi-header"><div className="kpi-icon kpi-icon-amber"><Fuel size={20} /></div><span className="kpi-label">Avg Fuel Consumption</span></div>
          <div className="kpi-value">{fleetStats.avgFuelConsumption} L/100km</div>
          <div className="kpi-meta"><span className="kpi-neutral">⏳ {fleetStats.totalDistance} km</span></div>
        </div>
        <div className="kpi-card slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="kpi-header"><div className="kpi-icon kpi-icon-red"><Wrench size={20} /></div><span className="kpi-label">Maintenance Due</span></div>
          <div className="kpi-value">{fleetStats.maintenance}</div>
          <div className="kpi-meta"><span className="kpi-neutral">⏳ {fleetStats.idle} idle</span></div>
        </div>
      </div>
      <div className="workspace-grid">
        <div className="workspace-panel panel-span-8">
          <div className="panel-header"><div><h3 className="panel-title">Weekly Performance</h3><p className="panel-description">Trips, distance, and fuel consumption trends</p></div><button className="panel-action">View Details →</button></div>
          <div className="panel-body"><div className="h-[280px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="day" stroke="#94a3b8" /><YAxis yAxisId="left" stroke="#94a3b8" /><YAxis yAxisId="right" orientation="right" stroke="#94a3b8" /><Tooltip /><Legend /><Line yAxisId="left" type="monotone" dataKey="trips" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} /><Line yAxisId="left" type="monotone" dataKey="distance" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} /><Line yAxisId="right" type="monotone" dataKey="fuel" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} /></LineChart></ResponsiveContainer></div></div>
        </div>
        <div className="workspace-panel panel-span-4">
          <div className="panel-header"><div><h3 className="panel-title">Vehicle Status</h3><p className="panel-description">Distribution by status</p></div></div>
          <div className="panel-body"><div className="space-y-3">
            {[{ label: 'Active', value: fleetStats.active, color: 'bg-emerald-500' }, { label: 'Maintenance', value: fleetStats.maintenance, color: 'bg-amber-500' }, { label: 'Idle', value: fleetStats.idle, color: 'bg-slate-400' }].map((status) => (
              <div key={status.label}><div className="flex justify-between text-sm mb-1"><span className="text-slate-600">{status.label}</span><span className="font-semibold text-slate-900">{status.value}</span></div><div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className={\`h-full rounded-full \${status.color}\`} style={{ width: \`\${(status.value / fleetStats.total) * 100}%\` }} /></div></div>
            ))}
          </div></div>
        </div>
      </div>
      <div className="mt-6"><div className="workspace-panel"><div className="panel-header"><div><h3 className="panel-title">Vehicle Status</h3><p className="panel-description">Current status of all vehicles</p></div><button className="panel-action">View All →</button></div><div className="panel-body"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicleStatus.map((vehicle) => (
          <div key={vehicle.id} className="rounded-xl border border-slate-200 p-4 slide-up hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between"><div><h4 className="font-semibold text-slate-900">{vehicle.name}</h4><p className="text-xs text-slate-500">Driver: {vehicle.driver}</p></div><span className={\`status \${vehicle.status === 'active' ? 'status-success' : vehicle.status === 'maintenance' ? 'status-warning' : 'status-neutral'}\`}><span className="status-dot" />{vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}</span></div>
            <div className="mt-3 grid grid-cols-3 gap-2"><div className="text-center"><p className="text-xs text-slate-500">Utilization</p><p className="text-sm font-bold text-slate-900">{vehicle.utilization}%</p></div><div className="text-center"><p className="text-xs text-slate-500">Fuel</p><p className="text-sm font-bold text-slate-900">{vehicle.fuel}%</p></div><div className="text-center"><p className="text-xs text-slate-500">Last Service</p><p className="text-xs font-medium text-slate-600">{vehicle.lastService}</p></div></div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end"><button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">View Details →</button></div>
          </div>
        ))}
      </div></div></div></div>
    </div>
  );
};

export default FleetDashboard;
EOF

# Placeholder for other fleet pages
echo "Creating placeholder fleet pages..."
for file in VehicleList VehicleDetails LiveTracking DriverList; do
  cat > src/pages/fleet/${file}.jsx << EOF
// src/pages/fleet/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">FLEET MANAGEMENT</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Fleet management page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# ============================================================
# 5. Create Admin Pages
# ============================================================
echo ""
echo "⚙️ Creating Admin pages..."

# UserDetails
cat > src/pages/admin/UserDetails.jsx << 'EOF'
// src/pages/admin/UserDetails.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Shield, Calendar, Edit, Download, MoreVertical, Activity, Clock, CheckCircle, XCircle, AlertCircle, Building, Key, Settings } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('profile');
  const user = {
    id: id, name: 'John Kamau', email: 'john.kamau@jemak.com', role: 'Admin', status: 'active',
    department: 'Operations', phone: '+254 712 345 678', joined: '2023-06-15', lastActive: '2024-01-30 14:30',
    permissions: ['view_dashboard', 'manage_collections', 'manage_customers', 'manage_fleet', 'view_reports', 'manage_users', 'manage_billing', 'export_data'],
    activity: [
      { date: '2024-01-30 14:30', action: 'Logged in', details: 'IP: 192.168.1.1' },
      { date: '2024-01-30 13:15', action: 'Updated Collection Route', details: 'Route: North Zone A' },
      { date: '2024-01-30 12:20', action: 'Generated Report', details: 'Monthly Operations Report' },
    ]
  };

  const allPermissions = ['view_dashboard', 'manage_collections', 'manage_customers', 'manage_fleet', 'view_reports', 'manage_users', 'manage_billing', 'export_data'];
  const permissionLabels = { view_dashboard: 'View Dashboard', manage_collections: 'Manage Collections', manage_customers: 'Manage Customers', manage_fleet: 'Manage Fleet', view_reports: 'View Reports', manage_users: 'Manage Users', manage_billing: 'Manage Billing', export_data: 'Export Data' };

  return (
    <div className="workspace-content fade-in">
      <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-4 transition-colors"><ArrowLeft size={18} />Back to Users</button>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 text-xl font-bold">{user.name.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <div className="flex items-center gap-3"><h1 className="text-2xl font-bold text-slate-900">{user.name}</h1><span className={\`status \${user.status === 'active' ? 'status-success' : 'status-neutral'}\`}><span className="status-dot" />{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1"><span className="text-sm text-slate-600 flex items-center gap-1"><Mail size={14} /> {user.email}</span><span className="text-sm text-slate-600 flex items-center gap-1"><Phone size={14} /> {user.phone}</span><span className="text-sm text-slate-600 flex items-center gap-1"><Building size={14} /> {user.department}</span></div>
              <div className="flex items-center gap-3 mt-2"><span className="text-xs text-slate-400">Joined: {user.joined}</span><span className="text-xs text-slate-300">•</span><span className="text-xs text-slate-400">Last Active: {user.lastActive}</span></div>
            </div>
          </div>
          <div className="flex gap-2"><button className="btn btn-secondary"><Edit size={16} />Edit</button><button className="btn btn-primary"><Settings size={16} />Manage Permissions</button></div>
        </div>
      </div>
      <div className="border-b border-slate-200 mb-6"><div className="flex gap-6 overflow-x-auto">
        {['profile', 'permissions', 'activity', 'security'].map((tab) => (
          <button key={tab} className={\`pb-3 text-sm font-medium capitalize transition-colors whitespace-nowrap \${activeTab === tab ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-700'}\`} onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </div></div>
      {activeTab === 'permissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-slate-900">User Permissions</h3><button className="btn btn-secondary"><Edit size={16} />Edit Permissions</button></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allPermissions.map((perm) => (
              <div key={perm} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                {user.permissions.includes(perm) ? <CheckCircle size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-slate-300" />}
                <span className={\`text-sm \${user.permissions.includes(perm) ? 'text-slate-700' : 'text-slate-400'}\`}>{permissionLabels[perm] || perm}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-slate-900">Activity Log</h3><button className="btn btn-secondary"><Download size={16} />Export Log</button></div>
          <div className="space-y-3">
            {user.activity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><Activity size={18} /></div>
                <div className="flex-1"><div className="flex justify-between"><span className="text-sm font-medium text-slate-900">{activity.action}</span><span className="text-xs text-slate-400">{activity.date}</span></div><p className="text-xs text-slate-500 mt-0.5">{activity.details}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserDetails;
EOF

# Placeholder for other admin pages
echo "Creating placeholder admin pages..."
for file in UserManagement CreateUser SystemSettings AuditLogs BackupManagement SystemHealthMonitor; do
  cat > src/pages/admin/${file}.jsx << EOF
// src/pages/admin/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMINISTRATION</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Administration page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# ============================================================
# 6. Create Advanced Pages
# ============================================================
echo ""
echo "🤖 Creating Advanced pages..."

# IntegrationHub
cat > src/pages/advanced/IntegrationHub.jsx << 'EOF'
// src/pages/advanced/IntegrationHub.jsx
import { useState } from 'react';
import { Cloud, Database, Zap, Shield, CheckCircle, XCircle, AlertCircle, RefreshCw, Settings, Download, ChevronDown, Eye, Plug, Mail, Smartphone, CreditCard, BarChart3, Users, Truck } from 'lucide-react';

const IntegrationHub = () => {
  const [integrations] = useState([
    { id: 1, name: 'M-Pesa', type: 'Payment Gateway', status: 'connected', description: 'Mobile money payment processing', icon: Smartphone, color: '#10b981', lastSync: '2024-01-30 14:30', actions: ['configure', 'disconnect'] },
    { id: 2, name: "Africa's Talking", type: 'SMS Gateway', status: 'connected', description: 'SMS notifications and alerts', icon: Mail, color: '#3b82f6', lastSync: '2024-01-30 13:15', actions: ['configure', 'disconnect'] },
    { id: 3, name: 'Google Maps', type: 'Mapping Service', status: 'connected', description: 'Route mapping and tracking', icon: Truck, color: '#f59e0b', lastSync: '2024-01-30 12:00', actions: ['configure', 'disconnect'] },
    { id: 4, name: 'Stripe', type: 'Payment Gateway', status: 'disconnected', description: 'Credit card payment processing', icon: CreditCard, color: '#94a3b8', lastSync: 'Never', actions: ['connect'] },
    { id: 5, name: 'Power BI', type: 'Analytics', status: 'connected', description: 'Business intelligence and reporting', icon: BarChart3, color: '#8b5cf6', lastSync: '2024-01-29 16:00', actions: ['configure', 'disconnect'] }
  ]);

  const stats = { total: integrations.length, connected: integrations.filter(i => i.status === 'connected').length, disconnected: integrations.filter(i => i.status === 'disconnected').length };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div><div className="page-kicker">ADVANCED FEATURES</div><h1 className="page-title">Integration Hub</h1><p className="page-description">Connect and manage all third-party integrations</p></div>
        <div className="command-bar"><button className="btn btn-primary"><Plug size={16} />Add Integration</button></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Cloud size={14} />Total Integrations</div><p className="text-xl font-bold text-slate-900 mt-1">{stats.total}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><CheckCircle size={14} className="text-emerald-500" />Connected</div><p className="text-xl font-bold text-slate-900 mt-1">{stats.connected}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><XCircle size={14} className="text-slate-400" />Disconnected</div><p className="text-xl font-bold text-slate-900 mt-1">{stats.disconnected}</p></div>
        <div className="rounded-xl bg-white border border-slate-200 p-3"><div className="flex items-center gap-2 text-slate-500 text-xs"><Zap size={14} className="text-amber-500" />Active Today</div><p className="text-xl font-bold text-slate-900 mt-1">{integrations.filter(i => i.status === 'connected').length}</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="rounded-2xl border border-slate-200 bg-white p-5 slide-up hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ backgroundColor: integration.color }}><Icon size={22} /></div>
                  <div><h3 className="font-semibold text-slate-900">{integration.name}</h3><p className="text-sm text-slate-500">{integration.type}</p><p className="text-sm text-slate-400 mt-1">{integration.description}</p></div>
                </div>
                <span className={\`status \${integration.status === 'connected' ? 'status-success' : 'status-neutral'}\`}><span className="status-dot" />{integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-400">Last Sync: {integration.lastSync}</div>
                <div className="flex gap-2">
                  {integration.actions.includes('configure') && <button className="btn btn-secondary text-sm"><Settings size={14} />Configure</button>}
                  {integration.status === 'connected' ? <button className="btn btn-secondary text-sm text-red-600 hover:bg-red-50"><XCircle size={14} />Disconnect</button> : <button className="btn btn-primary text-sm"><Plug size={14} />Connect</button>}
                </div>
              </div>
              {integration.status === 'connected' && <div className="mt-3 p-2 rounded-xl bg-emerald-50 border border-emerald-200"><div className="flex items-center gap-2 text-sm text-emerald-700"><RefreshCw size={14} className="animate-spin" /><span>Active • Real-time sync enabled</span></div></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default IntegrationHub;
EOF

# Placeholder for other advanced pages
echo "Creating placeholder advanced pages..."
for file in PredictiveAnalytics AIRouteOptimization CustomerSegments; do
  cat > src/pages/advanced/${file}.jsx << EOF
// src/pages/advanced/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADVANCED FEATURES</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Advanced features page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# ============================================================
# 7. Create Analytics Pages
# ============================================================
echo ""
echo "📊 Creating Analytics pages..."

for file in AnalyticsDashboard OperationalReports FinancialReports TrendAnalysis CustomReportBuilder; do
  cat > src/pages/analytics/${file}.jsx << EOF
// src/pages/analytics/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ANALYTICS</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Analytics page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# ============================================================
# 8. Create Other Pages
# ============================================================
echo ""
echo "📄 Creating other pages..."

# Operations pages
for file in RoutesList RouteDetails CreateRoute CollectionRecords; do
  cat > src/pages/operations/${file}.jsx << EOF
// src/pages/operations/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">OPERATIONS</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Operations page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# Billing pages
for file in Dashboard InvoiceList CreateInvoice InvoiceDetails PaymentList; do
  cat > src/pages/billing/${file}.jsx << EOF
// src/pages/billing/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">BILLING</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Billing page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# Customers pages
for file in HouseholdList HouseholdDetails CreateHousehold; do
  cat > src/pages/customers/${file}.jsx << EOF
// src/pages/customers/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">CUSTOMERS</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Customer page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# Waste pages
for file in WasteTypesList RecyclingManagement; do
  cat > src/pages/waste/${file}.jsx << EOF
// src/pages/waste/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">WASTE MANAGEMENT</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Waste management page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# Sustainability pages
for file in Dashboard CarbonTracking GreenInitiatives; do
  cat > src/pages/sustainability/${file}.jsx << EOF
// src/pages/sustainability/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUSTAINABILITY</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Sustainability page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# Utilities pages
for file in CalendarView DocumentManagement HelpSupport WalkthroughOnboarding PriceConfiguration; do
  cat > src/pages/utilities/${file}.jsx << EOF
// src/pages/utilities/${file}.jsx
const ${file} = () => {
  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">UTILITIES</div>
          <h1 className="page-title">${file}</h1>
          <p className="page-description">Utilities page</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">${file} coming soon...</p>
      </div>
    </div>
  );
};
export default ${file};
EOF
done

# ============================================================
# 9. Fix ESLint - Remove unused dashboardPath from Sidebar
# ============================================================
echo ""
echo "🔧 Fixing ESLint issues..."

# Fix Sidebar - remove unused dashboardPath or comment it
if [ -f "src/components/layout/Sidebar.jsx" ]; then
  # Backup the original
  cp src/components/layout/Sidebar.jsx src/components/layout/Sidebar.jsx.bak
  # Comment out or remove the unused variable
  sed -i 's/const dashboardPath = .*/\/\/ const dashboardPath = session?.role === '\''admin'\'' ? '\''\/adminDashboard'\'' : '\''\/userDashboard'\'';/' src/components/layout/Sidebar.jsx
  echo "✅ Fixed Sidebar ESLint error"
fi

# ============================================================
# 10. Done
# ============================================================
echo ""
echo "✅ All done!"
echo ""
echo "📋 Summary:"
echo "   - Installed: recharts, @mui/*, lucide-react, jspdf, xlsx"
echo "   - Created: Home page"
echo "   - Created: All fleet pages"
echo "   - Created: All admin pages"
echo "   - Created: All advanced pages"
echo "   - Created: All analytics pages"
echo "   - Created: All other page placeholders"
echo "   - Fixed: Sidebar ESLint error"
echo ""
echo "🚀 Now run: npm run dev"
echo ""
echo "💡 Note: Some pages have placeholder content. You can flesh them out later."