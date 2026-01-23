import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'Dashboard | Sydney Removalist Admin',
  description: 'Admin dashboard for managing form submissions and analytics',
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Server-side authentication check
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/auth?redirectTo=/dashboard');
  }

  // Check if user is admin
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .maybeSingle();

  // Log the role check for debugging
  if (roleError) {
    console.error('Error checking user role:', roleError);
  }

  if (!roleData) {
    console.warn(`User ${user.email} (${user.id}) attempted to access dashboard without admin role`);
    // User is not an admin, redirect to access denied page
    redirect('/auth/access-denied?email=' + encodeURIComponent(user.email || ''));
  }

  // Fetch initial data server-side for better performance
  const { data: submissions } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  // User is authenticated and is an admin, render the dashboard
  return <DashboardClient initialSubmissions={submissions || []} user={user} />;
}
