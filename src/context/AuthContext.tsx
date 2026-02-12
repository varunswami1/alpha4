import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string, email: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return { id: userId, email };
      }

      return {
        id: userId,
        email,
        firstName: profile?.first_name || undefined,
        lastName: profile?.last_name || undefined,
        avatarUrl: profile?.avatar_url || undefined,
      };
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      return { id: userId, email };
    }
  };

  // Set up auth state listener
  useEffect(() => {
    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (session?.user) {
          setSupabaseUser(session.user);
          // Use setTimeout to avoid potential race conditions
          setTimeout(async () => {
            const userProfile = await fetchUserProfile(
              session.user.id,
              session.user.email || ''
            );
            setUser(userProfile);
            setIsLoading(false);
          }, 0);
        } else {
          setSupabaseUser(null);
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        const userProfile = await fetchUserProfile(
          session.user.id,
          session.user.email || ''
        );
        setUser(userProfile);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        const userProfile = await fetchUserProfile(data.user.id, data.user.email || '');
        setUser(userProfile);
        setSupabaseUser(data.user);
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${userProfile.firstName || email}`,
        });
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        console.error("Signup error:", error);
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: error.message,
        });
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        // Update profile with first and last name
        if (firstName || lastName) {
          await supabase
            .from('profiles')
            .update({
              first_name: firstName,
              last_name: lastName,
            })
            .eq('id', data.user.id);
        }

        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          toast({
            title: "Check your email",
            description: "A confirmation link has been sent to your email address.",
          });
        } else if (!data.session) {
          toast({
            title: "Check your email",
            description: "Please verify your email address to complete registration.",
          });
        } else {
          const userProfile = await fetchUserProfile(data.user.id, data.user.email || '');
          setUser(userProfile);
          setSupabaseUser(data.user);
          
          toast({
            title: "Account created!",
            description: `Welcome, ${firstName || email}!`,
          });
        }
        
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) {
        console.error("Google login error:", error);
        toast({
          variant: "destructive",
          title: "Google login failed",
          description: error.message,
        });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        variant: "destructive",
        title: "Google login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        toast({
          variant: "destructive",
          title: "Logout failed",
          description: error.message,
        });
        return;
      }

      setUser(null);
      setSupabaseUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An unexpected error occurred.",
      });
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Reset password error:", error);
        toast({
          variant: "destructive",
          title: "Reset failed",
          description: error.message,
        });
        return false;
      }

      toast({
        title: "Check your email",
        description: "A password reset link has been sent to your email address.",
      });
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    }
  };

  const updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Update password error:", error);
        toast({
          variant: "destructive",
          title: "Update failed",
          description: error.message,
        });
        return false;
      }

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
      return true;
    } catch (error) {
      console.error("Update password error:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
