import { createSignal } from "solid-js";

const FileUpload = () => {
  const [fileName, setFileName] = createSignal("");

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      setFileName(target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleUpload = () => {
    // Implement upload logic here
    alert("File uploaded successfully!");
  };

  return (
    <div class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-white rounded-lg p-6 w-full h-70 cursor-pointer relative">
      <div class="text-center">
        <img
          src="/Upload.svg"
          alt="Upload Icon"
          class="h-12 w-12 mb-2"
          onError={(e) => (e.currentTarget.src = '/default-image.png')}
        />
        <p class="text-sm text-gray-500">
          {fileName() || "Select or drop your file"}
        </p>
      </div>
      <input
        type="file"
        class="absolute inset-0 w-full h-full opacity-0"
        onChange={handleFileChange}
      />
      <button
        class="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
