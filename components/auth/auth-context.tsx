"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "farmer" | "buyer" | "hub" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  organization: string;
  location: string;
  avatarLetter: string;
  verified: boolean;
}

const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  farmer: {
    id: "farmer-01",
    name: "Ramesh Kumar",
    role: "farmer",
    phone: "+91 98401 23456",
    email: "ramesh.k@abcfpo.in",
    organization: "ABC Farmer Producer Organization",
    location: "Kanchipuram, Tamil Nadu",
    avatarLetter: "R",
    verified: true,
  },
  buyer: {
    id: "buyer-01",
    name: "Anita Rao",
    role: "buyer",
    phone: "+91 97100 88990",
    email: "anita.rao@abcrestaurants.com",
    organization: "ABC Grand Hotels & Restaurants",
    location: "Chennai, Tamil Nadu",
    avatarLetter: "A",
    verified: true,
  },
  hub: {
    id: "hub-01",
    name: "Murugan S.",
    role: "hub",
    phone: "+91 94440 55667",
    email: "murugan@chennaisupplyhub.in",
    organization: "Kanchipuram-Walajabad Collection Hub",
    location: "Walajabad Junction, TN",
    avatarLetter: "M",
    verified: true,
  },
  admin: {
    id: "admin-01",
    name: "Farm2Market Admin",
    role: "admin",
    phone: "+91 99000 11223",
    email: "ops@farm2market.ai",
    organization: "Farm2Market AI Central Operations",
    location: "Bengaluru / Chennai",
    avatarLetter: "F",
    verified: true,
  },
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialRole?: UserRole) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loginAs: () => {},
  logout: () => {},
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check saved session in localStorage
    const savedRole = localStorage.getItem("f2m_user_role") as UserRole | null;
    if (savedRole && DEMO_PROFILES[savedRole]) {
      setUser(DEMO_PROFILES[savedRole]);
    }
  }, []);

  const loginAs = (role: UserRole) => {
    const profile = DEMO_PROFILES[role];
    setUser(profile);
    localStorage.setItem("f2m_user_role", role);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("f2m_user_role");
  };

  const openAuthModal = (initialRole?: UserRole) => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAs,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
