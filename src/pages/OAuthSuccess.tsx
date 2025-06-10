import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      const token = searchParams.get("token");
      
      if (!token) {
        console.error("No token found in URL");
        navigate("/login", { replace: true });
        return;
      }

      try {
        // Store the access token
        localStorage.setItem("accessToken", token);
        
        // Fetch user data using the token
        const response = await fetch("/api/me", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          
          // Instead of manually setting the user, use the login method
          await login(userData.email, token);
          
          // Redirect to dashboard
          navigate("/dashboard", { replace: true });
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("OAuth success handling error:", error);
        // Clear any stored token and redirect to login
        localStorage.removeItem("accessToken");
        navigate("/login", { replace: true });
      }
    };

    handleOAuthSuccess();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;