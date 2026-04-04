import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen px-4 py-5 sm:px-6">
          <div className="app-frame flex min-h-[calc(100vh-2.5rem)] items-center justify-center">
            <div className="surface-card w-full max-w-xl p-8 text-center sm:p-10">
              <p className="section-kicker mb-3">Unexpected State</p>
              <h2 className="title-md mb-3">Something went wrong</h2>
              <p className="body-muted mb-6">
                The page hit an unexpected error. A refresh usually gets things
                back on track.
              </p>
              <button onClick={this.handleRetry} className="btn btn-primary">
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
