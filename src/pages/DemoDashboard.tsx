
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FileCard from "@/components/FileCard";
import UploadModal from "@/components/UploadModal";
import { toast } from "sonner";

const DemoDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files] = useState([
    {
      id: "demo-1",
      name: "Sample Document.pdf",
      size: "1.2 MB",
      type: "application/pdf",
      uploadedAt: "Dec 25, 2024",
      expiry: "7 days",
      downloads: 5,
      shortUrl: "https://fileshare.co/demo123"
    },
    {
      id: "demo-2",
      name: "Demo Image.jpg",
      size: "856 KB",
      type: "image/jpeg",
      uploadedAt: "Dec 24, 2024",
      expiry: "6 days",
      downloads: 12,
      shortUrl: "https://fileshare.co/demo456"
    }
  ]);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    toast.info("This is a demo - files cannot be deleted");
  };

  const handleRename = () => {
    toast.info("This is a demo - files cannot be renamed");
  };

  const handleUploadComplete = () => {
    toast.info("This is a demo - sign up to upload real files!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Demo Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-medium">📋 Demo Mode</span>
              <span className="text-blue-600">- This is a preview of the dashboard</span>
            </div>
            <Link to="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign up for full access
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Demo Dashboard</h1>
            <p className="text-gray-600 mt-1">Preview of file management features</p>
          </div>
          
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="bg-primary hover:bg-primary-600"
          >
            Try Upload (Demo)
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">All Files</Button>
            <Button variant="outline">Images</Button>
            <Button variant="outline">Documents</Button>
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredFiles.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to start sharing your files?
          </h3>
          <p className="text-gray-600 mb-6">
            Sign up now to upload, manage, and share your files securely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary-600">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Already have an account? Log in
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      <UploadModal 
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
};

export default DemoDashboard;
