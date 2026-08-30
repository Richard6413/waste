// pages/mobile/CustomerPortal.jsx
import { useState } from 'react';
import { 
  Home, Calendar, CreditCard, Bell,
  MapPin, Clock, CheckCircle,
  MessageSquare, User, Settings,
  ChevronRight, Menu, LogOut,
  Package, TrendingUp, Phone,
  Mail, Download, Eye
} from 'lucide-react';

const CustomerPortal = () => {
  const [customer] = useState({ // REMOVED setCustomer
    name: 'John Doe',
    id: 'H-001',
    status: 'active',
    serviceType: 'Standard',
    address: '123 Main St, North Zone',
    phone: '+254 712 345 678',
    email: 'john.doe@email.com',
    paymentStatus: 'paid',
    balance: 0
  });

  const [upcomingCollection] = useState({ // REMOVED setUpcomingCollection
    date: '2024-02-01',
    time: '08:30 AM',
    type: 'Mixed Waste',
    status: 'scheduled'
  });

  const [collectionHistory] = useState([ // REMOVED setCollectionHistory
    { date: '2024-01-25', weight: 32.5, type: 'Mixed', status: 'completed' },
    { date: '2024-01-18', weight: 28.0, type: 'Recyclable', status: 'completed' },
    { date: '2024-01-11', weight: 35.2, type: 'Mixed', status: 'completed' },
    { date: '2024-01-04', weight: 30.1, type: 'Recyclable', status: 'completed' }
  ]);

  const [billingSummary] = useState({ // REMOVED setBillingSummary
    currentBalance: 4500,
    lastPayment: '2024-01-20',
    nextPayment: '2024-02-15',
    totalPaid: 12500
  });

  const notifications = [
    { id: 1, title: 'Collection Reminder', message: 'Your next collection is tomorrow at 8:30 AM', time: '2 hours ago' },
    { id: 2, title: 'Payment Received', message: 'Payment of KSh 4,500 received on Jan 20', time: '1 day ago' },
    { id: 3, title: 'Service Update', message: 'New recycling service available in your area', time: '3 days ago' }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Schedule', color: 'bg-emerald-500' },
    { icon: CreditCard, label: 'Pay Bill', color: 'bg-blue-500' },
    { icon: MessageSquare, label: 'Report Issue', color: 'bg-amber-500' },
    { icon: Phone, label: 'Contact Support', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-slate-100">
              <Menu size={22} className="text-slate-600" />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 text-lg">JEMAK Waste</h1>
              <p className="text-xs text-slate-400">Customer Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-slate-100">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold">
              {customer.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Profile */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">Welcome back,</p>
              <p className="text-xl font-bold">{customer.name}</p>
              <p className="text-sm opacity-80 mt-1">{customer.address}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Active
                </span>
                <span className="text-xs opacity-80">• {customer.serviceType}</span>
              </div>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-3 py-2">
              <div className="text-2xl font-bold">KSh {billingSummary.currentBalance.toLocaleString()}</div>
              <div className="text-xs opacity-80">Balance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button key={index} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color} text-white`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-medium text-slate-700">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Collection */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Next Collection</h3>
            <span className={`status ${upcomingCollection.status === 'scheduled' ? 'status-success' : 'status-warning'}`}>
              <span className="status-dot" />
              {upcomingCollection.status.charAt(0).toUpperCase() + upcomingCollection.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Calendar size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{upcomingCollection.date}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-600 flex items-center gap-1">
                  <Clock size={14} /> {upcomingCollection.time}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{upcomingCollection.type}</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>
        </div>
      </div>

      {/* Collection History */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Collection History</h3>
            <button className="text-xs text-emerald-600 font-medium">View All</button>
          </div>
          <div className="space-y-2">
            {collectionHistory.map((collection, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{collection.date}</p>
                    <p className="text-xs text-slate-400">{collection.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{collection.weight} kg</p>
                  <p className="text-xs text-emerald-600 capitalize">{collection.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing Summary */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Billing Summary</h3>
            <button className="text-xs text-emerald-600 font-medium">View Details</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-400">Balance</p>
              <p className="text-sm font-bold text-slate-900">KSh {billingSummary.currentBalance.toLocaleString()}</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-400">Last Payment</p>
              <p className="text-sm font-bold text-slate-900">{billingSummary.lastPayment}</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-400">Total Paid</p>
              <p className="text-sm font-bold text-slate-900">KSh {billingSummary.totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            <button className="text-xs text-slate-400">Mark All Read</button>
          </div>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                  <p className="text-xs text-slate-500">{notification.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Calendar, label: 'Schedule', active: false },
            { icon: CreditCard, label: 'Billing', active: false },
            { icon: User, label: 'Profile', active: false },
            { icon: Settings, label: 'Settings', active: false }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button key={index} className={`flex flex-col items-center gap-0.5 ${
                item.active ? 'text-emerald-600' : 'text-slate-400'
              }`}>
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;