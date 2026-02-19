"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMyself } from '@/lib/authApi';

interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  institute?: string;
  platforms: {
    github?: {
      url?: string;
      oauthConnected: boolean;
      repos?: any[];
    };
    notion?: {
      oauthConnected: boolean;
    };
    linkedin?: string;
    behance?: string;
    leetcode?: string;
  };
  lastSync?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyself();
      setUser(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user data');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value: UserContextType = {
    user,
    loading,
    error,
    refreshUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
