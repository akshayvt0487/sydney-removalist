"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // <--- Next.js router
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from './ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only run logic when loading is finished
    if (!loading) {
      if (!user) {
        console.log('ProtectedRoute: No user, redirecting to /auth');
        router.push('/auth');
      } else if (requireAdmin && !isAdmin) {
        console.log('ProtectedRoute: User is not admin, redirecting to /');
        router.push('/');
      }
    }
  }, [user, isAdmin, loading, requireAdmin, router]);

  // Show spinner while loading OR while waiting for the redirect to happen
  if (loading || !user || (requireAdmin && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  // If we get here, the user is authorized
  return <>{children}</>;
};