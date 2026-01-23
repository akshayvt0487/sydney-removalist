import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import AuthClient from './AuthClient';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthClient />
    </Suspense>
  );
}
