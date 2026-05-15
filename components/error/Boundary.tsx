import { ErrorFallback } from '@/components/error/ErrorFallback';
import React, { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Shown in the section fallback heading. */
  name?: string;
  onError?: (error: Error, info: ErrorInfo) => void;
};

type State = {
  error: Error | null;
};

export class Boundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
    if (__DEV__) {
      const label = this.props.name ?? 'Boundary';
      console.error(`[${label}]`, error, info.componentStack);
    }
  }

  private reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (error) {
      const sectionName = this.props.name ?? 'This section';
      return (
        <ErrorFallback
          error={error}
          variant="section"
          title={`${sectionName} failed to load`}
          message="The rest of the screen is still available."
          onRetry={this.reset}
        />
      );
    }
    return this.props.children;
  }
}
