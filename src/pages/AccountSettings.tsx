
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AccountSettings = () => {
  const [email, setEmail] = useState("john.doe@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [downloadAlerts, setDownloadAlerts] = useState(true);
  const [expiryReminders, setExpiryReminders] = useState(true);

  const handleEmailUpdate = () => {
    toast.success("Email updated successfully!");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleNotificationUpdate = () => {
    toast.success("Notification preferences updated!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-white text-xl">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">John Doe</h3>
                  <p className="text-gray-500">{email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleEmailUpdate}>Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Section */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <Button onClick={handlePasswordChange} className="bg-primary hover:bg-primary-600">
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Download Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Get notified when someone downloads your files
                  </p>
                </div>
                <Switch
                  checked={downloadAlerts}
                  onCheckedChange={setDownloadAlerts}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Expiry Reminders</Label>
                  <p className="text-sm text-gray-500">
                    Get reminded 24 hours before your files expire
                  </p>
                </div>
                <Switch
                  checked={expiryReminders}
                  onCheckedChange={setExpiryReminders}
                />
              </div>
              
              <Button onClick={handleNotificationUpdate} variant="outline">
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Delete Account</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
