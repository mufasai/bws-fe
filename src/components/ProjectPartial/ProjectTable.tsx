import type { WorkOrder } from "../../types/workOrder";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import {
  AiFillEdit,
  AiFillDelete,
  AiFillEye,
  AiOutlineEdit,
  AiOutlineDelete,
} from "solid-icons/ai";
import { ColDef, GridApi, ICellRendererParams } from "ag-grid-enterprise";
import { createEffect, createSignal, Show } from "solid-js";
import { GridReadyEvent } from "ag-grid-community";
import { getAllUserManagement } from "../../services/service";
import "./ProjectTable.css";
import { CreateProjectRequest } from "../../shared/share-interface";
import { f } from "@solid-primitives/storage/dist/persisted-fWOjSMPO";
// import { ColDef } from 'ag-grid-community';

interface Props {
  filterEmptyIhld?: boolean;
  onEdit: (workOrder: CreateProjectRequest) => void;
  onDelete: (workOrder: CreateProjectRequest) => void;
  onResetPassword: (WorkOrder: CreateProjectRequest) => void;
  onDetail: (workOrder: CreateProjectRequest) => void;
  onGridReady: (e: GridApi) => void;
  refreshData?: number;
}

export default function UserManagemenetTable(props: Props) {
  const [gridApi, setGridApi] = createSignal<GridApi | null>(null);
  const [isLoading, setIsLoading] = createSignal<boolean>(true);

  const [rowData, setRowData] = createSignal<any[]>([]);

  const formatData = (data: any[]) => {
    return data.map((item) => ({
      id: item.id,
      username: item.username,
      email: item.email,
      password: item.password,
      phone_number: item.phone_number,
      role_id: item.role_id,
      role_name: item.role_name,
      role_description: item.role_description,
      fullname: item.fullname,
      address: item.address,
      country: item.country,
      city: item.city,
      state: item.state,
      country_code: item.country_code,
      verification_status: item.verification_status,
    }));
  };

  createEffect(async () => {
    console.log("refreshData", props.refreshData);
    try {
      setIsLoading(true);
      const response = await getAllUserManagement();
      console.log("Response from API:", response);

      // Pastikan data adalah array sebelum memetakan
      const users = Array.isArray(response?.data) ? response.data : [];
      setRowData(formatData(users));
    } catch (error) {
      console.error("Error fetching all users:", error);
      setRowData([]); // Set data kosong jika terjadi error
    } finally {
      setIsLoading(false);
    }
  }, [props.refreshData]);

  const cellRenderer = (params: any) => {
    return <span class="text-[#667085]">{params.value}</span>;
  };

  const cellRendererPhase = (params: ICellRendererParams) => {
    const color: any = {
      admin: "#FF934F",
      user: "#F5ED32",
      supervisor: "#9482FE",
    };
    const bgColor: any = {
      admin: "#FF934F29",
      user: "#F5ED3229",
      supervisor: "#9482FE29",
    };
    return (
      <Show when={params.value}>
        <div
          class="flex gap-2 px-2 py-1 rounded-full h-5 items-center"
          style={{
            background: bgColor[params.value]
              ? bgColor[params.value]
              : "#FFE0EB",
          }}
        >
          <div
            class="w-2 h-2 rounded-full"
            style={{
              background: color[params.value] ? color[params.value] : "#FF82AC",
            }}
          ></div>
          <span
            class={`text-[#667085] px-2 py-1 rounded-full text-xs font-medium`}
            style={{
              color: color[params.value] ? color[params.value] : "#FF82AC",
            }}
          >
            {params.value}
          </span>
        </div>
      </Show>
    );
  };

  const cellRendererStatus = (params: any) => {
    const color: any = {
      active: "#1EBA09",
      inactive: "#848484",
    };
    const bgColor: any = {
      active: "#1EBA0929",
      inactive: "#84848429",
    };
    return (
      <Show when={params.value}>
        <div
          class="flex gap-2 px-2 py-1 rounded-full h-5 items-center"
          style={{
            background: bgColor[params.value.toLowerCase()]
              ? bgColor[params.value.toLowerCase()]
              : "#ececec",
          }}
        >
          <div
            class="w-2 h-2 rounded-full"
            style={{
              background: color[params.value.toLowerCase()]
                ? color[params.value.toLowerCase()]
                : "#090909",
            }}
          ></div>
          <span
            class={`text-[#667085] px-2 py-1 rounded-full text-xs font-medium`}
            style={{
              color: color[params.value.toLowerCase()]
                ? color[params.value.toLowerCase()]
                : "#090909",
            }}
          >
            {params.value}
          </span>
        </div>
      </Show>
    );
  };

  const columnDefs: ColDef<any>[] = [
    {
      rowDrag: true,
      width: 40,
    },
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hide: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "password",
      headerName: "Password",
      width: 180,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 160,
    },
    {
      field: "role_id",
      headerName: "role_id",
      width: 120,
      hide: true,
    },
    {
      field: "role_name",
      headerName: "Role_Name",
      width: 150,
      cellRenderer: cellRendererPhase,
    },
    {
      field: "role_description",
      headerName: "Role_Description",
      width: 200,
    },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 170,
    },
    {
      field: "address",
      headerName: "Address",
      width: 180,
    },
    {
      field: "country",
      headerName: "Country",
      width: 120,
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
    },
    {
      field: "state",
      headerName: "State",
      width: 150,
    },

    {
      field: "country_code",
      headerName: "Country Code",
      width: 150,
      // type: 'numericColumn'
    },
    {
      field: "verification_status",
      headerName: "Verification_status",
      width: 180,
      cellRenderer: cellRendererStatus,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <div class="flex gap-1">
          <button
            onClick={() => {
              const currentRowData = params.api.getRowNode(
                params.rowIndex
              ).data;
              console.log("currentRowData ->", currentRowData);
              props.onEdit(currentRowData);
            }}
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => props.onDelete(params.data)}
            class="p-1 text-red-600 hover:bg-red-100 rounded"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              const currentRowData = params.api.getRowNode(
                params.rowIndex
              ).data;
              console.log("Reset Password for ->", currentRowData);
              props.onResetPassword(currentRowData);
            }}
            class="p-1 text-yellow-300 hover:bg-yellow-100 rounded"
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
                d="M15.68 14.587c3.49 0 6.32-2.818 6.32-6.294S19.17 2 15.68 2S9.363 4.818 9.363 8.293c0 1.61.734 2.781.734 2.781l-7.642 7.61c-.343.342-.823 1.23 0 2.05l.882.878c.343.293 1.205.703 1.91 0l1.03-1.024c1.028 1.024 2.204.439 2.645-.147c.734-1.024-.147-2.049-.147-2.049l.294-.293c1.41 1.406 2.645.586 3.086 0c.735-1.024 0-2.049 0-2.049c-.294-.585-.882-.585-.147-1.317l.882-.878c.705.585 2.155.732 2.792.732Z"
              />
              <path d="M17.885 8.294a2.2 2.2 0 0 1-2.204 2.195a2.2 2.2 0 0 1-2.204-2.195a2.2 2.2 0 0 1 2.204-2.196a2.2 2.2 0 0 1 2.204 2.196Z" />
            </svg>
          </button>
        </div>
      ),
      sortable: false,
      filter: false,
      width: 120,
      pinned: "right",
    },
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    props.onGridReady(params.api);
  };

  return (
    <div class=" h-[63vh] w-full">
      <Show when={isLoading()}>
        <div class="relative ">
          <div class="absolute z-50  bg-white top-[26vh] left-[35vw]">
            <div class="loader"></div>
          </div>
        </div>
      </Show>
      <AgGridSolid
        columnDefs={columnDefs as any}
        rowData={rowData()}
        defaultColDef={defaultColDef}
        class="rounded-lg border ag-theme-alpine dark:ag-theme-alpine-dark border-gray-200"
        animateRows={true}
        rowHeight={40}
        rowDragManaged={true}
        onGridReady={onGridReady}
        headerHeight={40}
      />
    </div>
  );
}
