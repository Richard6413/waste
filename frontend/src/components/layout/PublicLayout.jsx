// src/components/layout/PublicLayout.jsx
import { Outlet } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

function PublicLayout() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30">
      <div className="flex min-h-screen flex-col">
        {/* Simple Public Header */}
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/20">
                  JM
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">JEMAK</div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Waste Management
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <Link to="/login" className="font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Simple Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Leaf className="h-4 w-4 text-emerald-500" />
                <span>© {currentYear} JEMAK Waste Management. Powered by ENOM Systems.</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Link to="/terms" className="text-slate-500 hover:text-slate-700 transition-colors">
                  Terms
                </Link>
                <Link to="/privacy" className="text-slate-500 hover:text-slate-700 transition-colors">
                  Privacy
                </Link>
                <Link to="/help" className="text-slate-500 hover:text-slate-700 transition-colors">
                  Help
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PublicLayout;