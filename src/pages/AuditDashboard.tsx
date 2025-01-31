import { createSignal, createEffect, onMount } from "solid-js";
import {
  FiDownload,
  FiActivity,
  FiSettings,
  FiSearch,
  FiCalendar,
} from "solid-icons/fi";
import AuditTrailTable from "../components/Audit/AuditTrailTable";
import ParameterTable from "../components/Audit/ParameterTable";

const AuditDashboard = () => {
  const FilterIcon = () => (
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );

  const DownloadIcon = () => (
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );

  const [auditLogs, setAuditLogs] = createSignal([
    {
      id: 1,
      username: "john_doe",
      activity: "Login",
      timestamp: "2025-01-16 09:30:00",
      details: "User login successful",
    },
    {
      id: 2,
      username: "jane_smith",
      activity: "SMS Management",
      timestamp: "2025-01-16 10:15:00",
      details: "Updated SMS template",
    },
    // Add more sample data as needed
  ]);

  const [parameters, setParameters] = createSignal([
    {
      id: 1,
      name: "SMS Template",
      value: "Default template",
      lastUpdated: "2025-01-15",
    },
    {
      id: 2,
      name: "Telco Prefix",
      value: "+62",
      lastUpdated: "2025-01-14",
    },
  ]);

  const [activeTab, setActiveTab] = createSignal("audit");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [dateFilter, setDateFilter] = createSignal("");

  const handleDownload = (format: string) => {
    // Implement download logic here
    console.log(`Downloading in ${format} format`);
  };

  const stats = [
    {
      title: "Total Activity",
      value: "1012",
      change: "+12.5%",
      description: "Increased in last month",
    },
    {
      title: "Total Login",
      value: "912",
      change: "0.5% improvement",
      description: "Increased in last month",
    },
    {
      title: "Management Data",
      value: "300",
      change: "+2 new this week",
      description: "Increased in last month",
    },
    {
      title: "SMS submission",
      value: "750",
      change: "+3 new this month",
      description: "Increased in last month",
    },
  ];

  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 2000); // 2 seconds delay
  });

  return (
    <div class="min-h-screen p-6">
      <div class="lg:flex lg:flex-row lg:space-x-6 grid grid-cols-2 lg:gap-0">
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
              class={`lg:flex-1 shadow-lg rounded-xl lg:p-6 p-4 text-white ${index % 4 === 0
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
                class={`inline-flex items-center lg:text-sm mt-2 h-6 rounded-lg text-[10px] ${stat.change.startsWith("+")
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
      <div class="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Audit Trail */}
        <div class="bg-white rounded-2xl shadow-sm p-6">
          {/* Title */}
          <div class="mb-6">
            <div class="flex justify-between items-center ">
              <div>
                <h2 class="text-2xl font-semibold text-gray-800">
                  Audit Trail
                </h2>
                <p class="mt-1 text-gray-600">
                  Monitor user activities like login, data management, SMS
                  submission, and SPV authorization.
                </p>
              </div>
            </div>
          </div>
          {/* Filters and Actions */}
          <div class="flex justify-between mb-6">
            <div class="flex space-x-3">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  class="pl-10 pr-2 py-2 border border-gray-200 rounded-lg"
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch class="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div class="flex space-x-3">
              <button class="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span class="mr-2">
                  <FilterIcon />
                </span>
                Filter
              </button>
              <button class="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span class="mr-2">
                  <DownloadIcon />
                </span>
                Export
              </button>
            </div>
          </div>
          {/* Content */}
          <div class="overflow-x-auto bg-white w-[100%] rounded-xl shadow-sm">
            <AuditTrailTable />
          </div>
        </div>

        {/* Parameter */}
        <div class="bg-white rounded-2xl shadow-sm p-6">
          {/* Title */}
          <div class="mb-6">
            <div class="flex justify-between items-center ">
              <div>
                <h2 class="text-2xl font-semibold text-gray-800">Parameter</h2>
                <p class="mt-1 text-gray-600">
                  Monitor user activities like login, data management, SMS
                  submission, and SPV authorization.
                </p>
              </div>
            </div>
          </div>
          {/* Filters and Actions */}
          <div class="flex justify-between mb-6">
            <div class="flex space-x-3">
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch class="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div class="flex space-x-3">
              <button class="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span class="mr-2">
                  <FilterIcon />
                </span>
                Filter
              </button>
              <button class="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span class="mr-2">
                  <DownloadIcon />
                </span>
                Export
              </button>
            </div>
          </div>
          {/* Content */}
          <div class="overflow-x-auto bg-white w-[100%] rounded-xl shadow-sm">
            <ParameterTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;
