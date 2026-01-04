import Link from 'next/link';
import Header from '@/components/Header';

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-block"
              >
                ← Back to Calculator Fort
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service — CalcFort Terms & Conditions</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Calculator Fort ("we," "our," or "the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Calculator Fort provides free online calculators and conversion tools for mathematics, finance, health, engineering, and other categories. Our service includes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Access to various online calculators and tools</li>
                <li>User account creation and management</li>
                <li>Calculation history and favorites (for registered users)</li>
                <li>Educational content and resources</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                To access certain features of our service, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">
                You agree not to use the service to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit any harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Use automated tools to access the service without permission</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Accuracy of Calculations</h2>
              <p className="text-gray-700 mb-4">
                While we strive to provide accurate calculations and results, Calculator Fort makes no warranties about the accuracy, reliability, or completeness of the information provided. Users should:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Verify important calculations independently</li>
                <li>Not rely solely on our calculators for critical decisions</li>
                <li>Understand that results are for informational purposes only</li>
                <li>Consult professionals for financial, medical, or legal advice</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Privacy and Data</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive property of Calculator Fort and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Calculator Fort, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which Calculator Fort operates, without regard to conflict of law provisions.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us through our website or support channels.
              </p>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> These terms constitute a legally binding agreement. By using Calculator Fort, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = {
  title: 'Terms of Service - Calculator Fort',
  description: 'Terms of Service for Calculator Fort - Free online calculators and conversion tools.',
};