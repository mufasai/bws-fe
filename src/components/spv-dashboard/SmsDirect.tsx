import { createSignal } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SmsDirect = () => {
  const [rowData, setRowData] = createSignal([
    {
      id: 1,
      requester: "John Doe",
      recipient: "+6281234567890",
      message: "Your OTP code is 123456",
      timestamp: "2024-01-16 09:30",
      status: "Pending",
    },
    {
      id: 2,
      requester: "Jane Smith",
      recipient: "+6289876543210",
      message: "Your balance is $100",
      timestamp: "2024-01-16 10:00",
      status: "Completed",
    },
    {
      id: 3,
      requester: "Bob Johnson",
      recipient: "+6281112233445",
      message: "Your order #1234 is shipped",
      timestamp: "2024-01-16 10:30",
      status: "In Progress",
    },
    // Add more rows as needed
  ]);

  const columnDefs = [
    {
      field: "requester",
      headerName: "Requester",
      sortable: true,
      filter: true,
      rowDrag: true, // Enable drag for reordering
    },
    {
      field: "recipient",
      headerName: "Recipient",
      sortable: true,
      filter: true,
    },
    { field: "message", headerName: "Message", sortable: true, filter: true },
    {
      field: "timestamp",
      headerName: "Timestamp",
      sortable: true,
      filter: true,
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: any) => {
        const statusClass =
          params.value === "Pending"
            ? "bg-yellow-100 text-yellow-800"
            : params.value === "Completed"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800";
        return (
          <>
            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
              ${params.value}
            </span>
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: (params: any) => {
        return (
          <>
            <div class="flex space-x-2">
              <button class="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50">
                Approve
              </button>
              <button class="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50">
                Reject
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const onRowDragEnd = (event: any) => {
    const draggedNode = event.node;
    const overIndex = event.overIndex;

    // Get current row data
    const updatedRows = [...rowData()];
    const draggedRow = updatedRows.splice(draggedNode.rowIndex, 1)[0];
    updatedRows.splice(overIndex, 0, draggedRow);

    // Update the rows
    setRowData(updatedRows);
  };

  return (
    <div class="w-full">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">
            Direct SMS Authorization
          </h2>
          <p class="mt-1 text-gray-600">
            Review and authorize individual SMS requests
          </p>
        </div>
        <div class="flex space-x-3">
          <button class="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span class="mr-2">
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </span>
            Filter
          </button>
          <button class="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <span class="mr-2">
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
            </span>
            Export
          </button>
        </div>
      </div>

      <div class="ag-theme-alpine" style="height: 400px; width: 100%;">
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={rowData()}
          domLayout="autoHeight"
          animateRows={true}
          rowDragManaged={true} // Enable drag-and-drop reordering
          onRowDragEnd={onRowDragEnd} // Handle drag-and-drop logic
        />
      </div>
    </div>
  );
};

export default SmsDirect;
