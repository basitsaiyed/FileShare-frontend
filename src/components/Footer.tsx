
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FileShare</span>
            </div>
            <p className="text-gray-600 text-sm">
              Free, hassle-free document sharing via short links & QR codes.
            </p>
          </div>
          
          <div>
            {/* <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-gray-900 text-sm">API</Link></li>
            </ul> */}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="https://www.linkedin.com/in/basit-saiyed/" className="text-gray-600 hover:text-gray-900 text-sm" target="_blank" rel="noopener noreferrer">Basit Saiyed</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link></li>
              <li><Link to="mailto:basitsaiyed19123@gmail.com" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link></li>
              <li><Link to="https://github.com/basitsaiyed" className="text-gray-600 hover:text-gray-900 text-sm" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</Link></li>
              <li><Link to="/security" className="text-gray-600 hover:text-gray-900 text-sm">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 FileShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
