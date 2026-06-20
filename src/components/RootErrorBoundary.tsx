import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Surfaces React render errors instead of a blank page (common after bad deploy cache or SW).
 */
export class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RootErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-background p-8 font-sans text-foreground">
          <h1 className="text-xl font-semibold mb-2">Something went wrong loading this page</h1>
          <p className="text-muted-foreground mb-4 max-w-prose text-sm leading-relaxed">
            Try a <strong>hard refresh</strong> (Cmd+Shift+R or Ctrl+Shift+R). If this domain was used on
            another host (e.g. Lovable), open DevTools → Application → <strong>Service Workers</strong> →
            unregister, then <strong>Clear site data</strong> and reload.
          </p>
          <pre className="overflow-auto whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-4 text-xs text-foreground">
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
