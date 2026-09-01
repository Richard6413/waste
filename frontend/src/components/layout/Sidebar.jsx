// frontend/src/components/layout/Sidebar.jsx
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  X, LogOut, ShieldCheck, UserCircle, Settings,
  LayoutDashboard, MapPinned, CalendarClock, BarChart3,
  Truck, Users, Package, Recycle, DollarSign,
  Leaf, Activity, Cloud, HelpCircle, FileText,
  Calendar, Tag, Database, Award, Target,
  Zap, Brain, Plug, Gauge, ClipboardCheck,
  Home, Menu as MenuIcon, ChevronRight, Sparkles
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
        if (item.adminOnly && session?.role !== 'admin') return false;
        if (item.userOnly && session?.role === 'admin') return false;
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
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`app-sidebar ${mobileOpen ? 'mobile-sidebar open' : ''}`}>
        {/* Animated Background with Garbage Truck */}
        <div className="sidebar-bg-animation">
          <div className="garbage-truck-scene">
            <div className="garbage-truck">
              <div className="truck-body">
                <div className="truck-cab"></div>
                <div className="truck-container">
                  <div className="truck-waste"></div>
                </div>
                <div className="truck-wheels">
                  <div className="wheel wheel-front"></div>
                  <div className="wheel wheel-back"></div>
                </div>
              </div>
              <div className="truck-exhaust"></div>
            </div>
            <div className="garbage-collectors">
              <div className="collector collector-1">
                <div className="collector-body"></div>
                <div className="collector-arm"></div>
              </div>
              <div className="collector collector-2">
                <div className="collector-body"></div>
                <div className="collector-arm"></div>
              </div>
            </div>
            <div className="floating-waste">
              <span className="waste-item">🗑️</span>
              <span className="waste-item">♻️</span>
              <span className="waste-item">📦</span>
              <span className="waste-item">🍃</span>
            </div>
          </div>
          <div className="floating-particle particle-1"></div>
          <div className="floating-particle particle-2"></div>
          <div className="floating-particle particle-3"></div>
          <div className="floating-particle particle-4"></div>
        </div>

        {/* Brand */}
        <div className="sidebar-brand">
          <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 relative z-10">
            <div className="sidebar-logo">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="sidebar-brand-name">JEMAK</div>
              <div className="sidebar-brand-subtitle">♻️ Waste Management</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden relative z-10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="sidebar-nav relative z-10">
          {visibleNavigation.map((section) => (
            <div key={section.section} className="sidebar-section">
              <div className="sidebar-section-label">
                <span className="section-dot"></span>
                {section.section}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to, item.end);
                const childActive = isChildActive(item.children);
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = active || childActive;

                return (
                  <div key={item.to} className="sidebar-item-wrapper">
                    <NavLink
                      to={item.to}
                      onClick={handleLinkClick}
                      className={`sidebar-link ${isExpanded ? 'sidebar-link-active' : ''}`}
                    >
                      <div className="sidebar-link-icon">
                        <Icon className="h-[17px] w-[17px]" />
                      </div>
                      <span className="sidebar-link-label">{item.label}</span>
                      {item.badge && (
                        <span className="sidebar-link-badge">
                          <span className="badge-pulse"></span>
                          {item.badge}
                        </span>
                      )}
                      {hasChildren && (
                        <span className={`sidebar-chevron ${isExpanded ? 'chevron-active' : ''}`}>
                          <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                        </span>
                      )}
                    </NavLink>
                    
                    {/* Children */}
                    {hasChildren && isExpanded && (
                      <div className="sidebar-children">
                        {item.children.map((child) => {
                          const childActive = location.pathname.startsWith(child.to);
                          return (
                            <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={handleLinkClick}
                              className={`sidebar-child-link ${childActive ? 'sidebar-child-active' : ''}`}
                            >
                              <span className="child-dot"></span>
                              {child.label}
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
        <div className="sidebar-bottom relative z-10">
          <div className="sidebar-system-card">
            <div className="flex items-center gap-2">
              <div className="system-status">
                <span className="system-dot"></span>
                <span className="system-pulse"></span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-white/80">System Operational</span>
                <p className="text-[9px] text-white/40 mt-0.5">All systems running normally</p>
              </div>
            </div>
          </div>
          {session && (
            <button
              onClick={onSignOut}
              className="sidebar-signout"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;