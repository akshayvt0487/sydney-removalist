import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin | Sydney Removalist',
  description: 'Admin panel redirecting to dashboard',
};

export default async function AdminPage() {
  // Redirect /admin to /dashboard
  redirect('/dashboard');
}
