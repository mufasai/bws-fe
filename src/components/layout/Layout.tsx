import { Component, JSX, createSignal } from "solid-js";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: Component<{ children: JSX.Element }> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true);
  const [isMobileOpen, setIsMobileOpen] = createSignal(false);

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(!isSidebarOpen());
    } else {
      setIsMobileOpen(!isMobileOpen());
    }
  };

  return (
    <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div
        class={`fixed inset-0 bg-gray-800/60 transition-opacity md:hidden ${
          isMobileOpen() ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div
        class={`fixed md:fixed left-0 h-screen z-20 transform transition-transform duration-300 ${
          isMobileOpen() ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar isOpen={isSidebarOpen()} onToggleSidebar={toggleSidebar} />
      </div>

      <div
        class="flex-1 flex flex-col md:ml-[250px]"
        style={{
          "margin-left":
            window.innerWidth >= 768
              ? isSidebarOpen()
                ? "15vw"
                : "70px"
              : "0",
          transition: "margin-left 300ms",
        }}
      >
        <div
          class="fixed top-0 right-0 z-10 w-full md:w-auto"
          style={{
            left:
              window.innerWidth >= 768
                ? isSidebarOpen()
                  ? "15vw"
                  : "70px"
                : "0",
            transition: "left 300ms",
          }}
        >
          <Navbar
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen()}
          />
        </div>
        <main class="flex-1 p-4 overflow-auto mt-[53px] bg-[#f3f4f8]">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
