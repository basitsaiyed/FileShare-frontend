import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: June 12, 2025</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using FileShare, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                FileShare is a file sharing service that allows users to upload, store, and share files through generated links and QR codes.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Files are automatically deleted after 7 days</li>
                <li>Service is provided free of charge for basic usage</li>
                <li>No registration required for basic file sharing</li>
                <li>QR code generation for easy sharing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to use FileShare to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Upload illegal, harmful, threatening, abusive, or defamatory content</li>
                <li>Share copyrighted material without proper authorization</li>
                <li>Distribute malware, viruses, or other malicious software</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate others or provide false information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">File Storage and Deletion</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All uploaded files are automatically deleted after 7 days from the upload date. We reserve the right to delete files earlier if they violate our terms of service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for maintaining your own backups of any files uploaded to our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                You retain all rights to the content you upload. By uploading content, you grant us a limited license to store, process, and deliver your files as necessary to provide the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                FileShare is provided "as is" without any warranties, expressed or implied. We do not guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Uninterrupted or error-free service</li>
                <li>Security of files against unauthorized access</li>
                <li>Preservation of files beyond the 7-day period</li>
                <li>Compatibility with all devices or browsers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall FileShare be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, arising out of your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Email: <a href="mailto:basitsaiyed19123@gmail.com" className="text-primary hover:text-primary-600">basitsaiyed19123@gmail.com</a>
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

export default TermsOfService;