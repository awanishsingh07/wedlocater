import { Component } from "react";
import ErrorState from "./ErrorState";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("WedLocater Error Boundary caught:", error, info);
  }

  retry = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4">
          <ErrorState
            code={500}
            title="An unexpected error occurred"
            desc={this.state.error?.message || "Something went wrong. Please try refreshing the page."}
            onRetry={this.retry}
          />
        </div>
      );
    }
    return this.props.children;
  }
}