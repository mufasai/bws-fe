import { createSignal, createEffect, For } from "solid-js";

interface SmsTemplateProps {
  apiUrl: string; // URL untuk API
}

const SmsTemplate = (props: SmsTemplateProps) => {
  const [templates, setTemplates] = createSignal<
    { title: string; tag: string; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal("");

  // Fetch data dari API
  const fetchSmsTemplates = async () => {
    try {
      const response = await fetch(props.apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch SMS templates");
      }
      const result = await response.json();
      const data = result.data.map((item: any) => ({
        title: item.judul,
        tag: item.content_type,
        content: item.content,
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
  });

  return (
    <div class="space-y-4">
      {isLoading() && <div>Loading...</div>}
      {error() && <div class="text-red-500">{error()}</div>}
      <For each={templates()}>
        {(item) => (
          <div class="bg-white p-4 rounded-lg border-[#989898] border-[1px]">
            <div class="flex justify-between items-center mb-3">
              <h3 class="font-semibold">{item.title}</h3>
              <div class="space-x-2">
                <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]">
                  Edit
                </button>
                <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded border-[#989898] border-[1px]">
                  Delete
                </button>
              </div>
            </div>
            <span class="inline-block bg-[#EBF3FF] text-[#0075FE] px-3 py-1 rounded-md text-sm mb-3">
              {item.tag}
            </span>
            <p class="text-gray-600">{item.content}</p>
          </div>
        )}
      </For>
    </div>
  );
};

export default SmsTemplate;
