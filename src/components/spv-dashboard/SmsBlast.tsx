import { Component } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

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

const SmsBlast: Component = () => {
  const columnDefs = [
    {
      field: "campaign",
      headerName: "Campaign",
      sortable: true,
      filter: true,
      rowDrag: true, // Enables row drag on this column
    },
    { field: "file", headerName: "File", sortable: true, filter: true },
    {
      field: "recipients",
      headerName: "Recipients",
      sortable: true,
      filter: true,
    },
    {
      field: "scheduled",
      headerName: "Scheduled",
      sortable: true,
      filter: true,
    },
    { field: "status", headerName: "Status", sortable: true, filter: true },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: (params: any) => {
        return (
          <>
            <button class="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button class="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        );
      },
    },
  ];

  const rowData = [
    {
      campaign: "Marketing Team",
      file: "promo_blast_jan.csv",
      recipients: "1,500",
      scheduled: "2024-01-16 10:00",
      status: "Pending",
    },
    {
      campaign: "Sales Team",
      file: "sales_blast_feb.csv",
      recipients: "2,000",
      scheduled: "2024-02-01 09:00",
      status: "Completed",
    },
    {
      campaign: "Sales Team",
      file: "sales_blast_feb.csv",
      recipients: "2,000",
      scheduled: "2024-02-01 09:00",
      status: "Completed",
    },
    {
      campaign: "Sales Team",
      file: "sales_blast_feb.csv",
      recipients: "2,000",
      scheduled: "2024-02-01 09:00",
      status: "Completed",
    },
    {
      campaign: "Sales Team",
      file: "sales_blast_feb.csv",
      recipients: "2,000",
      scheduled: "2024-02-01 09:00",
      status: "Completed",
    },
  ];

  const onRowDragEnd = (event: any) => {
    console.log("Row reordered:", event.node.data);
  };

  return (
    <>
      <div class="w-full">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-semibold text-gray-800">
              Blast SMS Authorization
            </h2>
            <p class="mt-1 max-w-48 text-gray-600">
              Review and authorize bulk SMS campaigns
            </p>
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

        <div class="ag-theme-alpine" style="height: 400px; width: 100%;">
          <AgGridSolid
            columnDefs={columnDefs}
            rowData={rowData}
            domLayout="autoHeight"
            animateRows={true}
            rowDragManaged={true} // Enable drag-and-drop reordering
            onRowDragEnd={onRowDragEnd} // Callback when a row is dragged and dropped
          />
        </div>
      </div>
    </>
  );
};

export default SmsBlast;
