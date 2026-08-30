// src/components/layout/Sidebar.jsx
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  X, LogOut, ShieldCheck, UserCircle, Settings,
  LayoutDashboard, MapPinned, CalendarClock, BarChart3,
  Truck, Users, Package, Recycle, DollarSign,
  Leaf, Activity, Cloud, HelpCircle, FileText,
  Calendar, Tag, Database, Award, Target,
  Zap, Brain, Plug, Gauge, ClipboardCheck,
  Home, Menu as MenuIcon
} from 'lucide-react';

const navigation = [
  {
    section: 'Dashboard',
    items: [
      {
        to: '/',
        label: 'Overview',
        icon: LayoutDashboard,
        description: 'Operational command center',
        end: true,
      },
      {
        to: '/userDashboard',
        label: 'My Dashboard',
        icon: UserCircle,
        description: 'Personal dashboard',
        userOnly: true,
      },
      {
        to: '/adminDashboard',
        label: 'Admin Dashboard',
        icon: ShieldCheck,
        description: 'System administration',
        adminOnly: true,
      },
    ],
  },
  {
    section: 'Operations',
    items: [
      {
        to: '/ops',
        label: 'Collection Operations',
        icon: MapPinned,
        description: 'Routes and collection teams',
        badge: 'LIVE',
        children: [
          { to: '/ops/routes', label: 'Collection Routes' },
          { to: '/ops/routes/create', label: 'Create Route' },
          { to: '/ops/collections', label: 'Collection Records' },
          { to: '/ops/collections/in-progress', label: 'Active Collections' },
          { to: '/ops/vehicles', label: 'Vehicle Management' },
          { to: '/ops/vehicles/tracking', label: 'Live Tracking' },
          { to: '/ops/drivers', label: 'Driver Management' },
        ],
      },
      {
        to: '/schedule',
        label: 'Schedule',
        icon: CalendarClock,
        description: 'Pickup schedules',
        userOnly: true,
        children: [
          { to: '/schedule', label: 'View Schedule' },
          { to: '/schedule/create', label: 'Request Collection' },
        ],
      },
      {
        to: '/calendar',
        label: 'Calendar View',
        icon: Calendar,
        description: 'Schedule management',
        children: [
          { to: '/calendar', label: 'Monthly View' },
          { to: '/calendar/week', label: 'Weekly View' },
        ],
      },
    ],
  },
  {
    section: 'Fleet Management',
    items: [
      {
        to: '/fleet',
        label: 'Fleet Dashboard',
        icon: Truck,
        description: 'Vehicle fleet overview',
        children: [
          { to: '/fleet', label: 'Dashboard' },
          { to: '/fleet/vehicles', label: 'Vehicle List' },
          { to: '/fleet/vehicles/:id', label: 'Vehicle Details' },
          { to: '/fleet/drivers', label: 'Driver Management' },
        ],
      },
      {
        to: '/operations/vehicles/tracking',
        label: 'Live Tracking',
        icon: Activity,
        description: 'Real-time GPS tracking',
      },
    ],
  },
  {
    section: 'Customers',
    items: [
      {
        to: '/customers',
        label: 'Customer Management',
        icon: Users,
        description: 'Manage customers',
        children: [
          { to: '/customers/households', label: 'Households' },
          { to: '/customers/households/create', label: 'Register Household' },
          { to: '/customers/households/:id', label: 'Household Details' },
          { to: '/customers/businesses', label: 'Businesses' },
          { to: '/customers/segments', label: 'Customer Segments' },
        ],
      },
    ],
  },
  {
    section: 'Waste Management',
    items: [
      {
        to: '/waste',
        label: 'Waste Types',
        icon: Package,
        description: 'Waste categories',
        children: [
          { to: '/waste/types', label: 'Manage Waste Types' },
          { to: '/waste/types/create', label: 'Add Waste Type' },
        ],
      },
      {
        to: '/waste/recycling',
        label: 'Recycling Management',
        icon: Recycle,
        description: 'Recycling programs',
        children: [
          { to: '/waste/recycling', label: 'Overview' },
          { to: '/waste/recycling/programs', label: 'Programs' },
          { to: '/waste/recycling/materials', label: 'Materials' },
        ],
      },
      {
        to: '/waste/disposal',
        label: 'Disposal Management',
        icon: FileText,
        description: 'Disposal sites and manifests',
        children: [
          { to: '/waste/disposal/sites', label: 'Disposal Sites' },
          { to: '/waste/disposal/manifest', label: 'Waste Manifests' },
        ],
      },
    ],
  },
  {
    section: 'Billing & Finance',
    items: [
      {
        to: '/billing',
        label: 'Billing Dashboard',
        icon: DollarSign,
        description: 'Financial overview',
        children: [
          { to: '/billing/dashboard', label: 'Dashboard' },
          { to: '/billing/invoices', label: 'Invoices' },
          { to: '/billing/invoices/create', label: 'Generate Invoice' },
          { to: '/billing/invoices/:id', label: 'Invoice Details' },
          { to: '/billing/payments', label: 'Payment Processing' },
          { to: '/billing/rates', label: 'Price Configuration' },
        ],
      },
    ],
  },
  {
    section: 'Analytics & Reports',
    items: [
      {
        to: '/analytics',
        label: 'Analytics Dashboard',
        icon: BarChart3,
        description: 'Performance analytics',
        adminOnly: true,
        children: [
          { to: '/analytics/dashboard', label: 'Overview' },
          { to: '/analytics/reports/operational', label: 'Operational Reports' },
          { to: '/analytics/reports/financial', label: 'Financial Reports' },
          { to: '/analytics/reports/compliance', label: 'Compliance Reports' },
          { to: '/analytics/trends', label: 'Trend Analysis' },
          { to: '/analytics/reports/create', label: 'Custom Report Builder' },
        ],
      },
      {
        to: '/analytics/predictions',
        label: 'Predictive Analytics',
        icon: Brain,
        description: 'AI-powered predictions',
        adminOnly: true,
      },
      {
        to: '/analytics/routes/optimize',
        label: 'AI Route Optimization',
        icon: Zap,
        description: 'Machine learning optimization',
        adminOnly: true,
      },
    ],
  },
  {
    section: 'Sustainability',
    items: [
      {
        to: '/sustainability',
        label: 'Sustainability Dashboard',
        icon: Leaf,
        description: 'Environmental impact',
        children: [
          { to: '/sustainability/dashboard', label: 'Overview' },
          { to: '/sustainability/carbon', label: 'Carbon Tracking' },
          { to: '/sustainability/initiatives', label: 'Green Initiatives' },
        ],
      },
    ],
  },
  {
    section: 'System Administration',
    items: [
      {
        to: '/admin',
        label: 'User Management',
        icon: Users,
        description: 'Manage users and roles',
        adminOnly: true,
        children: [
          { to: '/admin/users', label: 'All Users' },
          { to: '/admin/users/create', label: 'Add User' },
          { to: '/admin/users/:id', label: 'User Details' },
        ],
      },
      {
        to: '/admin/settings',
        label: 'System Settings',
        icon: Settings,
        description: 'Configure system',
        adminOnly: true,
        children: [
          { to: '/admin/settings/general', label: 'General Settings' },
          { to: '/admin/settings/notifications', label: 'Notifications' },
          { to: '/admin/settings/security', label: 'Security' },
          { to: '/admin/settings/integrations', label: 'Integrations' },
        ],
      },
      {
        to: '/admin/audit',
        label: 'Audit Logs',
        icon: ClipboardCheck,
        description: 'System audit trail',
        adminOnly: true,
      },
      {
        to: '/admin/backup',
        label: 'Backup Management',
        icon: Database,
        description: 'Backup and recovery',
        adminOnly: true,
      },
      {
        to: '/admin/health',
        label: 'System Health',
        icon: Gauge,
        description: 'System monitoring',
        adminOnly: true,
      },
    ],
  },
  {
    section: 'Support',
    items: [
      {
        to: '/help',
        label: 'Help & Support',
        icon: HelpCircle,
        description: 'Get help',
        children: [
          { to: '/help', label: 'Help Center' },
          { to: '/help/faq', label: 'FAQs' },
          { to: '/help/contact', label: 'Contact Support' },
        ],
      },
      {
        to: '/documents',
        label: 'Document Management',
        icon: FileText,
        description: 'Document storage',
        children: [
          { to: '/documents', label: 'All Documents' },
          { to: '/documents/upload', label: 'Upload Document' },
        ],
      },
      {
        to: '/onboarding',
        label: 'Walkthrough & Onboarding',
        icon: Award,
        description: 'Getting started',
      },
    ],
  },
];

function Sidebar({ session, mobileOpen, onClose, onSignOut }) {
  const location = useLocation();

  const visibleNavigation = navigation
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        // Filter by role
        if (item.adminOnly && session?.role !== 'admin') return false;
        if (item.userOnly && session?.role === 'admin') return false;
        
        // Filter children by role
        if (item.children) {
          item.children = item.children.filter(child => {
            if (child.adminOnly && session?.role !== 'admin') return false;
            if (child.userOnly && session?.role === 'admin') return false;
            return true;
          });
        }
        
        return true;
      }),
    }))
    .filter((section) => section.items.length > 0);

  const isActive = (path, end = false) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const isChildActive = (children) => {
    if (!children) return false;
    return children.some(child => location.pathname.startsWith(child.to));
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`app-sidebar ${mobileOpen ? 'mobile-sidebar open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3">
            <div className="sidebar-logo">JM</div>
            <div>
              <div className="sidebar-brand-name">JEMAK</div>
              <div className="sidebar-brand-subtitle">Operations Platform</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          {visibleNavigation.map((section) => (
            <div key={section.section} className="sidebar-section">
              <div className="sidebar-section-label">{section.section}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to, item.end);
                const childActive = isChildActive(item.children);

                return (
                  <div key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={handleLinkClick}
                      className={`sidebar-link ${active || childActive ? 'sidebar-link-active' : ''}`}
                    >
                      <div className="sidebar-link-icon">
                        <Icon className="h-[17px] w-[17px]" />
                      </div>
                      <span className="sidebar-link-label">{item.label}</span>
                      {item.badge && (
                        <span className="sidebar-link-badge">{item.badge}</span>
                      )}
                      {item.children && (
                        <span className="text-[10px] text-slate-500 ml-auto">
                          {active || childActive ? '▾' : '▸'}
                        </span>
                      )}
                    </NavLink>
                    
                    {/* Subcategories */}
                    {item.children && (active || childActive) && (
                      <div className="ml-6 space-y-0.5">
                        {item.children.map((child) => {
                          const childActive = location.pathname.startsWith(child.to);
                          return (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={handleLinkClick}
                              className={`sidebar-link !py-1.5 !pl-8 text-xs ${
                                childActive ? 'sidebar-link-active' : ''
                              }`}
                            >
                              <span className="sidebar-link-label">{child.label}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="sidebar-bottom">
          <div className="sidebar-system-card">
            <div className="flex items-center gap-2">
              <span className="system-dot" />
              <span className="text-[11px] font-semibold text-slate-200">System operational</span>
            </div>
            <p className="mt-2 text-[10px] leading-4 text-slate-500">
              Collection services and platform systems are running normally.
            </p>
          </div>
          {session && (
            <button
              onClick={onSignOut}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-500 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;