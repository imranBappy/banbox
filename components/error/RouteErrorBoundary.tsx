import { ErrorFallback } from '@/components/error/ErrorFallback';
import type { ErrorBoundaryProps } from 'expo-router';

type Props = ErrorBoundaryProps & {
  scope?: 'app' | 'tab';
};

export function RouteErrorBoundary({ error, retry, scope = 'app' }: Props) {
  const isTab = scope === 'tab';
  return (
    <ErrorFallback
      error={error}
      onRetry={retry}
      title={isTab ? "This tab isn't available" : 'Something went wrong'}
      message={
        isTab
          ? 'There was a problem loading this tab. You can try again or switch to another tab.'
          : "The app ran into a problem. Please try again."
      }
    />
  );
}
