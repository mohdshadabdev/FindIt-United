
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, HelpCircle, FileText, Shield, Sparkles } from 'lucide-react';

export const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('welcome');

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Show popup after 1 second
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <h4 className="font-medium text-blue-700 dark:text-blue-300">How do I report a lost item?</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Navigate to the "Report Lost" section and fill out the detailed form with item description, location, and date.</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
                <h4 className="font-medium text-green-700 dark:text-green-300">What if I found someone's item?</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Use the "Report Found" feature to help reunite items with their owners quickly and securely.</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-lg">
                <h4 className="font-medium text-orange-700 dark:text-orange-300">How long are items kept?</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Items are typically held for 30 days. High-value items may be kept longer at the discretion of campus security.</p>
              </div>
            </div>
          </div>
        );
      
      case 'terms':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Terms of Service</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">User Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide accurate information when reporting items</li>
                  <li>Respect other users' privacy and property</li>
                  <li>Use the platform only for legitimate lost and found purposes</li>
                </ul>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Platform Usage</h4>
                <p>This service is exclusively for United University community members. Misuse may result in account suspension.</p>
              </div>
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Privacy Policy</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
                <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Data Collection</h4>
                <p>We collect only necessary information to facilitate item recovery: contact details, item descriptions, and location data.</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg">
                <h4 className="font-medium text-pink-700 dark:text-pink-300 mb-2">Data Protection</h4>
                <p>Your personal information is encrypted and shared only with authorized campus personnel for item verification.</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Data Retention</h4>
                <p>Reports are automatically archived after 90 days, with personal data anonymized for statistical purposes only.</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Welcome to FindIt@United!
              </DialogTitle>
              <DialogDescription className="text-lg text-slate-600 dark:text-slate-300">
                Your campus lost and found solution. We help students and staff reconnect with their lost belongings quickly and easily.
              </DialogDescription>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/30">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Lost Something?</h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Report it and we'll help you find it</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/30">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">Found Something?</h4>
                  <p className="text-xs text-purple-600 dark:text-purple-400">Help someone get their item back</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActiveTab('faq')}
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 hover:from-blue-100 hover:to-purple-100"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                FAQ
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActiveTab('terms')}
                className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-700 hover:from-green-100 hover:to-teal-100"
              >
                <FileText className="w-3 h-3 mr-1" />
                Terms of Service
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setActiveTab('privacy')}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 hover:from-purple-100 hover:to-pink-100"
              >
                <Shield className="w-3 h-3 mr-1" />
                Privacy Policy
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-900/10 dark:to-purple-900/10 border-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
        <DialogHeader className="text-center pb-2">
          {renderContent()}
        </DialogHeader>
        
        <div className="flex justify-center pt-4 border-t border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
          {activeTab !== 'welcome' ? (
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('welcome')}
                className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700"
              >
                Back
              </Button>
              <Button 
                onClick={handleClose} 
                className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                Let's Go!
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleClose} 
              className="px-12 py-3 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              Let's Go!
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
