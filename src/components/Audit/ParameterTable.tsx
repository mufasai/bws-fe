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
import "./AuditTrailTable.css";
import { f } from "@solid-primitives/storage/dist/persisted-fWOjSMPO";
// import { ColDef } from 'ag-grid-community';
import { ParameterData } from "../../shared/dummy-share";

export default function ParameterTable () {
  const [gridApi, setGridApi] = createSignal<GridApi | null>(null);
  const [isLoading, setIsLoading] = createSignal<boolean>(true);

  const [rowData, setRowData] = createSignal<any[]>([]);

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
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "value",
      headerName: "Value",
      width: 200,
    },
    {
      field: "lastupdate",
      headerName: "Last Update",
      width: 270,
    }
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
    // props.onGridReady(params.api);
  };

  return (
    <div class=" h-[63vh] w-full">
      {/* <Show when={isLoading()}>
        <div class="relative ">
          <div class="absolute z-50  bg-white top-[26vh] left-[35vw]">
            <div class="loader"></div>
          </div>
        </div>
      </Show> */}
      <AgGridSolid
        columnDefs={columnDefs as any}
        rowData={ParameterData}
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
