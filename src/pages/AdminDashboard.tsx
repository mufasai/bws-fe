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

  const renderContent = () => {
    switch (activeTab()) {
      case "SMS Template":
        return <div>Content for SMS Template</div>;
      case "Provider Prefixes":
        return <div>Content for Provider Prefixes</div>;
      case "Country Codes":
        return <div>Content for Country Codes</div>;
      case "SMS Costs":
        return <div>Content for SMS Costs</div>;
      case "Application":
        return <div>Content for Application</div>;
      case "Gateways":
        return <div>Content for Gateways</div>;
      default:
        return <div>Select a tab to view content</div>;
    }
  };
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 2000); // 2 seconds delay
  });

  return (
    <div class="flex flex-col space-y-6 p-6 bg-gray-100 min-h-screen">
      <div class="flex space-x-4">
        {loading()
          ? stats.map(() => (
              <div class="flex-1 bg-white shadow-md rounded-xl p-6 animate-pulse">
                <div class="h-4 bg-gray-300 rounded mb-4 w-1/3"></div>
                <div class="h-8 bg-gray-300 rounded mb-6 w-1/2"></div>
                <div class="h-6 bg-gray-300 rounded mb-4 w-1/4"></div>
                <div class="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))
          : stats.map((stat) => (
              <div class="flex-1 bg-white shadow-md rounded-xl p-6">
                <div class="flex flex-row justify-end"></div>
                <h3 class="text-lg font-semibold text-gray-700">
                  {stat.title}
                </h3>
                <div class="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div
                  class={`inline-flex items-center text-sm mt-2 h-6 rounded-lg ${
                    stat.change.startsWith("+")
                      ? "bg-[rgba(30,186,9,0.16)] text-green-500"
                      : "bg-[rgba(255,0,0,0.16)] text-red-500"
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
                  <p class="text-sm text-gray-500">{stat.description}</p>
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
