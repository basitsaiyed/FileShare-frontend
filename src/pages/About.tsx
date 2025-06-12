import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About FileShare</h1>
            <p className="text-lg text-gray-600">Simple, secure, and reliable file sharing for everyone</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At FileShare, we believe that sharing files should be simple, secure, and accessible to everyone. 
                Our mission is to provide a hassle-free file sharing experience that doesn't compromise on security 
                or user privacy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Makes Us Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Registration Required</h3>
                  <p className="text-gray-700">
                    Share files instantly without creating an account. Perfect for quick, one-time shares.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Privacy First</h3>
                  <p className="text-gray-700">
                    Your files automatically expire after 7 days, ensuring your data doesn't linger online.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">QR Code Integration</h3>
                  <p className="text-gray-700">
                    Generate QR codes instantly for easy sharing across devices and platforms.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Free Forever</h3>
                  <p className="text-gray-700">
                    Our core file sharing features will always be free for everyone to use.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                FileShare was born out of frustration with complicated file sharing services that required 
                lengthy sign-up processes, had confusing interfaces, or charged high fees for basic functionality.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We wanted to create something different - a service that prioritizes simplicity and user experience 
                above all else. Whether you're a student sharing a project, a professional sending documents to clients, 
                or just someone who needs to quickly share a file, FileShare is designed to make your life easier.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security & Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We take your security seriously. All files are encrypted during upload and storage, and we use 
                industry-standard security practices to protect your data.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>End-to-end encryption for all file transfers</li>
                <li>Automatic file deletion after 7 days</li>
                <li>No tracking or data mining</li>
                <li>Secure cloud infrastructure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                Have questions, suggestions, or need support? We'd love to hear from you!
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
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

export default About;