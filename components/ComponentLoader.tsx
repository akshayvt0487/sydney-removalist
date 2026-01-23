import { Loader2 } from 'lucide-react';

interface ComponentLoaderProps {
  message?: string;
  minHeight?: string;
}

const ComponentLoader = ({ message = "Loading...", minHeight = "200px" }: ComponentLoaderProps) => {
  return (
    <div className="flex items-center justify-center py-12" style={{ minHeight }}>
      <div className="text-center flex flex-col items-center">
        {/* Replaced generic Spinner with Lucide Loader2 */}
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default ComponentLoader;