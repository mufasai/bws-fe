import { createSignal, createEffect } from "solid-js";
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

  return (
    <div class="min-h-screen p-6">
      <div class="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
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
