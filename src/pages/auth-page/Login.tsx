import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../../store/auth.store";
import { Logo } from "../../components/common/Logo";
import Swal from "sweetalert2";
import { LoginAPI } from "../../services/service";

const Login: Component = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(true);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
        // const response = await LoginAPI(username, password);
        const response = {status: true,message: "Login successful"}
      
      if (response.status === true) {
        await login(username, password);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.message || "Invalid email or password",
          confirmButtonColor: "#3B82F6"
        });
      }
    } catch (err) {
      setError("An error occurred during login");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to connect to the server",
        confirmButtonColor: "#3B82F6"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left Column - Form */}
      <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
        <div class="max-w-md w-full mx-auto">
          <Logo />
          
          <div class="bg-white p-8 rounded-2xl shadow-lg mt-8">
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
              <p class="text-gray-600">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-2">
                  Email / Username
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    class="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email or username"
                  />
                </div>
              </div>

              <div>
                <label class="text-sm font-medium text-gray-700 block mb-2">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword() ? "password" : "text"}
                    name="password"
                    required
                    class="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword() ? (
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    class="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <label for="remember" class="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>

              {error() && (
                <div class="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm">
                  {error()}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading()}
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                {isLoading() ? (
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>

              <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                class="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-200"
              >
                <img src="/google-icon.svg" alt="Google" class="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
            </form>

            <p class="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <a href="/register" class="text-blue-600 hover:text-blue-800 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div class="hidden lg:block w-1/2 bg-cover bg-center" style="background-image: url('/right-column-login.png')">
        <div class="h-full w-full bg-blue-900 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
          <div class="max-w-md text-white text-center p-8">
            <h2 class="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
            <p class="text-lg">Manage your projects and teams efficiently with our comprehensive solution.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 