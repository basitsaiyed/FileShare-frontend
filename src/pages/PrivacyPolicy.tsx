import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: June 12, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At FileShare, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you use our file sharing service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-700">
                    When you create an account, we collect your email address and any other information you choose to provide.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">File Data</h3>
                  <p className="text-gray-700">
                    We store the files you upload to our service, along with metadata such as file names, sizes, and upload dates.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Usage Information</h3>
                  <p className="text-gray-700">
                    We collect information about how you use our service, including download statistics and access logs.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>To provide and maintain our file sharing service</li>
                <li>To generate shareable links and QR codes for your files</li>
                <li>To track download statistics and usage analytics</li>
                <li>To communicate with you about your account and our service</li>
                <li>To improve our service and develop new features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">File Storage and Security</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Your files are stored securely on our servers with industry-standard encryption. We implement appropriate 
                  technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-gray-700">
                  Files are automatically deleted after 7 days to protect your privacy and free up storage space.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              <p className="text-gray-700">
                We do not sell, trade, or otherwise transfer your personal information to third parties. We may disclose your 
                information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict the processing of your personal information</li>
                <li>Data portability (receive your data in a structured format)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700">
                We use cookies and similar tracking technologies to enhance your experience on our website. These help us 
                remember your preferences, analyze usage patterns, and improve our service. You can control cookie settings 
                through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal information 
                from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy 
                Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  Email: <a href="mailto:basitsaiyed19123@gmail.com" className="text-primary hover:text-primary-600">basitsaiyed19123@gmail.com</a><br/>
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

export default PrivacyPolicy;