import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const supabase = await createClient();

  // Server-side authentication check
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/auth?redirectTo=/admin');
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
    console.warn(`User ${user.email} (${user.id}) attempted to access admin without admin role`);
    // User is not an admin, redirect to access denied page
    redirect('/auth/access-denied?email=' + encodeURIComponent(user.email || ''));
  }

  // User is authenticated and is an admin, render the client component
  return <AdminClient />;
}
