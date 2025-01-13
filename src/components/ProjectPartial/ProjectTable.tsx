import type { WorkOrder } from '../../types/workOrder';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import { AiFillEdit, AiFillDelete, AiFillEye, AiOutlineEdit, AiOutlineDelete } from 'solid-icons/ai';
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { createEffect, createSignal, Show } from 'solid-js';
import { GridReadyEvent } from 'ag-grid-community';
import { getProjectID } from '../../services/service';
import './ProjectTable.css';
import { CreateProjectRequest } from '../../shared/share-interface';
// import { ColDef } from 'ag-grid-community';

interface Props {
    filterEmptyIhld?: boolean;
    onEdit: (workOrder: CreateProjectRequest) => void;
    onDelete: (workOrder: CreateProjectRequest) => void;
    onDetail: (workOrder: CreateProjectRequest) => void;
    onGridReady: (e: GridApi) => void;
    refreshData?: number;
}

export default function ProjectPageTable(props: Props) {
    const [gridApi, setGridApi] = createSignal<GridApi | null>(null);
    const [isLoading, setIsLoading] = createSignal<boolean>(true);

    const [rowData, setRowData] = createSignal<any[]>([]);

    createEffect(async () => {
        console.log('refreshData', props.refreshData);
        try {
            setIsLoading(true);
            const user_id = 28;
            const response = await getProjectID(user_id);
            setRowData(response);
            // console.log('response ->', response);
        } catch (error) {
            console.error('Error fetching work orders:', error);
        } finally {
            setIsLoading(false);
        }
    }, [props.refreshData]);

    const cellRenderer = (params: any) => {
        return <span class='text-[#667085]'>{params.value}</span>;
    }


    const cellRendererPhase = (params: ICellRendererParams) => {
        const color: any = {
            'done': '#00A296',
            'on going': '#FFB11F',
            'reconcilitaion': '#CB36FD',
            'billing': '#1814F3',
            'drop': '#C50505',
        }
        const bgColor: any = {
            'done': '#E1FFFD',
            'on going': '#FFF5E3',
            'reconcilitaion': '#F7DFFF',
            'billing': '#D8D7FF',
            'drop': '#FDECEC',
        }
        return (
            <Show when={params.value}>

                <div class='flex gap-2 px-2 py-1 rounded-full h-5 items-center' style={{ background: bgColor[params.value] ? bgColor[params.value] : '#FFE0EB' }}>
                    <div class='w-2 h-2 rounded-full' style={{ background: color[params.value] ? color[params.value] : '#FF82AC' }}></div>
                    <span class={`text-[#667085] px-2 py-1 rounded-full text-xs font-medium`} style={{ color: color[params.value] ? color[params.value] : '#FF82AC' }}>
                        {params.value}
                    </span>
                </div>
            </Show>
        )

    }

    const cellRendererStatus = (params: any) => {
        const color: any = {
            'done': '#037847',
            'reject permit': '#364254',
            'og terminasi': '#DB5500',
            'drop': '#C50505',
            'og survey md': '#2728E1',
            'og perizinan': '#B11682',
            'og anw': '#037847',
            'og civil': '#B66A00',
            'og valins': '#006FAF',
            'survey done': '#FF1673',
          }
          const bgColor: any = {
            'done': '#ECFDF3',
            'reject permit': '#F2F4F7',
            'og terminasi': '#FFF2EA',
            'drop': '#FDECEC',
            'og survey md': '#E8E9FF',
            'og perizinan': '#FDECFA',
            'og anw': '#ECFDF3',
            'og civil': '#FFF0B2',
            'og valins': '#D9F1FF',
            'survey done': '#FFE3EC',
          }
          return (
            <Show when={params.value}>
              <div class='flex gap-2 px-2 py-1 rounded-full h-5 items-center' style={{ background: bgColor[params.value.toLowerCase()] ? bgColor[params.value.toLowerCase()] : '#ececec' }}>
                <div class='w-2 h-2 rounded-full' style={{ background: color[params.value.toLowerCase()] ? color[params.value.toLowerCase()] : '#090909' }}></div>
                <span class={`text-[#667085] px-2 py-1 rounded-full text-xs font-medium`} style={{ color: color[params.value.toLowerCase()] ? color[params.value.toLowerCase()] : '#090909' }}>
                  {params.value}
                </span>
              </div>
            </Show>
          )
    }

    const columnDefs: ColDef<any>[] = [
        {
            rowDrag: true,
            width: 70,
        },
        {
            field: 'id',
            headerName: 'No',
            width: 70,
            hide: true
        },
        {
            field: 'wo_id',
            headerName: 'Project Name',
            width: 120,
        },
        {
            field: 'cable_volume',
            headerName: 'Volume Tarik',
            width: 130,
            cellRenderer: cellRenderer
        },
        {
            field: 'pole',
            headerName: 'Tanam Pole',
            width: 100,
            cellRenderer: cellRenderer
        },
        {
            field: 'unit',
            headerName: 'STO',
            width: 100,
            cellRenderer: cellRenderer
        },
        {
            field: 'phase',
            headerName: 'Phase',
            width: 120,
            cellRenderer: cellRendererPhase
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            cellRenderer: cellRendererStatus
        },
        {
            field: 'service_price',
            headerName: 'Service Price',
            width: 150,

            valueFormatter: (params) => {
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(params.value);
            }
        },
        {
            field: 'material_price',
            headerName: 'Material Price',
            width: 150,

            valueFormatter: (params) => {
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(params.value);
            }
        },
        {
            field: 'project_type',
            headerName: 'Project Type',
            width: 120
        },
        {
            field: 'regional',
            headerName: 'Regional',
            width: 120
        },
        {
            field: 'area',
            headerName: 'Area',
            width: 120
        },
        {
            field: 'witel',
            headerName: 'Witel',
            width: 150
        },


        {
            field: 'port',
            headerName: 'Port',
            width: 100,
            // type: 'numericColumn'
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 200
        },

        {
            field: 'po_id',
            headerName: 'PO ID',
            width: 120,
        },
        {
            headerName: 'Actions',
            cellRenderer: (params: any) => (
                <div class="flex gap-1">
                    <button
                        onClick={() => {
                            const currentRowData = params.api.getRowNode(params.rowIndex).data;
                            console.log("currentRowData ->", currentRowData);
                            props.onEdit(currentRowData);
                        }}
                        class="p-1 text-blue-600 hover:bg-blue-100 rounded"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => props.onDelete(params.data)}
                        class="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    {/* <button
                        onClick={() => {
                            const currentRowData = params.data;
                            props.onDetail(currentRowData);
                        }}
                        class="p-1 text-green-600 hover:bg-green-100 rounded"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button> */}
                </div>
            ),
            sortable: false,
            filter: false,
            width: 100,
            pinned: 'right'
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
        props.onGridReady(params.api);
    }



    return (
        <div class=" h-[63vh] w-full">
            <Show when={isLoading()}>
                <div class='relative '>
                    <div class='absolute z-50  bg-white top-[26vh] left-[35vw]'>
                        <div class='loader'></div>
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