import { createSignal, createEffect, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

interface CountryProps {
  apiUrl: string; // URL untuk API
}

const CountryCodes = (props: CountryProps) => {
  const [templates, setTemplates] = createSignal<
    {
      id: { id: { String: string } };
      code_number: string;
      country: string;
      status: string;
    }[]
  >([]);
  const [filteredTemplates, setFilteredTemplates] = createSignal<
    {
      id: { id: { String: string } };
      code_number: string;
      country: string;
      status: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal("");
  const [editingTemplate, setEditingTemplate] = createSignal<any>(null);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [isPopupOpen, setIsPopupOpen] = createSignal(false);
  const [newApplication, setNewApplication] = createSignal({
    code_number: "+62",
    country: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = createSignal(1);
  const [pageSize] = createSignal(3); // Change from 8 to 3 items per page
  const [totalItems, setTotalItems] = createSignal(0);

  // Fetch data dari API
  const fetchCountryCodes = async () => {
    try {
      const response = await fetch(props.apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const result = await response.json();
      const data = result.data.map((item: any) => ({
        id: { id: { String: item.id.id.String } }, // Nested id structure
        code_number: item.code_number,
        country: item.country,
        status: item.status,
      }));
      setTemplates(data);
      setFilteredTemplates(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fetch API saat komponen di-mount
  createEffect(() => {
    fetchCountryCodes();
  }, []);

  // Filter templates berdasarkan searchQuery
  createEffect(() => {
    const query = searchQuery().toLowerCase();
    setFilteredTemplates(
      templates().filter(
        (template) =>
          template.code_number.toLowerCase().includes(query) ||
          template.country.toLowerCase().includes(query) ||
          template.status.toLowerCase().includes(query)
      )
    );
  });

  // Fungsi untuk membuka popup
  const openPopup = () => {
    setNewApplication({ code_number: "", country: "", status: "" });
    setIsPopupOpen(true);
  };

  // Fungsi untuk menutup popup
  const closePopup = () => setIsPopupOpen(false);

  // Fungsi untuk menambahkan aplikasi baru
  const addApplication = async () => {
    try {
      const response = await fetch(props.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code_number: newApplication().code_number,
          country: newApplication().country,
          status: newApplication().status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add application");
      }

      const result = await response.json();
      console.log(result, "result");

      // Periksa struktur hasil respons API
      const newId = result.data.id?.id?.String || "unknown-id"; // Menangani nested ID
      setTemplates((prev) => [
        ...prev,
        {
          id: { id: { String: newId } },
          code_number: newApplication().code_number,
          country: newApplication().country,
          status: newApplication().status,
        },
      ]);
      setFilteredTemplates((prev) => [
        ...prev,
        {
          id: { id: { String: newId } },
          code_number: newApplication().code_number,
          country: newApplication().country,
          status: newApplication().status,
        },
      ]);
      setNewApplication({ code_number: "", country: "", status: "" });
      closePopup();
      await fetchCountryCodes();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Fungsi untuk menyimpan perubahan saat edit
  const saveEdit = async () => {
    const updatedTemplate = editingTemplate();

    let dataResult = {
      code_number: updatedTemplate.code_number,
      country: updatedTemplate.country,
      status: updatedTemplate.status,
    };

    try {
      console.log(dataResult, "data");
      const response = await fetch(
        `${props.apiUrl}/${updatedTemplate.id.id.String}`, // Nested id
        {
          method: "PUT",
          body: JSON.stringify(dataResult),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update application");
      }

      const responseData = await response.json();

      // Perbarui state setelah berhasil
      await fetchCountryCodes();
      setEditingTemplate(null);
    } catch (err: any) {
      console.error("Update error:", err.message);
      setError(err.message);
    }
  };

  // Fungsi untuk menghapus data dari backend dan state
  const deleteTemplate = async (id: { id: { String: string } }) => {
    try {
      const response = await fetch(`${props.apiUrl}/${id.id.String}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      // Perbarui state setelah berhasil
      setTemplates((prev) =>
        prev.filter((template) => template.id.id.String !== id.id.String)
      );
      setFilteredTemplates((prev) =>
        prev.filter((template) => template.id.id.String !== id.id.String)
      );
    } catch (err: any) {
      console.error("Delete error:", err.message);
      setError(err.message);
    }
  };

  // Calculate total pages
  const totalPages = () => Math.ceil(filteredTemplates().length / pageSize());

  // Get current page items
  const currentItems = () => {
    const start = (currentPage() - 1) * pageSize();
    const end = start + pageSize();
    return filteredTemplates().slice(start, end);
  };

  // Update total items when filtered templates change
  createEffect(() => {
    setTotalItems(filteredTemplates().length);
  });

  // Navigation functions
  const nextPage = () => {
    if (currentPage() < totalPages()) {
      setCurrentPage(currentPage() + 1);
    }
  };

  const previousPage = () => {
    if (currentPage() > 1) {
      setCurrentPage(currentPage() - 1);
    }
  };

  // Calculate showing range
  const showingRange = () => {
    const start = (currentPage() - 1) * 3 + 1;
    const end = Math.min(start + 2, totalItems());
    return `${start}-${end} of ${totalItems()}`;
  };

  return (
    <div class="space-y-4">
      {/* Search and Add New */}
      <div class="flex gap-4 mb-4 bg-white">
        <div class="flex-1 relative">
          <input
            type="text"
            placeholder="Search applications"
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.target.value)}
            class="w-full px-4 py-2 border-[#989898] border-[1px] rounded-lg"
          />
          <span class="absolute right-3 top-2.5">🔍</span>
        </div>
        <button
          onClick={openPopup}
          class="px-4 py-2 bg-[#FF934F] text-white rounded-lg flex items-center gap-2"
        >
          + Add New
        </button>
      </div>

      {/* Popup Form */}
      <Show when={isPopupOpen()}>
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ height: "100vh" }}
        >
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-bold mb-4">Add New Country Code</h2>
            <select
              value={newApplication().code_number}
              onInput={(e) =>
                setNewApplication({
                  ...newApplication(),
                  code_number: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            >
              <option value="" disabled selected>
                select code number
              </option>
              <option value="+62">+62</option>
              <option value="+65">+65</option>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+60">+60</option>
            </select>
            <input
              type="text"
              placeholder="Country"
              value={newApplication().country}
              onInput={(e) =>
                setNewApplication({
                  ...newApplication(),
                  country: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Status"
              value={newApplication().status}
              onInput={(e) =>
                setNewApplication({
                  ...newApplication(),
                  status: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
            />
            <div class="flex justify-end space-x-2">
              <button
                onClick={closePopup}
                class="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addApplication}
                class="px-4 py-2 bg-[#FF934F] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Show>

      {isLoading() && <div>Loading...</div>}
      {error() && <div class="text-red-500">{error()}</div>}

      <For each={currentItems()}>
        {(item) => (
          <div class="bg-white p-4 rounded-lg border-[#989898] border-[1px]">
            <Show
              when={editingTemplate()?.id?.id?.String === item.id.id.String} // Periksa apakah ID cocok
              fallback={
                <>
                  <div class="flex justify-between items-center mb-3">
                    <div class="flex flex-row space-x-4">
                      <div class="bg-[#FF934F29] m-2 p-2 rounded-lg text-[#FF934F] items-center">
                        {item.code_number}
                      </div>

                      <div class="space-y-2">
                        <h3 class="font-semibold">{item.country}</h3>
                        <p class="inline-block bg-[rgba(30,186,9,0.16)] text-[#1EBA09] px-3 py-1 rounded-md text-sm mb-3">
                          {item.status}
                        </p>
                      </div>
                    </div>

                    <div class="flex space-x-2">
                      <button
                        class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]"
                        onClick={() => setEditingTemplate(item)} // Set item yang akan diedit
                      >
                        Edit
                      </button>
                      <button
                        class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]"
                        onClick={() => deleteTemplate(item.id)} // Hapus berdasarkan ID
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              }
            >
              <div>
                <select
                  value={editingTemplate()?.code_number}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      code_number: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                >
                  <option value="" disabled selected>
                    select code number
                  </option>
                  <option value="+62">+62</option>
                  <option value="+65">+65</option>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+60">+60</option>
                </select>
                <input
                  type="text"
                  value={editingTemplate()?.country}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      country: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={editingTemplate()?.status}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      status: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />

                <button
                  class="px-4 py-2 bg-[#FF934F] text-white rounded-lg mr-2"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  class="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  onClick={() => setEditingTemplate(null)}
                >
                  Cancel
                </button>
              </div>
            </Show>
          </div>
        )}
      </For>
      {/* Pagination */}
      <div class="flex justify-between items-center mt-4 border-[#989898] border-[1px] rounded-lg">
        <div class="my-4 mx-4 flex flex-row w-full justify-between">
          <span class="text-gray-600 my-auto">
            Showing {showingRange()} items
          </span>
          <div class="flex justify-end space-x-2">
            <button
              class="px-4 py-2 border rounded-lg"
              onClick={previousPage}
              disabled={currentPage() === 1}
              style={{
                opacity: currentPage() === 1 ? "0.5" : "1",
                cursor: currentPage() === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <button
              class="px-4 py-2 border rounded-lg"
              onClick={nextPage}
              disabled={currentPage() === totalPages()}
              style={{
                opacity: currentPage() === totalPages() ? "0.5" : "1",
                cursor:
                  currentPage() === totalPages() ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCodes;
