// pages/mobile/DriverDashboard.jsx
import { useState } from 'react'; // REMOVED unused useEffect
import { 
  Truck, MapPin, Clock, CheckCircle,
  Navigation, AlertTriangle, Phone,
  MessageSquare, Camera, FileText,
  User, Calendar, TrendingUp,
  ChevronRight, Menu, Bell,
  RefreshCw, Home, Layers, Settings
} from 'lucide-react';

const DriverDashboard = () => {
  const [driver] = useState({ // REMOVED setDriver
    name: 'John Kamau',
    id: 'DRV-001',
    status: 'online',
    vehicle: 'Truck #001',
    rating: 4.8,
    trips: 12,
    todayTrips: 6
  });

  const [currentRoute] = useState({ // REMOVED setCurrentRoute
    name: 'North Zone A',
    progress: 65,
    stops: 45,
    completed: 29,
    estimatedTime: '4h 30m',
    startTime: '08:00 AM',
    nextStop: {
      address: '123 Main St',
      customer: 'John Doe',
      estimatedArrival: '10:15 AM',
      distance: '2.3 km'
    }
  });

  const [notifications] = useState([ // REMOVED setNotifications
    { id: 1, title: 'Route Update', message: 'New stop added to your route', time: '5 min ago', type: 'info' },
    { id: 2, title: 'Customer Request', message: 'John Doe requested earlier pickup', time: '15 min ago', type: 'warning' },
    { id: 3, title: 'Maintenance Alert', message: 'Vehicle service due in 5 days', time: '1 hour ago', type: 'error' }
  ]);

  const [recentCollections] = useState([ // REMOVED setRecentCollections
    { id: 1, customer: 'Jane Smith', weight: 28.5, time: '09:15 AM', status: 'completed' },
    { id: 2, customer: 'Bob Johnson', weight: 32.0, time: '08:45 AM', status: 'completed' },
    { id: 3, customer: 'Alice Brown', weight: 24.5, time: '08:15 AM', status: 'pending' }
  ]);

  const quickActions = [
    { icon: MapPin, label: 'Start Route', color: 'bg-emerald-500' },
    { icon: Camera, label: 'Record Collection', color: 'bg-blue-500' },
    { icon: MessageSquare, label: 'Report Issue', color: 'bg-amber-500' },
    { icon: Phone, label: 'Contact Dispatch', color: 'bg-purple-500' }
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
              <p className="text-xs text-slate-400">Driver Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-slate-100">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold">
              {driver.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </div>

      {/* Driver Status */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Good Morning,</p>
              <p className="text-xl font-bold">{driver.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </span>
                <span className="text-xs opacity-80">• {driver.vehicle}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{driver.rating}</div>
              <div className="text-xs opacity-80">Rating</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
            <div className="text-center">
              <p className="text-sm font-bold">{driver.todayTrips}</p>
              <p className="text-xs opacity-80">Today's Trips</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">{driver.trips}</p>
              <p className="text-xs opacity-80">Total Trips</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">{currentRoute.progress}%</p>
              <p className="text-xs opacity-80">Route Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Route */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Navigation size={18} className="text-emerald-600" />
              <h3 className="font-semibold text-slate-900">{currentRoute.name}</h3>
            </div>
            <span className="text-xs text-slate-400">Route ID: R-001</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-slate-400" />
              <span>{currentRoute.startTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-slate-400" />
              <span>{currentRoute.completed}/{currentRoute.stops}</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Route Progress</span>
              <span className="font-medium">{currentRoute.progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${currentRoute.progress}%` }}
              />
            </div>
          </div>

          {/* Next Stop */}
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className="text-xs font-medium text-emerald-800">Next Stop</p>
            <div className="flex items-start justify-between mt-1">
              <div>
                <p className="font-semibold text-slate-900">{currentRoute.nextStop.customer}</p>
                <p className="text-sm text-slate-600">{currentRoute.nextStop.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">{currentRoute.nextStop.estimatedArrival}</p>
                <p className="text-xs text-slate-500">{currentRoute.nextStop.distance}</p>
              </div>
            </div>
          </div>

          <button className="mt-3 btn btn-primary w-full justify-center">
            <Navigation size={16} />
            Navigate to Stop
          </button>
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

      {/* Recent Collections */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Recent Collections</h3>
            <button className="text-xs text-emerald-600 font-medium">View All</button>
          </div>
          <div className="space-y-2">
            {recentCollections.map((collection) => (
              <div key={collection.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    collection.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {collection.status === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{collection.customer}</p>
                    <p className="text-xs text-slate-400">{collection.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{collection.weight} kg</p>
                  <p className="text-xs text-slate-400 capitalize">{collection.status}</p>
                </div>
              </div>
            ))}
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
              <div key={notification.id} className={`flex items-start gap-2 p-2 rounded-xl ${
                notification.type === 'error' ? 'bg-red-50' :
                notification.type === 'warning' ? 'bg-amber-50' :
                'bg-blue-50'
              }`}>
                <div className={`mt-0.5 h-2 w-2 rounded-full ${
                  notification.type === 'error' ? 'bg-red-500' :
                  notification.type === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`} />
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
            { icon: Navigation, label: 'Route', active: false },
            { icon: Layers, label: 'Tasks', active: false },
            { icon: FileText, label: 'Reports', active: false },
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

export default DriverDashboard;