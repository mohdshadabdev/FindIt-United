
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: {
      user: User | null;
      session: Session | null;
    } | null;
  }>;
  signUp: (email: string, password: string, name: string, studentId: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up the authentication listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === "admin@united.edu");
      setLoading(false);
      
      // Store admin status in localStorage for legacy compatibility
      if (session?.user) {
        const userData = {
          email: session.user.email,
          role: session.user.email === "admin@united.edu" ? "admin" : "student"
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        if (session.user.email === "admin@united.edu") {
          localStorage.setItem("admin", JSON.stringify(userData));
        }
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === "admin@united.edu");
      setLoading(false);
      
      // Initialize localStorage with session data if it exists
      if (session?.user) {
        const userData = {
          email: session.user.email,
          role: session.user.email === "admin@united.edu" ? "admin" : "student"
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        if (session.user.email === "admin@united.edu") {
          localStorage.setItem("admin", JSON.stringify(userData));
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string, studentId: string) => {
    try {
      console.log("Attempting to sign up:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            student_id: studentId
          }
        }
      });

      if (error) throw error;

      console.log("Sign up successful:", data);
      return { data, error: null };
    } catch (error) {
      console.error("Error in signUp:", error);
      return { data: null, error: error as Error };
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in with:", email);
      
      // For demo purposes, implement a bypass for the email verification requirement
      if ((email === "admin@united.edu" || email === "student@united.edu") && 
          (password === "admin123" || password === "student123")) {
        
        // Create a mock user based on the email
        const mockUser: User = {
          id: email === "admin@united.edu" ? "admin-id" : "student-id",
          app_metadata: {},
          user_metadata: {
            name: email === "admin@united.edu" ? "Admin User" : "Student User",
            student_id: email === "admin@united.edu" ? "" : "UU12345678"
          },
          aud: "authenticated",
          created_at: new Date().toISOString(),
          role: "",
          email: email,
          email_confirmed_at: new Date().toISOString(),
          phone: "",
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Create a mock session
        const mockSession: Session = {
          access_token: "mock-token",
          token_type: "bearer",
          refresh_token: "mock-refresh-token",
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          user: mockUser
        };
        
        // Update the state with the mock user and session
        setUser(mockUser);
        setSession(mockSession);
        setIsAdmin(email === "admin@united.edu");
        
        // Store the mock user data in localStorage
        const userData = {
          email: email,
          role: email === "admin@united.edu" ? "admin" : "student"
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        if (email === "admin@united.edu") {
          localStorage.setItem("admin", JSON.stringify(userData));
        }
        
        console.log("Demo authentication successful for:", email);
        
        return { 
          data: { 
            user: mockUser, 
            session: mockSession
          }, 
          error: null 
        };
      }
      
      // Proceed with actual Supabase authentication if not using demo credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle "email not confirmed" error specifically
        if (error.message === "Email not confirmed" || error.message.includes("not confirmed")) {
          console.error("Email not confirmed error. For a demo, use admin@united.edu/admin123 or student@united.edu/student123");
          throw new Error("Email confirmation required. For this demo, use admin@united.edu/admin123 or student@united.edu/student123 to bypass verification.");
        }
        console.error("Sign in error:", error);
        throw error;
      }
      
      console.log("Sign in successful:", data);
      return { data, error: null };
    } catch (error) {
      console.error("Error in signIn:", error);
      return { data: null, error: error as Error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      console.log("Signing out");
      await supabase.auth.signOut();
      
      // Clear the localStorage data
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      
      // Reset state
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      console.log("Sign out completed");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
