// src/components/layout/Topbar.jsx
import { Menu, Bell, User, Search, LogOut, Settings, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Topbar({ session, onSignOut, onOpenMobileMenu }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowUserMenu(false);
    if (onSignOut) {
      onSignOut();
    }
    navigate('/login');
  };

  return (
    <header className="app-topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <button 
            className="menu-btn"
            onClick={onOpenMobileMenu}
          >
            <Menu size={24} />
          </button>
          <div>
            <div className="topbar-title">Command Center</div>
            <div className="topbar-subtitle">
              {session?.name ? `Welcome back, ${session.name}` : 'Welcome to JEMAK'}
            </div>
          </div>
        </div>

        <div className="topbar-right">
          <button className="topbar-icon-btn">
            <Search size={18} />
          </button>
          <button className="topbar-icon-btn">
            <Bell size={18} />
            <span className="notification-dot" />
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-slate-50 rounded-xl px-2 py-1 transition-all"
            >
              <div className="user-avatar">
                {session?.name ? session.name.charAt(0).toUpperCase() : 'U'}
              </div>
              {session?.name && (
                <span className="text-sm font-medium text-slate-700 hidden md:block">
                  {session.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-900">{session?.name || 'User'}</p>
                  <p className="text-xs text-slate-500">{session?.email || 'user@example.com'}</p>
                  {session?.role && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 rounded-full">
                      {session.role}
                    </span>
                  )}
                </div>
                
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <UserCircle size={16} />
                  Profile
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings size={16} />
                  Settings
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100 mt-1"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;