
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import FileCard from "@/components/FileCard";
import UploadModal from "@/components/UploadModal";
import { toast } from "sonner";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files, setFiles] = useState([
    {
      id: "1",
      name: "Project Proposal.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      uploadedAt: "Dec 18, 2024",
      expiry: "6 days",
      downloads: 12,
      shortUrl: "https://fileshare.co/a1b2c3"
    },
    {
      id: "2",
      name: "Design Mockups.zip",
      size: "15.8 MB",
      type: "application/zip",
      uploadedAt: "Dec 20, 2024",
      expiry: "4 days",
      downloads: 5,
      shortUrl: "https://fileshare.co/d4e5f6"
    },
    {
      id: "3",
      name: "Screenshot 2024.png",
      size: "892 KB",
      type: "image/png",
      uploadedAt: "Dec 22, 2024",
      expiry: "2 days",
      downloads: 23,
      shortUrl: "https://fileshare.co/g7h8i9"
    }
  ]);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    toast.success("File deleted successfully");
  };

  const handleRename = (id: string, newName: string) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, name: newName } : file
    ));
  };

  const handleUploadComplete = () => {
    // In a real app, you'd refresh the file list from the server
    toast.success("Files uploaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FileShare</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
                  <DropdownMenuItem>Account Settings</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Files</h1>
            <p className="text-gray-600 mt-1">Manage and share your uploaded files</p>
          </div>
          
          <Button 
            onClick={() => setShowUploadModal(true)}
            className="bg-primary hover:bg-primary-600"
          >
            Upload Files
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
            <Button variant="outline">Archives</Button>
          </div>
        </div>

        {/* Files Grid */}
        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onDelete={handleDelete}
                onRename={handleRename}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No files found" : "No files uploaded yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? "Try adjusting your search terms"
                : "Upload your first file to get started"
              }
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setShowUploadModal(true)}
                className="bg-primary hover:bg-primary-600"
              >
                Upload Your First File
              </Button>
            )}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Files</h3>
            <p className="text-3xl font-bold text-primary">{files.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Downloads</h3>
            <p className="text-3xl font-bold text-primary">
              {files.reduce((sum, file) => sum + file.downloads, 0)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Storage Used</h3>
            <p className="text-3xl font-bold text-primary">19.1 MB</p>
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

export default Dashboard;
