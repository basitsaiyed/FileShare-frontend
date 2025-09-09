import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  filename: string;
  isExpired?: boolean;
}

const QRCodeModal = ({ open, onOpenChange, url, filename, isExpired = false }: QRCodeModalProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && url && !isExpired) {
      generateQRCode();
    } else if (open && isExpired) {
      setQrCodeUrl(""); // Clear any existing QR code
    }
  }, [open, url, isExpired]);

  const generateQRCode = async () => {
    try {
      setIsLoading(true);
      console.log('Generating QR code for URL:', url);
      
      // Updated endpoint to use slug parameter
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/qr/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
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
    if (isExpired) {
      toast.error("Cannot copy link - file has expired");
      return;
    }
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
           <DialogTitle>Add commentMore actions
            QR Code for {filename}
            {isExpired && <span className="text-red-600 text-sm ml-2">(Expired)</span>}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
           {isExpired ? (
            <div className="w-48 h-48 border border-red-200 rounded-lg flex items-center justify-center bg-red-50">
              <div className="text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <div className="text-lg text-red-600 font-semibold">File Expired</div>
                <div className="text-sm text-red-500">QR code unavailable</div>
              </div>
            </div>
          ) : isLoading ? (
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
            {isExpired ? (
              <div className="text-center">
                <p className="text-sm text-red-600 mb-3">
                  This file has expired and cannot be shared
                </p>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <p className="text-sm text-red-700">⚠️ Link is no longer accessible</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 text-center">
                  Scan this QR code to access the file
                </p>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-mono text-gray-800 break-all">{url}</p>
                </div>
              </>
            )}
            
            <Button 
              onClick={copyLink} 
              className="w-full"
              disabled={isExpired}
            >
              {isExpired ? "Link Expired" : "Copy Link"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;