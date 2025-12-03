import { Spinner } from '@/components/ui/spinner';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size="xl" className="text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
