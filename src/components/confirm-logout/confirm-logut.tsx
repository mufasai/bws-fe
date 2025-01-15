import { Component, createEffect, createSignal, Show } from "solid-js";
import { Motion } from "@motionone/solid";
import { Presence } from "@motionone/solid";
import { Portal } from "solid-js/web";
import { useAuth } from "../../store/auth.store";
import { useNavigate } from "@solidjs/router";

interface ConfirmLogoutProps {
  showLogoutDialog: boolean;
  onClose: () => void;
}

const ConfirmLogout: Component<ConfirmLogoutProps> = (props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    props.onClose();
    await logout();
    navigate("/login");
  };

  return (
    <Show when={props.showLogoutDialog}>
      <Presence>
        <Portal>
          <div class="fixed inset-0 z-50 overflow-y-auto">
            <div
              class="fixed inset-0 bg-black/50 transition-opacity"
              onClick={props.onClose}
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
                        onClick={props.onClose}
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
      </Presence>
    </Show>
  );
};

export default ConfirmLogout;
