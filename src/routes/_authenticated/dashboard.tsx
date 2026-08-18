import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold'>User Dashboard</h1>
      <p className='text-muted-foreground mt-4'>Welcome back! Manage your services and orders here.</p>
    </div>
  );
}
