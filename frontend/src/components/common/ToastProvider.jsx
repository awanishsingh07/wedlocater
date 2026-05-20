import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={10}
      containerStyle={{ top: 80 }}
      toastOptions={{
        style: {
          fontFamily: "'Inter', sans-serif",
          fontSize:   "13px",
          fontWeight: "500",
          color:      "#2B2B2B",
          background: "#FFFFFF",
          border:     "1px solid #F5EFE4",
          borderRadius: "1rem",
          boxShadow:  "0 8px 48px rgba(43,43,43,0.14)",
          padding:    "12px 16px",
          maxWidth:   "380px",
        },
        success: {
          iconTheme: { primary: "#C9A84C", secondary: "#FFFFFF" },
        },
        error: {
          iconTheme: { primary: "#6B0F1A", secondary: "#FFFFFF" },
        },
        duration: 3500,
      }}
    />
  );
}