// src/pages/Utilities/HelpSupport.jsx
import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageCircle, FileText, ExternalLink, Send, X } from 'lucide-react';

const HelpSupport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const faqs = [
    { id: 1, question: 'How do I schedule a special collection?', answer: 'Navigate to Schedule > Request Collection and fill out the form with your preferred date, time, and waste type.' },
    { id: 2, question: 'How can I pay my outstanding balance?', answer: 'Go to Billing > Invoices, select the invoice you want to pay, and click the Pay Now button to proceed with payment.' },
    { id: 3, question: 'What should I do if my collection was missed?', answer: 'Submit a service request through the Customer Portal or contact our support team at support@jemakwaste.com.' },
    { id: 4, question: 'How do I update my household information?', answer: 'Go to your profile settings and click Edit Profile to update your address, phone, or other details.' },
    { id: 5, question: 'What types of waste do you collect?', answer: 'We collect mixed waste, recyclables, organic waste, hazardous waste, e-waste, and bulky items. Check the Waste Types page for details.' },
  ];

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = async () => {
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
    setShowContactForm(false);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="workspace-content fade-in">
      <div className="page-header">
        <div>
          <div className="page-kicker">SUPPORT</div>
          <h1 className="page-title">Help & Support</h1>
          <p className="page-description">Find answers to common questions or contact our support team</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowContactForm(true)}>
          <MessageCircle size={16} />Contact Support
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for help..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="workspace-panel">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <Mail size={20} className="text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1">Email Support</h3>
            <p className="text-sm text-slate-500 mb-3">support@jemakwaste.com</p>
            <a href="mailto:support@jemakwaste.com" className="btn btn-secondary btn-sm">Send Email</a>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <Phone size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-semibold mb-1">Phone Support</h3>
            <p className="text-sm text-slate-500 mb-3">+94 11 234 5678</p>
            <a href="tel:+94112345678" className="btn btn-secondary btn-sm">Call Now</a>
          </div>
        </div>
        <div className="workspace-panel">
          <div className="panel-body text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <FileText size={20} className="text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">Documentation</h3>
            <p className="text-sm text-slate-500 mb-3">User guides & API docs</p>
            <button className="btn btn-secondary btn-sm">View Docs</button>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="workspace-panel">
        <div className="panel-header">
          <h2 className="panel-title">Frequently Asked Questions</h2>
        </div>
        <div className="panel-body">
          <div className="space-y-2">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  {openFaq === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openFaq === faq.id && (
                  <div className="px-4 pb-4 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <p className="text-center py-8 text-slate-500">No FAQs found matching your search</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Contact Support</h3>
              <button onClick={() => setShowContactForm(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-input" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input type="text" className="form-input" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" rows={4} value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowContactForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSend} disabled={sending}>
                <Send size={16} />{sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;
