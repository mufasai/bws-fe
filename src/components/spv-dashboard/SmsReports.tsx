const ReportCard = (props: any) => {
  return (
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">{props.title}</h3>
        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          Last {props.lastDays} days
        </span>
      </div>
      <div class="space-y-4">{props.children}</div>
    </div>
  );
};

// StatItem.jsx
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

// DownloadButton.jsx
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

// SMSReports.jsx
const SMSReports = () => {
  return (
    <div>
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">SMS Reports</h2>
          <p class="mt-1 text-gray-600">
            Download and analyze SMS authorization history
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        {/* Direct SMS Report Card */}
        <ReportCard title="Direct SMS Report" lastDays={30}>
          <StatItem label="Total Requests" value="1,234" />
          <StatItem label="Approved" value="1,180" color="green" />
          <StatItem label="Rejected" value="54" color="red" />
          <DownloadButton />
        </ReportCard>

        {/* Blast SMS Report Card */}
        <ReportCard title="Blast SMS Report" lastDays={30}>
          <StatItem label="Total Campaigns" value="45" />
          <StatItem label="Recipients" value="25,430" />
          <StatItem label="Success Rate" value="98.5%" color="green" />
          <DownloadButton />
        </ReportCard>
      </div>
    </div>
  );
};

export default SMSReports;
