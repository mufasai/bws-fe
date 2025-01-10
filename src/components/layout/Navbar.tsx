<<<<<<< HEAD
import { Component, createSignal, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { useTheme } from "../../store/theme.store";
import { Motion, Presence } from "@motionone/solid";
import { useLocation } from "@solidjs/router";

const Navbar: Component<{
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}> = (props) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showLogoutDialog, setShowLogoutDialog] = createSignal(false);
  const [title, setTitle] = createSignal("Dashboard");

  const location = useLocation();

  onMount(() => {
    setTitle(location.pathname.split("/").pop() || "Dashboard");
  });

  const handleLogout = () => {
    // Implement logout logic here
    setShowLogoutDialog(false);
  };

  return (
    <>
      <nav class=" px-5 py-2 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full bg-[#f3f4f8] backdrop-blur-md">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <h1 class="text-[4vh] font-inter font-semibold text-gray-900 dark:text-white">
              {title()
                .replace(/([a-z])([A-Z])/g, "$1 $2") // Tambahkan spasi sebelum huruf besar
                .charAt(0)
                .toUpperCase() +
                title()
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Tambahkan spasi sebelum huruf besar
                  .slice(1)}
            </h1>
          </div>

          <div class="flex items-center gap-3">
            {/* <button
              onClick={toggleTheme}
              class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isDarkMode() ? (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            </button> */}

            <div class="relative">
              <div class="flex items-center gap-2">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    class="w-[300px] font-inter pl-10 pr-4 py-2 text-sm text-gray-700 bg-white border-none shadow-md  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-400"
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
                </div>
                <div class="relative">
                  <div class="flex items-center p-2 justify-center bg-white shadow-md rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="currentColor" stroke-width="1.5">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 19v-9a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v9M6 19h12M6 19H4m14 0h2m-9 3h2"
                        />
                        <circle cx="12" cy="3" r="1" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="flex items-center p-[1vh] justify-center bg-white shadow-md rounded-full cursor-pointer"
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <img
                      src="./foto_profile.jpeg"
                      class="w-7 h-7 rounded-full"
                    ></img>
                    <div class="flex flex-col ml-3">
                      <span class="text-[1.5vh] font-inter leading-3  text-gray-900 dark:text-white">
                        Jawir Xavier
                      </span>
                      <span class="text-[1.2vh] font-inter  text-gray-600 dark:text-white">
                        Prodcut manager
                      </span>
                    </div>
                    <div class="ml-3 rotate-180 text-gray-600 dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m17 14l-5-5m0 0l-5 5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Presence>
        {showLogoutDialog() && (
          <Portal>
            <div class="fixed inset-0 z-50 overflow-y-auto">
              <div
                class="fixed inset-0 bg-black/50 transition-opacity"
                onClick={() => setShowLogoutDialog(false)}
              />
              <div class="flex min-h-screen items-center justify-center p-4">
                <Motion
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                    <div class="flex flex-col items-center gap-4">
                      <div class="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                        <svg
                          class="w-8 h-8 text-red-600 dark:text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <div class="text-center">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Confirm Logout
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          Are you sure you want to log out of your account?
                        </p>
                      </div>
                      <div class="flex gap-3 w-full">
                        <button
                          onClick={() => setShowLogoutDialog(false)}
                          class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleLogout}
                          class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:hover:bg-red-700"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </Motion>
              </div>
            </div>
          </Portal>
        )}
      </Presence>
    </>
  );
};

export default Navbar;
=======
import { Component, createSignal, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { useTheme } from "../../store/theme.store";
import { Motion, Presence } from "@motionone/solid";
import { useLocation } from "@solidjs/router";

const Navbar: Component<{ onToggleSidebar: () => void; isSidebarOpen: boolean }> = (props) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showLogoutDialog, setShowLogoutDialog] = createSignal(false);
  const [title, setTitle] = createSignal("Dashboard");

  const location = useLocation();

  onMount(() => {
    setTitle(location.pathname.split('/').pop() || "Dashboard");
  });


  const handleLogout = () => {
    // Implement logout logic here
    setShowLogoutDialog(false);
  };

  return (
    <>
      <nav class=" px-8 py-2 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full bg-[#ECEFF3] backdrop-blur-md">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">

            <h1 class="text-[4vh] font-inter font-semibold text-gray-900 dark:text-white">
              {title().charAt(0).toUpperCase() + title().slice(1)}
            </h1>
          </div>

          <div class="flex items-center gap-3">
            {/* <button
              onClick={toggleTheme}
              class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isDarkMode() ? (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            </button> */}

            <div class="relative">
              <div class="flex items-center gap-2">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    class="w-[300px] font-inter pl-10 pr-4 py-2 text-sm text-gray-700 bg-white border-none shadow-md  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">  
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div class="relative">
                  <div class="flex items-center p-2 justify-center bg-white shadow-md rounded-full"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 19v-9a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v9M6 19h12M6 19H4m14 0h2m-9 3h2" /><circle cx="12" cy="3" r="1" /></g></svg>
                  </div>
                </div>
                <div class="relative">
                  <div class="flex items-center p-[1vh] justify-center bg-white shadow-md rounded-full cursor-pointer" onClick={() => setShowLogoutDialog(true)}>
                    <img src="./foto_profile.jpeg" class="w-7 h-7 rounded-full"></img>
                    <div class="flex flex-col ml-3">
                      <span class="text-[1.5vh] font-inter leading-3  text-gray-900 dark:text-white">Jawir Xavier</span>
                      <span class="text-[1.2vh] font-inter  text-gray-600 dark:text-white">Prodcut manager</span>
                    </div>
                    <div class="ml-3 rotate-180 text-gray-600 dark:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 14l-5-5m0 0l-5 5" /></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>


          </div>
        </div>
      </nav>

      <Presence>
        {showLogoutDialog() && (
          <Portal>
            <div class="fixed inset-0 z-50 overflow-y-auto">
              <div class="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setShowLogoutDialog(false)} />
              <div class="flex min-h-screen items-center justify-center p-4">
                <Motion
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                    <div class="flex flex-col items-center gap-4">
                      <div class="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                        <svg class="w-8 h-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div class="text-center">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Confirm Logout
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          Are you sure you want to log out of your account?
                        </p>
                      </div>
                      <div class="flex gap-3 w-full">
                        <button
                          onClick={() => setShowLogoutDialog(false)}
                          class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleLogout}
                          class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:hover:bg-red-700"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </Motion>
              </div>
            </div>
          </Portal>
        )}
      </Presence>
    </>
  );
};

export default Navbar; 
>>>>>>> 6f6949f4938d86ba0e2c06119519abfba8adc3d1
