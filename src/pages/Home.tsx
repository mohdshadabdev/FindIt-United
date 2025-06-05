import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Map, Check, BookOpenCheck, GraduationCap, MapPin, Building } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HeroCarousel } from "@/components/HeroCarousel";
import { WelcomePopup } from "@/components/WelcomePopup";

export const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <WelcomePopup />
      
      {/* Hero Section with Dynamic Background Carousel */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        {/* Background Carousel with Minimal Overlay */}
        <HeroCarousel />
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/30 to-background/80 z-10"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
                <span className="inline-block animate-bounce-slow">F</span>
                <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.1s" }}>i</span>
                <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.2s" }}>n</span>
                <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.3s" }}>d</span>
                <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.4s" }}>I</span>
                <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.5s" }}>t</span>
                <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.6s" }}>@</span>
                <span className="bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent font-extrabold">United</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg transition-all duration-700 delay-300 ease-in-out backdrop-blur-sm bg-black/40 rounded-lg p-4">
                Lost something? Found something? <br />
                <span className="text-blue-200 italic font-medium">Let us help you reconnect.</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 border border-blue-400/30">
                  <Link to="/report?type=lost">Report Lost Item</Link>
                </Button>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-accent/50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50">
                  <Link to="/report?type=found">Report Found Item</Link>
                </Button>
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 border border-purple-400/30">
                  <Link to="/listings">Browse Listings</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Animated Path with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:"rgb(59, 130, 246)", stopOpacity:0.8}} />
                <stop offset="50%" style={{stopColor:"rgb(147, 51, 234)", stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor:"rgb(59, 130, 246)", stopOpacity:0.8}} />
              </linearGradient>
            </defs>
            <path fill="url(#waveGradient)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        {/* Enhanced Floating Icons with improved animations */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/5 text-blue-300 animate-float transform hover:scale-110">
            <div className="p-4 bg-gradient-to-br from-blue-600/30 to-blue-800/20 backdrop-blur-md rounded-full border border-blue-400/30 shadow-lg">
              <BookOpenCheck size={28} className="animate-pulse-soft" />
            </div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 text-purple-300 animate-float" style={{ animationDelay: "2s" }}>
            <div className="p-4 bg-gradient-to-br from-purple-600/30 to-purple-800/20 backdrop-blur-md rounded-full border border-purple-400/30 shadow-lg">
              <Search size={32} className="animate-pulse-soft" />
            </div>
          </div>
          <div className="absolute top-1/2 right-1/5 text-orange-300 animate-float" style={{ animationDelay: "1s" }}>
            <div className="p-4 bg-gradient-to-br from-orange-600/30 to-orange-800/20 backdrop-blur-md rounded-full border border-orange-400/30 shadow-lg">
              <MapPin size={24} className="animate-pulse-soft" />
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-green-300 animate-float" style={{ animationDelay: "3s" }}>
            <div className="p-4 bg-gradient-to-br from-green-600/30 to-green-800/20 backdrop-blur-md rounded-full border border-green-400/30 shadow-lg">
              <Check size={26} className="animate-pulse-soft" />
            </div>
          </div>
          <div className="absolute top-1/3 right-1/3 text-blue-300 animate-float" style={{ animationDelay: "4s" }}>
            <div className="p-4 bg-gradient-to-br from-blue-600/30 to-blue-800/20 backdrop-blur-md rounded-full border border-blue-400/30 shadow-lg">
              <GraduationCap size={28} className="animate-pulse-soft" />
            </div>
          </div>
          <div className="absolute top-2/3 left-1/5 text-red-300 animate-float" style={{ animationDelay: "2.5s" }}>
            <div className="p-4 bg-gradient-to-br from-red-600/30 to-red-800/20 backdrop-blur-md rounded-full border border-red-400/30 shadow-lg">
              <Building size={24} className="animate-pulse-soft" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with enhanced animations */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute -left-32 -top-32 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse-slow" style={{animationDelay: "3s"}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent inline-block">
              Making a Difference
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full shadow-lg"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform has already helped hundreds of students reconnect with their lost belongings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-blue-100 dark:border-blue-900/30 animate-fade-in">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl font-bold text-blue-600 animate-pulse-soft">124+</div>
              </div>
              <div className="text-xl font-semibold mb-2">Items Returned</div>
              <p className="text-slate-600 dark:text-slate-400">
                Successfully reconnected with their owners
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-purple-100 dark:border-purple-900/30 animate-fade-in animate-delay-100">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl font-bold text-purple-600 animate-pulse-soft">1.2k</div>
              </div>
              <div className="text-xl font-semibold mb-2">Active Users</div>
              <p className="text-slate-600 dark:text-slate-400">
                Students and staff using our platform
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-orange-100 dark:border-orange-900/30 animate-fade-in animate-delay-200">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl font-bold text-orange-500 animate-pulse-soft">95%</div>
              </div>
              <div className="text-xl font-semibold mb-2">Success Rate</div>
              <p className="text-slate-600 dark:text-slate-400">
                Of claimed items returned to their owners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section with interactive elements */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white dark:from-slate-900 to-transparent z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">How It Works</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform makes it easy to report and find lost items on campus.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <Collapsible className="flex flex-col items-center text-center animate-fade-in group">
              <CollapsibleTrigger className="w-full">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">Report an Item</h3>
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg mt-2 w-full">
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Submit details about an item you've lost or found on campus. Include a detailed description and the location.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link to="/report?type=lost">Report Now</Link>
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Step 2 */}
            <Collapsible className="flex flex-col items-center text-center animate-fade-in animate-delay-100 group">
              <CollapsibleTrigger className="w-full">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">Browse Listings</h3>
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg mt-2 w-full">
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Search through our database of lost and found items. Filter by category, date, and location to find your item.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link to="/listings">Browse Now</Link>
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Step 3 */}
            <Collapsible className="flex flex-col items-center text-center animate-fade-in animate-delay-200 group">
              <CollapsibleTrigger className="w-full">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">Claim & Reconnect</h3>
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg mt-2 w-full">
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Submit a claim and arrange to get your item back. Provide proof of ownership to verify your claim.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link to="/listings">Find Your Item</Link>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* CTA Section with animated gradient */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTM2IDM0aDV2NWgtNXptMTMtMjZoNXY1aC01ek01IDE0aDV2NUg1ek0xOSAxOWg1djVoLTV6TTUgNDVoNXY1SDV6TTQ1IDQ1aDV2NWgtNXoiIGZpbGwtb3BhY2l0eT0iLjEiIGZpbGw9IiMyMTIxMjEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4=') ] opacity-10"></div>
        
        <div className="absolute -left-32 -top-32 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl animate-pulse-slow" style={{animationDelay: "2s"}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to find what you're looking for?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community and start using our platform to report and find lost items on campus.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="transform hover:scale-105 transition-all shadow-lg hover:shadow-white/30">
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 transform hover:scale-105 transition-all">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
