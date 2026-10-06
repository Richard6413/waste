// src/pages/Admin/ProfilePage.jsx
import { useState } from 'react';
import { Save, X, User, Mail, Phone, MapPin, Shield, Bell, Key } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Nimali Admin',
    email: 'admin@jemakwaste.com',
    phone: '+94 77 123 4567',
    address: '123 Admin Rd, Colombo 07',
    role: 'admin',
    bio: 'System administrator with 5+ years of experience in waste management operations.'
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProfile(formData);
    setEditing(false);
    setSaving(false);
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">ADMIN</div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-description">Manage your account settings and preferences</p>
        </div>
        <button className="btn btn-primary" onClick={() => editing ? handleSave() : setEditing(true)}>
          {editing ? <><Save size={16} />{saving ? 'Saving...' : 'Save Changes'}</> : <><User size={16} />Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Personal Information</h2>
            </div>
            <div className="panel-body">
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
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
                    <label className="form-label">Address</label>
                    <input type="text" className="form-input" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                  <div className="form-group md:col-span-2">
                    <label className="form-label">Bio</label>
                    <textarea className="form-textarea" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-semibold">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-semibold">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-semibold">{profile.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Role</p>
                    <span className="badge bg-purple-100 text-purple-700">{profile.role}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Security</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Key size={18} className="text-amber-600" />
                    <div>
                      <p className="font-semibold">Password</p>
                      <p className="text-sm text-slate-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm">Change Password</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-emerald-600" />
                    <div>
                      <p className="font-semibold">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-500">Enabled</p>
                    </div>
                  </div>
                  <span className="status status-success">Active</span>
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
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-slate-500">{profile.email}</p>
              <span className="badge bg-purple-100 text-purple-700 mt-2">{profile.role}</span>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Notifications</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                  <span className="text-sm">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                  <span className="text-sm">SMS Notifications</span>
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
                  <span className="text-sm">Push Notifications</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
                </label>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">About</h2>
            </div>
            <div className="panel-body">
              <p className="text-sm text-slate-600">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
