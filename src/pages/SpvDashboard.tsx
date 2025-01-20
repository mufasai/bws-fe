// Custom Icons Components
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

import SmsBlast from "../components/spv-dashboard/SmsBlast";
import SmsDirect from "../components/spv-dashboard/SmsDirect";

// Components/StatItem.tsx
const StatItem = (props: any) => (
  <div class="flex items-center justify-between text-sm">
    <span class="text-gray-600">{props.label}</span>
    <span
      class={`font-semibold ${props.color ? `text-${props.color}-600` : ""}`}
    >
      {props.value}
    </span>
  </div>
);

// Components/DownloadButton.tsx
const DownloadButton = () => (
  <button class="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center">
    <span class="mr-2">
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </span>
    Download Report
  </button>
);

// Components/SectionHeader.tsx
const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div class="flex justify-between items-center mb-6">
    <div>
      <h2 class="text-xl font-semibold text-gray-800">{title}</h2>
      <p class="mt-1 text-gray-600">{description}</p>
    </div>
    <div class="flex gap-3">
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
);

// Components/ReportCard.tsx
const ReportCard = ({
  title,
  stats,
}: {
  title: string;
  stats: { label: string; value: string; color?: string }[];
}) => (
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-gray-800">{title}</h3>
      <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
        Last 30 days
      </span>
    </div>
    <div class="space-y-4">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
      <DownloadButton />
    </div>
  </div>
);

// Pages/SpvDashboard.tsx
const SpvDashboard = () => {
  const directSmsStats = [
    { label: "Total Requests", value: "1,234" },
    { label: "Approved", value: "1,180", color: "green" },
    { label: "Rejected", value: "54", color: "red" },
  ];

  const blastSmsStats = [
    { label: "Total Campaigns", value: "45" },
    { label: "Recipients", value: "25,430" },
    { label: "Success Rate", value: "98.5%", color: "green" },
  ];

  return (
    <div class="min-h-screen">
      <div class="max-w-6xl mx-auto">
        <div class="space-y-6">
          {/* Reports Section */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReportCard title="Direct SMS Report" stats={directSmsStats} />
            <ReportCard title="Blast SMS Report" stats={blastSmsStats} />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SMS Direct Section */}
            <div class="bg-white w-[100%] rounded-xl shadow-sm">
              <div class="p-6">
                <SmsDirect />
              </div>
            </div>

            {/* Blast SMS Section */}
            <div class="bg-white w-[100%] rounded-xl shadow-sm">
              <div class="p-6">
                <SmsBlast />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpvDashboard;
