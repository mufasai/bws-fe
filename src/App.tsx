import { Component } from "solid-js";
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

const ProtectedRoute: Component<{ children: any }> = (props) => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate href="/login" />;
  }

  return <Layout>{props.children}</Layout>;
};

const App: Component = () => {
  return (
    <div class="min-h-screen ">
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
