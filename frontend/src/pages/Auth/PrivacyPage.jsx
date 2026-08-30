// src/pages/Auth/PrivacyPage.jsx
function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600">Last updated: January 30, 2024</p>
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly, including name, address, payment information, and service preferences.
          </p>
          <h2>2. How We Use Information</h2>
          <p>
            We use your information to provide waste management services, process payments, and improve our operations.
          </p>
          <h2>3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data.
          </p>
          <h2>4. Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share data with service providers who assist in operations.
          </p>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;