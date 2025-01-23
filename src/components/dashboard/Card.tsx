import { createSignal } from "solid-js";

export default function CardComponent() {
  const [value1, setValue1] = createSignal(1923);
  const title1 = "Total User";
  const description1 = "Increase from last month";
  const change1 = "12%";
  const color1 = "#FF934F";
  const bgColor1 = "#FF934F29";

  const [value2, setValue2] = createSignal(345);
  const title2 = "New Users";
  const description2 = "Growth compared to last month";
  const change2 = "8%";
  const color2 = "#4CAF50";
  const bgColor2 = "#4CAF5029";

  return (
    <div class="space-y-6">
      <div
        class="bg-white rounded-2xl p-6 space-y-3 flex flex-row space-x-3 justify-between"
        style={{ height: "200px" }}
      >
        <div class="flex flex-col space-y-3 my-auto">
          <div class="flex items-center space-x-3">
            <div
              class="bg-gray-100 rounded-full p-[3vh] w-2 h-10 flex items-center justify-center"
              style={{ background: bgColor1 }}
            >
              <div class="text-white" style={{ color: color1 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M4.00751 9.2376..." />
                </svg>
              </div>
            </div>
            <h3 class="text-[2vh] font-medium text-[#171717]">{title1}</h3>
          </div>
          <div class="flex flex-col space-y-0">
            <div class="flex gap-2 items-center">
              <h3 class="text-[4vh] font-semibold text-black">{value1()}</h3>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex gap-3 items-left flex-col my-auto">
            <div class="flex flex-row items-center gap-3">
              <div class="text-green-500 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6 18L18 6m0 0H9m9 0v9"
                  />
                </svg>
              </div>
              <p class="text-[2vh] text-black">{change1}</p>
            </div>
            <p class="text-[1.5vh] text-black">{description1}</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl p-6 space-y-3 flex flex-row space-x-3 justify-between"
        style={{ height: "200px" }}
      >
        <div class="flex flex-col space-y-3 my-auto">
          <div class="flex items-center space-x-3">
            <div
              class="bg-gray-100 rounded-full p-[3vh] w-2 h-10 flex items-center justify-center"
              style={{ background: bgColor2 }}
            >
              <div class="text-white" style={{ color: color2 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M4.00751 9.2376..." />
                </svg>
              </div>
            </div>
            <h3 class="text-[2vh] font-medium text-[#171717]">{title2}</h3>
          </div>
          <div class="flex flex-col space-y-0">
            <div class="flex gap-2 items-center">
              <h3 class="text-[4vh] font-semibold text-black">{value2()}</h3>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex gap-3 items-left flex-col my-auto">
            <div class="flex flex-row items-center gap-3">
              <div class="text-green-500 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6 18L18 6m0 0H9m9 0v9"
                  />
                </svg>
              </div>
              <p class="text-[2vh] text-black">{change2}</p>
            </div>
            <p class="text-[1.5vh] text-black">{description2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}