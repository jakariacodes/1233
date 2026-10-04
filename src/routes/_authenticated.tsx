import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/_authenticated')({
  staticData: { sitemap: 'exclude-subtree' },
  head: () => ({
    title: 'Secure Account | InfraTech',
    meta: [
      { name: 'description', content: 'Secure InfraTech account area.' },
      { property: 'og:title', content: 'Secure Account | InfraTech' },
      { property: 'og:description', content: 'Secure InfraTech account area.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = Route.useNavigate();
  const pathname = window.location.pathname;
  
  useEffect(() => {
    if (!loading && !user) {
      if (pathname.startsWith('/admin')) {
        navigate({ to: '/admin-login' });
      } else {
        navigate({ to: '/auth' });
      }
    }
    
    // Redirect non-admins away from admin routes
    if (!loading && user && pathname.startsWith('/admin') && !isAdmin) {
      navigate({ to: '/dashboard' });
    }
  }, [user, loading, navigate, isAdmin, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return <Outlet />;
}