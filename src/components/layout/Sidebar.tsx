import { type Component, createSignal, onMount } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const Sidebar: Component<{
  isOpen: boolean;
  isMobileOpen: boolean;
  onToggleSidebar: () => void;
  onCloseMobile: () => void;
}> = (props) => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard User",
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
      title: "User Management",
      path: "/userManagement",
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
      title: "SPV Dashboard",
      path: "/spvDashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 56 56"
          fill={location.pathname === "/spvDashboard" ? "white" : "#000000"}
        >
          <path d="M28 4c13.255 0 24 10.745 24 24S41.255 52 28 52S4 41.255 4 28S14.745 4 28 4m0 4C16.954 8 8 16.954 8 28s8.954 20 20 20s20-8.954 20-20S39.046 8 28 8m.573 6.286v2.687c3.976.319 6.855 2.704 6.982 6.314h-3.308c-.207-2.004-1.638-3.165-3.674-3.419V26.5l.764.19c4.183.971 6.473 2.689 6.473 6.076c0 3.897-3.181 6.107-7.237 6.394v2.671h-1.797V39.16c-4.04-.303-7.236-2.577-7.347-6.394h3.292c.286 1.861 1.495 3.229 4.055 3.5V29.33l-.652-.16c-4.04-.937-6.218-2.75-6.218-5.979c0-3.563 2.862-5.916 6.87-6.219v-2.687zm0 15.458v6.537c2.72-.207 3.865-1.495 3.865-3.197c0-1.638-.89-2.608-3.865-3.34m-1.797-9.876c-2.29.286-3.499 1.606-3.499 3.054s.955 2.512 3.5 3.149z" />
        </svg>
      ),
    },
    {
      title: "Audit Dashboard",
      path: "/auditDashboard",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L4.0025 14.0215C4.0025 13.8889 4.05518 13.7617 4.14895 13.6679C4.24271 13.5742 4.36989 13.5215 4.5025 13.5215H9.5035C9.9645 13.5215 9.962 13.1125 9.962 12.1395C9.962 11.1665 7.511 10.347 7.511 6.9265C7.511 3.506 10.05 2.5 12.16 2.5C14.27 2.5 16.5685 3.506 16.5685 6.9265C16.5685 10.347 14.1305 10.891 14.1305 12.1395C14.1305 13.388 14.1305 13.5215 14.5205 13.5215H19.5005C19.6331 13.5215 19.7603 13.5742 19.8541 13.6679C19.9478 13.7617 20.0005 13.8889 20.0005 14.0215V18H4Z"
            stroke={
              location.pathname === "/auditDashboard" ? "white" : "#000000"
            }
            stroke-width="2"
            stroke-linejoin="round"
            fill="none"
          />
          <path
            d="M4 21H20"
            stroke={
              location.pathname === "/auditDashboard" ? "white" : "#000000"
            }
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside
      class={`fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 transform transition-all duration-300 ease-in-out ${props.isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${props.isOpen ? "lg:w-56 lg:translate-x-0" : "lg:w-16 lg:translate-x-0"
        } border-r dark:border-gray-700`}
    >
      {/* Logo Section */}
      {/* Logo Section */}
      <div class="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700 overflow-hidden">
        <div class="flex items-center min-w-[200px]">
          <img
            src="public/LOGO GOTP.png"
            alt="Logo"
            class={`h-10 w-auto transition-all duration-300 mx-auto ${props.isOpen ? "opacity-100" : "opacity-0"
              }`}
          />
          <img
            src="public/logo mobile GOTP.png"
            alt="Logo Small"
            class={`h-10 w-auto absolute transition-all duration-300 ${props.isOpen ? "opacity-0" : "opacity-100"
              }`}
          />
        </div>
        <button
          onClick={props.onCloseMobile}
          class="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <nav class="px-2 py-4">
        {menuItems.map((item, index) => (
          <A
            href={item.path}
            class={`flex items-center px-3 py-4 rounded-lg transition-colors mb-1 group relative ${location.pathname === item.path
                ? "bg-[#FF934F] h-12 text-white"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
          >
            <div class="w-6 h-6 flex-shrink-0">{item.icon}</div>
            <span
              class={`ml-3 whitespace-nowrap transition-all duration-200 ${props.isOpen
                  ? "opacity-100 relative"
                  : "opacity-0 absolute left-14"
                } group-hover:opacity-100`}
            >
              {item.title}
            </span>
            {/* Tooltip for collapsed state */}
            {!props.isOpen && (
              <div class="absolute left-14 bg-gray-900 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.title}
              </div>
            )}
          </A>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
