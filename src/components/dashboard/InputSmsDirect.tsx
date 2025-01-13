import { createSignal } from "solid-js";

const InputSmsDirect = () => {
  const [phoneNumber, setPhoneNumber] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [status, setStatus] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);

  const countries = [
    { code: "+62", country: "Indonesia", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg" },
    { code: "+1", country: "United States", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" },
    { code: "+44", country: "United Kingdom", flag: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg" },
  ];

  const [selectedCountry, setSelectedCountry] = createSignal(countries[0]);

  const handleReset = () => {
    setPhoneNumber("");
    setMessage("");
    setStatus("");
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const smsData = {
      phone_number: selectedCountry().code + phoneNumber(),
      message: message(),
      status: "pending",
    };

    try {
      // await InputSmsAPI(smsData);
      setStatus("SMS submitted successfully!");
    } catch {
      setError("Failed to send SMS. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="flex flex-col border-2 bg-white rounded-lg p-6 w-full shadow-sm">
      <h2 class="text-xl font-normal mb-6">Input SMS Direct</h2>
      
      {status() && <div class="mb-4 text-green-500">{status()}</div>}
      {error() && <div class="mb-4 text-red-500">{error()}</div>}
      
      <div class="mb-6">
        <label class="block text-sm font-normal mb-2">Phone Number</label>
        <div class="flex">
          <div class="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen())}
              class="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white min-w-[120px]"
              type="button"
            >
              <img 
                src={selectedCountry().flag} 
                alt={selectedCountry().country}
                class="w-5 h-5 rounded-full object-cover" 
              />
              <span class="text-sm font-medium">{selectedCountry().code}</span>
              <svg 
                class="w-4 h-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen() && (
              <div class="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
                {countries.map((country) => (
                  <button
                    type="button"
                    class="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50"
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img 
                      src={country.flag} 
                      alt={country.country}
                      class="w-5 h-5 rounded-full object-cover" 
                    />
                    <span class="text-sm font-medium">{country.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <input
            type="text"
            class="flex-1 ml-2 px-3 py-2 border rounded-lg text-sm"
            placeholder="08xxxxxxxxxx"
            value={phoneNumber()}
            onInput={(e) => setPhoneNumber(e.currentTarget.value)}
          />
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-normal mb-2">Message</label>
        <textarea
          class="w-full p-3 border rounded-lg resize-none text-sm h-24"
          placeholder="Input Messages"
          maxLength={160}
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
        />
        <p class="text-right text-sm text-gray-400 mt-1">
          Max characters: 160
        </p>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleReset}
          class="px-6 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading()}
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {loading() ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default InputSmsDirect;