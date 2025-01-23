import { Component, createSignal } from "solid-js";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import FileUpload from "../components/dashboard/FileUpload";
import InputSmsDirect from "../components/dashboard/InputSmsDirect";
import ShowFile from "../components/dashboard/ShowFIle";

const Dashboard: Component = () => {
  const [isLoading, setIsLoading] = createSignal(true);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 1000);

  return (
    <div class="p-6 min-h-screen">
      {isLoading() ? (
        <DashboardSkeleton />
      ) : (
        <div class="space-y-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputSmsDirect />
            <FileUpload />
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <ShowFile />
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardSkeleton: Component = () => (
  <div class="space-y-4 animate-pulse">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array(2)
        .fill(0)
        .map(() => (
          <div class="h-48 bg-gray-200 rounded-lg"></div>
        ))}
    </div>
    <div class="h-64 bg-gray-200 rounded-lg"></div>
  </div>
);

export default Dashboard;
