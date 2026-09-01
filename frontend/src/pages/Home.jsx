// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { 
  MapPinned, Truck, Route as RouteIcon, 
  Gauge, WalletCards, Users, 
  ArrowUpRight, CheckCircle2, AlertTriangle,
  PackageCheck, Activity, Clock3, Recycle,
  CircleDollarSign, ClipboardCheck
} from 'lucide-react';

const Home = ({ session }) => {
  const stats = [
    {
      label: 'Collections Today',
      value: '148',
      change: '+12.4%',
      description: 'vs. yesterday',
      icon: Truck,
      type: 'green',
    },
    {
      label: 'Active Routes',
      value: '18',
      change: '14 crews',
      description: 'currently deployed',
      icon: RouteIcon,
      type: 'blue',
    },
    {
      label: 'Completion Rate',
      value: '94.2%',
      change: '+2.5%',
      description: 'vs. last month',
      icon: Gauge,
      type: 'amber',
    },
    {
      label: 'Outstanding Balance',
      value: 'UGX 8.4M',
      change: '31 accounts',
      description: 'require attention',
      icon: WalletCards,
      type: 'red',
    },
  ];

  const quickActions = [
    {
      title: 'Plan Collection',
      description: 'Create or optimize routes',
      icon: MapPinned,
      to: '/ops',
    },
    {
      title: 'View Schedule',
      description: 'Review upcoming pickups',
      icon: MapPinned,
      to: '/schedule',
    },
    {
      title: 'Collection Teams',
      description: 'Monitor field activity',
      icon: Users,
      to: '/ops',
    },
    {
      title: 'View Reports',
      description: 'Analyze performance',
      icon: MapPinned,
      to: '/analytics',
    },
  ];

  return (
    <div className="workspace-content">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Good day{session?.name ? `, ${session.name.split(' ')[0]}` : ''}
          </h1>
          <p className="page-description">
            Here's what's happening across your waste collection network today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="status status-success">
            <span className="status-dot status-dot-green" />
            Operations normal
          </span>

          <Link to="/ops" className="btn btn-primary">
            <MapPinned size={16} />
            Open Operations
          </Link>
        </div>
      </div>

      {/* KPI row */}
      <div className="kpi-grid">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="kpi-card">
              <div className="kpi-header">
                <div>
                  <p className="kpi-label">{stat.label}</p>
                  <p className="kpi-value">{stat.value}</p>
                </div>
                <div className={`kpi-icon kpi-icon-${stat.type}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="kpi-meta">
                <span className="kpi-positive">{stat.change}</span>
                <span>{stat.description}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="workspace-panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Quick actions</h2>
            <p className="panel-description">Common operational tasks</p>
          </div>
        </div>
        <div className="panel-body">
          <div className="action-grid">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.to} className="action-tile">
                  <div className="action-tile-icon">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="action-tile-title">{action.title}</div>
                    <div className="action-tile-description">{action.description}</div>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-slate-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="workspace-grid">
        <div className="workspace-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Network performance</h2>
              <p className="panel-description">Collection completion trend</p>
            </div>
            <span className="status status-success">
              +2.5% this month
            </span>
          </div>
          <div className="panel-body">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <ClipboardCheck size={16} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-500">Completed</span>
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">1,247</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock3 size={16} className="text-amber-600" />
                  <span className="text-xs font-semibold text-slate-500">Pending</span>
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">84</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Recycle size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-slate-500">Efficiency</span>
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">91.8%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="workspace-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Account attention</h2>
              <p className="panel-description">Items requiring review</p>
            </div>
          </div>
          <div className="panel-body space-y-3">
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg text-amber-600">
                <CircleDollarSign size={16} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">Outstanding payments</p>
                <p className="text-[11px] text-slate-500">31 accounts</p>
              </div>
              <ArrowUpRight size={16} className="text-amber-500" />
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg text-red-600">
                <AlertTriangle size={16} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">Route exceptions</p>
                <p className="text-[11px] text-slate-500">3 require attention</p>
              </div>
              <ArrowUpRight size={16} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;