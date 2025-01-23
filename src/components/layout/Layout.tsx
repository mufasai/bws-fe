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
    <div class="flex min-h-screen bg-[f2f2f2] dark:bg-gray-900">
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
          isSidebarOpen() ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div class="sticky top-0 z-20">
          <button
            onClick={toggleSidebar}
            class="hidden lg:flex fixed left-5 top-5 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d={
                  isSidebarOpen()
                    ? "M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    : "M13 5l7 7-7 7M5 5l7 7-7 7"
                }
              />
            </svg>
          </button>
          <Navbar
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen()}
          />
        </div>
        <main class="flex-1 p-4 overflow-auto">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
