import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout      from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PageLoader      from "../components/common/PageLoader";
import NotFound        from "../pages/NotFound";
import { MOCK_USER, MOCK_VENDOR_USER, MOCK_ADMIN } from "../utils/mockData";

/* ── Lazy imports ── */
const Home                = lazy(() => import("../pages/Home/Home"));
const Login               = lazy(() => import("../pages/Login/Login"));
const Register            = lazy(() => import("../pages/Register/Register"));
const Venues              = lazy(() => import("../pages/Venues/Venues"));
const VenueDetails        = lazy(() => import("../pages/Venues/VenueDetails"));
const Photographers       = lazy(() => import("../pages/Photographer/Photographers"));
const PhotographerDetails = lazy(() => import("../pages/Photographer/PhotographerDetails"));
const Vendors             = lazy(() => import("../pages/Vendors/Vendors"));
const VendorDetails       = lazy(() => import("../pages/Vendors/VendorDetails"));
const AIBudgetPlanner = lazy(() => import("../pages/Budget/AIBudgetPlanner"));
const BudgetPlanner       = lazy(() => import("../pages/Budget/BudgetPlanner"));
const Checklist           = lazy(() => import("../pages/Checklist/Checklist"));
// const Guests              = lazy(() => import("../pages/Guests/Guests"));
const UserDashboard       = lazy(() => import("../pages/Dashboard/UserDashboard"));
const VendorDashboard     = lazy(() => import("../pages/Dashboard/VendorDashboard"));
const AdminDashboard      = lazy(() => import("../pages/Dashboard/AdminDashboard"));

/* ── Suspense fallback ── */
function SuspenseFallback() {
  return <PageLoader isLoading minDuration={600} />;
}

function Wrap({ children }) {
  return <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>;
}

export default function AppRoutes() {
  return (
    <Routes>

      {/* ── Public routes ── */}
      <Route element={<MainLayout />}>
        <Route path="/"                  element={<Wrap><Home /></Wrap>}                />
        <Route path="/venues"            element={<Wrap><Venues /></Wrap>}              />
        <Route path="/venues/:id"        element={<Wrap><VenueDetails /></Wrap>}        />
        <Route path="/ai-budget" element={<Wrap><AIBudgetPlanner /></Wrap>}             />
        <Route path="/photographers"     element={<Wrap><Photographers /></Wrap>}       />
        <Route path="/photographers/:id" element={<Wrap><PhotographerDetails /></Wrap>} />
        <Route path="/vendors"           element={<Wrap><Vendors /></Wrap>}             />
        <Route path="/vendors/:id"       element={<Wrap><VendorDetails /></Wrap>}       />
        <Route path="/login"             element={<Wrap><Login /></Wrap>}               />
        <Route path="/register"          element={<Wrap><Register /></Wrap>}            />
      </Route>

      {/* ── User / planning ── */}
      <Route element={<DashboardLayout role="user" user={MOCK_USER} />}>
        <Route path="/dashboard" element={<Wrap><UserDashboard /></Wrap>}  />
        <Route path="/dashboard/budget"    element={<Wrap><BudgetPlanner /></Wrap>}  />
        <Route path="/dashboard/checklist" element={<Wrap><Checklist /></Wrap>}      />
        {/* <Route path="/guests"    element={<Wrap><Guests /></Wrap>}         /> */}
      </Route>

      {/* ── Vendor ── */}
      <Route element={<DashboardLayout role="vendor" user={MOCK_VENDOR_USER} />}>
        <Route path="/vendor/dashboard" element={<Wrap><VendorDashboard /></Wrap>} />
      </Route>

      {/* ── Admin ── */}
      <Route element={<DashboardLayout role="admin" user={MOCK_ADMIN} />}>
        <Route path="/admin/dashboard" element={<Wrap><AdminDashboard /></Wrap>} />
      </Route>

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}