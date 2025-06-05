
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, GraduationCap, Info } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AuthNavbar } from "@/components/AuthNavbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ForgotPasswordDialog } from "@/components/ForgotPasswordDialog";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";
  const { signIn, user } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(returnTo);
    }
  }, [user, navigate, returnTo]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting student login with:", email);
      const { error, data } = await signIn(email, password);
      
      if (error) {
        console.error("Student login error details:", error);
        throw new Error("Invalid email or password. Please check your credentials and try again.");
      }
      
      console.log("Login response:", data);
      
      toast({
        title: "Login successful!",
        description: "Welcome back!",
        variant: "default",
      });
      
      // Navigate to the return path or home
      navigate(returnTo);
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fill demo credentials for student
  const fillDemoCredentials = () => {
    setEmail("student@united.edu");
    setPassword("student123");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="flex flex-grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white animate-fade-in">
              Student Login
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 animate-fade-in animate-delay-100">
              Sign in with your student credentials
            </p>
          </div>

          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertTitle>Demo Application</AlertTitle>
            <AlertDescription>
              This is a demo app. Use the demo credentials below or register a new account (no email verification required):
              <div className="mt-2 font-bold">
                Student Demo - Email: student@united.edu | Password: student123
              </div>
            </AlertDescription>
          </Alert>

          <Card className="animate-fade-in animate-delay-200">
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <GraduationCap className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle>Student Access</CardTitle>
              <CardDescription>
                Enter your email and password to sign in
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Student Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@united.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <ForgotPasswordDialog>
                      <button type="button" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </button>
                    </ForgotPasswordDialog>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
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
                  Use Demo Student Credentials
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in as Student"}
                </Button>
                <div className="mt-4 flex flex-col space-y-2 text-center text-sm">
                  <p className="text-slate-600 dark:text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                      Register here
                    </Link>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Are you an administrator?{" "}
                    <Link to="/admin-login" className="text-blue-600 hover:underline">
                      Admin login
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>
          
          {/* <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4 p-4 border border-dashed rounded-md">
            <p className="font-bold">Quick Start:</p>
            <p>No email verification needed! Register a new account or use demo credentials above.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
