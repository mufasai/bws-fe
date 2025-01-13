import { createSignal, Show } from 'solid-js';
import type { WorkOrder } from '../types/workOrder';
// import { ScheduleList } from '../components/schedule/ScheduleList';
import WorkOrderTable from '../components/ProjectPartial/ProjectTable';
import { CgExport } from 'solid-icons/cg';
import { VsSearch } from 'solid-icons/vs';
import { GridApi } from 'ag-grid-community';
import Swal from 'sweetalert2';
import DetailWOModal from '../components/ProjectPartial/ProjectDetail';   
import ProjectPageTable from '../components/ProjectPartial/ProjectTable';

export default function ProjectPage() {
    const [view, setView] = createSignal<"wo" | "po">("wo");
    const [searchText, setSearchText] = createSignal("");
    const [gridApi, setGridApi] = createSignal<GridApi | null>(null);
    const [selectedData, setSelectedData] = createSignal<any>(null);
    const [showDetailModal, setShowDetailModal] = createSignal(false);
    const [showAddModal, setShowAddModal] = createSignal(false);
    const [showEditModal, setShowEditModal] = createSignal(false);

    const [refreshTrigger, setRefreshTrigger] = createSignal(0);


    const handleEdit = (data: any) => {
        setSelectedData(data);
        setShowEditModal(true);
    };

    const handleModalSuccess = () => {
        console.log('refreshTrigger', refreshTrigger());
        setRefreshTrigger(prev => prev + 1);
    };



    const handleSearch = (e: any) => {
        const value = e.target.value;
        setSearchText(value);
        // Pass the grid API reference to the table component
        // console.log('gridApi', gridApi());
        gridApi()?.setQuickFilter(value);
    };


    const handleGridReady = (api: any) => {
        setGridApi(api);
    };
    const exportTable = () => {
        gridApi()?.exportDataAsExcel();
    }


    const handleDelete = async (data: any) => {
        console.log('data', data);
        setSelectedData(data);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // try {
                //     await DeleteProjectAPI(data.id);
                //     Swal.fire({
                //         title: "Deleted!",
                //         text: "Project has been deleted.",
                //         icon: "success"
                //     });
                //     // Refresh table after successful deletion
                //     setRefreshTrigger(prev => prev + 1);
                // } catch (error) {
                //     console.error('Error deleting project:', error);
                //     Swal.fire({
                //         title: "Error!",
                //         text: "Failed to delete project.",
                //         icon: "error"
                //     });
                // }
            }
        });
    };

    const handleDetail = (data: any) => {
        console.log("Detail data in WorkOrder:", data);
        setSelectedData(data);
        setShowDetailModal(true);
    };

    const summaryInfor: { title: string, value: number, color: string, bgColor: string, icon: any }[] = [
        {
            title: "Total Project",
            value: 100,
            color: "#FF82AC",
            bgColor: "#FFE0EB",
            icon: <svg xmlns="http://www.w3.org/2000/svg" class='w-6 h-6' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-4.18a2.988 2.988 0 0 0-5.64 0H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V6a2.006 2.006 0 0 0-2-2m-7 0a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1m-2 5l2.79 2.794l2.52-2.52L14 8h4v4l-1.276-1.311l-3.932 3.935L10 11.83l-2.586 2.584L6 13Zm9 10H5v-2h14Z" /></svg>
        },
        {
            title: "Volume Tarikan",
            value: 100,
            color: "#396AFF",
            bgColor: "#E7EDFF",
            icon: <svg xmlns="http://www.w3.org/2000/svg" class='w-6 h-6' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.425 0-.712-.288T4 20v-1H3v-4q0-.425.288-.712T4 14h1V7q0-1.65 1.175-2.825T9 3t2.825 1.175T13 7v10q0 .825.588 1.413T15 19t1.413-.587T17 17v-7h-1q-.425 0-.712-.288T15 9V5h1V4q0-.425.288-.712T17 3h2q.425 0 .713.288T20 4v1h1v4q0 .425-.288.713T20 10h-1v7q0 1.65-1.175 2.825T15 21t-2.825-1.175T11 17V7q0-.825-.587-1.412T9 5t-1.412.588T7 7v7h1q.425 0 .713.288T9 15v4H8v1q0 .425-.288.713T7 21z" /></svg>

        },
        {
            title: "Estimasi PO Material",
            value: 100,
            color: '#FFBB38',
            bgColor: '#FFF5D9',
            icon: <svg xmlns="http://www.w3.org/2000/svg" class='w-6 h-6' width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="m117.4 17.8l-94.9 96.3c16.2 19.2 43.7 35.5 66.2 40.2c15.3 3 30.6 1.8 43.3-4.7c29.3 28.9 58.2 58.3 87 87.9l22.2-22.3l-87.6-87.5c6.3-12.6 8.5-27.95 4.5-42.8c-8.2-30.5-21.2-47.58-40.7-67.1m125.1 9.5c-9.3.1-18.5.9-27.5 2.7c117.1 70.5 204.6 164.7 273.6 273.7c2.8-59.2-21.2-120.2-59.3-169.7c-15 5.5-33.5.6-46.4-12.2c-12.8-12.9-17.7-31.4-12.2-46.4c-39.3-29.9-84.3-48.3-128.2-48.1M128.4 60.2c5.7 9.5 9.5 19.2 11.3 28.3c3.3 16.5.2 30.1-8.6 38.9c-8.7 8.7-22.3 11.8-38.8 8.6c-9.1-1.8-18.8-5.6-28.4-11.3zm263.5 15.9c-7.2 7.04-6.6 21.6 4.3 32.4c10.8 10.9 25.3 11.4 32.5 4.3c7.1-7.2 6.9-22-4.3-32.5c-8.7-8.13-23.1-13.47-32.5-4.2m-56.3 71.2L22.3 460.7c4.2 11.5 10.7 20.4 24.5 24.9L360.3 172c-7.5-8.7-15.8-16.9-24.7-24.7m-43.2 119.1l-23.1 23.1c32.5 34 65 68.3 97.4 102.5c-15.6 14.5-31.7 27.2-46.5 36.1c55.9 56 124.9 78.1 162 54.5c22.8-37.3 1.1-106.5-54.5-162.1c-9.6 15-22 30.7-35.5 45.7z" /></svg>
        },
        {
            title: "Estimasi PO Survey MD",
            value: 100,
            color: "#16DBCC",
            bgColor: '#DCFAF8',
            icon: <svg xmlns="http://www.w3.org/2000/svg" class='w-6 h-6' width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M244.24 60a8 8 0 0 0-7.75-.4c-42.93 21-73.59 11.16-106 .78c-34-10.89-69.25-22.14-117.95 1.64A8 8 0 0 0 8 69.24v119.93a8 8 0 0 0 11.51 7.19c42.93-21 73.59-11.16 106.05-.78c19.24 6.15 38.84 12.42 61 12.42c17.09 0 35.73-3.72 56.91-14.06a8 8 0 0 0 4.49-7.18V66.83a8 8 0 0 0-3.72-6.83M232 181.67c-40.6 18.17-70.25 8.69-101.56-1.32c-19.24-6.15-38.84-12.42-61-12.42a122 122 0 0 0-45.4 9V74.33c40.6-18.17 70.25-8.69 101.56 1.32S189.14 96 232 79.09ZM128 96a32 32 0 1 0 32 32a32 32 0 0 0-32-32m0 48a16 16 0 1 1 16-16a16 16 0 0 1-16 16M56 96v48a8 8 0 0 1-16 0V96a8 8 0 1 1 16 0m144 64v-48a8 8 0 1 1 16 0v48a8 8 0 1 1-16 0" /></svg>
        },
        {
            title: "Estimasi PO Deploy Jasa",
            value: 100,
            color: '#A250F9',
            bgColor: '#F0E8FF',
            icon: <svg xmlns="http://www.w3.org/2000/svg" class='w-6 h-6' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 16a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" /><path fill="currentColor" d="m14.347.66l3.18 4.456l2.097-.715L21.538 10h.962v12h-21V10h.51v-.01l.648.006zM9.397 10h10.028l-1.037-3.033l-1.522.487zM7.839 8.417L15.55 5.79l-1.604-2.25zM5.5 12h-2v2a2 2 0 0 0 2-2m10 4a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0m5 4v-2a2 2 0 0 0-2 2zm-2-8a2 2 0 0 0 2 2v-2zm-15 8h2a2 2 0 0 0-2-2z" /></svg>
        }
    ]

    const [activeTab, setActiveTab] = createSignal('All');

    const tabs = [
        'All',
        'Survey MD',
        'On Going',
        'Reconciliation',
        'Billing',
        'Done'
    ];





    return (
        <>
            <div class='space-y-3 flex flex-col'>
                <div class='grid grid-cols-5 gap-2'>
                    {summaryInfor.map((item, index) => (
                        <div class="flex space-x-5 items-center font-inter bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm  h-[12vh]">
                            <div class='rounded-full flex items-center justify-center w-12 h-12' style={{ background: item.bgColor, color: item.color }}>
                                {item.icon}
                            </div>
                            <div>
                                <h1 class="text-[1.8vh] font-inter text-[#718EBF]">
                                    {item.title}
                                </h1>
                                <h1 class="text-sm font-bold font-inter text-[#232323]">
                                    {item.value}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div class='font-inter bg-white  rounded-2xl shadow-sm  w-full h-full'>
                    <div class='space-y-4  p-4'>
                        <div class='flex items-center justify-between'>
                            <div class='flex items-center gap-2'>
                                <div>
                                    <div class='flex items-center gap-2'>
                                        <h1 class='text-md font-semibold font-inter text-gray-900'>All Project</h1>
                                        <span class='text-[1.5vh] font-inter text-[#0070FF] bg-[#EBF5FF] px-2 py-1 rounded-full font-inter'>Label Text</span>
                                    </div>
                                    <span class='text-xs font-inter text-gray-500'>Summary All </span>
                                </div>
                            </div>

                            <div class='flex items-center gap-3'>
                                <button
                                    onclick={exportTable}
                                    class='inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-600 rounded-lg hover:bg-gray-50'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M6 0C2.69 0 0 2.69 0 6c0 2.35 1.35 4.39 3.32 5.37c.321.16.676-.089.676-.448a.56.56 0 0 0-.307-.487a5.002 5.002 0 1 1 7.14-5.74a.5.5 0 0 0 .581.36q.287-.058.591-.058c1.66 0 3 1.34 3 3s-1.34 3-3 3h-.5a.5.5 0 0 0 0 1h.5c2.21 0 4-1.79 4-4a4 4 0 0 0-4.337-3.986a6 6 0 0 0-5.66-4.01z" /><path fill="currentColor" d="M7.5 7a.5.5 0 0 1 .5.5v6.79l1.15-1.15a.5.5 0 0 1 .707.707l-2 2a.5.5 0 0 1-.351.146H7.5a.5.5 0 0 1-.35-.146l-2-2a.5.5 0 0 1 .707-.707l1.15 1.15V7.5a.5.5 0 0 1 .5-.5z" /></svg>
                                    Export
                                </button>

                                <button
                                    onClick={() => setShowAddModal(true)}
                                    class='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700'
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New 
                                </button>
                            </div>
                        </div>

                        <div class='flex items-center justify-between'>
                            <div class='flex items-center gap-2 p-1 bg-gray-50 rounded-lg'>
                                {tabs.map((tab) => (
                                    <button
                                        class={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out relative  ${activeTab() === tab
                                            ? 'text-gray-900 bg-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}

                                    </button>
                                ))}
                            </div>

                            <div class='flex items-center gap-3'>
                                <div class='relative'>
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchText()}
                                        onInput={handleSearch}
                                        placeholder="Search"
                                        class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <button class='inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.5 7.25h15M7.385 12h9.23m-6.345 4.75h3.46" /></svg>
                                    Filters
                                </button>
                            </div>
                        </div>

                    </div>

                    <div class='w-full h-full pl-2 pr-2'>
                        <ProjectPageTable
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onDetail={handleDetail}
                            onGridReady={(e) => handleGridReady(e)}
                            refreshData={refreshTrigger()}
                        />
                    </div>
                </div>
            </div>
               
        </>

    );
}