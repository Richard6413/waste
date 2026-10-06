// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Operations
import OperationsDashboard from './pages/Operations/Dashboard';
import RoutesList from './pages/Operations/RoutesList';
import CreateRoute from './pages/Operations/CreateRoute';
import CollectionRecords from './pages/Operations/CollectionRecords';
import ActiveCollections from './pages/Operations/ActiveCollections';
import LiveTracking from './pages/Operations/LiveTracking';
import DriverList from './pages/Operations/DriverList';
import RouteDetails from './pages/Operations/RouteDetails';

// Schedule
import SchedulePage from './pages/Schedule/page';
import SpecialCollectionPage from './pages/Schedule/SpecialCollectionPage';
import SpecialCollectionCheckoutResult from './pages/Schedule/SpecialCollectionCheckoutResult';

// Fleet
import FleetDashboard from './pages/Fleet/Dashboard';
import VehicleList from './pages/Fleet/VehicleList';
import VehicleDetails from './pages/Fleet/VehicleDetails';
import FleetDriverList from './pages/Fleet/DriverList';
import FleetLiveTracking from './pages/Fleet/LiveTracking';

// Customers
import HouseholdList from './pages/Customers/HouseholdList';
import CreateHousehold from './pages/Customers/CreateHousehold';
import HouseholdDetails from './pages/Customers/HouseholdDetails';
import ServiceRequests from './pages/Customers/ServiceRequests';

// Waste
import WasteTypesList from './pages/Waste/WasteTypesList';
import RecyclingManagement from './pages/Waste/RecyclingManagement';
import WasteRecords from './pages/Waste/WasteRecords';
import DropOffCentres from './pages/Waste/DropOffCentres';

// Billing
import BillingDashboard from './pages/Billing/Dashboard';
import InvoiceList from './pages/Billing/InvoiceList';
import CreateInvoice from './pages/Billing/CreateInvoice';
import InvoiceDetails from './pages/Billing/InvoiceDetails';
import PaymentList from './pages/Billing/PaymentList';
import CheckoutResultPage from './pages/Billing/CheckoutResultPage';
import PriceConfiguration from './pages/Utilities/PriceConfiguration';

// Analytics
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
import OperationalReports from './pages/Analytics/OperationalReports';
import FinancialReports from './pages/Analytics/FinancialReports';
import ComplianceReports from './pages/Analytics/ComplianceReports';
import TrendAnalysis from './pages/Analytics/TrendAnalysis';
import CustomReportBuilder from './pages/Analytics/CustomReportBuilder';

// Admin
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import UserDashboard from './pages/Dashboards/UserDashboard';
import UserManagement from './pages/Admin/UserManagement';
import CreateUser from './pages/Admin/CreateUser';
import UserDetails from './pages/Admin/UserDetails';
import SystemSettings from './pages/Admin/SystemSettings';
import AuditLogs from './pages/Admin/AuditLogs';
import BackupManagement from './pages/Admin/BackupManagement';
import SystemHealthMonitor from './pages/Admin/SystemHealthMonitor';
import ProfilePage from './pages/Admin/ProfilePage';

// Utilities
import HelpSupport from './pages/Utilities/HelpSupport';
import CalendarView from './pages/Utilities/CalendarView';
import DocumentManagement from './pages/Utilities/DocumentManagement';
import WalkthroughOnboarding from './pages/Utilities/WalkthroughOnboarding';

// Manage Collection Ops
import ManageCollectionOpsPage from './pages/ManageCollectionOps/ManageCollectionOpsPage';
import CollectorView from './pages/ManageCollectionOps/CollectorView';

// Route Optimization
import RouteOptimizationDashboard from './pages/RouteOptimization/Dashboard';

// Sustainability
import SustainabilityDashboard from './pages/Sustainability/Dashboard';
import CarbonTracking from './pages/Sustainability/CarbonTracking';
import GreenInitiatives from './pages/Sustainability/GreenInitiatives';
import RecycleRewards from './pages/Sustainability/RecycleRewards';

// Communication
import AlertsCenter from './pages/Communication/AlertsCenter';
import NotificationCenter from './pages/Communication/NotificationCenter';

// Mobile
import CustomerPortal from './pages/Mobile/CustomerPortal';
import DriverDashboard from './pages/Mobile/DriverDashboard';
import FieldOperations from './pages/Mobile/FieldOperations';
import IncidentReports from './pages/Mobile/IncidentReports';

// Advanced
import AIRouteOptimization from './pages/Advanced/AIRouteOptimization';
import CustomerSegments from './pages/Advanced/CustomerSegments';
import IntegrationHub from './pages/Advanced/IntegrationHub';
import PredictiveAnalytics from './pages/Advanced/PredictiveAnalytics';

import { auth, onAuthStateChanged, signOut } from './config/firebase';
import { getUserData } from './utils/userHelpers';
import { loadDemoSession, clearDemoSession } from './utils/demoAuth';
import './index.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          const token = await user.getIdToken();

          setSession({
            uid: user.uid,
            email: user.email,
            name:
              user.displayName ||
              userData?.name ||
              user.email?.split('@')[0] ||
              'User',
            role: userData?.role || 'user',
            token,
            ...userData,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setSession({
            uid: user.uid,
            email: user.email,
            name:
              user.displayName ||
              user.email?.split('@')[0] ||
              'User',
            role: 'user',
            token: await user.getIdToken(),
          });
        }
      } else {
        const token = localStorage.getItem('authToken');
        const savedSession = loadDemoSession();

        if (token && savedSession) {
          setSession(savedSession);
        } else if (token) {
          setSession({
            uid: 'jwt-user',
            email: '',
            name: 'User',
            role: 'user',
            token,
          });
        } else {
          setSession(savedSession || null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userData) => {
    if (userData.token) {
      localStorage.setItem('authToken', userData.token);
    }
    setSession(userData);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearDemoSession();
      localStorage.removeItem('authToken');
      setSession(null);
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 text-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!session) {
      return (
        <Navigate
          to="/login"
          state={{ from: window.location.pathname }}
          replace
        />
      );
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
          {/* Dashboard */}
          <Route index element={<Home session={session} />} />
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="userDashboard" element={<UserDashboard />} />

          {/* Operations */}
          <Route path="ops" element={<OperationsDashboard />} />
          <Route path="ops/routes" element={<RoutesList />} />
          <Route path="ops/routes/create" element={<CreateRoute />} />
          <Route path="ops/routes/:id" element={<RouteDetails />} />
          <Route path="ops/collections" element={<CollectionRecords />} />
          <Route path="ops/collections/in-progress" element={<ActiveCollections />} />
          <Route path="ops/vehicles" element={<VehicleList />} />
          <Route path="ops/vehicles/tracking" element={<LiveTracking />} />
          <Route path="ops/drivers" element={<DriverList />} />

          {/* Schedule */}
          <Route path="schedule" element={<SchedulePage session={session} />} />
          <Route path="schedule/create" element={<SpecialCollectionPage />} />
          <Route path="schedule/result" element={<SpecialCollectionCheckoutResult />} />

          {/* Fleet */}
          <Route path="fleet" element={<FleetDashboard />} />
          <Route path="fleet/vehicles" element={<VehicleList />} />
          <Route path="fleet/vehicles/:id" element={<VehicleDetails />} />
          <Route path="fleet/drivers" element={<FleetDriverList />} />
          <Route path="fleet/tracking" element={<FleetLiveTracking />} />

          {/* Customers */}
          <Route path="customers" element={<HouseholdList />} />
          <Route path="customers/households" element={<HouseholdList />} />
          <Route path="customers/households/create" element={<CreateHousehold />} />
          <Route path="customers/households/:id" element={<HouseholdDetails />} />
          <Route path="customers/businesses" element={<ServiceRequests />} />
          <Route path="customers/segments" element={<ServiceRequests />} />

          {/* Waste */}
          <Route path="waste" element={<WasteTypesList />} />
          <Route path="waste/types" element={<WasteTypesList />} />
          <Route path="waste/types/create" element={<WasteTypesList />} />
          <Route path="waste/recycling" element={<RecyclingManagement />} />
          <Route path="waste/recycling/programs" element={<RecyclingManagement />} />
          <Route path="waste/recycling/materials" element={<RecyclingManagement />} />
          <Route path="waste/disposal/sites" element={<DropOffCentres />} />
          <Route path="waste/disposal/manifest" element={<WasteRecords />} />
          <Route path="waste/records" element={<WasteRecords />} />

          {/* Billing */}
          <Route path="billing" element={<BillingDashboard />} />
          <Route path="billing/dashboard" element={<BillingDashboard />} />
          <Route path="billing/invoices" element={<InvoiceList />} />
          <Route path="billing/invoices/create" element={<CreateInvoice />} />
          <Route path="billing/invoices/:id" element={<InvoiceDetails />} />
          <Route path="billing/payments" element={<PaymentList />} />
          <Route path="billing/rates" element={<PriceConfiguration />} />
          <Route path="billing/checkout/result" element={<CheckoutResultPage />} />

          {/* Analytics */}
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="analytics/dashboard" element={<AnalyticsDashboard />} />
          <Route path="analytics/reports/operational" element={<OperationalReports />} />
          <Route path="analytics/reports/financial" element={<FinancialReports />} />
          <Route path="analytics/reports/compliance" element={<ComplianceReports />} />
          <Route path="analytics/trends" element={<TrendAnalysis />} />
          <Route path="analytics/reports/create" element={<CustomReportBuilder />} />
          <Route path="analytics/predictions" element={<TrendAnalysis />} />
          <Route path="analytics/routes/optimize" element={<RouteOptimizationDashboard />} />

          {/* Admin */}
          <Route path="admin" element={<UserManagement />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="admin/users/create" element={<CreateUser />} />
          <Route path="admin/users/:id" element={<UserDetails />} />
          <Route path="admin/settings" element={<SystemSettings />} />
          <Route path="admin/settings/general" element={<SystemSettings />} />
          <Route path="admin/settings/notifications" element={<SystemSettings />} />
          <Route path="admin/settings/security" element={<SystemSettings />} />
          <Route path="admin/settings/integrations" element={<SystemSettings />} />
          <Route path="admin/audit" element={<AuditLogs />} />
          <Route path="admin/backup" element={<BackupManagement />} />
          <Route path="admin/health" element={<SystemHealthMonitor />} />
          <Route path="admin/profile" element={<ProfilePage />} />

          {/* Utilities */}
          <Route path="help" element={<HelpSupport />} />
          <Route path="help/faq" element={<HelpSupport />} />
          <Route path="help/contact" element={<HelpSupport />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="calendar/week" element={<CalendarView />} />
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="documents/upload" element={<DocumentManagement />} />
          <Route path="onboarding" element={<WalkthroughOnboarding />} />

          {/* Manage Collection Ops */}
          <Route path="manage-collection-ops" element={<ManageCollectionOpsPage />} />
          <Route path="manage-collection-ops/collector" element={<CollectorView />} />

          {/* Settings */}
          <Route path="settings" element={<SystemSettings />} />

          {/* Sustainability */}
          <Route path="sustainability" element={<SustainabilityDashboard />} />
          <Route path="sustainability/dashboard" element={<SustainabilityDashboard />} />
          <Route path="sustainability/carbon" element={<CarbonTracking />} />
          <Route path="sustainability/initiatives" element={<GreenInitiatives />} />
          <Route path="sustainability/rewards" element={<RecycleRewards />} />

          {/* Communication */}
          <Route path="communication" element={<NotificationCenter />} />
          <Route path="communication/notifications" element={<NotificationCenter />} />
          <Route path="communication/alerts" element={<AlertsCenter />} />

          {/* Mobile */}
          <Route path="mobile" element={<CustomerPortal />} />
          <Route path="mobile/portal" element={<CustomerPortal />} />
          <Route path="mobile/driver" element={<DriverDashboard />} />
          <Route path="mobile/field" element={<FieldOperations />} />
          <Route path="mobile/incidents" element={<IncidentReports />} />

          {/* Advanced */}
          <Route path="advanced" element={<PredictiveAnalytics />} />
          <Route path="advanced/predictions" element={<PredictiveAnalytics />} />
          <Route path="advanced/ai-routes" element={<AIRouteOptimization />} />
          <Route path="advanced/segments" element={<CustomerSegments />} />
          <Route path="advanced/integrations" element={<IntegrationHub />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
