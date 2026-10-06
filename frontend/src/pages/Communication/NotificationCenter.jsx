// src/pages/Communication/NotificationCenter.jsx
import { useState } from 'react';
import { Bell, Check, Trash2, X, Filter, Search, Calendar, User, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Collection Reminder', message: 'Your waste collection is scheduled for tomorrow at 8:00 AM.', type: 'info', date: '2024-01-15 10:00', read: false },
    { id: 2, title: 'Payment Received', message: 'Your payment of LKR 2,450 has been received.', type: 'success', date: '2024-01-14 15:30', read: true },
    { id: 3, title: 'Service Alert', message: 'Collection delayed due to weather conditions.', type: 'warning', date: '2024-01-14 08:00', read: false },
    { id: 4, title: 'New Feature', message: 'Check out our new recycling rewards program!', type: 'info', date: '2024-01-13 12:00', read: true },
    { id: 5, title: 'Account Update', message: 'Your profile information has been updated.', type: 'success', date: '2024-01-12 09:00', read: true },
  ]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === 'all' || (filter === 'unread' && !n.read) || n.type === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-amber-500" />;
      case 'info': return <Info size={16} className="text-blue-500" />;
      default: return <Bell size={16} className="text-slate-500" />;
    }
  };

  const getTypeBg = (type) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 border-emerald-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">COMMUNICATION</div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-description">Stay updated with system notifications</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button className="btn btn-secondary" onClick={markAllAsRead}>
              <Check size={16} />Mark All Read
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Notifications</option>
          <option value="unread">Unread</option>
          <option value="success">Success</option>
          <option value="warning">Warnings</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-2xl border p-4 transition-all ${
              notification.read ? 'bg-white border-slate-200' : getTypeBg(notification.type)
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getTypeIcon(notification.type)}
                </div>
                <div>
                  <h3 className={`font-semibold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <Calendar size={10} />
                    {notification.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <button
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Bell size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
