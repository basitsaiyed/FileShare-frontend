import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Security = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Security</h1>
            <p className="text-lg text-gray-600">How we protect your files and data</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Security Commitment</h2>
              <p className="text-gray-700 leading-relaxed">
                At FileShare, security is not an afterthought—it's built into every aspect of our service. We employ 
                industry-standard security measures to protect your files and personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Encryption</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">🔒 Data in Transit</h3>
                  <p className="text-gray-700">
                    All file uploads and downloads are protected with TLS 1.3 encryption, ensuring your data is secure while transferring.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">🛡️ Data at Rest</h3>
                  <p className="text-gray-700">
                    Files are encrypted using AES-256 encryption when stored on our servers, providing military-grade protection.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Infrastructure Security</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li><strong>Secure Cloud Hosting:</strong> Our servers are hosted on enterprise-grade cloud infrastructure with 24/7 monitoring</li>
                <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and penetration testing</li>
                <li><strong>DDoS Protection:</strong> Advanced protection against distributed denial-of-service attacks</li>
                <li><strong>Firewall Protection:</strong> Multi-layered firewall systems protect against unauthorized access</li>
                <li><strong>Access Controls:</strong> Strict access controls limit who can access our systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Protection</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">⏰ Automatic Deletion</h3>
                  <p className="text-gray-700">
                    All files are automatically deleted after 7 days, ensuring your data doesn't remain on our servers indefinitely.
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">🔍 No Content Scanning</h3>
                  <p className="text-gray-700">
                    We don't scan or analyze the content of your files. Your privacy is maintained at all times.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">📊 Minimal Data Collection</h3>
                  <p className="text-gray-700">
                    We collect only the minimum data necessary to provide our service and never sell your information.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Link Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Every file gets a unique, cryptographically secure link that's virtually impossible to guess:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>256-bit random link generation</li>
                <li>No sequential or predictable patterns</li>
                <li>Links expire automatically with the file</li>
                <li>Optional password protection (coming soon)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices for Users</h2>
              <p className="text-gray-700 mb-4">Help us keep your files secure by following these recommendations:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">✅ Do</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Only share links with intended recipients</li>
                    <li>• Use strong, unique passwords for accounts</li>
                    <li>• Keep your browser updated</li>
                    <li>• Log out from shared computers</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">❌ Don't</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Share sensitive files over unsecured networks</li>
                    <li>• Post download links publicly</li>
                    <li>• Upload files containing personal info of others</li>
                    <li>• Use the service for illegal content</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Incident Response</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In the unlikely event of a security incident, we have procedures in place to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Quickly identify and contain the issue</li>
                <li>Assess the scope and impact</li>
                <li>Notify affected users promptly</li>
                <li>Implement fixes and prevent recurrence</li>
                <li>Cooperate with law enforcement if necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Report Security Issues</h2>
              <p className="text-gray-700 mb-4">
                If you discover a security vulnerability or have security concerns, please contact us immediately:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Security Email: <a href="mailto:basitsaiyed19123@gmail.com" className="text-primary hover:text-primary-600">basitsaiyed19123@gmail.com</a><br/>
                  <span className="text-sm text-gray-600">Please include "SECURITY" in the subject line</span>
                </p>
              </div>
            </section>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <Link to="/" className="text-primary hover:text-primary-600 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Security;