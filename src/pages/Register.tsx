
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Info } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AuthNavbar } from "@/components/AuthNavbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate that student ID starts with UU
      if (!studentId.startsWith("UU")) {
        throw new Error("Student ID must start with UU.");
      }
      
      const { error } = await signUp(email, password, name, studentId);
      
      if (error) throw error;
      
      toast({
        title: "Registration successful!",
        description: `Welcome to FindIt@United, ${name}! You are now logged in and can start reporting lost items.`,
        variant: "default",
      });
      
      // Navigate to home page since user is automatically logged in
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <div className="flex flex-grow items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white animate-fade-in">
              Create your account
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 animate-fade-in animate-delay-100">
              Join FindIt@United to report and find lost items
            </p>
          </div>

          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <Info className="h-5 w-5 text-green-500" />
            <AlertTitle>Instant Access</AlertTitle>
            <AlertDescription>
              No email verification required! After registration, you will be automatically logged in and can immediately start using the platform to report lost items.
            </AlertDescription>
          </Alert>

          <Card className="animate-fade-in animate-delay-200">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Arjun Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="arjun.sharma@united.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="e.g., UU2024001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Student ID must start with UU
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
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
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
                <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
