import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      // Error is already handled in the auth context with toast
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: string) => {
    setOauthLoading(provider);
    
    try {
      // Get your backend base URL from environment or config
      const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      
      // Redirect to your Go backend OAuth endpoint
      window.location.href = `${backendUrl}/auth/${provider}`;
    } catch (error) {
      console.error(`${provider} OAuth error:`, error);
      setOauthLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FileShare</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-gray-600">Sign in to your account</p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Log In</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social Login Buttons - Side by Side */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                type="button" 
                className="w-full google-btn"
                onClick={() => handleOAuthLogin("google")}
                disabled={oauthLoading !== null}
              >
                {oauthLoading === "google" ? (
                  <span className="mr-2">⏳</span>
                ) : (
                  <span className="mr-2">🔍</span>
                )}
                {oauthLoading === "google" ? "Loading..." : "Google"}
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                className="w-full github-btn"
                onClick={() => handleOAuthLogin("github")}
                disabled={oauthLoading !== null}
              >
                {oauthLoading === "github" ? (
                  <span className="mr-2">⏳</span>
                ) : (
                  <span className="mr-2">🐙</span>
                )}
                {oauthLoading === "github" ? "Loading..." : "GitHub"}
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                
                <Link to="#" className="text-sm text-primary hover:text-primary-600">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-600"
                disabled={loading || oauthLoading !== null}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-primary-600 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;