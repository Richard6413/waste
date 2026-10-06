// src/pages/Utilities/CalendarView.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Save, Calendar, Clock, MapPin, User } from 'lucide-react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const [events, setEvents] = useState([
    { id: 1, title: 'Collection - Colombo North', date: '2024-01-15', time: '08:00', location: 'Colombo 07', type: 'collection' },
    { id: 2, title: 'Maintenance - Truck #001', date: '2024-01-16', time: '10:00', location: 'Depot', type: 'maintenance' },
    { id: 3, title: 'Meeting - Staff Briefing', date: '2024-01-17', time: '09:00', location: 'Office', type: 'meeting' },
    { id: 4, title: 'Collection - Kandy East', date: '2024-01-18', time: '08:00', location: 'Kandy', type: 'collection' },
  ]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    return events.filter(e => e.date === formatDate(date));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleSave = () => {
    const newId = Math.max(...events.map(e => e.id)) + 1;
    setEvents([...events, { id: newId, ...formData }]);
    setShowModal(false);
    setFormData({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getEventTypeColor = (type) => {
    const colors = {
      collection: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
      meeting: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[type] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">UTILITIES</div>
          <h1 className="page-title">Calendar</h1>
          <p className="page-description">View and manage scheduled events</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} />Add Event
        </button>
      </div>

      <div className="workspace-panel">
        <div className="panel-header">
          <div className="flex items-center justify-between">
            <h2 className="panel-title">{monthName}</h2>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary btn-sm" onClick={handlePrevMonth}>
                <ChevronLeft size={16} />
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleNextMonth}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 bg-slate-50 rounded-lg" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dayEvents = getEventsForDate(date);
              const isToday = formatDate(date) === formatDate(new Date());

              return (
                <div
                  key={day}
                  className={`h-24 p-1 rounded-lg border ${
                    isToday ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className={`text-xs font-semibold mb-1 ${isToday ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-slate-400">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="workspace-panel mt-6">
        <div className="panel-header">
          <h2 className="panel-title">Upcoming Events</h2>
        </div>
        <div className="panel-body">
          <div className="space-y-3">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventTypeColor(event.type)}`}>
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={10} />{event.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} />{event.location}</span>
                    </div>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500" onClick={() => handleDelete(event.id)}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Add New Event</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Event Title</label>
                  <input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <input type="time" className="form-input" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}><Save size={16} />Save Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
