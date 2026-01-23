import { Loader2 } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center flex flex-col items-center">
        {/* Replaced custom Spinner with Lucide Loader2 */}
        <Loader2 className="w-16 h-16 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;