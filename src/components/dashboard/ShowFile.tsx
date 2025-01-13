import { createSignal, createMemo } from "solid-js";

const ShowFile = () => {
  const initialFiles = [
    { name: "List data number and message", date: "21 - 12 - 2024", type: "Excel", status: "success" },
    { name: "List data number and message", date: "20 - 12 - 2024", type: "CSV", status: "pending" },
    { name: "List data number and message", date: "19 - 12 - 2024", type: "Excel", status: "failed" },
    { name: "List data number and message", date: "18 - 12 - 2024", type: "CSV", status: "success" },
    { name: "List data number and message", date: "17 - 12 - 2024", type: "Excel", status: "failed" },
  ];

  const [selectedDate, setSelectedDate] = createSignal("Date");
  const [selectedStatus, setSelectedStatus] = createSignal("Status");

  // Mengambil daftar tanggal unik dari data
  const uniqueDates = createMemo(() => {
    const dates = initialFiles.map((file) => file.date);
    return ["Date", ...new Set(dates)];
  });

  const statusOptions = ["Status", "success", "pending", "failed"];

  // Mengambil data yang sudah difilter berdasarkan date dan status
  const filteredFiles = createMemo(() => {
    return initialFiles.filter((file) => {
      const dateMatch = selectedDate() === "Date" || file.date === selectedDate();
      const statusMatch = selectedStatus() === "Status" || file.status === selectedStatus();
      return dateMatch && statusMatch;
    });
  });

  return (
    <div class="space-y-4">
      {/* Dropdown untuk Date dan Status */}
      <div class="flex justify-end gap-4">
        <div>
          <select
            id="date-filter"
            class="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {uniqueDates().map((date) => (
              <option value={date}>{date}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="status-filter"
            class="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel file */}
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">File Name</th>
              <th class="px-4 py-2 text-left">Date Uploaded</th>
              <th class="px-4 py-2 text-left">Document Type</th>
              <th class="px-4 py-2 text-left">Status</th>
              <th class="px-4 py-2 text-left">Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles().map((file) => (
              <tr class="border-t">
                <td class="px-4 py-2">{file.name}</td>
                <td class="px-4 py-2">{file.date}</td>
                <td class="px-4 py-2">{file.type}</td>
                <td class="px-4 py-2">
                  <span class={`px-2 py-1 rounded ${getStatusStyle(file.status)}`}>
                    {file.status}
                  </span>
                </td>
                <td class="px-4 py-2">{getIcon(file.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function getStatusStyle(status: string) {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-orange-600 bg-orange-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "";
    }
  }

  function getIcon(status: string) {
    switch (status) {
      case "success":
        return <i class="fas fa-download text-blue-600"></i>;
      case "pending":
        return <i class="fas fa-clock text-gray-400"></i>;
      case "failed":
        return <i class="fas fa-times-circle text-red-600"></i>;
      default:
        return null;
    }
  }
};

export default ShowFile;
