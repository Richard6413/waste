// src/components/layout/Topbar.jsx
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  UserCircle,
  Settings,
  LogIn,
  UserPlus,
  LayoutDashboard,
  MapPinned,
  CalendarClock,
  BarChart3,
  ShieldCheck,
  CircleUserRound,
} from 'lucide-react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
} from '@mui/material';

const pageMap = {
  '/': { title: 'Operations Overview', subtitle: 'Monitor your waste collection network', icon: LayoutDashboard },
  '/ops': { title: 'Collection Operations', subtitle: 'Plan, dispatch and monitor collection routes', icon: MapPinned },
  '/schedule': { title: 'Collection Schedule', subtitle: 'Manage upcoming and special collections', icon: CalendarClock },
  '/analytics': { title: 'Analytics & Reports', subtitle: 'Operational performance and insights', icon: BarChart3 },
  '/userDashboard': { title: 'My Dashboard', subtitle: 'Your collection account overview', icon: UserCircle },
  '/adminDashboard': { title: 'Administration', subtitle: 'System administration and controls', icon: ShieldCheck },
};

function Topbar({ session, onSignOut, onOpenMobileMenu }) {
  const location = useLocation();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const context =
    pageMap[location.pathname] ||
    Object.entries(pageMap).find(([path]) => path !== '/' && location.pathname.startsWith(path))?.[1] ||
    pageMap['/'];

  const ContextIcon = context.icon;
  const initial = session?.name?.[0]?.toUpperCase() || 'S';

  return (
    <header className="app-topbar">
      <div className="topbar-inner">
        <div className="topbar-context">
          <button
            onClick={onOpenMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="topbar-context-icon">
            <ContextIcon className="h-4 w-4" />
          </div>
          <div>
            <div className="topbar-title">{context.title}</div>
            <div className="topbar-subtitle">{context.subtitle}</div>
          </div>
        </div>

        <div className="topbar-actions">
          <button className="topbar-icon-button hidden sm:flex" title="Search">
            <Search className="h-4 w-4" />
          </button>

          {session && (
            <button className="topbar-icon-button" title="Notifications">
              <Bell className="h-4 w-4" />
              <span className="notification-dot" />
            </button>
          )}

          <div className="topbar-divider" />

          <button onClick={(e) => setMenuAnchor(e.currentTarget)} className="user-menu-trigger">
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#ecfdf5',
                color: '#047857',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: '1px solid #d1fae5',
              }}
            >
              {session ? initial : <CircleUserRound className="h-4 w-4" />}
            </Avatar>
            <div className="hidden text-left md:block">
              <div className="text-xs font-bold text-slate-800">{session?.name || 'Guest'}</div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                {session?.role || 'Visitor'}
              </div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 md:block" />
          </button>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 210,
                borderRadius: 3,
                border: '1px solid rgba(226,232,240,0.9)',
                boxShadow: '0 20px 50px rgba(15,23,42,0.12)',
              },
            }}
          >
            {session ? (
              <>
                <MenuItem
                  component={NavLink}
                  to={session.role === 'admin' ? '/adminDashboard' : '/userDashboard'}
                  onClick={() => setMenuAnchor(null)}
                >
                  <ListItemIcon>
                    <UserCircle className="h-4 w-4" />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
                <MenuItem component={NavLink} to="/settings" onClick={() => setMenuAnchor(null)}>
                  <ListItemIcon>
                    <Settings className="h-4 w-4" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setMenuAnchor(null);
                    onSignOut();
                  }}
                >
                  <ListItemIcon>
                    <LogOut className="h-4 w-4 text-red-500" />
                  </ListItemIcon>
                  Sign out
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={NavLink} to="/login" onClick={() => setMenuAnchor(null)}>
                  <ListItemIcon>
                    <LogIn className="h-4 w-4" />
                  </ListItemIcon>
                  Sign in
                </MenuItem>
                <MenuItem component={NavLink} to="/register" onClick={() => setMenuAnchor(null)}>
                  <ListItemIcon>
                    <UserPlus className="h-4 w-4" />
                  </ListItemIcon>
                  Create account
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Topbar;