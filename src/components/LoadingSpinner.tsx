import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
      <p className="text-lg text-muted-foreground font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
