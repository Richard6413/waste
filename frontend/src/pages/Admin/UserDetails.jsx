// src/pages/Admin/UserDetails.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Save, X, User, Mail, Phone, Shield, Calendar, Activity } from 'lucide-react';

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: 1,
    name: 'Nimali Admin',
    email: 'admin@jemakwaste.com',
    phone: '+94 77 123 4567',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-15 10:30',
    loginCount: 156
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    setUser(formData);
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      navigate('/admin/users');
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-700',
      collector: 'bg-blue-100 text-blue-700',
      user: 'bg-green-100 text-green-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => navigate('/admin/users')}>
            <ArrowLeft size={16} />Back to Users
          </button>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">{user.name}</h1>
          <p className="page-description">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-danger" onClick={handleDelete}>
            <Trash2 size={16} />Delete
          </button>
          <button className="btn btn-primary" onClick={() => editing ? handleSave() : setEditing(true)}>
            {editing ? <><Save size={16} />Save Changes</> : <><Edit size={16} />Edit User</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* User Info */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">User Information</h2>
            </div>
            <div className="panel-body">
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                      <option value="user">User</option>
                      <option value="collector">Collector</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Role</p>
                    <span className={`badge ${getRoleBadge(user.role)}`}>{user.role}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={`status ${user.status === 'active' ? 'status-success' : 'status-danger'}`}>{user.status}</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Created</p>
                    <p className="font-semibold">{user.createdAt}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Activity</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-blue-600" />
                    <span className="text-sm font-semibold">Last Login</span>
                  </div>
                  <p className="font-semibold">{user.lastLogin}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={16} className="text-emerald-600" />
                    <span className="text-sm font-semibold">Total Logins</span>
                  </div>
                  <p className="font-semibold">{user.loginCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Avatar Card */}
          <div className="workspace-panel">
            <div className="panel-body text-center">
              <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-slate-500">{user.email}</p>
              <span className={`badge ${getRoleBadge(user.role)} mt-2`}>{user.role}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Quick Actions</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-2">
                <button className="btn btn-secondary w-full justify-start">
                  <Mail size={16} />Send Email
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <Shield size={16} />Reset Password
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <Activity size={16} />View Activity Log
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
