import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import FileCard from "@/components/FileCard";
import UploadModal from "@/components/UploadModal";
import UserStatsCards from "@/components/UserStatsCards";
import { toast } from "sonner";

interface BackendFile {
  ID: string;
  OriginalName: string;
  FileSize: number;
  ContentType: string;
  CreatedAt: string;
  ExpiresAt: string;
  DownloadCount: number;
  DownloadSlug: string;
  URL: string;
  ShareableURL: string;
}

interface BackendResponse {
  files: BackendFile[];
}

interface FileData {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  expiry: string;
  downloads: number;
  shortUrl: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Convert backend file format to frontend format
  const convertBackendFileToFrontend = (backendFile: BackendFile): FileData => {
    const expiry = new Date(backendFile.ExpiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      id: backendFile.ID,
      name: backendFile.OriginalName,
      size: formatFileSize(backendFile.FileSize),
      type: backendFile.ContentType || "application/octet-stream",
      uploadedAt: new Date(backendFile.CreatedAt).toLocaleDateString(),
      expiry: daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : "Expired",
      downloads: backendFile.DownloadCount || 0,
      shortUrl: backendFile.ShareableURL || `http://localhost:8080/d/${backendFile.DownloadSlug}`
    };
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching files from backend...');
      
      const response = await fetch('http://localhost:8080/api/files/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch files: ${response.status}`);
      }

      const backendResponse: BackendResponse = await response.json();
      console.log('Backend response:', backendResponse);
      
      // Extract files from the response object
      const backendFiles = backendResponse.files || [];
      console.log('Backend files array:', backendFiles);
      
      const convertedFiles = backendFiles.map(convertBackendFileToFrontend);
      console.log('Converted files:', convertedFiles);
      
      setFiles(convertedFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error('Failed to load files');
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Filter files based on search term and file type
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    
    const fileType = file.type.toLowerCase();
    switch (selectedFilter) {
      case "images":
        return matchesSearch && fileType.includes('image');
      case "documents":
        return matchesSearch && (fileType.includes('pdf') || fileType.includes('doc') || fileType.includes('text'));
      case "archives":
        return matchesSearch && (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z'));
      case "videos":
        return matchesSearch && fileType.includes('video');
      case "audio":
        return matchesSearch && fileType.includes('audio');
      default:
        return matchesSearch;
    }
  });

  const handleDelete = async (id: string) => {
    try {
      console.log('Deleting file:', id);
      
      const response = await fetch(`http://localhost:8080/api/files/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      setFiles(prev => prev.filter(file => file.id !== id));
      // Refresh stats after deletion
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      toast.success("File deleted successfully");
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error("Failed to delete file");
    }
  };

  const handleRename = async (id: string, newName: string) => {
    try {
      console.log('Renaming file:', id, 'to:', newName);
      
      const response = await fetch(`http://localhost:8080/api/files/${id}/rename`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }),
      });

      if (!response.ok) {
        throw new Error('Failed to rename file');
      }

      setFiles(prev => prev.map(file => 
        file.id === id ? { ...file, name: newName } : file
      ));
      toast.success("File renamed successfully");
    } catch (error) {
      console.error('Error renaming file:', error);
      toast.error("Failed to rename file");
    }
  };

  const handleUploadComplete = () => {
    toast.success("Files uploaded successfully!");
    fetchFiles(); // Refresh the file list
    // Refresh stats after upload
    queryClient.invalidateQueries({ queryKey: ['userStats'] });
  };

  const handleLogout = () => {
    logout();
  };

  // Get the first letter of the user's email for avatar
  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
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
                      <AvatarFallback className="bg-primary text-white">
                        {getUserInitial()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account-settings">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/support">Support</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Log Out
                  </DropdownMenuItem>
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
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
            >
              All Files
            </Button>
            <Button 
              variant={selectedFilter === "images" ? "default" : "outline"}
              onClick={() => setSelectedFilter("images")}
            >
              Images
            </Button>
            <Button 
              variant={selectedFilter === "documents" ? "default" : "outline"}
              onClick={() => setSelectedFilter("documents")}
            >
              Documents
            </Button>
            <Button 
              variant={selectedFilter === "videos" ? "default" : "outline"}
              onClick={() => setSelectedFilter("videos")}
            >
              Videos
            </Button>
            <Button 
              variant={selectedFilter === "audio" ? "default" : "outline"}
              onClick={() => setSelectedFilter("audio")}
            >
              Audio
            </Button>
            <Button 
              variant={selectedFilter === "archives" ? "default" : "outline"}
              onClick={() => setSelectedFilter("archives")}
            >
              Archives
            </Button>
          </div>
        </div>

        {/* Files Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading your files...</h3>
          </div>
        ) : filteredFiles.length > 0 ? (
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
              {searchTerm || selectedFilter !== "all" ? "No files found" : "No files uploaded yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search terms or filters"
                : "Upload your first file to get started"
              }
            </p>
            {!searchTerm && selectedFilter === "all" && (
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
        <UserStatsCards />
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
