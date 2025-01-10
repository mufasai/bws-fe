import { Component } from "solid-js";

export const ScheduleTimeline: Component = () => {
  const schedules = [
    {
      time: "09:00 AM",
      event: "Team Stand-up Meeting",
      participants: "Development Team",
      status: "upcoming",
    },
    {
      time: "10:30 AM",
      event: "Client Presentation",
      participants: "Sales Team, Client A",
      status: "in-progress",
    },
    {
      time: "02:00 PM",
      event: "Project Review",
      participants: "Project Managers",
      status: "upcoming",
    },
    {
      time: "04:00 PM",
      event: "Training Session",
      participants: "New Employees",
      status: "upcoming",
    },
  ];

  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Today's Schedule
        </h2>
        <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      <div class="space-y-4">
        {schedules.map((schedule) => (
          <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div class="flex-shrink-0 w-16 text-sm text-gray-600 dark:text-gray-400">
              {schedule.time}
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                {schedule.event}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {schedule.participants}
              </p>
            </div>
            <div class="flex-shrink-0">
              <span
                class={`px-2 py-1 text-xs font-medium rounded-full ${
                  schedule.status === "in-progress"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                }`}
              >
                {schedule.status === "in-progress" ? "In Progress" : "Upcoming"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 