
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  filename: string;
}

const QRCodeModal = ({ open, onOpenChange, url, filename }: QRCodeModalProps) => {
  // Mock QR code - in a real app, you'd generate this
  const qrCodeData = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <rect x="20" y="20" width="160" height="160" fill="none" stroke="black" stroke-width="2"/>
      <rect x="30" y="30" width="20" height="20" fill="black"/>
      <rect x="60" y="30" width="20" height="20" fill="black"/>
      <rect x="90" y="30" width="20" height="20" fill="black"/>
      <rect x="150" y="30" width="20" height="20" fill="black"/>
      <rect x="30" y="60" width="20" height="20" fill="black"/>
      <rect x="90" y="60" width="20" height="20" fill="black"/>
      <rect x="150" y="60" width="20" height="20" fill="black"/>
      <rect x="30" y="90" width="20" height="20" fill="black"/>
      <rect x="60" y="90" width="20" height="20" fill="black"/>
      <rect x="120" y="90" width="20" height="20" fill="black"/>
      <rect x="150" y="90" width="20" height="20" fill="black"/>
      <rect x="30" y="120" width="20" height="20" fill="black"/>
      <rect x="90" y="120" width="20" height="20" fill="black"/>
      <rect x="150" y="120" width="20" height="20" fill="black"/>
      <rect x="30" y="150" width="20" height="20" fill="black"/>
      <rect x="60" y="150" width="20" height="20" fill="black"/>
      <rect x="90" y="150" width="20" height="20" fill="black"/>
      <rect x="150" y="150" width="20" height="20" fill="black"/>
    </svg>
  `)}`;

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
          <img 
            src={qrCodeData} 
            alt="QR Code" 
            className="w-48 h-48 border border-gray-200 rounded-lg"
          />
          
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
