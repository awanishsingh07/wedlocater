import toast from "react-hot-toast";

/* ── Base styles shared across all toasts ── */
const BASE = {
  duration:  3500,
  style: {
    fontFamily: "'Inter', sans-serif",
    fontSize:   "13px",
    fontWeight: "500",
    color:      "#2B2B2B",
    background: "#FFFFFF",
    border:     "1px solid #F5EFE4",
    borderRadius: "1rem",
    boxShadow:  "0 8px 32px rgba(43,43,43,0.12)",
    padding:    "12px 16px",
    maxWidth:   "360px",
  },
};

/* ── Success toast ── */
export const toastSuccess = (message = "Done!") =>
  toast.success(message, {
    ...BASE,
    iconTheme: { primary: "#C9A84C", secondary: "#FFFFFF" },
  });

/* ── Error toast ── */
export const toastError = (message = "Something went wrong. Please try again.") =>
  toast.error(message, {
    ...BASE,
    iconTheme: { primary: "#6B0F1A", secondary: "#FFFFFF" },
  });

/* ── Warning toast (no native icon — use custom) ── */
export const toastWarning = (message = "Please check the details.") =>
  toast(message, {
    ...BASE,
    icon: "⚠️",
    duration: 4000,
  });

/* ── Info toast ── */
export const toastInfo = (message = "Note") =>
  toast(message, {
    ...BASE,
    icon: "ℹ️",
    duration: 3500,
  });

/* ── Loading toast — returns toast id for dismissal ── */
export const toastLoading = (message = "Please wait…") =>
  toast.loading(message, {
    ...BASE,
    duration: Infinity,
    style: { ...BASE.style, color: "#7A7065" },
  });

/* ── Dismiss a specific or all toasts ── */
export const toastDismiss = (id) => (id ? toast.dismiss(id) : toast.dismiss());

/* ── Promise toast — wraps async operations ── */
export const toastPromise = (promise, messages = {}) =>
  toast.promise(promise, {
    loading: messages.loading || "Processing…",
    success: messages.success || "Success!",
    error:   messages.error   || "Something went wrong.",
  }, BASE);

/* ── Pre-built domain toasts ── */
export const Toasts = {
  bookingSuccess:   () => toastSuccess("🎉 Booking confirmed! We'll send you a confirmation."),
  bookingError:     () => toastError("Booking failed. Please try again or contact support."),
  wishlistAdded:    () => toastSuccess("❤️ Added to your wishlist!"),
  wishlistRemoved:  () => toastInfo("Removed from wishlist."),
  formError:        () => toastWarning("Please complete all required fields before proceeding."),
  loginSuccess:     () => toastSuccess("Welcome back! You've been signed in."),
  loginError:       () => toastError("Invalid email or password. Please try again."),
  registerSuccess:  () => toastSuccess("🎊 Account created! Welcome to WedLocater."),
  guestAdded:       () => toastSuccess("Guest added to your list."),
  guestUpdated:     () => toastSuccess("Guest details updated."),
  guestDeleted:     () => toastInfo("Guest removed from your list."),
  taskCompleted:    () => toastSuccess("✅ Task marked as complete!"),
  taskAdded:        () => toastSuccess("Task added to your checklist."),
  budgetUpdated:    () => toastSuccess("Budget allocation updated."),
  copySuccess:      () => toastSuccess("Copied to clipboard!"),
  exportSuccess:    () => toastSuccess("📥 Export ready — check your downloads."),
  saveSuccess:      () => toastSuccess("Changes saved successfully."),
  networkError:     () => toastError("Network error. Please check your connection."),
  notFound:         () => toastError("The requested item could not be found."),
};

export default {
  success: toastSuccess,
  error:   toastError,
  warning: toastWarning,
  info:    toastInfo,
  loading: toastLoading,
  dismiss: toastDismiss,
  promise: toastPromise,
  ...Toasts,
};