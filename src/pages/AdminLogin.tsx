
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ShieldAlert, Info } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AuthNavbar } from "@/components/AuthNavbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ForgotPasswordDialog } from "@/components/ForgotPasswordDialog";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, user, isAdmin } = useAuth();

  // Redirect if user is already logged in and is admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only allow admin@united.edu to login through this page
      if (email !== "admin@united.edu") {
        throw new Error("Only admin@united.edu can log in here");
      }
      
      console.log("Attempting admin login with:", email);
      const { error, data } = await signIn(email, password);
      
      if (error) {
        console.error("Admin login error details:", error);
        throw new Error("Invalid administrator credentials. Please try again.");
      }
      
      console.log("Admin login response:", data);
      
      toast({
        title: "Admin login successful!",
        description: "Welcome to the admin dashboard.",
        variant: "default",
      });
      
      navigate("/admin");
    } catch (error: any) {
      console.error("Admin login error:", error);
      toast({
        title: "Admin login failed",
        description: error.message || "Invalid administrator credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fill demo credentials for admin
  const fillDemoCredentials = () => {
    setEmail("admin@united.edu");
    setPassword("admin123");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="flex flex-grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white animate-fade-in">
              Administrator Login
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 animate-fade-in animate-delay-100">
              Sign in to access the admin dashboard
            </p>
          </div>

          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertTitle>Demo Application</AlertTitle>
            <AlertDescription>
              This is a demo app. Use the demo credentials below to log in without email verification:
              <div className="mt-2 font-bold">
                Admin Demo - Email: admin@united.edu | Password: admin123
              </div>
            </AlertDescription>
          </Alert>

          <Card className="animate-fade-in animate-delay-200 border-orange-200 dark:border-orange-800">
            <CardHeader className="bg-orange-50 dark:bg-orange-900/20 rounded-t-lg">
              <div className="flex items-center justify-center mb-2">
                <ShieldAlert className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle>Administrator Access</CardTitle>
              <CardDescription>
                This area is restricted to authorized personnel only
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@united.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-password">Password</Label>
                    <ForgotPasswordDialog>
                      <button type="button" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </button>
                    </ForgotPasswordDialog>
                  </div>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={fillDemoCredentials}
                >
                  Use Demo Admin Credentials
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full bg-orange-600 hover:bg-orange-700" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in as Administrator"}
                </Button>
                <div className="mt-4 flex flex-col space-y-2 text-center text-sm">
                  <p className="text-slate-600 dark:text-slate-400">
                    Not an administrator?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Go to student login
                    </Link>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                      Register here
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
