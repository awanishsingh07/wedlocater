import ErrorBoundary  from "./components/common/ErrorBoundary";
import ToastProvider  from "./components/common/ToastProvider";
import AppRoutes      from "./routes/index.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      {/* Global toast notifications */}
      <ToastProvider />

      {/* All routes (lazy-loaded + code-split) */}
      <AppRoutes />
    </ErrorBoundary>
  );
}