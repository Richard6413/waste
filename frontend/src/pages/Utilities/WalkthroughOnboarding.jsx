// src/pages/Utilities/WalkthroughOnboarding.jsx
import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, X, User, MapPin, Calendar, CreditCard, Bell, Shield } from 'lucide-react';

const WalkthroughOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = [
    {
      title: 'Welcome to JEMAK Waste Management',
      description: 'Let\'s get you started with a quick tour of the system',
      icon: <User size={32} className="text-emerald-600" />,
      content: 'This walkthrough will guide you through the main features of the system, including operations management, billing, scheduling, and analytics.'
    },
    {
      title: 'Operations Dashboard',
      description: 'Manage your collection operations from one place',
      icon: <MapPin size={32} className="text-blue-600" />,
      content: 'The Operations Dashboard gives you a real-time view of all collection routes, vehicle locations, and crew activities. You can create routes, assign drivers, and track progress.'
    },
    {
      title: 'Scheduling',
      description: 'Schedule special collections and pickups',
      icon: <Calendar size={32} className="text-purple-600" />,
      content: 'Use the Scheduling module to request special pickups, check availability, and manage your collection calendar. You can also set up recurring collections.'
    },
    {
      title: 'Billing & Payments',
      description: 'Manage invoices and payments',
      icon: <CreditCard size={32} className="text-amber-600" />,
      content: 'The Billing module allows you to view invoices, make payments, and track your billing history. You can also set up automatic payments and view receipts.'
    },
    {
      title: 'Notifications',
      description: 'Stay updated with alerts and reminders',
      icon: <Bell size={32} className="text-red-600" />,
      content: 'Configure your notification preferences to receive alerts about upcoming collections, payment due dates, and service updates via email, SMS, or push notifications.'
    },
    {
      title: 'Security',
      description: 'Keep your account secure',
      icon: <Shield size={32} className="text-emerald-600" />,
      content: 'Enable two-factor authentication, update your password regularly, and review your login activity to keep your account secure.'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="workspace-content fade-in">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">You're All Set!</h1>
          <p className="text-slate-500 mb-8">You've completed the onboarding walkthrough. You can access this anytime from the Help & Support section.</p>
          <button className="btn btn-primary" onClick={() => { setCompleted(false); setCurrentStep(0); }}>
            Restart Walkthrough
          </button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="workspace-content fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-emerald-600' : index < currentStep ? 'bg-emerald-300' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <button className="text-slate-400 hover:text-slate-600" onClick={handleSkip}>
            <X size={20} />
          </button>
        </div>

        <div className="workspace-panel">
          <div className="panel-body text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h2>
            <p className="text-slate-500 mb-6">{step.description}</p>
            <p className="text-slate-600 max-w-md mx-auto">{step.content}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} />Previous
          </button>
          <span className="text-sm text-slate-500">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button className="btn btn-primary" onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}<ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalkthroughOnboarding;
