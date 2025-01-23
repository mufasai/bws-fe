import { Component, createSignal, onMount, onCleanup, JSX } from "solid-js";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: Component<{ children: JSX.Element }> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);
  const [isDesktop, setIsDesktop] = createSignal(window.innerWidth >= 1024);

  const handleResize = () => {
    const desktop = window.innerWidth >= 1024;
    setIsDesktop(desktop);
    if (!desktop) {
      setIsSidebarOpen(false); // Tutup sidebar di perangkat kecil.
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

  return (
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900 ">
      {/* Overlay untuk mobile */}
      {isMobileMenuOpen() && (
        <div
          class="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen()}
        isMobileOpen={isMobileMenuOpen()}
        onToggleSidebar={toggleSidebar}
        onCloseMobile={() => setIsMobileMenuOpen(true)}
      />

      {/* Konten utama */}
      <div class="flex-1 flex flex-col">
        <Navbar
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen()}
        />
        <main class="flex-1 w-64 overflow-auto">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
