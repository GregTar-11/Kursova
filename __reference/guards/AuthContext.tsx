'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase/firebase.config';
import { AuthService } from '@/services/firebase/auth.service';
import { IUser } from '@/types/schema/schema.type';

export interface IAuthContext {
  user: IUser | null;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IAuthContext['user']>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      await AuthService.getUser(firebaseUser.uid)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => {
          setLoading(false);
        });
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
