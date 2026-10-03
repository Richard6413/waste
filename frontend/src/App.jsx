// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import OperationsDashboard from './pages/Operations/Dashboard';
import SchedulePage from './pages/Schedule/page';
import FleetDashboard from './pages/Fleet/Dashboard';
import HouseholdList from './pages/Customers/HouseholdList';
import WasteTypesList from './pages/Waste/WasteTypesList';
import BillingDashboard from './pages/Billing/Dashboard';
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
import UserDashboard from './pages/Dashboards/UserDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import HelpSupport from './pages/Utilities/HelpSupport';
import SystemSettings from './pages/Admin/SystemSettings';
import { auth, onAuthStateChanged, signOut } from './config/firebase';
import { getUserData } from './utils/userHelpers';
import './index.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get user data from Firestore
          const userData = await getUserData(user.uid);
          const token = await user.getIdToken();
          
          setSession({
            uid: user.uid,
            email: user.email,
            name: user.displayName || userData?.name || user.email?.split('@')[0] || 'User',
            role: userData?.role || 'user',
            token: token,
            ...userData
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setSession({
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split('@')[0] || 'User',
            role: 'user',
            token: await user.getIdToken()
          });
        }
      } else {
        setSession(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData) => {
    setSession(userData);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setSession(null);
    }
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      );
    }
    
    if (!session) {
      return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
    }
    
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout session={session} onSignOut={handleSignOut} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home session={session} />} />
          <Route path="ops" element={<OperationsDashboard />} />
          <Route path="schedule" element={<SchedulePage session={session} />} />
          <Route path="fleet" element={<FleetDashboard />} />
          <Route path="customers" element={<HouseholdList />} />
          <Route path="waste" element={<WasteTypesList />} />
          <Route path="recycling" element={<WasteTypesList />} />
          <Route path="billing" element={<BillingDashboard />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="help" element={<HelpSupport />} />
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="userDashboard" element={<UserDashboard />} />
        </Route>
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;