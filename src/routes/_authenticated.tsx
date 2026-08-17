import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    // This is tricky because we need the auth state which is in a context
    // We'll handle the redirect in the component for now or use a loader
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) {
    window.location.href = '/auth';
    return null;
  }

  return <Outlet />;
}
