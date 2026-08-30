// src/pages/Auth/TermsPage.jsx
import { Link } from 'react-router-dom';

function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600">Last updated: January 30, 2024</p>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using JEMAK Waste Management services, you agree to be bound by these Terms of Service.
          </p>
          <h2>2. Service Description</h2>
          <p>
            JEMAK provides waste collection, recycling, and management services to residential and commercial customers.
          </p>
          <h2>3. User Accounts</h2>
          <p>
            You must create an account to access certain features. You are responsible for maintaining account security.
          </p>
          <h2>4. Payment Terms</h2>
          <p>
            Services are billed according to the selected plan. Payments are due upon receipt of invoice.
          </p>
          <h2>5. Termination</h2>
          <p>
            We reserve the right to terminate accounts that violate these terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;