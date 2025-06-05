
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out from FindIt@United.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              FindIt@United
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <Link to="/report" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Report
          </Link>
          <Link to="/listings" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Listings
          </Link>
          <Link to="/contact" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Contact Us
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
              Admin
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-slate-700 dark:text-slate-200 flex items-center gap-1">
                <User className="h-4 w-4" /> {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
          
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 px-4 py-2 border-b border-slate-200 dark:border-slate-800 animate-fade-in">
          <div className="flex flex-col space-y-3 pb-3">
            <Link 
              to="/" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/report" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Report
            </Link>
            <Link 
              to="/listings" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Listings
            </Link>
            <Link 
              to="/contact" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            
            {user ? (
              <>
                <div className="text-slate-700 dark:text-slate-200 py-2 flex items-center gap-1">
                  <User className="h-4 w-4" /> {user.email}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
