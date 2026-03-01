import Link from 'next/link';
import Header from '@/components/Header';

export const metadata = {
  title: 'Privacy Policy - Calculator Fort',
  description: 'Privacy Policy for Calculator Fort - Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://calcfort.com/privacy',
  },
};

export default function PrivacyPage() {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy — CalcFort Data Protection & Privacy</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Calculator Fort ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2.1 Information You Provide</h3>
              <p className="text-gray-700 mb-4">
                We collect information you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Create an account (email address, name)</li>
                <li>Use our calculators and tools</li>
                <li>Subscribe to newsletters or notifications</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or feedback</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                When you visit our site, we automatically collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP address and general location information</li>
                <li>Browser type and version</li>
                <li>Device information (type, operating system)</li>
                <li>Pages visited and time spent on site</li>
                <li>Referral source and exit pages</li>
                <li>Usage patterns and preferences</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2.3 Calculation Data</h3>
              <p className="text-gray-700 mb-4">
                For registered users who opt-in, we may store:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Calculation history and results</li>
                <li>Favorite calculators and saved settings</li>
                <li>Custom preferences and configurations</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide and maintain our calculator services</li>
                <li>Authenticate users and manage accounts</li>
                <li>Improve our website and user experience</li>
                <li>Send important updates and notifications</li>
                <li>Analyze usage patterns and site performance</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
                <li>Provide customer support</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in these circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Service Providers:</strong> Trusted partners who assist in operating our website (hosting, analytics, email services)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong>Safety and Security:</strong> To protect rights, property, or safety of users or others</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Remember your preferences and settings</li>
                <li>Authenticate user sessions</li>
                <li>Analyze site usage and performance</li>
                <li>Provide personalized content and ads</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings, but disabling them may affect site functionality.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our website may integrate with third-party services:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Login:</strong> Google, Facebook, Twitter for authentication</li>
                <li><strong>Email Services:</strong> For sending verification codes and notifications</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These services have their own privacy policies and data practices.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Incident response and breach notification procedures</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information only as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide our services and support</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our services and user experience</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Access:</strong> Request information about data we have about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we use your data</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. International Users</h2>
              <p className="text-gray-700 mb-4">
                If you are accessing our service from outside our primary jurisdiction, please note that your information may be transferred to, stored, and processed in different countries. By using our service, you consent to such transfers.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us through our website or support channels.
              </p>

              <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 text-sm">
                  <strong>Your Privacy Matters:</strong> We are committed to transparency and protecting your personal information. If you have concerns about how we handle your data, please don't hesitate to reach out to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
