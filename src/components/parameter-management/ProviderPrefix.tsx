import { createSignal, onMount } from "solid-js";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const API_URL = "http://localhost:8080/api/provider-prefixes";

interface ProviderPrefix {
  id: { id: { String: string } };
  prefix: string;
  provider: string;
  status: string;
}

const ProviderPrefixesTable = () => {
  const [rowData, setRowData] = createSignal<ProviderPrefix[]>([]);
  const [form, setForm] = createSignal<Partial<ProviderPrefix>>({
    prefix: "",
    provider: "",
    status: "Active",
  });
  const [isModalOpen, setIsModalOpen] = createSignal(false);

  console.log("Form state:", form());

  const fetchDataProviderPrefixes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const json = await response.json();
      const processedData = json.data.map((item: any) => ({
        id: { id: { String: item.id.id.String } },
        prefix: item.prefix,
        provider: item.provider,
        status: item.status,
      }));
      setRowData(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createData = async () => {
    try {
      console.log("add data");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form()),
      });
      if (response.ok) {
        fetchDataProviderPrefixes();
        closeModal();
      } else {
        console.error("Failed to create data");
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const deleteData = async (id: { id: { String: string } }) => {
    try {
      const response = await fetch(`${API_URL}/${id.id.String}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchDataProviderPrefixes();
        alert("Data deleted successfully!");
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const updateDataProviderPrefixes = async () => {
    console.log("update data");
    if (!form().id) return;
    try {
      const response = await fetch(`${API_URL}/${form()?.id?.id?.String}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prefix: form()?.prefix,
          provider: form()?.provider,
          status: form()?.status,
        }),
      });
      if (response.ok) {
        fetchDataProviderPrefixes();
        closeModal();
        alert("Data updated successfully!");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const openModal = () => {
    setForm({ prefix: "", provider: "", status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (row: ProviderPrefix) => {
    setForm(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (key: keyof ProviderPrefix, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  onMount(() => {
    fetchDataProviderPrefixes();
  });

  const columnDefs = [
    { field: "prefix", headerName: "Prefix", flex: 1 },
    { field: "provider", headerName: "Provider", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      headerName: "Action",
      flex: 1,
      cellRenderer: (params: { data: ProviderPrefix }) => (
        <div
          style={{ display: "flex", gap: "10px", "justify-content": "center" }}
        >
          <button
            onClick={() => openEditModal(params.data)}
            style={{
              color: "#1a73e8",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
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
          <button
            onClick={() => deleteData(params.data.id)}
            style={{
              color: "#ea4335",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
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
        </div>
      ),
    },
  ];

  return (
    <>
      <div class="space-y-4">
        <div class="flex gap-4 mb-4 bg-white">
          <div class="flex-1 relative">
            <input
              type="text"
              placeholder="Search anything"
              class="w-full px-4 py-2 border-[#989898] border-[1px] rounded-lg"
            />
            <span class="absolute right-3 top-2.5">🔍</span>
          </div>
          <button
            class="px-4 py-2 bg-[#0075FE] text-white rounded-lg flex items-center gap-2"
            onClick={openModal}
          >
            + Add New
          </button>
        </div>
        <div class="ag-theme-alpine w-full min-h-auto">
          <AgGridSolid
            columnDefs={columnDefs}
            rowData={rowData()}
            defaultColDef={{ sortable: true, filter: true }}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>
        {isModalOpen() && (
          <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white p-6 rounded-lg w-96">
              <h2 class="text-lg font-bold mb-4">
                {form().id ? "Edit Prefix" : "Add New Prefix"}
              </h2>
              {/* <form > */}
              <div class="flex flex-col gap-4">
                <div>
                  <label>Prefix:</label>
                  <input
                    type="text"
                    value={form()?.prefix || ""}
                    onChange={(e) =>
                      handleInputChange("prefix", e.currentTarget.value)
                    }
                    class="w-full px-4 py-2 border-[#989898] border-[1px] rounded-lg"
                  />
                </div>
                <div>
                  <label>Provider:</label>
                  <input
                    type="text"
                    value={form()?.provider || ""}
                    onChange={(e) =>
                      handleInputChange("provider", e.currentTarget.value)
                    }
                    class="w-full px-4 py-2 border-[#989898] border-[1px] rounded-lg"
                  />
                </div>
                <div>
                  <label>Status:</label>
                  <select
                    value={form().status}
                    onChange={(e) =>
                      handleInputChange("status", e.currentTarget.value)
                    }
                    class="w-full px-4 py-2 border-[#989898] border-[1px] rounded-lg"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end gap-4 mt-6">
                <button
                  onClick={closeModal}
                  class="px-4 py-2 bg-gray-300 text-black rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={updateDataProviderPrefixes}
                  class="px-4 py-2 bg-[#0075FE] text-white rounded-lg"
                >
                  Save
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProviderPrefixesTable;
