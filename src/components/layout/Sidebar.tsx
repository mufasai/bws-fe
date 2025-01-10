<<<<<<< HEAD
import { Component, createSignal, onMount, Show } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { useAuth } from "../../store/auth.store";
import ConfirmLogout from "../confirm-logout/confirm-logut";
import { Tooltip } from "flowbite";

const Sidebar: Component<{ isOpen: boolean; onToggleSidebar: () => void }> = (
  props
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = createSignal(false);

  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true);
  // const { logout } = useAuth(); s = 'h'

  const handleLogout = async () => {
    setShowLogoutDialog(true);
  };
  onMount(() => {
    initializeTooltips();
  });
  function initializeTooltips() {
    const tooltipTriggerList = document.querySelectorAll(
      "[data-tooltip-target]"
    );
    tooltipTriggerList.forEach((triggerEl) => {
      const targetEl = document.getElementById(
        triggerEl.getAttribute("data-tooltip-target")!
      );
      if (targetEl) {
        new Tooltip(targetEl as HTMLElement, triggerEl as HTMLElement, {
          placement: "right",
        });
      }
    });
  }

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          fill="none"
          stroke-width="2"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 icon icon-tabler icon-tabler-category-2"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="overflow: visible; color: currentcolor;"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M14 4h6v6h-6z"></path>
          <path d="M4 14h6v6h-6z"></path>
          <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        </svg>
      ),
    },
    {
      title: "Project",
      path: "/project",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M21.25 8.912v1.544a1.03 1.03 0 0 1-1.028 1.03l-6.166 1.543v-.514a1.03 1.03 0 0 0-1.028-1.03h-2.056a1.027 1.027 0 0 0-1.028 1.03v.514l-6.166-1.544a1.027 1.027 0 0 1-1.028-1.03V8.913a2.576 2.576 0 0 1 2.57-2.574h13.36a2.575 2.575 0 0 1 2.57 2.574" />
            <path d="m3.778 11.485l.36 7.288a2.204 2.204 0 0 0 2.178 1.977h11.368a2.197 2.197 0 0 0 2.178-1.977l.36-7.288" />
            <path d="M13.028 11.485h-2.056a1.03 1.03 0 0 0-1.028 1.03v1.03c0 .568.46 1.028 1.028 1.028h2.056c.567 0 1.028-.46 1.028-1.029v-1.03c0-.568-.46-1.029-1.028-1.029m2.055-5.147V4.28a1.03 1.03 0 0 0-1.027-1.029H9.944a1.027 1.027 0 0 0-1.027 1.03v2.058" />
          </g>
        </svg>
      ),
    },
    {
      title: "Admin Dashboard",
      path: "/adminDashboard",
      icon: (
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
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="16" cy="5" r="4" />
        </svg>
      ),
    },
    {
      title: "Admin Dashboard",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M21.25 8.912v1.544a1.03 1.03 0 0 1-1.028 1.03l-6.166 1.543v-.514a1.03 1.03 0 0 0-1.028-1.03h-2.056a1.027 1.027 0 0 0-1.028 1.03v.514l-6.166-1.544a1.027 1.027 0 0 1-1.028-1.03V8.913a2.576 2.576 0 0 1 2.57-2.574h13.36a2.575 2.575 0 0 1 2.57 2.574" />
            <path d="m3.778 11.485l.36 7.288a2.204 2.204 0 0 0 2.178 1.977h11.368a2.197 2.197 0 0 0 2.178-1.977l.36-7.288" />
            <path d="M13.028 11.485h-2.056a1.03 1.03 0 0 0-1.028 1.03v1.03c0 .568.46 1.028 1.028 1.028h2.056c.567 0 1.028-.46 1.028-1.029v-1.03c0-.568-.46-1.029-1.028-1.029m2.055-5.147V4.28a1.03 1.03 0 0 0-1.027-1.029H9.944a1.027 1.027 0 0 0-1.027 1.03v2.058" />
          </g>
        </svg>
      ),
    },
    {
      title: "Admin Dashboard",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M21.25 8.912v1.544a1.03 1.03 0 0 1-1.028 1.03l-6.166 1.543v-.514a1.03 1.03 0 0 0-1.028-1.03h-2.056a1.027 1.027 0 0 0-1.028 1.03v.514l-6.166-1.544a1.027 1.027 0 0 1-1.028-1.03V8.913a2.576 2.576 0 0 1 2.57-2.574h13.36a2.575 2.575 0 0 1 2.57 2.574" />
            <path d="m3.778 11.485l.36 7.288a2.204 2.204 0 0 0 2.178 1.977h11.368a2.197 2.197 0 0 0 2.178-1.977l.36-7.288" />
            <path d="M13.028 11.485h-2.056a1.03 1.03 0 0 0-1.028 1.03v1.03c0 .568.46 1.028 1.028 1.028h2.056c.567 0 1.028-.46 1.028-1.029v-1.03c0-.568-.46-1.029-1.028-1.029m2.055-5.147V4.28a1.03 1.03 0 0 0-1.027-1.029H9.944a1.027 1.027 0 0 0-1.027 1.03v2.058" />
          </g>
        </svg>
      ),
    },
  ];

  const toggleSidebar = () => {
    props.onToggleSidebar();
    setIsSidebarOpen(!isSidebarOpen());
  };

  return (
    <>
      <ConfirmLogout
        showLogoutDialog={showLogoutDialog()}
        onClose={() => setShowLogoutDialog(false)}
      />
      <aside
        class={`h-full transition-all duration-300 ${
          isSidebarOpen() ? "w-[15vw]" : "w-[70px]"
        } bg-white dark:bg-gray-800 shadow-lg`}
      >
        <div class="flex flex-col h-full">
          {/* Header dengan Logo */}
          <div class="flex items-center h-16 px-4">
            <Show
              when={isSidebarOpen()}
              fallback={
                <div class="flex justify-center w-full mt-12">
                  <img src="./logo.png" class="w-250 h-98 "></img>
                </div>
              }
            >
              <div class="flex items-center gap-6 mt-12">
                <img src="./logo.png" class="w-250 h-98"></img>
              </div>
            </Show>
            <div class="absolute right-[-1vw]">
              <button
                onClick={toggleSidebar}
                class="p-1 relative bg-[#367aff] rounded-full right-0  text-white"
              >
                <svg
                  class="w-4 h-4 transition-transform duration-300"
                  style={{
                    transform: isSidebarOpen()
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation dengan icon yang lebih besar */}
          <nav class="flex-1 px-3 py-4 mt-12 space-y-4 justify-center overflow-y-auto">
            {menuItems.map((item) => (
              <>
                <A
                  data-tooltip-target={`tooltip-${item.title}`}
                  data-tooltip-placement="right"
                  href={item.path}
                  class={`flex items-center font-inter font-medium justify-start pl-2 py-2 text-[2vh]  rounded-full transition-colors ${
                    location.pathname === item.path
                      ? "text-white bg-blue-500 dark:text-blue-300 dark:bg-blue-900/50"
                      : "text-[#989898] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <div class="w-8 h-4 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <Show when={isSidebarOpen()}>
                    <span class="ml-3">{item.title}</span>
                  </Show>

                  {/* <Show when={!props.isOpen}> */}
                  <div
                    id={`tooltip-${item.title}`}
                    role="tooltip"
                    class="absolute z-10 w-max invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white shadow-lg rounded-lg  opacity-0 tooltip dark:bg-gray-700"
                  >
                    {item.title}
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  {/* </Show> */}
                </A>
              </>
            ))}
          </nav>

          {/* Footer dengan fungsi logout yang sudah diperbarui */}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
=======
import { Component, createSignal, onMount, Show } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import { useAuth } from "../../store/auth.store";
import ConfirmLogout from "../confirm-logout/confirm-logut";
import { Tooltip } from "flowbite";

const Sidebar: Component<{ isOpen: boolean , onToggleSidebar: () => void }> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = createSignal(false);

  const [isSidebarOpen, setIsSidebarOpen] = createSignal(true);
  // const { logout } = useAuth(); s = 'h'


  const handleLogout = async () => {
    setShowLogoutDialog(true);
  };
  onMount(() => {
    initializeTooltips();
  });
  function initializeTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-tooltip-target]');
    tooltipTriggerList.forEach(triggerEl => {
      const targetEl = document.getElementById(triggerEl.getAttribute('data-tooltip-target')!);
      if (targetEl) {
        new Tooltip(targetEl as HTMLElement, triggerEl as HTMLElement, {
          placement: 'right',
        });
      }
    });
  }

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 icon icon-tabler icon-tabler-category-2" width="1em" height="1em" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="overflow: visible; color: currentcolor;"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 4h6v6h-6z"></path><path d="M4 14h6v6h-6z"></path><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path></svg>
      ),
    },
    {
      title: "Project",
      path: "/project",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21.25 8.912v1.544a1.03 1.03 0 0 1-1.028 1.03l-6.166 1.543v-.514a1.03 1.03 0 0 0-1.028-1.03h-2.056a1.027 1.027 0 0 0-1.028 1.03v.514l-6.166-1.544a1.027 1.027 0 0 1-1.028-1.03V8.913a2.576 2.576 0 0 1 2.57-2.574h13.36a2.575 2.575 0 0 1 2.57 2.574" /><path d="m3.778 11.485l.36 7.288a2.204 2.204 0 0 0 2.178 1.977h11.368a2.197 2.197 0 0 0 2.178-1.977l.36-7.288" /><path d="M13.028 11.485h-2.056a1.03 1.03 0 0 0-1.028 1.03v1.03c0 .568.46 1.028 1.028 1.028h2.056c.567 0 1.028-.46 1.028-1.029v-1.03c0-.568-.46-1.029-1.028-1.029m2.055-5.147V4.28a1.03 1.03 0 0 0-1.027-1.029H9.944a1.027 1.027 0 0 0-1.027 1.03v2.058" /></g></svg>),
    },
  

  ];

  const toggleSidebar = () => {
    props.onToggleSidebar();
    setIsSidebarOpen(!isSidebarOpen());
  };

  return (
    <>
      <ConfirmLogout
        showLogoutDialog={showLogoutDialog()}
        onClose={() => setShowLogoutDialog(false)}
      />
      <aside
        class={`h-full transition-all duration-300 ${isSidebarOpen() ? "w-[15vw]" : "w-[70px]"
          } bg-white dark:bg-gray-800 shadow-lg`}
      >
        <div class="flex flex-col h-full">
          {/* Header dengan Logo */}
          <div class="flex items-center h-16 px-4">
            <Show
              when={isSidebarOpen()}
              fallback={
                <div class="flex justify-center w-full">
                  <img src="./work_hub_icon.svg" class="w-8 h-8"></img>
                </div>
              }
            >
              <div class="flex items-center gap-3">
                <img src="./work_hub_icon.svg" class="w-8 h-8"></img>
                <span class="text-[3vh] font-extrabold text-gray-900 dark:text-gray-400 font-inter">Management</span>
              </div>
            </Show>
            <div class="absolute right-[-1vw]">

              <button
                onClick={toggleSidebar}
                class="p-1 relative bg-[#367aff] rounded-full right-0  text-white"
              >
                <svg
                  class="w-4 h-4 transition-transform duration-300"
                  style={{
                    'transform': isSidebarOpen() ? 'rotate(0deg)' : 'rotate(180deg)'
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation dengan icon yang lebih besar */}
          <nav class="flex-1 px-3 py-4 space-y-2 justify-center overflow-y-auto">
            <div class="flex items-center space-x-[1vw] justify-around h-[7vh] w-full px-1  mb-[5vh] bg-[#367AFF] cursor-pointer rounded-full hover:bg-blue-300 ">
              <div class="w-[2.5vw] h-[2.5vw] bg-white rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-[#367AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <Show when={isSidebarOpen()}>
                <span class="text-[2.2vh] font-medium text-white w-[8vw] leading-[1.3]">Create new project</span>
              </Show>
            </div>
            {menuItems.map((item) => (
              <>
                <A
                  data-tooltip-target={`tooltip-${item.title}`}
                  data-tooltip-placement="right"
                  href={item.path}
                  class={`flex items-center font-inter font-medium justify-start pl-2 py-2 text-[2vh]  rounded-full transition-colors ${location.pathname === item.path
                    ? "text-white bg-blue-500 dark:text-blue-300 dark:bg-blue-900/50"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                >
                  <div class="w-8 h-4 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <Show when={isSidebarOpen()}>
                    <span class="ml-3">{item.title}</span>
                  </Show>

                  {/* <Show when={!props.isOpen}> */}
                  <div
                    id={`tooltip-${item.title}`}
                    role="tooltip"
                    class="absolute z-10 w-max invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white shadow-lg rounded-lg  opacity-0 tooltip dark:bg-gray-700"
                  >
                    {item.title}
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  {/* </Show> */}
                </A>

              </>
            ))}
          </nav>

          {/* Footer dengan fungsi logout yang sudah diperbarui */}
          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              data-tooltip-target={`tooltip-logout`}
              data-tooltip-placement="right"
              class="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <div class="w-8 h-8 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <Show when={isSidebarOpen()}>
                <span class="ml-3">Logout</span>
              </Show>
              <div
                id="tooltip-logout"
                role="tooltip"
                class="absolute z-10 w-max invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white shadow-lg rounded-lg  opacity-0 tooltip dark:bg-gray-700"
              >
                Logout
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
>>>>>>> 6f6949f4938d86ba0e2c06119519abfba8adc3d1
