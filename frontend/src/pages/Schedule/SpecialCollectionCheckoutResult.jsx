// src/pages/Schedule/SpecialCollectionCheckoutResult.jsx
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, ArrowLeft, Download, Calendar, MapPin, Package, User } from 'lucide-react';

const SpecialCollectionCheckoutResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'success';

  const [request] = useState({
    id: 'SC-001',
    name: 'N. Perera',
    phone: '+94 77 123 4567',
    address: '12 Flower Rd, Colombo 07',
    date: '2024-01-20',
    time: '08:00 - 10:00',
    wasteType: 'Bulky Items',
    quantity: 2,
    amount: 2500,
    status: status === 'success' ? 'confirmed' : 'pending'
  });

  const handleDownloadReceipt = () => {
    const content = `
SPECIAL COLLECTION REQUEST
===========================
Request ID: ${request.id}
Name: ${request.name}
Phone: ${request.phone}
Address: ${request.address}
Date: ${request.date}
Time: ${request.time}
Waste Type: ${request.wasteType}
Quantity: ${request.quantity}
Amount: LKR ${request.amount.toLocaleString()}
Status: ${request.status}
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collection-request-${request.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle size={48} className="text-emerald-500" />,
          title: 'Request Confirmed!',
          message: 'Your special collection request has been confirmed.',
          bg: 'bg-emerald-50'
        };
      case 'pending':
        return {
          icon: <Clock size={48} className="text-amber-500" />,
          title: 'Request Pending',
          message: 'Your request is being processed. You will receive a confirmation shortly.',
          bg: 'bg-amber-50'
        };
      default:
        return {
          icon: <XCircle size={48} className="text-red-500" />,
          title: 'Request Failed',
          message: 'There was an error processing your request. Please try again.',
          bg: 'bg-red-50'
        };
    }
  };

  const statusConfig = getStatusConfig(request.status);

  return (
    <div className="workspace-content fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <button className="btn btn-secondary btn-sm mb-4" onClick={() => navigate('/schedule')}>
            <ArrowLeft size={16} />Back to Schedule
          </button>
          <div className={`w-24 h-24 rounded-full ${statusConfig.bg} flex items-center justify-center mx-auto mb-4`}>
            {statusConfig.icon}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{statusConfig.title}</h1>
          <p className="text-slate-500">{statusConfig.message}</p>
        </div>

        <div className="workspace-panel mb-6">
          <div className="panel-header">
            <h2 className="panel-title">Request Details</h2>
          </div>
          <div className="panel-body">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Request ID</p>
                  <p className="font-semibold">{request.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span className={`status ${request.status === 'confirmed' ? 'status-success' : 'status-warning'}`}>
                    {request.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-semibold">{request.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold">{request.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="font-semibold">{request.address}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date</p>
                  <p className="font-semibold">{request.date}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Time</p>
                  <p className="font-semibold">{request.time}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Waste Type</p>
                  <p className="font-semibold">{request.wasteType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Quantity</p>
                  <p className="font-semibold">{request.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-semibold text-lg">LKR {request.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="btn btn-secondary" onClick={handleDownloadReceipt}>
            <Download size={16} />Download Receipt
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/schedule')}>
            <Calendar size={16} />View Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialCollectionCheckoutResult;
