
'use client';
import React,
{
  createContext,
  useState,
  useMemo,
} from 'react';

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  user: null,
  login: () => { },
  logout: () => { },
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue = useMemo(() => ({
    isLoggedIn: user !== null,
    user,
    login,
    logout,
  }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
