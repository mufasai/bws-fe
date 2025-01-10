import { Component, For, Show } from "solid-js";

export interface Column {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (params: any) => any;
}

interface TableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  onRowClick?: (row: any) => void;
}

const Table: Component<TableProps> = (props) => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <For each={props.columns}>
              {(column) => (
                <th
                  scope="col"
                  class="px-6 py-3"
                  style={{ width: column.width || 'auto' }}
                >
                  {column.headerName}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <Show
            when={!props.loading}
            fallback={
              <tr>
                <td
                  colspan={props.columns.length}
                  class="px-6 py-4 text-center"
                >
                  <div class="flex items-center justify-center">
                    <div class="w-6 h-6 border-2 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                    <span class="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            }
          >
            <For each={props.data}>
              {(row) => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={() => props.onRowClick?.(row)}
                >
                  <For each={props.columns}>
                    {(column) => (
                      <td class="px-6 py-4">
                        {column.renderCell
                          ? column.renderCell(row)
                          : row[column.field]}
                      </td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>
    </div>
  );
};

export default Table; 