import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  filename: string;
  slug: string; // Added slug parameter
}

const QRCodeModal = ({ open, onOpenChange, url, filename, slug }: QRCodeModalProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && slug) {
      generateQRCode();
    }
  }, [open, slug]);

  const generateQRCode = async () => {
    try {
      setIsLoading(true);
      console.log('Generating QR code for slug:', slug);
      
      // Updated endpoint to use slug parameter
      const response = await fetch(`http://localhost:8080/api/files/${slug}/qr`, {
        method: 'GET', // Changed to GET since we're using path parameter
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }

      const blob = await response.blob();
      const qrUrl = URL.createObjectURL(blob);
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error("Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code for {filename}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          {isLoading ? (
            <div className="w-48 h-48 border border-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-lg">Generating QR...</div>
            </div>
          ) : qrCodeUrl ? (
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-48 h-48 border border-gray-200 rounded-lg"
            />
          ) : (
            <div className="w-48 h-48 border border-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-lg text-gray-500">Failed to load QR</div>
            </div>
          )}
          
          <div className="w-full space-y-2">
            <p className="text-sm text-gray-600 text-center">
              Scan this QR code to access the file
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-mono text-gray-800 break-all">{url}</p>
            </div>
            
            <Button onClick={copyLink} className="w-full">
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;