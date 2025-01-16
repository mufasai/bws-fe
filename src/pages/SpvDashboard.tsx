import { createSignal } from "solid-js";
import SMSReports from "../components/spv-dashboard/SmsReports";
import SmsDirect from "../components/spv-dashboard/SmsDirect";
import SmsBlast from "../components/spv-dashboard/SmsBlast";

function SpvDashboard() {
  const [tab, setTab] = createSignal("smsDirect");

  return (
    <div class="min-h-screen">
      {/* Main Content */}
      <main class="max-w-screen mx-auto p-6">
        {/* Tabs */}
        <div class="bg-white rounded-xl p-1 inline-flex mb-6 shadow-sm">
          <button
            onClick={() => setTab("smsDirect")}
            class={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              tab() === "smsDirect"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            SMS Direct
          </button>
          <button
            onClick={() => setTab("blastSMS")}
            class={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              tab() === "blastSMS"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Blast SMS
          </button>
          <button
            onClick={() => setTab("reports")}
            class={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              tab() === "reports"
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Reports
          </button>
        </div>

        {tab() === "smsDirect" && <SmsDirect />}

        {tab() === "reports" && <SMSReports />}

        {tab() === "blastSMS" && <SmsBlast />}
      </main>
    </div>
  );
}

export default SpvDashboard;
