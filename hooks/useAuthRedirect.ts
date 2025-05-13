'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';

interface UseAuthRedirectOptions {
  redirectAuthenticated?: string;
  redirectUnauthenticated?: string;
}

export function useAuthRedirect(options: UseAuthRedirectOptions = {}) {
  const { redirectAuthenticated, redirectUnauthenticated } = options;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until auth state is loaded

    // Redirect authenticated users
    if (user && redirectAuthenticated) {
      router.push(redirectAuthenticated);
      return;
    }

    // Redirect unauthenticated users
    if (!user && redirectUnauthenticated) {
      router.push(redirectUnauthenticated);
      return;
    }
  }, [user, loading, redirectAuthenticated, redirectUnauthenticated, router]);

  return { user, loading };
}