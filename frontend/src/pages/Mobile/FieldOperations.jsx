// pages/Mobile/FieldOperations.jsx
import { useState } from 'react';
import { 
  ClipboardCheck, Camera, MapPin,
  Clock, CheckCircle, AlertTriangle,
  Upload, FileText, User,
  ChevronRight, Menu, Bell,
  RefreshCw, Layers, Home,
  CheckSquare, XCircle, Edit
} from 'lucide-react';

const FieldOperations = () => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = [
    {
      id: 1,
      title: 'Collection Inspection - North Zone',
      type: 'Inspection',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'John Kamau',
      location: '123 Main St',
      dueDate: '2024-01-30 16:00',
      progress: 65,
      checklist: [
        { id: 1, label: 'Verify collection weight', completed: true },
        { id: 2, label: 'Check waste type compliance', completed: true },
        { id: 3, label: 'Document any issues', completed: false },
        { id: 4, label: 'Get customer signature', completed: false }
      ],
      attachments: 2
    },
    {
      id: 2,
      title: 'Equipment Maintenance Check',
      type: 'Maintenance',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Mary Wanjiru',
      location: 'Depot A',
      dueDate: '2024-01-31 12:00',
      progress: 0,
      checklist: [
        { id: 1, label: 'Check vehicle fluids', completed: false },
        { id: 2, label: 'Inspect safety equipment', completed: false },
        { id: 3, label: 'Test communication devices', completed: false }
      ],
      attachments: 1
    },
    {
      id: 3,
      title: 'Customer Site Visit - Complaint',
      type: 'Site Visit',
      priority: 'high',
      status: 'completed',
      assignedTo: 'Peter Ochieng',
      location: '456 Oak Ave',
      dueDate: '2024-01-29 15:00',
      progress: 100,
      checklist: [
        { id: 1, label: 'Meet with customer', completed: true },
        { id: 2, label: 'Inspect service area', completed: true },
        { id: 3, label: 'Provide resolution', completed: true },
        { id: 4, label: 'Document agreement', completed: true }
      ],
      attachments: 3
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-amber-500',
      low: 'bg-blue-500'
    };
    return colors[priority] || 'bg-slate-500';
  };

  const getStatusColor = (status) => {
    const colors = {
      'in-progress': 'status-warning',
      'completed': 'status-success',
      'pending': 'status-neutral'
    };
    return colors[status] || 'status-neutral';
  };

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
              <h1 className="font-bold text-slate-900 text-lg">Field Operations</h1>
              <p className="text-xs text-slate-400">Task Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-slate-100">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-slate-200 bg-white">
        <div className="flex gap-2">
          {['assigned', 'in-progress', 'completed'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'assigned' && 'Assigned'}
              {tab === 'in-progress' && 'In Progress'}
              {tab === 'completed' && 'Completed'}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="p-4 space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="bg-white rounded-2xl border border-slate-200 p-4 slide-up cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedTask(task.id === selectedTask ? null : task.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} />
                  <h3 className="font-semibold text-slate-900">{task.title}</h3>
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="text-slate-500">{task.type}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{task.location}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`status ${getStatusColor(task.status)}`}>
                    <span className="status-dot" />
                    {task.status === 'in-progress' ? 'In Progress' : 
                     task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> Due: {task.dueDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">{task.progress}%</div>
                <div className="text-xs text-slate-400 mt-1">{task.attachments} files</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>

            {/* Expanded Details */}
            {selectedTask === task.id && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-medium text-slate-900 mb-2">Checklist</h4>
                <div className="space-y-2">
                  {task.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
                      <div className={`flex h-5 w-5 items-center justify-center rounded border ${
                        item.completed 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {item.completed && <CheckCircle size={12} />}
                      </div>
                      <span className={`text-sm ${item.completed ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="btn btn-primary justify-center text-sm">
                    <Camera size={16} />
                    Add Photo
                  </button>
                  <button className="btn btn-secondary justify-center text-sm">
                    <Upload size={16} />
                    Upload Document
                  </button>
                  <button className="btn btn-secondary justify-center text-sm col-span-2">
                    <CheckCircle size={16} />
                    Mark Complete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: 'Dashboard', active: false },
            { icon: ClipboardCheck, label: 'Tasks', active: true },
            { icon: Layers, label: 'Reports', active: false },
            { icon: Camera, label: 'Photos', active: false },
            { icon: User, label: 'Profile', active: false }
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

export default FieldOperations;