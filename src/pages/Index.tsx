
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const features = [
    {
      icon: "📤",
      title: "Upload in one click",
      description: "Simply drag and drop your files or click to browse. No registration required for single uploads."
    },
    {
      icon: "🔗",
      title: "Short links & QR codes",
      description: "Get instantly shareable links and QR codes for easy access from any device."
    },
    {
      icon: "⏰",
      title: "Auto-expire in 7 days",
      description: "Files automatically delete after 7 days for your privacy and security."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Share files in 
              <span className="text-primary"> seconds</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Free, hassle-free document sharing via short links & QR codes. 
              No sign-up required for quick sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary-600 text-white px-8 py-4 text-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why choose FileShare?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for simplicity, designed for everyone. Share files without the complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what people are saying about FileShare
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Designer",
                content: "Perfect for sharing design files with clients. The QR codes are a game-changer!",
                avatar: "👩‍💼"
              },
              {
                name: "Mike Rodriguez",
                role: "Developer",
                content: "Finally, a file sharing service that doesn't require my clients to sign up. Love it!",
                avatar: "👨‍💻"
              },
              {
                name: "Emma Johnson",
                role: "Marketing Manager",
                content: "Auto-expiry gives me peace of mind. No more worrying about old files floating around.",
                avatar: "👩‍🎯"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover-lift">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to start sharing?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who trust FileShare for secure, simple file sharing.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
