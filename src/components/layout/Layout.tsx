import {
  type Component,
  createSignal,
  onMount,
  onCleanup,
  type JSX,
} from "solid-js";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: Component<{ children: JSX.Element }> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);
  const [isDesktop, setIsDesktop] = createSignal(window.innerWidth >= 1024);

  const handleResize = () => {
    const desktop = window.innerWidth >= 1024;
    setIsDesktop(desktop);
    if (!desktop && isSidebarOpen()) {
      setIsSidebarOpen(false);
    } else if (desktop && !isSidebarOpen()) {
      setIsSidebarOpen(true);
    }
  };

  onMount(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onCleanup(() => {
    window.removeEventListener("resize", handleResize);
  });

  const toggleSidebar = () => {
    if (isDesktop()) {
      setIsSidebarOpen(!isSidebarOpen());
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen());
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile overlay */}
      <div
        class={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity duration-300 z-20 lg:hidden ${
          isMobileMenuOpen() ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen()}
        isMobileOpen={isMobileMenuOpen()}
        onToggleSidebar={toggleSidebar}
        onCloseMobile={closeMobileMenu}
      />

      {/* Main content */}
      <div
        class={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen() ? "lg:ml-64" : "lg:ml-0"
        }`}
      >
        <Navbar
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen()}
        />
        <main class="flex-1 p-4 overflow-auto">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
