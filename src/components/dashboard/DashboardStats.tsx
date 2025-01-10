import { Component, Show } from "solid-js";


export const DashboardStats: Component = () => {
  const dataOverview = [
    {
      title: "Total Cost",
      value: "Rp. 30 M",
      subValue: "Rp. 50 M",
      description: "increase from last month",
      change: "12%",
      trend: "down"
    },
    {
      title: "Projects",
      value: "95",
      subValue: "100",
      description: "decrease from last month",
      change: "10%",
      trend: "down"
    },
    {
      title: "Time Spent",
      value: "1022",
      subValue: "1300 Hrs",
      description: "increase from last month",
      change: "8%",
      trend: "up"
    },
    {
      title: "Resources",
      value: "101",
      subValue: "120",
      description: "increase from last month",
      change: "10%",
      trend: "up"
    }
  ]

  const palette = ["#df7fff", "#ff8050", "#4a95ff", "#faba4d"]
  const icons = [
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 22h18" /><path d="M3 11c0-.943 0-1.414.293-1.707S4.057 9 5 9s1.414 0 1.707.293S7 10.057 7 11v6c0 .943 0 1.414-.293 1.707S5.943 19 5 19s-1.414 0-1.707-.293S3 17.943 3 17zm7-4c0-.943 0-1.414.293-1.707S11.057 5 12 5s1.414 0 1.707.293S14 6.057 14 7v10c0 .943 0 1.414-.293 1.707S12.943 19 12 19s-1.414 0-1.707-.293S10 17.943 10 17zm7-3c0-.943 0-1.414.293-1.707S18.057 2 19 2s1.414 0 1.707.293S21 3.057 21 4v13c0 .943 0 1.414-.293 1.707S19.943 19 19 19s-1.414 0-1.707-.293S17 17.943 17 17z" /></g></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M8.308 21h7.384c3.71 0 4.375-1.45 4.569-3.213l.692-7.2c.25-2.196-.397-3.987-4.338-3.987h-9.23c-3.941 0-4.587 1.791-4.338 3.987l.692 7.2C3.933 19.55 4.598 21 8.308 21m0-14.4v-.72c0-1.593 0-2.88 2.954-2.88h1.476c2.954 0 2.954 1.287 2.954 2.88v.72" /><path d="M9.812 13.331A15.26 15.26 0 0 1 3.234 11m11 2.331A15.26 15.26 0 0 0 20.812 11M14 13.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0" /></g></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="12" cy="12" r="9" /><path d="M11 8v5h5" /></g></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4" /></svg>
  ]
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {dataOverview.map((item, index) => (
        <div class="bg-white  rounded-2xl p-[3vh] space-y-3 shadow-md">
          <div class="bg-gray-100 rounded-full p-[3vh] w-10 h-10 flex items-center justify-center " style={{ background: palette[index] }} >
            <div class="text-white flex items-center justify-center">
              {icons[index]}
            </div>
          </div>
          <div class="flex flex-col  space-y-0">
            <h3 class="text-[2vh] font-inter font-semibold text-gray-500">{item.title}</h3>
            <div class="flex gap-2 items-center">
              <h3 class="text-[4vh] font-inter font-semibold text-black">{item.value}</h3>
              <span class="text-[2vh] font-inter font-semibold text-black">/</span>
              <h3 class="text-[2vh] font-inter font-semibold text-black">{item.subValue}</h3>
            </div>
            <div class="flex gap-1 items-center font-inter">
              <Show when={item.trend === "up"}
                fallback={
                  <div class="text-red-500 font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 6l12 12m0 0H9m9 0v-9" /></svg>
                  </div>
                }
              >
                <div class="text-green-500 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6m0 0H9m9 0v9" /></svg>
                </div>
              </Show>
              <p class="text-[1.5vh] font-inter text-black">{item.change}</p>
              <p class="text-[1.5vh] font-inter text-black">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 