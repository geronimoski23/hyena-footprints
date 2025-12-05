import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

export default function LoadingOverlay({ message = 'Analyzing footprint pattern...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-card-border rounded-lg p-8 max-w-sm mx-4 text-center">
        <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" data-testid="loading-spinner" />
        <p className="text-lg font-medium" data-testid="text-loading-message">{message}</p>
        <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
      </div>
    </div>
  );
}
