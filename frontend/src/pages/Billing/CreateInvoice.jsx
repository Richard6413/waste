// src/pages/Billing/CreateInvoice.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2, DollarSign, User, Calendar } from 'lucide-react';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    household: '',
    dueDate: '',
    items: [{ id: 1, description: '', quantity: 1, unitPrice: 0 }],
    tax: 0,
    notes: ''
  });
  const [saving, setSaving] = useState(false);

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: formData.items.length + 1, description: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const handleRemoveItem = (id) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter(i => i.id !== id)
      });
    }
  };

  const handleItemChange = (id, field, value) => {
    setFormData({
      ...formData,
      items: formData.items.map(i => i.id === id ? { ...i, [field]: value } : i)
    });
  };

  const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = subtotal * (formData.tax / 100);
  const total = subtotal + taxAmount;

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    navigate('/billing/invoices');
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">BILLING</div>
          <h1 className="page-title">Create Invoice</h1>
          <p className="page-description">Generate a new invoice for a household</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary" onClick={() => navigate('/billing/invoices')}>
            <X size={16} />Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} />{saving ? 'Saving...' : 'Save Invoice'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Details */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Invoice Details</h2>
            </div>
            <div className="panel-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Household</label>
                  <select
                    className="form-select"
                    value={formData.household}
                    onChange={(e) => setFormData({...formData, household: e.target.value})}
                  >
                    <option value="">Select household</option>
                    <option value="N. Perera">N. Perera</option>
                    <option value="A. Fernando">A. Fernando</option>
                    <option value="S. Jayawardena">S. Jayawardena</option>
                    <option value="M. Silva">M. Silva</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="workspace-panel">
            <div className="panel-header">
              <div className="flex items-center justify-between">
                <h2 className="panel-title">Line Items</h2>
                <button className="btn btn-secondary btn-sm" onClick={handleAddItem}>
                  <Plus size={14} />Add Item
                </button>
              </div>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={item.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-500">Item {index + 1}</span>
                      {formData.items.length > 1 && (
                        <button
                          className="p-1 rounded hover:bg-red-100 text-red-500"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        className="form-input md:col-span-2"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      />
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Qty"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      />
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Unit Price"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Notes</h2>
            </div>
            <div className="panel-body">
              <textarea
                className="form-textarea"
                placeholder="Add any additional notes..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <div className="workspace-panel">
            <div className="panel-header">
              <h2 className="panel-title">Invoice Summary</h2>
            </div>
            <div className="panel-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-500">Household</span>
                  </div>
                  <span className="font-semibold">{formData.household || 'Not selected'}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-500">Due Date</span>
                  </div>
                  <span className="font-semibold">{formData.dueDate || 'Not set'}</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Subtotal</span>
                    <span className="font-semibold">LKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Tax ({formData.tax}%)</span>
                    <span className="font-semibold">LKR {taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg text-emerald-600">LKR {total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Tax Rate (%)</label>
                  <input
                    type="number"
                    className="form-input"
                    min="0"
                    max="100"
                    value={formData.tax}
                    onChange={(e) => setFormData({...formData, tax: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
