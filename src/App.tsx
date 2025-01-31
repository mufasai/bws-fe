import { Component, createSignal, onMount } from "solid-js";
import { Router, Route, Navigate } from "@solidjs/router";
import { useAuth } from "./store/auth.store";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import "@thisbeyond/solid-select/style.css";
import Login from "./pages/auth-page/Login";
import Register from "./pages/auth-page/Register";
import ProjectPage from "./pages/ProjectPage";
import AdminDashboard from "./pages/AdminDashboard";
import SpvDashboard from "./pages/SpvDashboard";
import AuditDashboard from "./pages/AuditDashboard";
import Sidebar from "./components/layout/Sidebar"; // Import Sidebar
import Navbar from "./components/layout/Navbar"; // Import Navbar

// Signal untuk Sidebar
const [isSidebarOpen, setSidebarOpen] = createSignal(false);
const toggleSidebar = () => {
  setSidebarOpen(!isSidebarOpen());
};

const ProtectedRoute: Component<{ children: any }> = (props) => {
  const [isOpen, setIsOpen] = createSignal(true);
  const [isMobileOpen, setIsMobileOpen] = createSignal(false);
  const [isDesktop, setIsDesktop] = createSignal(window.innerWidth >= 1024);

  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate href="/login" />;
  }

  const handleCloseMobile = () => {
    setIsMobileOpen(false);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen());
  };

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  onMount(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div class="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen()}
        isMobileOpen={isMobileOpen()}
        onToggleSidebar={handleToggleSidebar}
        onCloseMobile={handleCloseMobile}
      />

      {/* Konten Utama */}
      <div class="flex-1">
        {/* Navbar */}
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen()}
        />
        <main class="p-4 overflow-auto">{props.children}</main>
      </div>
    </div>
  );
};

const App: Component = () => {
  return (
    <div class="min-h-screen bg-gray-100">
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/dashboard"
          component={() => (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/userManagement"
          component={() => (
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/adminDashboard"
          component={() => (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/spvDashboard"
          component={() => (
            <ProtectedRoute>
              <SpvDashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/auditDashboard"
          component={() => (
            <ProtectedRoute>
              <AuditDashboard />
            </ProtectedRoute>
          )}
        />

        <Route path="*" component={() => <Navigate href="/dashboard" />} />
      </Router>
    </div>
  );
};

export default App;
