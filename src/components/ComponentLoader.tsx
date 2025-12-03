import { Spinner } from '@/components/ui/spinner';

interface ComponentLoaderProps {
  message?: string;
  minHeight?: string;
}

const ComponentLoader = ({ message = "Loading...", minHeight = "200px" }: ComponentLoaderProps) => {
  return (
    <div className="flex items-center justify-center py-12" style={{ minHeight }}>
      <div className="text-center">
        <Spinner size="lg" className="text-primary mb-3" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default ComponentLoader;
