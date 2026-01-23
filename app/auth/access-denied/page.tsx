"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function AccessDeniedContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your account';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-destructive">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-destructive/10 p-4 rounded-full">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Access Denied</CardTitle>
          <CardDescription className="text-base">
            You don't have permission to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Account:</strong> {email}
            </p>
            <p className="text-sm text-muted-foreground">
              This account doesn't have administrator privileges.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Need admin access?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If you're the site owner and need to grant admin access to your account,
                you'll need to add your user ID to the user_roles table in Supabase.
              </p>
              <details className="text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium hover:text-foreground">
                  Show setup instructions
                </summary>
                <div className="mt-3 space-y-2 pl-4">
                  <p className="font-mono text-xs bg-muted p-2 rounded">
                    1. Go to your Supabase Dashboard
                  </p>
                  <p className="font-mono text-xs bg-muted p-2 rounded">
                    2. Navigate to Table Editor → user_roles
                  </p>
                  <p className="font-mono text-xs bg-muted p-2 rounded">
                    3. Insert new row with your user_id and role='admin'
                  </p>
                  <p className="text-xs mt-2">
                    Or run this SQL in the SQL Editor:
                  </p>
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
{`INSERT INTO user_roles (user_id, role)
VALUES (
  (SELECT id FROM auth.users
   WHERE email = '${email}'),
  'admin'
);`}
                  </pre>
                </div>
              </details>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AccessDeniedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <AccessDeniedContent />
    </Suspense>
  );
}
