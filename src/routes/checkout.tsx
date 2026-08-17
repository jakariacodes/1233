import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import Checkout from '@/pages/Checkout';
import { getServiceById } from '@/lib/services.functions';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/checkout')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      serviceId: (search['serviceId'] as string) || '',
      packageId: (search['packageId'] as string) || '',
    };
  },
  loaderDeps: ({ search }) => ({ serviceId: search.serviceId, packageId: search.packageId }),
  loader: async ({ deps }) => {
    const { serviceId, packageId } = deps;
    if (!serviceId || !packageId) {
      return { service: null, package: null };
    }
    
    try {
      const service = await getServiceById({ data: serviceId });
      const pkg = service?.service_packages?.find((p: any) => p.id === packageId);
      
      return { service, package: pkg };
    } catch (error) {
      console.error('Failed to load checkout data:', error);
      return { service: null, package: null };
    }
  },
  component: () => {
    const { service, package: pkg } = useLoaderData({ from: '/checkout' });
    
    if (!service || !pkg) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Invalid Checkout Request</h1>
          <p className="text-muted-foreground mb-6">Please select a service and package to continue.</p>
          <Link to="/services">
            <button className="flex items-center gap-2 text-primary font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </button>
          </Link>
        </div>
      );
    }
    
    return <Checkout service={service} package={pkg} />;
  },
});
