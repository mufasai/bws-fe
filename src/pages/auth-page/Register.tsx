import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../../store/auth.store";

interface ApiError {
  message: string;
  status?: string;
}

interface RegistrationResponse {
  status: string;
  message?: string;
  data?: any;
}

const Register: Component = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(true);
  const [showPopup, setShowPopup] = createSignal(false);
  const [token, setToken] = createSignal("");
  const [email, setEmail] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const firstName =
      (form.elements.namedItem("firstName") as HTMLInputElement)?.value || "";
    const lastName =
      (form.elements.namedItem("lastName") as HTMLInputElement)?.value || "";
    const username =
      (form.elements.namedItem("username") as HTMLInputElement)?.value || "";
    const dob =
      (form.elements.namedItem("dob") as HTMLInputElement)?.value || "";
    const emailValue =
      (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const password =
      (form.elements.namedItem("password") as HTMLInputElement)?.value || "";

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      dob: dob,
      email: emailValue,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        throw new Error(
          errorData.message || "Registration failed. Please try again."
        );
      }

      const result = (await response.json()) as RegistrationResponse;
      if (result.status === "success") {
        setEmail(emailValue);
        setShowPopup(true);
      } else {
        throw new Error(result.message || "Registration failed.");
      }
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenVerification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/verify_email?token=${encodeURIComponent(
          token()
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = (await response.json()) as ApiError;
        throw new Error(errorData.message || "Token verification failed.");
      }

      const result = (await response.json()) as RegistrationResponse;
      if (result.status === "success") {
        setShowPopup(false); // Tutup popup
        setTimeout(() => navigate("/login"), 300); // Navigasi dengan delay
      } else {
        throw new Error(result.message || "Verification failed.");
      }
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword());

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else if (typeof err === "string") {
      setError(err);
    } else if (typeof err === "object" && err !== null && "message" in err) {
      setError((err as ApiError).message);
    } else {
      setError("An unknown error occurred.");
    }
  };

  return (
    <div
      class="min-h-screen bg-white flex"
      style="background-image: url('/Pattern.png'); background-repeat: repeat; background-size: 800px 800px; overflow: hidden;"
    >
      {/* Left Column - Form */}
      <div class="w-full lg:w-1/2 flex flex-col justify-center p-4 lg:p-9">
        <div class="max-w-2xl w-full mx-auto">
          {/* Logo */}
          <div class="top-2 mb-5 left-8 ">
            <img src="/Logo (1).png" alt="Logo" class="h-11 w-auto" />
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-xl">
            <div class="mb-4">
              <h1 class="text-lg font-semibold text-gray-800 mb-1">Sign Up</h1>
              <p class="text-gray-600 text-xs">
                Let's get you all setup so you can access your personal account.
              </p>
            </div>

            <form onSubmit={handleSubmit} class="space-y-1">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                <div>
                  <label class="text-xs font-medium text-gray-700 block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    class="w-full px-2 py-1.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label class="text-xs font-medium text-gray-700 block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    class="w-full px-2 py-1.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                  />
                </div>

                <div>
                  <label class="text-xs font-medium text-gray-700 block mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    class="w-full px-2 py-1.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Username"
                  />
                </div>

                <div>
                  <label class="text-xs font-medium text-gray-700 block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    class="w-full px-2 py-1.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label class="text-xs font-medium text-gray-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  class="w-full px-2 py-1.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label class="text-xs font-medium text-gray-700 block mb-1">
                  Password
                </label>
                <div class="relative">
                  <input
                    type={showPassword() ? "password" : "text"}
                    name="password"
                    required
                    class="w-full px-2 py-1.5 mb-5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    class="absolute inset-y-0 right-0 pr-2 flex items-center"
                  >
                    {showPassword() ? (
                      <svg
                        class="h-4 w-4 text-gray-400 mb-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        class="h-4 w-4 text-gray-400 mb-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error() && (
                <div class="bg-red-50 text-red-500 px-3 py-1.5 rounded-md text-xs mt-2">
                  <p>{error()}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading()}
                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-4"
              >
                {isLoading() ? "Registering..." : "Sign Up"}
              </button>

              <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-center gap-4">
                {/* Google Button */}
                <button
                  type="button"
                  class="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition duration-200"
                >
                  <img src="/google-icon.svg" alt="Google" class="w-6 h-6" />
                </button>

                {/* Facebook Button */}
                <button
                  type="button"
                  class="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition duration-200"
                >
                  <i class="fab fa-facebook-f text-blue-600 text-lg"></i>
                </button>

                {/* Apple Button */}
                <button
                  type="button"
                  class="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition duration-200"
                >
                  <i class="fab fa-apple text-gray-900 text-2xl"></i>
                </button>
              </div>

              <p class="mt-6 text-center text-gray-600 text-sm">
                Alredy have account?{" "}
                <a
                  href="/login"
                  class="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div class="hidden lg:block w-1/2 relative overflow-hidden">
        <div
          class="absolute -right-[45%] bottom-10 w-[140%] h-[140%] bg-cover bg-no-repeat"
          style="
              background-image: url('/City-Register.png');
              background-position: left top;
              transform: rotate(0deg);
              transform-origin: top left;
              filter: brightness(1.1) contrast(0.95);
          "
        ></div>
      </div>

      {/* Email verification popup */}
      {showPopup() && (
        <div class="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
            <h2 class="text-lg font-semibold mb-4">Verify your email</h2>
            <p class="text-xs text-gray-700 mb-4">
              Please enter the verification token sent to your email address.
            </p>
            <input
              type="text"
              value={token()}
              onInput={(e) => setToken(e.currentTarget.value)}
              placeholder="Enter token"
              class="w-full px-3 py-2 rounded-md border border-gray-300 mb-4"
            />
            <button
              onClick={handleTokenVerification}
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              disabled={isLoading()}
            >
              {isLoading() ? "Verifying..." : "Verify Email"}
            </button>
            {error() && <p class="text-xs text-red-500 mt-2">{error()}</p>}
            <button
              class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md mt-4"
              onClick={() => navigate("/login")} // Navigasi ke login
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
