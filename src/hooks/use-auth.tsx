
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

  // Sign up with email and password - NO EMAIL VERIFICATION
  const signUp = async (email: string, password: string, name: string, studentId: string) => {
    try {
      console.log("Attempting to sign up:", email);
      
      // Sign up with email confirmation disabled
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name,
            student_id: studentId,
          }
        }
      });

      if (error) {
        console.error("Sign up error:", error);
        throw error;
      }

      console.log("Sign up response:", data);
      
      // If we have a session, the user is immediately logged in
      if (data.session) {
        console.log("User signed up and logged in immediately");
        return { data, error: null };
      }
      
      // If no session but user exists, try to sign in
      if (data.user && !data.session) {
        console.log("User created but not logged in, attempting sign in...");
        const signInResult = await signIn(email, password);
        return signInResult;
      }
      
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
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
