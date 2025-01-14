import { createSignal, createEffect, For, Show } from "solid-js";

interface SmsTemplateProps {
  apiUrl: string;
}

const SmsTemplate = (props: SmsTemplateProps) => {
  const [templates, setTemplates] = createSignal<
    {
      id: { id: { String: string } };
      judul: string;
      content_type: string;
      content: string;
      created_by: string;
    }[]
  >([]);
  const [filteredTemplates, setFilteredTemplates] = createSignal<
    {
      id: { id: { String: string } };
      judul: string;
      content_type: string;
      content: string;
      created_by: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal("");
  const [isPopupOpen, setIsPopupOpen] = createSignal(false);
  const [editingSmsTemplate, setEditingSmsTemplate] = createSignal<any>(null);
  const [newSmsTemplate, setNewSmsTemplate] = createSignal({
    judul: "",
    content_type: "",
    content: "",
    created_by: "",
  });
  const [searchQuery, setSearchQuery] = createSignal("");
  const [currentPage, setCurrentPage] = createSignal(1);
  const [pageSize] = createSignal(3); // Change from 8 to 3 items per page
  const [totalItems, setTotalItems] = createSignal(0);

  // Fetch data dari API
  const fetchSmsTemplates = async () => {
    try {
      const response = await fetch(props.apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch SMS templates");
      }
      const result = await response.json();
      const data = result.data.map((item: any) => ({
        id: { id: { String: item.id.id.String } },
        judul: item.judul,
        content_type: item.content_type,
        content: item.content,
        created_by: item.created_by,
      }));
      setTemplates(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fetch API saat komponen di-mount
  createEffect(() => {
    fetchSmsTemplates();
  }, []);

  //fungsi menambah data sms template
  const addSmsTemplate = async () => {
    try {
      const response = await fetch(props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          judul: newSmsTemplate().judul,
          content_type: newSmsTemplate().content_type,
          content: newSmsTemplate().content,
          created_by: newSmsTemplate().created_by,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add SMS template");
      }
      const result = await response.json();
      console.log(result, "result");
      const newId = result.data.id?.id?.String || "unknown-id";
      setTemplates((prev) => [
        ...prev,
        {
          id: { id: { String: newId } },
          judul: newSmsTemplate().judul,
          content_type: newSmsTemplate().content_type,
          content: newSmsTemplate().content,
          created_by: newSmsTemplate().created_by,
        },
      ]);
      setFilteredTemplates((prev) => [
        ...prev,
        {
          id: { id: { String: newId } },
          judul: newSmsTemplate().judul,
          content_type: newSmsTemplate().content_type,
          content: newSmsTemplate().content,
          created_by: newSmsTemplate().created_by,
        },
      ]);
      setNewSmsTemplate({
        judul: "",
        content_type: "",
        content: "",
        created_by: "",
      });
      closePopup();
      await fetchSmsTemplates();
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    }
  };

  //edit sms template
  const saveEditSmsTemplate = async () => {
    const updatedGateway = editingSmsTemplate();

    let dataResult = {
      judul: updatedGateway.judul,
      content_type: updatedGateway.content_type,
      content: updatedGateway.content,
      created_by: updatedGateway.created_by,
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
        throw new Error(errorData.message || "Failed to update ssms template");
      }

      // Refresh data dari server untuk memastikan data terbaru
      await fetchSmsTemplates();
      setEditingSmsTemplate(null);
    } catch (err: any) {
      console.error("Update error:", err.message);
      setError(err.message);
    }
  };

  //delete sms template
  const deleteSmsTemplate = async (id: { id: { String: string } }) => {
    try {
      const response = await fetch(`${props.apiUrl}/${id.id.String}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete sms template");
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

  //fungsi membuka popup
  const openPopup = () => {
    setNewSmsTemplate({
      judul: "",
      content_type: "",
      content: "",
      created_by: "",
    });
    setIsPopupOpen(true);
  };
  //fungsi untuk menutup popup
  const closePopup = () => setIsPopupOpen(false);
  // Filter templates berdasarkan searchQuery
  createEffect(() => {
    const query = searchQuery().toLowerCase();
    setFilteredTemplates(
      templates().filter(
        (template) =>
          template.judul.toLowerCase().includes(query) ||
          template.content_type.toLowerCase().includes(query) ||
          template.content.toLowerCase().includes(query) ||
          template.created_by.toLowerCase().includes(query)
      )
    );
  });

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

      <Show when={isPopupOpen()}>
        <div
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ height: "100vh" }}
        >
          <div class="bg-white p-6 rounded-lg shadow-lg w-[50%]">
            <h2 class="text-lg font-bold mb-4">Add New Sms Template</h2>
            <input
              type="text"
              placeholder="Judul"
              value={newSmsTemplate()?.judul}
              onInput={(e) =>
                setNewSmsTemplate({
                  ...newSmsTemplate(),
                  judul: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Content Type"
              value={newSmsTemplate()?.content_type}
              onInput={(e) =>
                setNewSmsTemplate({
                  ...newSmsTemplate(),
                  content_type: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Content"
              value={newSmsTemplate()?.content}
              onInput={(e) =>
                setNewSmsTemplate({
                  ...newSmsTemplate(),
                  content: e.target.value,
                })
              }
              class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Created by"
              value={newSmsTemplate()?.created_by}
              onInput={(e) =>
                setNewSmsTemplate({
                  ...newSmsTemplate(),
                  created_by: e.target.value,
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
                onClick={addSmsTemplate}
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

      <For each={currentItems()}>
        {(item) => (
          <div class="bg-white p-4 rounded-lg border-[#989898] border-[1px]">
            <Show
              when={editingSmsTemplate()?.id?.id?.String === item.id.id.String}
              fallback={
                <>
                  <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold">{item.judul}</h3>
                    <div class="space-x-2">
                      <button
                        class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]"
                        onClick={() => setEditingSmsTemplate(item)}
                      >
                        Edit
                      </button>
                      <button
                        class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]"
                        onClick={() => deleteSmsTemplate(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <span class="inline-block bg-[#EBF3FF] text-[#0075FE] px-3 py-1 rounded-md text-sm mb-3">
                    {item.content_type}
                  </span>
                  <p class="text-gray-600">{item.content}</p>
                </>
              }
            >
              <div>
                <input
                  type="text"
                  value={editingSmsTemplate()?.judul}
                  onInput={(e) =>
                    setEditingSmsTemplate({
                      ...editingSmsTemplate(),
                      judul: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={editingSmsTemplate()?.content_type}
                  onInput={(e) =>
                    setEditingSmsTemplate({
                      ...editingSmsTemplate(),
                      content_type: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={editingSmsTemplate()?.content}
                  onInput={(e) =>
                    setEditingSmsTemplate({
                      ...editingSmsTemplate(),
                      content: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <textarea
                  value={editingSmsTemplate()?.created_by}
                  onInput={(e) =>
                    setEditingSmsTemplate({
                      ...editingSmsTemplate(),
                      created_by: e.target.value,
                    })
                  }
                  class="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
                />
                <button
                  class="px-4 py-2 bg-[#0075FE] text-white rounded-lg mr-2"
                  onClick={saveEditSmsTemplate}
                >
                  Save
                </button>
                <button
                  class="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  onClick={() => setEditingSmsTemplate(null)}
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

export default SmsTemplate;
