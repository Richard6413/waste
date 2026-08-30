#!/bin/bash

echo "🔧 Applying final fixes..."

cd frontend || exit

# ============================================================
# 1. FIX HOME.JSX - Recreate with proper JSX syntax
# ============================================================
echo ""
echo "📄 Fixing Home.jsx..."

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
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-kicker">Command Center</div>
          <h1 className="page-title">Good day{session?.name ? `, ${session.name.split(' ')[0]}` : ''}</h1>
          <p className="page-description">Here is what is happening across your waste collection network today.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status status-success">
            <span className="status-dot bg-emerald-500" />
            Operations normal
          </span>
          <Link to="/ops" className="btn btn-primary">
            <MapPinned className="h-4 w-4" />
            Open Operations
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="kpi-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="kpi-card">
              <div className="kpi-header">
                <div>
                  <p className="kpi-label">{stat.label}</p>
                  <p className="kpi-value">{stat.value}</p>
                </div>
                <div className="kpi-icon kpi-icon-green">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="kpi-meta">
                <span className="kpi-positive">{stat.change}</span>
                <span className="kpi-neutral">{stat.description}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick Actions */}
      <section className="workspace-panel mt-5">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Quick actions</h2>
            <p className="panel-description">Common operational tasks</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="action-grid">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.to} className="action-tile">
                  <div className="action-tile-icon">
                    <Icon className="h-4 w-4" />
                  </div>
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

      {/* Main Content */}
      <div className="workspace-grid">
        {/* Collection Activity */}
        <section className="workspace-panel panel-span-8">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Today's collection activity</h2>
              <p className="panel-description">Live overview of current field operations</p>
            </div>
            <Link to="/ops" className="panel-action">Open operations</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="saas-table">
              <thead>
                <tr><th>Route</th><th>Vehicle</th><th>Collections</th><th>Progress</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">KLA-07</td>
                  <td>SW-014</td>
                  <td>34 / 40</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: '85%' }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">85%</span>
                    </div>
                  </td>
                  <td><span className="status status-success"><span className="status-dot bg-emerald-500" />Active</span></td>
                </tr>
                <tr>
                  <td className="font-semibold">KLA-03</td>
                  <td>SW-009</td>
                  <td>29 / 32</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: '91%' }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">91%</span>
                    </div>
                  </td>
                  <td><span className="status status-success"><span className="status-dot bg-emerald-500" />Active</span></td>
                </tr>
                <tr>
                  <td className="font-semibold">KLA-11</td>
                  <td>SW-021</td>
                  <td>42 / 42</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">100%</span>
                    </div>
                  </td>
                  <td><span className="status status-neutral"><span className="status-dot bg-slate-400" />Complete</span></td>
                </tr>
                <tr>
                  <td className="font-semibold">KLA-15</td>
                  <td>SW-018</td>
                  <td>17 / 28</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-amber-500" style={{ width: '61%' }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">61%</span>
                    </div>
                  </td>
                  <td><span className="status status-warning"><span className="status-dot bg-amber-500" />Delayed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="workspace-panel panel-span-4">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Recent activity</h2>
              <p className="panel-description">Latest system events</p>
            </div>
            <Activity className="h-4 w-4 text-slate-400" />
          </div>
          <div className="activity-list">
            {activity.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="activity-item">
                  <div className="activity-icon bg-emerald-50 text-emerald-600">
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

      {/* Bottom Panels */}
      <div className="workspace-grid">
        <section className="workspace-panel panel-span-8">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Network performance</h2>
              <p className="panel-description">Collection completion trend</p>
            </div>
            <span className="status status-success">+2.5% this month</span>
          </div>
          <div className="panel-body">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-500">Completed</span>
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">1,247</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-semibold text-slate-500">Pending</span>
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">84</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Recycle className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-500">Efficiency</span>
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">91.8%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="workspace-panel panel-span-4">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Account attention</h2>
              <p className="panel-description">Items requiring review</p>
            </div>
          </div>
          <div className="panel-body space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-amber-600">
                <CircleDollarSign className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">Outstanding payments</p>
                <p className="text-[11px] text-slate-500">31 accounts</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">Route exceptions</p>
                <p className="text-[11px] text-slate-500">3 require attention</p>
              </div>
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
# 2. FIX EXPORT UTILS - Add eslint-disable comment
# ============================================================
echo ""
echo "🔧 Fixing exportUtils.js..."

if [ -f "src/pages/Analytics/utils/exportUtils.js" ]; then
  # Add eslint-disable comment before the base class method
  sed -i '/export(report, filename) {/i\  // eslint-disable-next-line no-unused-vars' src/pages/Analytics/utils/exportUtils.js
  echo "✅ Fixed exportUtils.js"
fi

# ============================================================
# 3. FIX ACTIVE COLLECTIONS - Remove unused activeRoutes
# ============================================================
echo ""
echo "🔧 Fixing ActiveCollections.jsx..."

# Remove from uppercase folder
if [ -f "src/pages/Operations/ActiveCollections.jsx" ]; then
  sed -i '/const activeRoutes = /d' src/pages/Operations/ActiveCollections.jsx
  echo "✅ Fixed Operations/ActiveCollections.jsx"
fi

# Remove from lowercase folder if it exists
if [ -f "src/pages/operations/ActiveCollections.jsx" ]; then
  sed -i '/const activeRoutes = /d' src/pages/operations/ActiveCollections.jsx
  echo "✅ Fixed operations/ActiveCollections.jsx"
fi

# ============================================================
# 4. DELETE LOWERCASE DUPLICATE FOLDERS
# ============================================================
echo ""
echo "🗑️ Removing lowercase duplicate folders..."

rm -rf src/pages/operations 2>/dev/null
rm -rf src/pages/fleet 2>/dev/null
rm -rf src/pages/admin 2>/dev/null
rm -rf src/pages/advanced 2>/dev/null
rm -rf src/pages/billing 2>/dev/null
rm -rf src/pages/analytics 2>/dev/null
rm -rf src/pages/customers 2>/dev/null
rm -rf src/pages/waste 2>/dev/null
rm -rf src/pages/sustainability 2>/dev/null
rm -rf src/pages/utilities 2>/dev/null

echo "✅ Removed duplicate lowercase folders"

# ============================================================
# 5. CLEAN VITE CACHE
# ============================================================
echo ""
echo "🧹 Cleaning Vite cache..."

rm -rf .vite 2>/dev/null
rm -rf node_modules/.vite 2>/dev/null

echo "✅ Vite cache cleaned"

# ============================================================
# 6. DONE
# ============================================================
echo ""
echo "✅ All fixes applied!"
echo ""
echo "📋 Summary:"
echo "   - Fixed Home.jsx with proper JSX syntax"
echo "   - Fixed exportUtils.js with eslint-disable comment"
echo "   - Fixed ActiveCollections.jsx (removed unused activeRoutes)"
echo "   - Removed all lowercase duplicate folders"
echo "   - Cleaned Vite cache"
echo ""
echo "🚀 Now run: npm run dev"