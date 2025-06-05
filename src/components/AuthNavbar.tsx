
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export const AuthNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/listings" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Listings
          </Link>
          <Link to="/contact" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Contact Us
          </Link>
          <Link to="/login" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Login
          </Link>
          <Link to="/register" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400">
            Register
          </Link>
          
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
            <Link 
              to="/login" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AuthNavbar;
