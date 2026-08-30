// src/App.jsx
import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './index.css';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import PublicLayout from './components/layout/PublicLayout';

// Pages - Core
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import TermsPage from './pages/Auth/TermsPage';
import PrivacyPage from './pages/Auth/PrivacyPage';

// Pages - Operations
import ManageCollectionOpsPage from './pages/ManageCollectionOps/ManageCollectionOpsPage';
import ActiveCollections from './pages/Operations/ActiveCollections';
import OperationsDashboard from './pages/Operations/Dashboard';
import RoutesList from './pages/Operations/RoutesList';
import RouteDetails from './pages/Operations/RouteDetails';
import CreateRoute from './pages/Operations/CreateRoute';
import CollectionRecords from './pages/Operations/CollectionRecords';

// Pages - Fleet
import FleetDashboard from './pages/Fleet/Dashboard';
import VehicleList from './pages/Fleet/VehicleList';
import VehicleDetails from './pages/Fleet/VehicleDetails';
import LiveTracking from './pages/Fleet/LiveTracking';
import DriverList from './pages/Fleet/DriverList';

// Pages - Customers
import HouseholdList from './pages/Customers/HouseholdList';
import HouseholdDetails from './pages/Customers/HouseholdDetails';
import CreateHousehold from './pages/Customers/CreateHousehold';
import CustomerSegments from './pages/Advanced/CustomerSegments';

// Pages - Waste Management
import WasteTypesList from './pages/Waste/WasteTypesList';
import RecyclingManagement from './pages/Waste/RecyclingManagement';

// Pages - Billing
import BillingDashboard from './pages/Billing/Dashboard';
import InvoiceList from './pages/Billing/InvoiceList';
import CreateInvoice from './pages/Billing/CreateInvoice';
import InvoiceDetails from './pages/Billing/InvoiceDetails';
import PaymentList from './pages/Billing/PaymentList';
import PriceConfiguration from './pages/Utilities/PriceConfiguration';

// Pages - Analytics
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
import OperationalReports from './pages/Analytics/OperationalReports';
import FinancialReports from './pages/Analytics/FinancialReports';
import ComplianceReports from './pages/Analytics/ComplianceReports';
import TrendAnalysis from './pages/Analytics/TrendAnalysis';
import CustomReportBuilder from './pages/Analytics/CustomReportBuilder';
import PredictiveAnalytics from './pages/Advanced/PredictiveAnalytics';
import AIRouteOptimization from './pages/Advanced/AIRouteOptimization';

// Pages - Sustainability
import SustainabilityDashboard from './pages/Sustainability/Dashboard';
import CarbonTracking from './pages/Sustainability/CarbonTracking';
import GreenInitiatives from './pages/Sustainability/GreenInitiatives';

// Pages - Admin
import UserManagement from './pages/Admin/UserManagement';
import CreateUser from './pages/Admin/CreateUser';
import UserDetails from './pages/Admin/UserDetails';
import SystemSettings from './pages/Admin/SystemSettings';
import AuditLogs from './pages/Admin/AuditLogs';
import BackupManagement from './pages/Admin/BackupManagement';
import SystemHealthMonitor from './pages/Admin/SystemHealthMonitor';
import IntegrationHub from './pages/Advanced/IntegrationHub';

// Pages - Utilities
import CalendarView from './pages/Utilities/CalendarView';
import DocumentManagement from './pages/Utilities/DocumentManagement';
import HelpSupport from './pages/Utilities/HelpSupport';
import WalkthroughOnboarding from './pages/Utilities/WalkthroughOnboarding';

// Pages - Schedule
import SpecialCollectionPage from './pages/Schedule/SpecialCollectionPage';
import SpecialCollectionCheckoutResult from './pages/Schedule/SpecialCollectionCheckoutResult';
import CheckoutResultPage from './pages/Billing/CheckoutResultPage';

// Pages - User/Admin Dashboards
import UserDashboard from './pages/Dashboards/UserDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';

// Theme
const theme = createTheme({
  palette: {
    primary: { main: '#059669', light: '#34d399', dark: '#047857', contrastText: '#ffffff' },
    secondary: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706', contrastText: '#ffffff' },
    background: { default: '#f7f9fc', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#475569' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: { fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontSize: '0.82rem', borderRadius: 8, margin: '2px 6px' },
      },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});

function App() {
  const [sessionUser, setSessionUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem('sw-user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn('Failed to parse stored session', error);
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionUser) {
      window.localStorage.setItem('sw-user', JSON.stringify(sessionUser));
    } else {
      window.localStorage.removeItem('sw-user');
    }
  }, [sessionUser]);

  const handleLoginSuccess = (user) => {
    setSessionUser(user);
  };

  const handleSignOut = () => {
    setSessionUser(null);
  };

  const handleSessionInvalid = useCallback(() => {
    setSessionUser(null);
  }, []);

  const reroutePath = sessionUser?.role === 'admin' ? '/adminDashboard' : '/userDashboard';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes - No Sidebar */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={
            sessionUser ? <Navigate to={reroutePath} replace /> : <LoginPage onLogin={handleLoginSuccess} />
          } />
          <Route path="/register" element={
            sessionUser ? <Navigate to={reroutePath} replace /> : <RegisterPage onRegister={handleLoginSuccess} />
          } />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* Protected Routes - With Sidebar */}
        <Route element={<DashboardLayout session={sessionUser} onSignOut={handleSignOut} />}>
          {/* ===== DASHBOARD ===== */}
          <Route path="/" element={<Home session={sessionUser} />} />
          <Route path="/userDashboard" element={
            sessionUser ? <UserDashboard session={sessionUser} /> : <Navigate to="/login" replace />
          } />
          <Route path="/adminDashboard" element={
            sessionUser?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />
          } />

          {/* ===== OPERATIONS ===== */}
          <Route path="/ops" element={<ManageCollectionOpsPage />} />
          <Route path="/ops/routes" element={<RoutesList />} />
          <Route path="/ops/routes/create" element={<CreateRoute />} />
          <Route path="/ops/routes/:id" element={<RouteDetails />} />
          <Route path="/ops/collections" element={<CollectionRecords />} />
          <Route path="/ops/collections/in-progress" element={<ActiveCollections />} />
          <Route path="/ops/drivers" element={<DriverList />} />
          <Route path="/fleet/vehicleList" element={<VehicleList />} />
          <Route path="/ops/vehicles/tracking" element={<LiveTracking />} />

          {/* ===== FLEET ===== */}
          <Route path="/fleet" element={<FleetDashboard />} />
          <Route path="/fleet/vehicles" element={<VehicleList />} />
          <Route path="/fleet/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/fleet/drivers" element={<DriverList />} />

          {/* ===== SCHEDULE ===== */}
          <Route path="/schedule" element={
            sessionUser ? <SpecialCollectionPage session={sessionUser} onSessionInvalid={handleSessionInvalid} /> : <Navigate to="/login" replace />
          } />
          <Route path="/schedule/create" element={
            sessionUser ? <SpecialCollectionPage session={sessionUser} onSessionInvalid={handleSessionInvalid} /> : <Navigate to="/login" replace />
          } />
          <Route path="/schedule/payment/result" element={
            sessionUser ? <SpecialCollectionCheckoutResult session={sessionUser} /> : <Navigate to="/login" replace />
          } />

          {/* ===== CALENDAR ===== */}
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/calendar/week" element={<CalendarView />} />

          {/* ===== CUSTOMERS ===== */}
          <Route path="/customers/households" element={<HouseholdList />} />
          <Route path="/customers/households/create" element={<CreateHousehold />} />
          <Route path="/customers/households/:id" element={<HouseholdDetails />} />
          <Route path="/customers/segments" element={<CustomerSegments />} />

          {/* ===== WASTE MANAGEMENT ===== */}
          <Route path="/waste/types" element={<WasteTypesList />} />
          <Route path="/waste/types/create" element={<WasteTypesList />} />
          <Route path="/waste/recycling" element={<RecyclingManagement />} />
          <Route path="/waste/recycling/programs" element={<RecyclingManagement />} />
          <Route path="/waste/recycling/materials" element={<RecyclingManagement />} />

          {/* ===== BILLING ===== */}
          <Route path="/billing/dashboard" element={<BillingDashboard />} />
          <Route path="/billing" element={<BillingDashboard />} />
          <Route path="/billing/invoices" element={<InvoiceList />} />
          <Route path="/billing/invoices/create" element={<CreateInvoice />} />
          <Route path="/billing/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/billing/payments" element={<PaymentList />} />
          <Route path="/billing/rates" element={<PriceConfiguration />} />
          <Route path="/billing/checkout" element={
            sessionUser ? <CheckoutResultPage session={sessionUser} /> : <Navigate to="/login" replace />
          } />

          {/* ===== ANALYTICS ===== */}
          <Route path="/analytics" element={
            sessionUser?.role === 'admin' ? <AnalyticsDashboard /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/dashboard" element={
            sessionUser?.role === 'admin' ? <AnalyticsDashboard /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/reports/operational" element={
            sessionUser?.role === 'admin' ? <OperationalReports /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/reports/financial" element={
            sessionUser?.role === 'admin' ? <FinancialReports /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/reports/compliance" element={
            sessionUser?.role === 'admin' ? <ComplianceReports /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/trends" element={
            sessionUser?.role === 'admin' ? <TrendAnalysis /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/reports/create" element={
            sessionUser?.role === 'admin' ? <CustomReportBuilder /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/predictions" element={
            sessionUser?.role === 'admin' ? <PredictiveAnalytics /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />
          <Route path="/analytics/routes/optimize" element={
            sessionUser?.role === 'admin' ? <AIRouteOptimization /> : <Navigate to={sessionUser ? '/userDashboard' : '/login'} replace />
          } />

          {/* ===== SUSTAINABILITY ===== */}
          <Route path="/sustainability/dashboard" element={<SustainabilityDashboard />} />
          <Route path="/sustainability" element={<SustainabilityDashboard />} />
          <Route path="/sustainability/carbon" element={<CarbonTracking />} />
          <Route path="/sustainability/initiatives" element={<GreenInitiatives />} />

          {/* ===== ADMIN ===== */}
          <Route path="/admin/users" element={
            sessionUser?.role === 'admin' ? <UserManagement /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/users/create" element={
            sessionUser?.role === 'admin' ? <CreateUser /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/users/:id" element={
            sessionUser?.role === 'admin' ? <UserDetails /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/settings/general" element={
            sessionUser?.role === 'admin' ? <SystemSettings /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/settings" element={
            sessionUser?.role === 'admin' ? <SystemSettings /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/audit" element={
            sessionUser?.role === 'admin' ? <AuditLogs /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/backup" element={
            sessionUser?.role === 'admin' ? <BackupManagement /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/health" element={
            sessionUser?.role === 'admin' ? <SystemHealthMonitor /> : <Navigate to="/login" replace />
          } />
          <Route path="/admin/settings/integrations" element={
            sessionUser?.role === 'admin' ? <IntegrationHub /> : <Navigate to="/login" replace />
          } />

          {/* ===== SUPPORT & UTILITIES ===== */}
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/help/faq" element={<HelpSupport />} />
          <Route path="/help/contact" element={<HelpSupport />} />
          <Route path="/documents" element={<DocumentManagement />} />
          <Route path="/documents/upload" element={<DocumentManagement />} />
          <Route path="/onboarding" element={<WalkthroughOnboarding />} />
          <Route path="/settings" element={<SystemSettings />} />

          {/* ===== COLLECTOR REDIRECT ===== */}
          <Route path="/collector" element={<Navigate to="/ops#collector-checklist" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={sessionUser ? reroutePath : '/'} replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;