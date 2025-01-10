<<<<<<< HEAD
import { Component, Show, createSignal, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { AiOutlineInfoCircle } from 'solid-icons/ai';
import { IoStatsChartOutline } from 'solid-icons/io';
import { VsHistory } from 'solid-icons/vs';

interface DetailWOModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const DetailWOModal: Component<DetailWOModalProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal('detail');

  onMount(() => {
    console.log("Detail Data in Modal:", props.data);
  });

  const details = [
    { label: "Project Type", key: "project_type" },
    { label: "Regional", key: "regional" },
    { label: "Area", key: "area" },
    { label: "Witel", key: "witel" },
    { label: "Unit", key: "unit" },
    { label: "Status", key: "status" },
    { label: "Cable Volume", key: "cable_volume" },
    { label: "Pole", key: "pole" },
    { label: "Port", key: "port" },
    { label: "Description", key: "description" },
    { label: "Service Price", key: "service_price" },
    { label: "Material Price", key: "material_price" },
  ];

  // Add timeline data structure
  const timelineData = [
    {
      date: "February 2024",
      title: "WO Homepas",
      status: "Completed",
      description: "WO homepas telah selesai dilakukan",
      icon: "check"
    },
    {
      date: "March 2024",
      title: "Submit Vermit",
      status: "In Progress",
      description: "Dokumen vermit sedang dalam proses pengajuan",
      icon: "processing"
    },
    {
      date: "March 2024",
      title: "Valid Vermit",
      status: "Pending",
      description: "Menunggu validasi vermit",
      icon: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-800/20';
      case 'in progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-800/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-800/20';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800/20';
    }
  };

  const getTimelineIcon = (icon: string) => {
    switch (icon) {
      case 'check':
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
          </svg>
        );
      case 'processing':
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
        );
      case 'invalid':
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          );
      default:
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4v8m0-8a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
        );
    }
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="fixed inset-0 bg-black/50" onClick={props.onClose}></div>
          <div class="relative min-h-screen flex items-center justify-center p-4">
            <div class="relative bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl">
              {/* Header */}
              <div class="flex items-center justify-between p-6 border-b dark:border-gray-700">
                <div class="w-8"></div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white flex-1 text-center">
                  WO MD Details
                </h3>
                <button
                  onClick={props.onClose}
                  class="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div class="border-b border-gray-200 dark:border-gray-700">
                <ul class="flex w-full text-sm font-medium text-center">
                  <li class="w-1/2">
                    <button
                      class={`inline-flex items-center justify-center w-full p-4 border-b-2 transition-colors ${
                        activeTab() === 'detail'
                          ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('detail')}
                    >
                      <AiOutlineInfoCircle class="w-5 h-5 mr-2" />
                      Detail
                    </button>
                  </li>
                  <li class="w-1/2">
                    <button
                      class={`inline-flex items-center justify-center w-full p-4 border-b-2 transition-colors ${
                        activeTab() === 'progress'
                          ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('progress')}
                    >
                      <IoStatsChartOutline class="w-5 h-5 mr-2" />
                      Progress
                    </button>
                  </li>
                </ul>
              </div>

              {/* Content */}
              <div class="p-3">
                {activeTab() === 'detail' && (
                  <dl class="space-y-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    {details.map((detail) => (
                      <div class="flex items-start">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 w-40">
                          {detail.label}
                        </dt>
                        <dd class="text-sm text-gray-900 dark:text-white flex-1 ml-4">
                          <span class="text-gray-400 mr-4">:</span>
                          <span class="font-medium">
                            {props.data?.[detail.key] || "-"}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab() === 'progress' && (
                  <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    {timelineData.length > 0 ? (
                      <ol class="relative border-l border-gray-200 dark:border-gray-700">
                        {timelineData.map((item, index) => (
                          <li class="mb-10 ml-6">
                            <span class={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-800 ${getStatusColor(item.status)}`}>
                              {getTimelineIcon(item.icon)}
                            </span>
                            <div class="flex items-center gap-2">
                              <h3 class="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                              <span class={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </div>
                            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              {item.date}
                            </time>
                            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8">
                        <IoStatsChartOutline class="w-16 h-16 mx-auto text-gray-400" />
                        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                          No progress data available
                        </h3>
                        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Progress tracking feature will be available soon
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

=======
import { Component, Show, createSignal, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { AiOutlineInfoCircle } from 'solid-icons/ai';
import { IoStatsChartOutline } from 'solid-icons/io';
import { VsHistory } from 'solid-icons/vs';

interface DetailWOModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const DetailWOModal: Component<DetailWOModalProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal('detail');

  onMount(() => {
    console.log("Detail Data in Modal:", props.data);
  });

  const details = [
    { label: "Project Type", key: "project_type" },
    { label: "Regional", key: "regional" },
    { label: "Area", key: "area" },
    { label: "Witel", key: "witel" },
    { label: "Unit", key: "unit" },
    { label: "Status", key: "status" },
    { label: "Cable Volume", key: "cable_volume" },
    { label: "Pole", key: "pole" },
    { label: "Port", key: "port" },
    { label: "Description", key: "description" },
    { label: "Service Price", key: "service_price" },
    { label: "Material Price", key: "material_price" },
  ];

  // Add timeline data structure
  const timelineData = [
    {
      date: "February 2024",
      title: "WO Homepas",
      status: "Completed",
      description: "WO homepas telah selesai dilakukan",
      icon: "check"
    },
    {
      date: "March 2024",
      title: "Submit Vermit",
      status: "In Progress",
      description: "Dokumen vermit sedang dalam proses pengajuan",
      icon: "processing"
    },
    {
      date: "March 2024",
      title: "Valid Vermit",
      status: "Pending",
      description: "Menunggu validasi vermit",
      icon: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500 bg-green-100 dark:bg-green-800/20';
      case 'in progress':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-800/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-800/20';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800/20';
    }
  };

  const getTimelineIcon = (icon: string) => {
    switch (icon) {
      case 'check':
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
          </svg>
        );
      case 'processing':
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
        );
      case 'invalid':
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          );
      default:
        return (
          <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4v8m0-8a2 2 0 100-4 2 2 0 000 4z"/>
          </svg>
        );
    }
  };

  return (
    <Show when={props.isOpen}>
      <Portal>
        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div class="fixed inset-0 bg-black/50" onClick={props.onClose}></div>
          <div class="relative min-h-screen flex items-center justify-center p-4">
            <div class="relative bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl">
              {/* Header */}
              <div class="flex items-center justify-between p-6 border-b dark:border-gray-700">
                <div class="w-8"></div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white flex-1 text-center">
                  WO MD Details
                </h3>
                <button
                  onClick={props.onClose}
                  class="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div class="border-b border-gray-200 dark:border-gray-700">
                <ul class="flex w-full text-sm font-medium text-center">
                  <li class="w-1/2">
                    <button
                      class={`inline-flex items-center justify-center w-full p-4 border-b-2 transition-colors ${
                        activeTab() === 'detail'
                          ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('detail')}
                    >
                      <AiOutlineInfoCircle class="w-5 h-5 mr-2" />
                      Detail
                    </button>
                  </li>
                  <li class="w-1/2">
                    <button
                      class={`inline-flex items-center justify-center w-full p-4 border-b-2 transition-colors ${
                        activeTab() === 'progress'
                          ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('progress')}
                    >
                      <IoStatsChartOutline class="w-5 h-5 mr-2" />
                      Progress
                    </button>
                  </li>
                </ul>
              </div>

              {/* Content */}
              <div class="p-3">
                {activeTab() === 'detail' && (
                  <dl class="space-y-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    {details.map((detail) => (
                      <div class="flex items-start">
                        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 w-40">
                          {detail.label}
                        </dt>
                        <dd class="text-sm text-gray-900 dark:text-white flex-1 ml-4">
                          <span class="text-gray-400 mr-4">:</span>
                          <span class="font-medium">
                            {props.data?.[detail.key] || "-"}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab() === 'progress' && (
                  <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    {timelineData.length > 0 ? (
                      <ol class="relative border-l border-gray-200 dark:border-gray-700">
                        {timelineData.map((item, index) => (
                          <li class="mb-10 ml-6">
                            <span class={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white dark:ring-gray-800 ${getStatusColor(item.status)}`}>
                              {getTimelineIcon(item.icon)}
                            </span>
                            <div class="flex items-center gap-2">
                              <h3 class="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                              <span class={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </div>
                            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              {item.date}
                            </time>
                            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8">
                        <IoStatsChartOutline class="w-16 h-16 mx-auto text-gray-400" />
                        <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                          No progress data available
                        </h3>
                        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Progress tracking feature will be available soon
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

>>>>>>> 6f6949f4938d86ba0e2c06119519abfba8adc3d1
export default DetailWOModal; 