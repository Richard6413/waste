// src/pages/Mobile/CustomerPortal.jsx
import { useState } from 'react';
import { User, Calendar, CreditCard, Bell, MapPin, Phone, Mail, ChevronRight, Package, Clock, CheckCircle } from 'lucide-react';

const CustomerPortal = () => {
  const [customer] = useState({
    name: 'N. Perera',
    email: 'n.perera@email.com',
    phone: '+94 77 123 4567',
    address: '12 Flower Rd, Colombo 07',
    plan: 'Standard',
    balance: 2450
  });

  const [upcomingCollections] = useState([
    { id: 1, type: 'General Waste', date: '2024-01-16', time: '08:00 AM', status: 'scheduled' },
    { id: 2, type: 'Recyclables', date: '2024-01-18', time: '08:00 AM', status: 'scheduled' },
  ]);

  const [recentActivity] = useState([
    { id: 1, action: 'Collection completed', date: '2024-01-15', status: 'completed' },
    { id: 2, action: 'Payment received', date: '2024-01-14', status: 'completed' },
    { id: 3, action: 'Special pickup requested', date: '2024-01-13', status: 'pending' },
  ]);

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">MOBILE</div>
          <h1 className="page-title">Customer Portal</h1>
          <p className="page-description">Quick access to your waste management services</p>
        </div>
      </div>

      {/* Customer Card */}
      <div className="workspace-panel mb-6">
        <div className="panel-body">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <User size={28} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">{customer.name}</h2>
              <p className="text-slate-500">{customer.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge bg-blue-100 text-blue-700">{customer.plan}</span>
                {customer.balance > 0 && (
                  <span className="badge bg-red-100 text-red-700">LKR {customer.balance.toLocaleString()} due</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button className="workspace-panel hover:shadow-md transition-shadow">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-2">
              <Calendar size={20} className="text-emerald-600" />
            </div>
            <p className="font-semibold text-sm">Schedule Pickup</p>
          </div>
        </button>
        <button className="workspace-panel hover:shadow-md transition-shadow">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-2">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <p className="font-semibold text-sm">Pay Bill</p>
          </div>
        </button>
        <button className="workspace-panel hover:shadow-md transition-shadow">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-2">
              <Package size={20} className="text-purple-600" />
            </div>
            <p className="font-semibold text-sm">Request Collection</p>
          </div>
        </button>
        <button className="workspace-panel hover:shadow-md transition-shadow">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <Bell size={20} className="text-amber-600" />
            </div>
            <p className="font-semibold text-sm">Notifications</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Collections */}
        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Upcoming Collections</h2>
          </div>
          <div className="panel-body">
            <div className="space-y-3">
              {upcomingCollections.map((collection) => (
                <div key={collection.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Package size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{collection.type}</p>
                      <p className="text-sm text-slate-500">{collection.date} at {collection.time}</p>
                    </div>
                  </div>
                  <span className="status status-success">{collection.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="workspace-panel">
          <div className="panel-header">
            <h2 className="panel-title">Recent Activity</h2>
          </div>
          <div className="panel-body">
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'completed' ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}>
                      {activity.status === 'completed' ? (
                        <CheckCircle size={16} className="text-emerald-600" />
                      ) : (
                        <Clock size={16} className="text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{activity.action}</p>
                      <p className="text-sm text-slate-500">{activity.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="workspace-panel mt-6">
        <div className="panel-header">
          <h2 className="panel-title">Contact Information</h2>
        </div>
        <div className="panel-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <MapPin size={18} className="text-emerald-600" />
              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="font-semibold">{customer.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Phone size={18} className="text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <Mail size={18} className="text-purple-600" />
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold">{customer.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
