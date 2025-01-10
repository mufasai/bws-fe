import { Component, createSignal } from "solid-js";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { WorkforceOverview } from "../components/dashboard/WorkforceOverview";
import { ScheduleTimeline } from "../components/dashboard/ScheduleTimeline";
import { TaskDistribution } from "../components/dashboard/TaskDistribution";

const Dashboard: Component = () => {
  const [isLoading, setIsLoading] = createSignal(true);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 1000);

  return (
    <div class="space-y-2">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-[3vh] font-inter font-bold text-gray-900 dark:text-white">
          Overview
        </h1>
        <div class="flex ml-auto justify-end">
          <div class="flex items-center justify-center">
            <select class="text-[2vh] px-4 py-1 font-inter  bg-white rounded-full shadow-sm border-none text-gray-900 dark:text-white">
              <option value="1">30 Days</option>
              <option value="2">60 Days</option>
              <option value="3">90 Days</option>
              <option value="4">120 Days</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading() ? (
        <DashboardSkeleton />
      ) : (
        <>
          <DashboardStats />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <WorkforceOverview />
            <TaskDistribution />
          </div>
          <ScheduleTimeline />
        </>
      )}
    </div>
  );
};

const DashboardSkeleton: Component = () => {
  return (
    <div class="space-y-2 animate-pulse">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {Array(4).fill(0).map(() => (
          <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        ))}
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div class="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div class="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Dashboard; 