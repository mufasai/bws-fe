import { Component, createSignal, onMount, Show } from "solid-js";
import { onCleanup } from "solid-js";

const Navbar: Component<{
  onToggleSidebar: () => void;
  isSidebarOpen?: boolean;
}> = (props) => {
  const [showNotifications, setShowNotifications] = createSignal(false);
  const [showUserMenu, setShowUserMenu] = createSignal(false);
  const [isDarkMode, setIsDarkMode] = createSignal(false);

  onMount(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".relative")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    onCleanup(() => document.removeEventListener("click", handleClickOutside));
  });

  return (
    <nav class="w-full bg-white dark:bg-gray-900 shadow-lg">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between h-16 px-4">
          {/* Left section */}
          <div class="flex items-center space-x-4">
            <button
              onClick={props.onToggleSidebar}
              class="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div class="flex items-center space-x-3">
              <div class="h-8 w-8 bg-[#FF934F] rounded-lg flex items-center justify-center">
                <span class="text-white font-bold">D</span>
              </div>
              <span class="text-xl font-semibold text-gray-800 dark:text-white">
                Dashboard
              </span>
            </div>
          </div>

          {/* Center section - Search */}
          <div class="hidden md:flex flex-1 justify-center px-6">
            <div class="relative w-full max-w-lg">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search anything..."
              />
            </div>
          </div>

          {/* Right section */}
          <div class="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode())}
              class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {isDarkMode() ? (
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <div class="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications())}
                class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 relative"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notification Popup */}
              <Show when={showNotifications()}>
                <div class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-10">
                  <h4 class="text-gray-800 dark:text-white font-semibold mb-2">
                    Notifications
                  </h4>
                  <ul class="space-y-2">
                    <li class="p-2 bg-[#9482FE29] dark:bg-gray-700 rounded-lg">
                      <p class="text-sm text-gray-700 dark:text-gray-300">
                        New comment on your post.
                      </p>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        2 minutes ago
                      </span>
                    </li>
                    <li class="p-2 bg-[#FF934F29] dark:bg-gray-700 rounded-lg">
                      <p class="text-sm text-gray-700 dark:text-gray-300">
                        Your report is ready to download.
                      </p>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        10 minutes ago
                      </span>
                    </li>
                  </ul>
                </div>
              </Show>
            </div>

            <div class="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu())}
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <img
                  src="foto_profile.jpeg"
                  alt="User"
                  class="h-8 w-8 rounded-lg object-cover"
                />
                <div class="hidden md:block text-left">
                  <div class="text-sm font-semibold text-gray-800 dark:text-white">
                    Alex Chen
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Product Designer
                  </div>
                </div>
                <svg
                  class="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile Popup */}
              <Show when={showUserMenu()}>
                <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-10">
                  <ul class="space-y-2">
                    <li class="flex flex-row block p-2 space-x-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        class="my-auto"
                      >
                        <g
                          fill="#000000"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        >
                          <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                          <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21" />
                        </g>
                      </svg>
                      <a href="/profile" class="">
                        View Profile
                      </a>
                    </li>
                    <li class="flex flex-row block p-2 space-x-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
                        />
                      </svg>
                      <a href="/settings" class="">
                        Settings
                      </a>
                    </li>
                    <li class="flex flex-row block p-2 space-x-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#000"
                          d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                        />
                      </svg>
                      <button onClick={() => console.log("Logged out")}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </Show>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div class="md:hidden border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search anything..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
