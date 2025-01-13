import { createSignal, createEffect, For, Show } from "solid-js";

interface GatewayProps {
  apiUrl: string; // URL untuk API
}

const Gateway = (props: GatewayProps) => {
  const [templates, setTemplates] = createSignal<
    {
      id: { id: { String: string } };
      title: string;
      status: string;
      tagpriority: string;
      content: string;
    }[]
  >([]);
  const [filteredTemplates, setFilteredTemplates] = createSignal<
    {
      id: { id: { String: string } };
      title: string;
      status: string;
      tagpriority: string;
      content: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal("");
  const [editingTemplate, setEditingTemplate] = createSignal<any>(null);
  const [isPopupOpen, setIsPopupOpen] = createSignal(false);
  const [newGateway, setNewGateway] = createSignal({
    title: "",
    status: "",
    tagpriority: "",
    content: "",
  });
  const [searchQuery, setSearchQuery] = createSignal("");

  // Fungsi untuk membuka popup
  const openPopup = () => {
    setNewGateway({ title: "", status: "", tagpriority: "", content: "" });
    setIsPopupOpen(true);
  };

  // Fungsi untuk menutup popup
  const closePopup = () => setIsPopupOpen(false);

  // Fetch data dari API
  const fetchGateway = async () => {
    try {
      const response = await fetch(props.apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }
      const result = await response.json();
      const data = result.data.map((item: any) => ({
        id: { id: { String: item.id.id.String } }, // Sesuaikan dengan struktur yang benar
        title: item.app_name,
        status: item.status,
        tagpriority: item.priority,
        content: item.failover,
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
    fetchGateway();
  }, []);

  // Filter templates berdasarkan searchQuery
  createEffect(() => {
    const query = searchQuery().toLowerCase();
    setFilteredTemplates(
      templates().filter(
        (template) =>
          template.title.toLowerCase().includes(query) ||
          template.status.toLowerCase().includes(query) ||
          template.tagpriority.toLowerCase().includes(query) ||
          template.content.toLowerCase().includes(query)
      )
    );
  });

  // Fungsi untuk menambahkan template baru
  const addGateway = async () => {
    try {
      const response = await fetch(props.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_name: newGateway().title,
          status: newGateway().status,
          priority: newGateway().tagpriority,
          failover: newGateway().content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add gateway");
      }

      const result = await response.json();
      console.log(result, "result");

      // Periksa struktur hasil respons API
      const newId = result.data.id?.id?.String || "unknown-id"; // Menangani nested ID

      // Update templates dengan data baru
      setTemplates((prev) => [
        ...prev,
        {
          id: { id: { String: newId } }, // Sesuaikan dengan struktur yang benar
          title: newGateway().title,
          status: newGateway().status,
          tagpriority: newGateway().tagpriority,
          content: newGateway().content,
        },
      ]);

      // Update filteredTemplates juga
      setFilteredTemplates((prev) => [
        ...prev,
        {
          id: { id: { String: newId } },
          title: newGateway().title,
          status: newGateway().status,
          tagpriority: newGateway().tagpriority,
          content: newGateway().content,
        },
      ]);

      // Reset form dan tutup popup
      setNewGateway({ title: "", status: "", tagpriority: "", content: "" });
      closePopup();

      // Opsional: Refresh data dari server untuk memastikan sinkronisasi
      await fetchGateway();
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    }
  };

  // Fungsi untuk menghapus data
  const deleteGateway = async (id: { id: { String: string } }) => {
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

  // Fungsi untuk menyimpan perubahan saat edit
  const saveEdit = async () => {
    const updatedGateway = editingTemplate();

    let dataResult = {
      app_name: updatedGateway.title,
      status: updatedGateway.status,
      priority: updatedGateway.tagpriority,
      failover: updatedGateway.content,
    };

    try {
      const response = await fetch(
        `${props.apiUrl}/${updatedGateway.id.id.String}`,
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
        throw new Error(errorData.message || "Failed to update gateway");
      }

      // Refresh data dari server untuk memastikan data terbaru
      await fetchGateway();
      setEditingTemplate(null);
    } catch (err: any) {
      console.error("Update error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div class="space-y-4">
      {/* Search and Add New */}
      <div class="flex gap-4 mb-4 bg-white">
        <div class="flex-1 relative">
          <input
            type="text"
            placeholder="Search anything"
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.target.value)}
            class="w-full px-4 py-2 border-[#989898] border-[1px] rounded-lg"
          />
          <span class="absolute right-3 top-2.5">🔍</span>
        </div>
        <button
          onClick={openPopup}
          class="px-4 py-2 bg-[#0075FE] text-white rounded-lg flex items-center gap-2"
        >
          + Add New
        </button>
      </div>

      {/* Popup Form */}
      <Show when={isPopupOpen()}>
        <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-bold mb-4">Add New Template</h2>
            <input
              type="text"
              placeholder="Name App"
              value={newGateway()?.title}
              onInput={(e) =>
                setNewGateway({
                  ...newGateway(),
                  title: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Status"
              value={newGateway()?.status}
              onInput={(e) =>
                setNewGateway({ ...newGateway(), status: e.target.value })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Priority"
              value={newGateway()?.tagpriority}
              onInput={(e) =>
                setNewGateway({
                  ...newGateway(),
                  tagpriority: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Failover"
              value={newGateway()?.content}
              onInput={(e) =>
                setNewGateway({
                  ...newGateway(),
                  content: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <div class="flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                class="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addGateway}
                class="px-4 py-2 bg-[#0075FE] text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Show>

      {isLoading() && <div>Loading...</div>}
      {error() && <div class="text-red-500">{error()}</div>}

      <For each={filteredTemplates()}>
        {(item) => (
          <div class="bg-white p-4 rounded-lg border-[#989898] border-[1px]">
            <Show
              when={editingTemplate()?.id?.id?.String === item.id.id.String}
              fallback={
                <>
                  <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold">{item.title}</h3>
                    <div class="space-x-2">
                      <button
                        class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]"
                        onClick={() => setEditingTemplate(item)}
                      >
                        Edit
                      </button>
                      <button
                        class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]"
                        onClick={() => deleteGateway(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div class="flex flex-row space-x-2">
                    <p class="inline-block bg-[rgba(30,186,9,0.16)] text-[#1EBA09] px-3 py-1 rounded-md text-sm mb-3">
                      {item.status}
                    </p>
                    <p class="inline-block bg-[#EBEBEB] text-[#313131] px-3 py-1 rounded-md text-sm mb-3">
                      priority: {item.tagpriority}
                    </p>
                  </div>
                  <p class="text-gray-600">failover: {item.content}</p>
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
                  value={editingTemplate()?.status}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      status: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={editingTemplate()?.tagpriority}
                  onInput={(e) =>
                    setEditingTemplate({
                      ...editingTemplate(),
                      tagpriority: e.target.value,
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
                  class="px-4 py-2 bg-[#0075FE] text-white rounded-lg mr-2"
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
    </div>
  );
};

export default Gateway;
