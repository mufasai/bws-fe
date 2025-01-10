import { createSignal, createEffect, For } from "solid-js";

const RecentApp = () => {
  const recentActivity = [
    {
      title: "SMS Template Updated",
      description: "Promo template modified by admin",
      time: "2 hours ago",
    },
    {
      title: "New Gateway Added",
      description: "Secondary gateway configured",
      time: "5 hours ago",
    },
    {
      title: "User Role Modified",
      description: "Changed role from User to SPV",
      time: "8 hours ago",
    },
  ];

  return (
    <>
      <div class="space-y-6">
        {/* Recent Activity */}
        <div class="bg-white rounded-lg p-4">
          <h2 class="font-semibold mb-2">Recent Activity</h2>
          <p class="text-gray-600 text-sm mb-4">
            System events from the last 24 hours
          </p>
          <div class="space-y-4">
            {recentActivity.map((activity) => (
              <div class="flex gap-3">
                <div class="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <h3 class="font-medium">{activity.title}</h3>
                  <p class="text-gray-600 text-sm">{activity.description}</p>
                  <p class="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentApp;
