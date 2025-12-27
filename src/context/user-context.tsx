
'use client';
import React, { createContext, useMemo } from 'react';
import type { User } from 'firebase/auth';
import { useUser as useFirebaseAuthUser } from '@/firebase';

type UserContextType = {
  isLoggedIn: boolean;
  user: User | null;
  isUserLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  user: null,
  isUserLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useFirebaseAuthUser();

  const contextValue = useMemo(() => ({
    isLoggedIn: !isUserLoading && user !== null,
    user,
    isUserLoading,
  }), [user, isUserLoading]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
