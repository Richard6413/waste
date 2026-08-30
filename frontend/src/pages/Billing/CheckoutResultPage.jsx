// src/pages/Billing/CheckoutResultPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const CheckoutResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check the URL params for payment status
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('status');
    const paymentMessage = params.get('message');

    if (paymentStatus === 'success') {
      setStatus('success');
      setMessage(paymentMessage || 'Payment completed successfully!');
    } else if (paymentStatus === 'failed') {
      setStatus('failed');
      setMessage(paymentMessage || 'Payment failed. Please try again.');
    } else {
      // Simulate payment processing
      setTimeout(() => {
        setStatus('success');
        setMessage('Payment completed successfully!');
      }, 2000);
    }
  }, [location]);

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-16 w-16 text-emerald-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-16 w-16 text-emerald-500" />;
      case 'failed':
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'Processing Payment...';
      case 'success':
        return 'Payment Successful!';
      case 'failed':
        return 'Payment Failed';
      default:
        return '';
    }
  };

  const getColor = () => {
    switch (status) {
      case 'loading':
        return 'text-emerald-600';
      case 'success':
        return 'text-emerald-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4">{getIcon()}</div>
          <h2 className="text-xl font-semibold text-slate-900">{getTitle()}</h2>
          <p className="mt-2 text-slate-500">Please wait while we process your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-content fade-in">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="mb-4">{getIcon()}</div>
          <h1 className={`text-2xl font-bold ${getColor()}`}>{getTitle()}</h1>
          <p className="mt-2 text-slate-600">{message}</p>
          
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/schedule')}
              className="btn btn-secondary"
            >
              View Schedule
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-left">
              <h3 className="font-semibold text-emerald-800">What's next?</h3>
              <ul className="mt-2 space-y-1 text-sm text-emerald-700">
                <li>• You will receive a confirmation email shortly</li>
                <li>• Your collection has been scheduled</li>
                <li>• You can track your collection in the schedule</li>
              </ul>
            </div>
          )}

          {status === 'failed' && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-left">
              <h3 className="font-semibold text-red-800">Need help?</h3>
              <ul className="mt-2 space-y-1 text-sm text-red-700">
                <li>• Check your payment method and try again</li>
                <li>• Contact support for assistance</li>
                <li>• You can retry the payment from your schedule</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutResultPage;