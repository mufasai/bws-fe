import { createSignal } from "solid-js";

function SpvDashboard() {
  const [tab, setTab] = createSignal("smsDirect");

  return (
    <div class="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main class="p-6">
        <div class="flex mb-6 ">
          <button
            onClick={() => setTab("smsDirect")}
            class={`px-4 py-2 rounded-l-lg ${
              tab() === "smsDirect"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            SMS Direct
          </button>
          <button
            onClick={() => setTab("blastSMS")}
            class={`px-4 py-2  ${
              tab() === "blastSMS"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Blast SMS
          </button>
          <button
            onClick={() => setTab("reports")}
            class={`px-4 py-2 rounded-r-lg ${
              tab() === "reports"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Reports
          </button>
        </div>

        {tab() === "smsDirect" && (
          <div>
            <h2 class="text-xl font-semibold">Direct SMS Authorization</h2>
            <p class="mt-2 text-gray-600">
              Review and authorize individual SMS requests.
            </p>
            <div class="mt-4 p-4 bg-white shadow rounded">
              <table class="min-w-full bg-white">
                <thead>
                  <tr>
                    <th class="border px-4 py-2">Requester</th>
                    <th class="border px-4 py-2">Recipient</th>
                    <th class="border px-4 py-2">Message</th>
                    <th class="border px-4 py-2">Timestamp</th>
                    <th class="border px-4 py-2">Status</th>
                    <th class="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border px-4 py-2">John Doe</td>
                    <td class="border px-4 py-2">+6281234567890</td>
                    <td class="border px-4 py-2">Your OTP code is 123456</td>
                    <td class="border px-4 py-2">2024-01-16 09:30</td>
                    <td class="border px-4 py-2 text-yellow-600">Pending</td>
                    <td class="border px-4 py-2 flex space-x-2 ">
                      <button class=" ">
                        <svg
                          width="32"
                          height="40"
                          viewBox="0 0 32 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_144_3426)">
                            <path
                              d="M24.8166 14.6223L21.5555 11.3445C21.34 11.1301 21.0484 11.0098 20.7444 11.0098C20.4404 11.0098 20.1488 11.1301 19.9333 11.3445L8.37219 22.889L7.31664 27.4445C7.28022 27.6111 7.28147 27.7836 7.32029 27.9496C7.35911 28.1156 7.43452 28.2708 7.54101 28.4039C7.64749 28.537 7.78237 28.6447 7.93579 28.719C8.08921 28.7933 8.25729 28.8324 8.42775 28.8334C8.50715 28.842 8.58724 28.842 8.66664 28.8334L13.2722 27.7779L24.8166 16.2445C25.031 16.029 25.1514 15.7374 25.1514 15.4334C25.1514 15.1294 25.031 14.8378 24.8166 14.6223ZM12.7166 26.7779L8.39997 27.6834L9.3833 23.4501L18.0333 14.8334L21.3666 18.1668L12.7166 26.7779ZM22.1111 17.3612L18.7777 14.0279L20.7111 12.1056L23.9889 15.439L22.1111 17.3612Z"
                              fill="#0075FE"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_144_3426">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(6 10)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button class="">
                        <svg
                          width="32"
                          height="40"
                          viewBox="0 0 32 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.5 15.6084C23.4833 15.6084 23.4583 15.6084 23.4333 15.6084C19.025 15.1667 14.625 15.0001 10.2667 15.4417L8.56666 15.6084C8.21666 15.6417 7.90832 15.3917 7.87499 15.0417C7.84166 14.6917 8.09166 14.3917 8.43332 14.3584L10.1333 14.1917C14.5667 13.7417 19.0583 13.9167 23.5583 14.3584C23.9 14.3917 24.15 14.7001 24.1167 15.0417C24.0917 15.3667 23.8167 15.6084 23.5 15.6084Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M13.0833 14.7665C13.05 14.7665 13.0167 14.7665 12.975 14.7582C12.6417 14.6998 12.4083 14.3748 12.4667 14.0415L12.65 12.9498C12.7833 12.1498 12.9667 11.0415 14.9083 11.0415H17.0917C19.0417 11.0415 19.225 12.1915 19.35 12.9582L19.5333 14.0415C19.5917 14.3832 19.3583 14.7082 19.025 14.7582C18.6833 14.8165 18.3583 14.5832 18.3083 14.2498L18.125 13.1665C18.0083 12.4415 17.9833 12.2998 17.1 12.2998H14.9167C14.0333 12.2998 14.0167 12.4165 13.8917 13.1582L13.7 14.2415C13.65 14.5498 13.3833 14.7665 13.0833 14.7665Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M18.675 28.9582H13.325C10.4167 28.9582 10.3 27.3498 10.2083 26.0498L9.66666 17.6582C9.64166 17.3165 9.90833 17.0165 10.25 16.9915C10.6 16.9748 10.8917 17.2332 10.9167 17.5748L11.4583 25.9665C11.55 27.2332 11.5833 27.7082 13.325 27.7082H18.675C20.425 27.7082 20.4583 27.2332 20.5417 25.9665L21.0833 17.5748C21.1083 17.2332 21.4083 16.9748 21.75 16.9915C22.0917 17.0165 22.3583 17.3082 22.3333 17.6582L21.7917 26.0498C21.7 27.3498 21.5833 28.9582 18.675 28.9582Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M17.3833 24.375H14.6083C14.2667 24.375 13.9833 24.0917 13.9833 23.75C13.9833 23.4083 14.2667 23.125 14.6083 23.125H17.3833C17.725 23.125 18.0083 23.4083 18.0083 23.75C18.0083 24.0917 17.725 24.375 17.3833 24.375Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M18.0834 21.0415H13.9167C13.575 21.0415 13.2917 20.7582 13.2917 20.4165C13.2917 20.0748 13.575 19.7915 13.9167 19.7915H18.0834C18.425 19.7915 18.7084 20.0748 18.7084 20.4165C18.7084 20.7582 18.425 21.0415 18.0834 21.0415Z"
                            fill="#FF4242"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab() === "blastSMS" && (
          <div>
            <h2 class="text-xl font-semibold">Blast SMS Authorization</h2>
            <p class="mt-2 text-gray-600">
              Review and authorize bulk SMS requests.
            </p>
            <div class="mt-4 p-4 bg-white shadow rounded">
              <table class="min-w-full bg-white">
                <thead>
                  <tr>
                    <th class="border px-4 py-2">Requester</th>
                    <th class="border px-4 py-2">File</th>
                    <th class="border px-4 py-2">Recipients</th>
                    <th class="border px-4 py-2">Timestamp</th>
                    <th class="border px-4 py-2">Status</th>
                    <th class="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border px-4 py-2">Marketing Team</td>
                    <td class="border px-4 py-2">promo_blast_jan.csv</td>
                    <td class="border px-4 py-2">1500</td>
                    <td class="border px-4 py-2">2024-01-16 10:00</td>
                    <td class="border px-4 py-2 text-yellow-600">Pending</td>
                    <td class="border px-4 py-2 flex space-x-2">
                      <button class="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          >
                            <path
                              fill="#000000"
                              fill-opacity="0"
                              stroke-dasharray="20"
                              stroke-dashoffset="20"
                              d="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"
                            >
                              <animate
                                fill="freeze"
                                attributeName="fill-opacity"
                                begin="0.7s"
                                dur="0.5s"
                                values="0;1"
                              />
                              <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                dur="0.4s"
                                values="20;0"
                              />
                            </path>
                            <path
                              stroke-dasharray="14"
                              stroke-dashoffset="14"
                              d="M6 19h12"
                            >
                              <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                begin="0.5s"
                                dur="0.2s"
                                values="14;0"
                              />
                            </path>
                          </g>
                        </svg>
                      </button>
                      <button class=" ">
                        <svg
                          width="32"
                          height="40"
                          viewBox="0 0 32 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_144_3426)">
                            <path
                              d="M24.8166 14.6223L21.5555 11.3445C21.34 11.1301 21.0484 11.0098 20.7444 11.0098C20.4404 11.0098 20.1488 11.1301 19.9333 11.3445L8.37219 22.889L7.31664 27.4445C7.28022 27.6111 7.28147 27.7836 7.32029 27.9496C7.35911 28.1156 7.43452 28.2708 7.54101 28.4039C7.64749 28.537 7.78237 28.6447 7.93579 28.719C8.08921 28.7933 8.25729 28.8324 8.42775 28.8334C8.50715 28.842 8.58724 28.842 8.66664 28.8334L13.2722 27.7779L24.8166 16.2445C25.031 16.029 25.1514 15.7374 25.1514 15.4334C25.1514 15.1294 25.031 14.8378 24.8166 14.6223ZM12.7166 26.7779L8.39997 27.6834L9.3833 23.4501L18.0333 14.8334L21.3666 18.1668L12.7166 26.7779ZM22.1111 17.3612L18.7777 14.0279L20.7111 12.1056L23.9889 15.439L22.1111 17.3612Z"
                              fill="#0075FE"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_144_3426">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(6 10)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button class="">
                        <svg
                          width="32"
                          height="40"
                          viewBox="0 0 32 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.5 15.6084C23.4833 15.6084 23.4583 15.6084 23.4333 15.6084C19.025 15.1667 14.625 15.0001 10.2667 15.4417L8.56666 15.6084C8.21666 15.6417 7.90832 15.3917 7.87499 15.0417C7.84166 14.6917 8.09166 14.3917 8.43332 14.3584L10.1333 14.1917C14.5667 13.7417 19.0583 13.9167 23.5583 14.3584C23.9 14.3917 24.15 14.7001 24.1167 15.0417C24.0917 15.3667 23.8167 15.6084 23.5 15.6084Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M13.0833 14.7665C13.05 14.7665 13.0167 14.7665 12.975 14.7582C12.6417 14.6998 12.4083 14.3748 12.4667 14.0415L12.65 12.9498C12.7833 12.1498 12.9667 11.0415 14.9083 11.0415H17.0917C19.0417 11.0415 19.225 12.1915 19.35 12.9582L19.5333 14.0415C19.5917 14.3832 19.3583 14.7082 19.025 14.7582C18.6833 14.8165 18.3583 14.5832 18.3083 14.2498L18.125 13.1665C18.0083 12.4415 17.9833 12.2998 17.1 12.2998H14.9167C14.0333 12.2998 14.0167 12.4165 13.8917 13.1582L13.7 14.2415C13.65 14.5498 13.3833 14.7665 13.0833 14.7665Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M18.675 28.9582H13.325C10.4167 28.9582 10.3 27.3498 10.2083 26.0498L9.66666 17.6582C9.64166 17.3165 9.90833 17.0165 10.25 16.9915C10.6 16.9748 10.8917 17.2332 10.9167 17.5748L11.4583 25.9665C11.55 27.2332 11.5833 27.7082 13.325 27.7082H18.675C20.425 27.7082 20.4583 27.2332 20.5417 25.9665L21.0833 17.5748C21.1083 17.2332 21.4083 16.9748 21.75 16.9915C22.0917 17.0165 22.3583 17.3082 22.3333 17.6582L21.7917 26.0498C21.7 27.3498 21.5833 28.9582 18.675 28.9582Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M17.3833 24.375H14.6083C14.2667 24.375 13.9833 24.0917 13.9833 23.75C13.9833 23.4083 14.2667 23.125 14.6083 23.125H17.3833C17.725 23.125 18.0083 23.4083 18.0083 23.75C18.0083 24.0917 17.725 24.375 17.3833 24.375Z"
                            fill="#FF4242"
                          />
                          <path
                            d="M18.0834 21.0415H13.9167C13.575 21.0415 13.2917 20.7582 13.2917 20.4165C13.2917 20.0748 13.575 19.7915 13.9167 19.7915H18.0834C18.425 19.7915 18.7084 20.0748 18.7084 20.4165C18.7084 20.7582 18.425 21.0415 18.0834 21.0415Z"
                            fill="#FF4242"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab() === "reports" && (
          <div>
            <h2 class="text-xl font-semibold">SMS Authorization Reports</h2>
            <p class="mt-2 text-gray-600">
              Download and analyze SMS authorization history.
            </p>
            <div class="mt-4 flex space-x-4">
              <div class="p-4 bg-white shadow rounded-lg w-1/2">
                <h3 class="text-lg font-semibold">Direct SMS Report</h3>
                <p class="text-gray-600">
                  Download authorization history for direct SMS requests.
                </p>
                <div class="mt-4">
                  <input type="date" class="border rounded p-2 w-full mb-2" />
                  <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                    Download Report
                  </button>
                </div>
              </div>
              <div class="p-4 bg-white shadow rounded-lg w-1/2">
                <h3 class="text-lg font-semibold">Blast SMS Report</h3>
                <p class="text-gray-600">
                  Download authorization history for blast SMS requests.
                </p>
                <div class="mt-4">
                  <input type="date" class="border rounded p-2 w-full mb-2" />
                  <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SpvDashboard;
