// pages/Communication/NotificationCenter.jsx
import { useState } from 'react';
import { 
  Bell, Settings, Mail, Smartphone,
  Filter, Search, ChevronDown,
  CheckCircle, AlertCircle, Info,
  AlertTriangle, Clock, Eye,
  Send, Edit, Trash2,
  Users, Calendar, Megaphone
} from 'lucide-react';

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const notifications = [
    {
      id: 1,
      title: 'Collection Route Updated',
      message: 'North Zone A route has been optimized with 3 new stops',
      type: 'info',
      sentTo: 'All Drivers',
      channel: 'Push Notification',
      time: '2024-01-30 14:30',
      status: 'sent',
      read: false,
      priority: 'normal'
    },
    {
      id: 2,
      title: '⚠️ Driver Delay Alert',
      message: 'Truck #003 is 30 minutes delayed on route West District C',
      type: 'warning',
      sentTo: 'Operations Team',
      channel: 'SMS',
      time: '2024-01-30 13:15',
      status: 'sent',
      read: true,
      priority: 'high'
    },
    {
      id: 3,
      title: 'New Feature Available',
      message: 'Mobile app update v2.3.0 now available with offline mode',
      type: 'info',
      sentTo: 'All Users',
      channel: 'Email',
      time: '2024-01-30 12:00',
      status: 'sent',
      read: false,
      priority: 'normal'
    },
    {
      id: 4,
      title: 'Payment Received',
      message: 'Invoice INV-2024-001 paid by John Doe - KSh 4,520',
      type: 'success',
      sentTo: 'Finance Team',
      channel: 'Push Notification',
      time: '2024-01-30 11:45',
      status: 'sent',
      read: true,
      priority: 'normal'
    },
    {
      id: 5,
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for Feb 1, 02:00-04:00 AM',
      type: 'warning',
      sentTo: 'All Users',
      channel: 'Email',
      time: '2024-01-29 16:00',
      status: 'pending',
      read: false,
      priority: 'high'
    }
  ];

  const templates = [
    { id: 1, name: 'Collection Reminder', category: 'Customer' },
    { id: 2, name: 'Payment Confirmation', category: 'Billing' },
    { id: 3, name: 'Route Update Alert', category: 'Operations' },
    { id: 4, name: 'Maintenance Notice', category: 'Fleet' }
  ];

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length
  };

  const getTypeIcon = (type) => {
    const icons = {
      info: <Info size={16} className="text-blue-500" />,
      warning: <AlertTriangle size={16} className="text-amber-500" />,
      success: <CheckCircle size={16} className="text-emerald-500" />,
      error: <AlertCircle size={16} className="text-red-500" />
    };
    return icons[type] || <Info size={16} className="text-blue-500" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      info: 'bg-blue-50 border-blue-200',
      warning: 'bg-amber-50 border-amber-200',
      success: 'bg-emerald-50 border-emerald-200',
      error: 'bg-red-50 border-red-200'
    };
    return colors[type] || 'bg-slate-50 border-slate-200';
  };

  return (
    <div className="workspace-content fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-kicker">COMMUNICATION</div>
          <h1 className="page-title">Notification Center</h1>
          <p className="page-description">
            Manage all system notifications, alerts, and announcements
          </p>
        </div>
        <div className="command-bar">
          <button className="btn btn-secondary">
            <Settings size={16} />
            Settings
          </button>
          <button className="btn btn-primary">
            <Megaphone size={16} />
            Broadcast
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Bell size={14} />
            Total Notifications
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Eye size={14} className="text-red-500" />
            Unread
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.unread}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Send size={14} className="text-emerald-500" />
            Sent
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.sent}</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Clock size={14} className="text-amber-500" />
            Pending
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">{stats.pending}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select 
              className="select min-w-[140px] appearance-none pr-10"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <button className="btn btn-secondary">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6 overflow-x-auto">
          {['all', 'unread', 'sent', 'pending', 'templates'].map((tab) => (
            <button
              key={tab}
              className={`pb-3 text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-emerald-600 border-b-2 border-emerald-600' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      {activeTab !== 'templates' && (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`rounded-2xl border p-5 ${getTypeColor(notification.type)} slide-up ${
                !notification.read ? 'ring-1 ring-emerald-300' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">{notification.title}</h4>
                        {!notification.read && (
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                            New
                          </span>
                        )}
                        {notification.priority === 'high' && (
                          <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-slate-400">{notification.time}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {notification.sentTo} • {notification.channel}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="btn btn-secondary text-sm">
                      <Eye size={14} />
                      View Details
                    </button>
                    {notification.status === 'pending' && (
                      <button className="btn btn-primary text-sm">
                        <Send size={14} />
                        Send Now
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-white/50 text-slate-500 transition-colors">
                      <Edit size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-white/50 text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Templates */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900">{template.name}</h4>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full">{template.category}</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn btn-secondary text-sm flex-1 justify-center">
                  Preview
                </button>
                <button className="btn btn-primary text-sm flex-1 justify-center">
                  <Send size={14} />
                  Send
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;