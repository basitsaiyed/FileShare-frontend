
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [downloadAlerts, setDownloadAlerts] = useState(user?.downloadAlerts || true);
  const [expiryReminders, setExpiryReminders] = useState(user?.expiryReminders || true);
  
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setDownloadAlerts(user.downloadAlerts);
      setExpiryReminders(user.expiryReminders);
    }
  }, [user]);

  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await apiService.changePassword(currentPassword, newPassword);
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error('Password change failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setIsUpdatingPreferences(true);
    try {
      await apiService.updateNotificationPreferences(downloadAlerts, expiryReminders);
      toast.success("Notification preferences updated!");
    } catch (error) {
      console.error('Preference update failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update preferences');
    } finally {
      setIsUpdatingPreferences(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your files and data."
    );
    
    if (!confirmed) return;

    setIsDeletingAccount(true);
    try {
      await apiService.deleteAccount();
      toast.success("Account deleted successfully");
      logout();
      navigate("/");
    } catch (error) {
      console.error('Account deletion failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete account');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading user information...</p>
        </div>
      </div>
    );
  }

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
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {getUserInitial()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-gray-900">{user.email}</h3>
                  <p className="text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-gray-500">Email changes are not currently supported</p>
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
                  disabled={isUpdatingPassword}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isUpdatingPassword}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isUpdatingPassword}
                />
              </div>
              
              <Button 
                onClick={handlePasswordChange} 
                className="bg-primary hover:bg-primary-600"
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                  disabled={isUpdatingPreferences}
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
                  disabled={isUpdatingPreferences}
                />
              </div>
              
              <Button 
                onClick={handleNotificationUpdate} 
                variant="outline"
                disabled={isUpdatingPreferences}
              >
                {isUpdatingPreferences && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                    Once you delete your account, there is no going back. This will permanently delete all your files and data.
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={isDeletingAccount}
                >
                  {isDeletingAccount && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
