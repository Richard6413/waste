// src/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

function DashboardLayout({ session, onSignOut }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="app-shell">
      <div className="app-layout">
        {/* ✅ Sidebar is included here */}
        <Sidebar
          session={session}
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          onSignOut={onSignOut}
        />

        <div className="main-workspace">
          <Topbar
            session={session}
            onSignOut={onSignOut}
            onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          />

          <main>
            <Outlet />
          </main>

          <footer className="app-footer">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Leaf className="h-3.5 w-3.5 text-emerald-500" />
                <span>© {currentYear} JEMAK Waste Management</span>
                <span className="hidden text-slate-300 sm:inline">•</span>
                <span className="hidden sm:inline">Operations Platform</span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/ops" className="transition hover:text-slate-700">
                  Operations
                </Link>
                <Link to="/schedule" className="transition hover:text-slate-700">
                  Schedule
                </Link>
                {session?.role === 'admin' && (
                  <Link to="/analytics" className="transition hover:text-slate-700">
                    Analytics
                  </Link>
                )}
                <Link to="/terms" className="transition hover:text-slate-700">
                  Terms
                </Link>
                <Link to="/privacy" className="transition hover:text-slate-700">
                  Privacy
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;