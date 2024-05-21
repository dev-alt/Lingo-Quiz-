'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import decode, { jwtDecode } from 'jwt-decode';

interface User {
  _id: string;
  userId: string;
  username: string;
  handle: string;
  level: number;
  xp: number;
  challengesCompleted: number;
  rank: string;
  badges: number;
  streak: number;
  achievements: [];
  progress: [];
  joinDate: string;
  lastActive: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  ownedBanners: [];
  ownedAvatars: [];
  __v: number;
}
interface AuthContextType {
  user: User | null; 
  isLoggedIn: boolean;
  isLoading: boolean; 
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
              setIsLoggedIn(true);

            } else {
              setIsLoggedIn(false);
              localStorage.removeItem('token');
            }
          } else {
            setIsLoggedIn(false);
          }
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);


  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:7100/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("response", response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); 
        setUser(data.user); 
        setIsLoggedIn(true);
        router.push('/'); 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("Logging out");
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  console.log("context", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
