import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, apiService } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'city' | 'neighborhood';

export interface UserProfile {
  id: string;
  role: UserRole;
  city_name?: string;
  neighborhood_name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, role: UserRole, cityName?: string, neighborhoodName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    if (!data) return null;

    return {
      ...data,
      role: data.role as UserRole
    } as UserProfile;
  };

  useEffect(() => {
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id).then(setProfile);
          }, 0);
        } else {
          setProfile(null);
        }
      });

      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          fetchProfile(session.user.id).then((profileData) => {
            setProfile(profileData);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Mock auth for external API
      const token = localStorage.getItem('auth_token');
      if (token) {
        const mockUser = { id: '1', email: 'test@test.com' } as User;
        const mockProfile = { id: '1', role: 'city' as UserRole, email: 'test@test.com' };
        setUser(mockUser);
        setProfile(mockProfile);
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return { error: null };
      } else {
        const response = await apiService.signIn(email, password);
        localStorage.setItem('auth_token', response.token);
        setUser(response.user);
        setProfile(response.user);
        return { error: null };
      }
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, role: UserRole, cityName?: string, neighborhoodName?: string) => {
    try {
      if (supabase) {
        const redirectUrl = `${window.location.origin}/`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              role,
              city_name: cityName,
              neighborhood_name: neighborhoodName
            }
          }
        });
        if (error) throw error;
        return { error: null };
      } else {
        const response = await apiService.signUp(email, password, role, cityName, neighborhoodName);
        localStorage.setItem('auth_token', response.token);
        setUser(response.user);
        setProfile(response.user);
        return { error: null };
      }
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('auth_token');
      setUser(null);
      setProfile(null);
    }
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
