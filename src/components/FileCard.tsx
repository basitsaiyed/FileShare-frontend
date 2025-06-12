
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import QRCodeModal from "./QRCodeModal";

interface FileCardProps {
  file: {
    id: string;
    name: string;
    size: string;
    type: string;
    uploadedAt: string;
    expiry: string;
    downloads: number;
    shortUrl: string;
  };
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

const FileCard = ({ file, onDelete, onRename }: FileCardProps) => {
  const [showQR, setShowQR] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const isExpired = file.expiry === "Expired" || file.expiry.includes("Expired");

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    return '📁';
  };

  const copyLink = () => {
    if (isExpired) {
      toast.error("Cannot copy link - file has expired");
      return;
    }
    navigator.clipboard.writeText(file.shortUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleShowQR = () => {
    if (isExpired) {
      toast.error("Cannot generate QR code - file has expired");
      return;
    }
    setShowQR(true);
  };

  const handleRename = () => {
    if (newName.trim() && newName !== file.name) {
      onRename(file.id, newName.trim());
      toast.success("File renamed successfully!");
    }
    setIsRenaming(false);
  };

  const handleDownload = () => {
    if (isExpired) {
      toast.error("Cannot download - file has expired");
      return;
    }
    // Extract slug from shortUrl to download
    const slug = file.shortUrl.split('/').pop();
    if (slug) {
      window.open(`${import.meta.env.VITE_API_BASE_URL}/api/files/download/${slug}`, '_blank');
    }
  };

  return (
    <Card className={`hover-lift ${isExpired ? 'opacity-60' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getFileIcon(file.type)}</span>
            <div>
              {isRenaming ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-sm font-medium border rounded px-2 py-1"
                    onBlur={handleRename}
                    onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                    autoFocus
                  />
                </div>
              ) : (
                <h3 className="font-medium text-gray-900 truncate max-w-[200px]">{file.name}</h3>
              )}
              <p className="text-sm text-gray-500">{file.size}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">⋯</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
              <DropdownMenuItem
                onClick={handleDownload}
                disabled={isExpired}
                className={isExpired ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsRenaming(true)}>
                Rename
              </DropdownMenuItem>
               <DropdownMenuItem
                onClick={handleShowQR}
                disabled={isExpired}
                className={isExpired ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Show QR Code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(file.id)} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Uploaded:</span>
            <span className="text-sm font-medium">{file.uploadedAt}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Expires:</span>
            <Badge variant={isExpired ? "destructive" : "outline"}>
              {file.expiry}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Downloads:</span>
            <span className="text-sm font-medium">{file.downloads}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={copyLink}
              size="sm" 
              className="flex-1 bg-primary hover:bg-primary-600"
              disabled={isExpired}
            >
              {isExpired ? "Link Expired" : "Copy Link"}
            </Button>
            <Button 
              onClick={handleShowQR}
              variant="outline" 
              size="sm"
            >
              QR
            </Button>
          </div>
        </div>
        
        <QRCodeModal 
          open={showQR} 
          onOpenChange={setShowQR}
          url={file.shortUrl}
          filename={file.name}
          isExpired={isExpired}
        />
      </CardContent>
    </Card>
  );
};

export default FileCard;
