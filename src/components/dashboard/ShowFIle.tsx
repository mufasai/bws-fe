import { createSignal, createMemo, createEffect, Show } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import InputSmsDirect from "./InputSmsDirect";
import { fetchSmsInbox, uploadJsonFile } from "../../services/service";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridApi, ColDef, ICellRendererParams, GridReadyEvent } from "ag-grid-community";
import * as XLSX from "xlsx";


interface FileData {
  name: string;
  date: string;
  type: string;
  status: 'success' | 'pending' | 'failed';
}

const ShowFile = () => {
  const initialFiles: FileData[] = [
    { name: "List data number and message", date: "21 - 12 - 2024", type: "Excel", status: "success" },
    { name: "List data number and message", date: "20 - 12 - 2024", type: "CSV", status: "pending" },
    { name: "List data number and message", date: "19 - 12 - 2024", type: "Excel", status: "failed" },
    { name: "List data number and message", date: "18 - 12 - 2024", type: "CSV", status: "success" },
    { name: "List data number and message", date: "17 - 12 - 2024", type: "Excel", status: "failed" },
  ];

  const [gridApi, setGridApi] = createSignal<GridApi | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [inboxMessages, setInboxMessages] = createSignal([]);
  const [selectedDate, setSelectedDate] = createSignal("Date");
  const [selectedStatus, setSelectedStatus] = createSignal("Status");
  const [viewMode, setViewMode] = createSignal<"default" | "inbox">("default");
  const [isPopupOpen, setIsPopupOpen] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(true);
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [jsonData, setJsonData] = createSignal<any[]>([]);
  const [isUploadFilePopupOpen, setIsUploadFilePopupOpen] = createSignal(false);
  const [uploadStatus, setUploadStatus] = createSignal<string>("");


  const uniqueDates = createMemo(() => {
    const dates = initialFiles.map((file) => file.date);
    return ["Date", ...new Set(dates)];
  });

  const statusOptions = ["Status", "success", "pending", "failed"];

  const filteredFiles = createMemo(() => {
    return initialFiles.filter((file) => {
      const dateMatch = selectedDate() === "Date" || file.date === selectedDate();
      const statusMatch = selectedStatus() === "Status" || file.status === selectedStatus();
      return dateMatch && statusMatch;
    });
  });

  const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
  
        const rawJson = XLSX.utils.sheet_to_json(worksheet);
        const transformedJson = rawJson
          .map((row: any) => ({
            number: row.number?.toString() || "",
            message: row.message || "",
            status: "pending",
            created_at: new Date().toISOString(),
          }))
          .filter((item) => item.number && item.message); // Filter jika data tidak valid
  
        if (transformedJson.length === 0) {
          alert("No valid data in the file.");
          return;
        }
  
        console.log("Transformed data:", transformedJson);
        setJsonData(transformedJson);
      }
    };
    reader.readAsArrayBuffer(file);
    setSelectedFile(file);
  };
  
  
  // Fungsi untuk mengunggah data JSON ke backend
  const handleFileUpload = async () => {
    if (jsonData().length === 0) {
      alert("No data to upload.");
      return;
    }
  
    try {
      setUploadStatus("Uploading...");
      console.log("Data yang dikirim ke backend:", jsonData());
  
      const response = await uploadJsonFile(jsonData());
  
      console.log("Response dari backend:", response);
      if (response.status === "success") {
        alert("File uploaded successfully.");
        setJsonData([]);
      } else if (response.status === "partial") {
        alert(
          `Partial success: ${response.success_count} records processed, ${response.errors_count} errors.`
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploadStatus("");
    }
  };
  
  
  
  
  


  // Custom cell renderer for status
  const statusCellRenderer = (params: ICellRendererParams) => {
    const color: any = {
      success: "#1EBA09",
      pending: "#F5ED32",
      failed: "#FF4D4D"
    };
    const bgColor: any = {
      success: "#1EBA0929",
      pending: "#F5ED3229",
      failed: "#FF4D4D29"
    };
    
    return (
      <Show when={params.value}>
        <div
          class="flex gap-2 px-2 py-1 rounded-full h-5 items-center"
          style={{
            background: bgColor[params.value] || "#ececec",
          }}
        >
          <div
            class="w-2 h-2 rounded-full"
            style={{
              background: color[params.value] || "#090909",
            }}
          />
          <span
            class="text-xs font-medium"
            style={{
              color: color[params.value] || "#090909",
            }}
          >
            {params.value}
          </span>
        </div>
      </Show>
    );
  };

  // Default column definitions
  const defaultColumnDefs = {
    field: "name",
    headerName: "File Name",
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  // Column definitions for default view
  const defaultViewColumnDefs: ColDef[] = [
    {
      rowDrag: true,
      width: 40,
    },
    {
      field: "name",
      headerName: "File Name",
      width: 250,
    },
    {
      field: "date",
      headerName: "Date Uploaded",
      width: 150,
    },
    {
      field: "type",
      headerName: "Document Type",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      cellRenderer: statusCellRenderer,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Download",
      width: 120,
      cellRenderer: (params: any) => (
        <div class="flex gap-1">
          <button 
            onClick={() => console.log("Download:", params.data)}
            class="p-1 text-blue-600 hover:bg-blue-100 rounded"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      ),
      sortable: false,
      filter: false,
      pinned: "right",
    },
  ];

  // Column definitions for inbox view
  const inboxColumnDefs: ColDef[] = [
    {
      rowDrag: true,
      width: 40,
    },
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "judul",
      headerName: "Title",
      width: 200,
    },
    {
      field: "content",
      headerName: "Content",
      width: 300,
    },
    {
      field: "content_type",
      headerName: "Content Type",
      width: 150,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "created_by",
      headerName: "Created By",
      width: 150,
    },
  ];

  createEffect(() => {
    const loadInboxMessages = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSmsInbox();
        if (data && !data.error) {
          setInboxMessages(data);
          setError(null);
        } else {
          setError(data?.error || "Unknown error");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load SMS inbox";
        console.error("Error fetching SMS inbox:", errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadInboxMessages();
  });

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  return (
    <div class="space-y-4">
      {/* Header */}
      <div class="flex justify-between items-center gap-4">
        <div class="flex items-center gap-4">
          <button
            class={`px-4 py-2 rounded text-sm ${viewMode() === "default" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setViewMode("default")}
          >
            Default
          </button>
          <img
            src="/inbox.svg"
            alt="Inbox"
            class="w-6 h-6 cursor-pointer"
            onClick={() => setViewMode("inbox")}
            style={{
              filter: "invert(42%) sepia(2%) saturate(0%) hue-rotate(200deg) brightness(93%) contrast(89%)",
            }}
          />
        </div>

        <button
          class="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 focus:outline-none text-sm ml-auto"
          onClick={() => setIsPopupOpen(true)}
        >
          Add SMS
        </button>

        <div class="flex flex-col gap-4 p-4">
          {/* Button untuk membuka popup */}
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 text-sm"
            onClick={() => setIsUploadFilePopupOpen(true)} // Pastikan setIsUploadFilePopupOpen yang benar dipanggil
          >
            Upload File
          </button>

          {isUploadFilePopupOpen() && (
            <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div class="bg-white p-8 rounded shadow-lg max-w-3xl w-full">
                <h2 class="text-xl font-bold mb-4">Upload File</h2>

                <label class="cursor-pointer px-6 py-3 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 text-sm">
                  Select File
                  <input
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    class="hidden"
                    onChange={handleFileChange} // Fungsi untuk menyimpan file yang dipilih
                  />
                </label>

                <div class="mt-4">
                  {selectedFile() ? (
                    <p class="text-gray-700">Selected file: {selectedFile()?.name}</p>
                  ) : (
                    <p class="text-gray-500">No file selected.</p>
                  )}
                </div>

                <div class="mt-4 overflow-auto max-h-60">
                  {jsonData().length > 0 ? (
                    <table class="table-auto w-full border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          {Object.keys(jsonData()[0]).map((key) => (
                            <th
                              class="border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700 text-left"
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {jsonData().map((row) => (
                          <tr>
                            {Object.values(row).map((value) => (
                              <td class="border border-gray-300 px-4 py-2 text-gray-600">
                                {typeof value === "string" || typeof value === "number" ? value : ""}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p class="text-gray-500">No data to review.</p>
                  )}
                </div>

                <div class="flex justify-end gap-4 mt-4">
                  <button
                    class="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 text-sm"
                    onClick={() => setIsUploadFilePopupOpen(false)} // Tutup popup
                  >
                    Cancel
                  </button>
                  <button
                    class="px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 text-sm"
                    onClick={handleFileUpload} // Fungsi untuk mengunggah file
                    disabled={jsonData().length === 0} // Nonaktifkan tombol jika tidak ada data
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>




        <div class="flex items-center gap-4">
          <select
            id="date-filter"
            class="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            onChange={(e) => setSelectedDate(e.currentTarget.value)}
          >
            {uniqueDates().map((date) => (
              <option value={date}>{date}</option>
            ))}
          </select>

          <select
            id="status-filter"
            class="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            onChange={(e) => setSelectedStatus(e.currentTarget.value)}
          >
            {statusOptions.map((status) => (
              <option value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* AG Grid */}
      <div class="h-[63vh] w-full">
        <Show when={isLoading()}>
          <div class="relative">
            <div class="absolute z-50 bg-white top-[26vh] left-[35vw]">
              <div class="loader"></div>
            </div>
          </div>
        </Show>
        <AgGridSolid
          columnDefs={viewMode() === "default" ? defaultViewColumnDefs : inboxColumnDefs}
          rowData={viewMode() === "default" ? filteredFiles() : inboxMessages()}
          defaultColDef={defaultColumnDefs}
          class="rounded-lg border ag-theme-alpine dark:ag-theme-alpine-dark border-gray-200"
          animateRows={true}
          rowHeight={40}
          rowDragManaged={true}
          onGridReady={onGridReady}
          headerHeight={40}
        />
      </div>

      {/* Popup */}
      {isPopupOpen() && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <InputSmsDirect />
            <button
              class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setIsPopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowFile;