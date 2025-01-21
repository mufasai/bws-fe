import { createSignal, createEffect, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

interface ApplicationProps {
  apiUrl: string; // URL untuk API
}

const Application = (props: ApplicationProps) => {
  const [templates, setTemplates] = createSignal<
    {
      id: { id: { String: string } };
      title: string;
      tag: string;
      content: string;
    }[]
  >([]);
  const [filteredTemplates, setFilteredTemplates] = createSignal<
    {
      id: { id: { String: string } };
      title: string;
      tag: string;
      content: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal("");
  const [editingTemplate, setEditingTemplate] = createSignal<any>(null);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [isPopupOpen, setIsPopupOpen] = createSignal(false);
  const [newApplication, setNewApplication] = createSignal({
    title: "",
    tag: "",
    content: "",
  });
  const [currentPage, setCurrentPage] = createSignal(1);
  const [pageSize] = createSignal(3); // Change from 8 to 3 items per page
  const [totalItems, setTotalItems] = createSignal(0);

  // Fetch data dari API
  const fetchApplication = async () => {
    try {
      const response = await fetch(props.apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const result = await response.json();
      const data = result.data.map((item: any) => ({
        id: { id: { String: item.id.id.String } }, // Nested id structure
        title: item.app_name,
        tag: item.status,
        content: item.api_key,
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
    fetchApplication();
  }, []);

  // Filter templates berdasarkan searchQuery
  createEffect(() => {
    const query = searchQuery().toLowerCase();
    setFilteredTemplates(
      templates().filter(
        (template) =>
          template.title.toLowerCase().includes(query) ||
          template.tag.toLowerCase().includes(query) ||
          template.content.toLowerCase().includes(query)
      )
    );
  });

  // Fungsi untuk membuka popup
  const openPopup = () => {
    setNewApplication({ title: "", tag: "", content: "" });
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
          app_name: newApplication().title,
          status: newApplication().tag,
          api_key: newApplication().content,
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
          title: newApplication().title,
          tag: newApplication().tag,
          content: newApplication().content,
        },
      ]);
      setFilteredTemplates((prev) => [
        ...prev,
        {
          id: { id: { String: newId } },
          title: newApplication().title,
          tag: newApplication().tag,
          content: newApplication().content,
        },
      ]);
      setNewApplication({ title: "", tag: "", content: "" });
      closePopup();
      await fetchApplication();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Fungsi untuk menyimpan perubahan saat edit
  const saveEdit = async () => {
    const updatedTemplate = editingTemplate();

    let dataResult = {
      app_name: updatedTemplate.title,
      status: updatedTemplate.tag,
      api_key: updatedTemplate.content,
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
      await fetchApplication();
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
            <h2 class="text-lg font-bold mb-4">Add New Application</h2>
            <input
              type="text"
              placeholder="Name App"
              value={newApplication().title}
              onInput={(e) =>
                setNewApplication({
                  ...newApplication(),
                  title: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Status"
              value={newApplication().tag}
              onInput={(e) =>
                setNewApplication({ ...newApplication(), tag: e.target.value })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="API Key"
              value={newApplication().content}
              onInput={(e) =>
                setNewApplication({
                  ...newApplication(),
                  content: e.target.value,
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
                    <h3 class="font-semibold">{item.title}</h3>
                    <div class="space-x-2">
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
                  <p class="inline-block bg-[rgba(30,186,9,0.16)] text-[#1EBA09] px-3 py-1 rounded-md text-sm mb-3">
                    {item.tag}
                  </p>
                  <p class="text-gray-600">{item.content}</p>
                </>
              }
            >
              <div>
                <input
                  type="text"
                  value={editingTemplate()?.title}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      title: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={editingTemplate()?.tag}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      tag: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <textarea
                  value={editingTemplate()?.content}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      content: e.target.value,
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

export default Application;
