// src/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function DashboardLayout({ session, onSignOut }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <div className="app-layout">
        <Sidebar
          session={session}
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          onSignOut={handleSignOut}
        />

        <div className="main-workspace">
          <Topbar
            session={session}
            onSignOut={handleSignOut}
            onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          />

          <main style={{ flex: 1, padding: 0 }}>
            <Outlet />
          </main>

          <footer className="app-footer">
            <div className="flex justify-between items-center">
              <span>© 2026 JEMAK Waste Management</span>
              <div className="flex gap-4">
                <a href="/terms" className="hover:text-slate-700">Terms</a>
                <a href="/privacy" className="hover:text-slate-700">Privacy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;