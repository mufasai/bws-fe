import { createSignal, onMount } from "solid-js";
import ParameterManagement from "../components/parameter-management/ParameterManagement";

export default function adminDashboard() {
  const stats = [
    {
      title: "Total Messages",
      value: "245,678",
      change: "+12.5%",
      description: "Increased in last month",
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "0.5% improvement",
      description: "Compared to previous period",
    },
    {
      title: "Active Template",
      value: "24",
      change: "+2 new this week",
      description: "Template usage trend",
    },
    {
      title: "Active Users",
      value: "3",
      change: "+3 new this month",
      description: "User engagement trend",
    },
  ];

  const [activeTab, setActiveTab] = createSignal("SMS Template");

  const tabs = [
    "SMS Template",
    "Provider Prefixes",
    "Country Codes",
    "SMS Costs",
    "Application",
    "Gateways",
  ];

  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 2000); // 2 seconds delay
  });

  return (
    <div class="lg:mt-0 mt-12 flex flex-col space-y-6 p-6 bg-gray-100 min-h-screen lg:max-w-screen">
      <div class="lg:flex lg:flex-row lg:space-x-4 grid grid-cols-2 lg:gap-0">
        {loading()
          ? stats.map(() => (
              <div class="lg:flex-1 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-md rounded-xl p-6 animate-pulse">
                <div class="h-4 bg-gray-300 rounded mb-4 lg:w-1/3"></div>
                <div class="h-8 bg-gray-300 rounded mb-6 lg:w-1/2"></div>
                <div class="h-6 bg-gray-300 rounded mb-4 lg:w-1/4"></div>
                <div class="h-4 bg-gray-300 rounded lg:w-2/3"></div>
              </div>
            ))
          : stats.map((stat, index) => (
              <div
                class={`lg:flex-1 shadow-lg rounded-xl lg:p-6 p-4 text-white ${
                  index % 4 === 0
                    ? "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
                    : index % 4 === 1
                    ? "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400"
                    : index % 4 === 2
                    ? "bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500"
                    : "bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400"
                }`}
              >
                <h3 class="lg:text-lg text-sm font-semibold">{stat.title}</h3>
                <div class="lg:text-3xl text-xl font-bold">{stat.value}</div>
                <div
                  class={`inline-flex items-center lg:text-sm mt-2 h-6 rounded-lg text-[10px] ${
                    stat.change.startsWith("+")
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                  style="padding: 0 8px; width: fit-content;"
                >
                  <span class="font-medium">{stat.change}</span>
                </div>

                <div class="flex items-center space-y-1.5 space-x-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 16 16"
                    class="flex-shrink-0"
                  >
                    <path
                      fill="#25BD4C"
                      d="M7.712 7.208V16q0 .213-.144.356q-.144.144-.357.144t-.356-.144T6.71 16V6.308q0-.343.233-.576t.575-.232h9.693q.212 0 .356.144t.143.357t-.143.356t-.357.143H8.42l9.747 9.766q.14.14.13.344t-.15.344t-.334.14t-.335-.14z"
                    />
                  </svg>
                  <p class="lg:text-sm text-[10px]">{stat.description}</p>
                </div>
              </div>
            ))}
      </div>

      <div class="flex flex-col">
        <h1 class="text-4xl font-semibold font-[#171717]">
          Parameter Management
        </h1>
        <h2 class="text-[#585E6D] font-semibold">
          Configure SMS system parameters and settings
        </h2>
      </div>

      <ParameterManagement />
      {/* Parameter Management Component */}
    </div>
  );
}
