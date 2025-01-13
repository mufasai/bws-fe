import { Component, createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../../store/auth.store";
import Swal from "sweetalert2";
import {
  LoginAPI,
  ForgotPasswordAPI,
  ResetPasswordAPI,
} from "../../services/service";
import "sweetalert2/dist/sweetalert2.min.css";

const Login: Component = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(true);

  // Function to show email input popup
  // Function to show email input popup
  const showForgotPasswordEmailPopup = async () => {
    try {
      const { value: email } = await Swal.fire({
        title: "Forgot Password",
        input: "email",
        inputLabel: "Email address",
        inputPlaceholder: "Enter your email address",
        showCancelButton: true,
        confirmButtonText: "Send Verification Code",
        confirmButtonColor: "#3B82F6",
        showLoaderOnConfirm: true,
        preConfirm: async (email) => {
          if (!email) {
            Swal.showValidationMessage("Please enter your email");
            return false;
          }
          try {
            const response = await ForgotPasswordAPI(email);
            return { email, response };
          } catch (error) {
            Swal.showValidationMessage(
              `Request failed: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
            );
            return false;
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (email?.response) {
        await Swal.fire({
          icon: "success",
          title: "Verification Code Sent",
          text: "Please check your email for the verification code",
          confirmButtonColor: "#3B82F6",
        });
        await showResetPasswordPopup(email.email);
      }
    } catch (error) {
      console.error("Error in forgot password flow:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

  // Function to show verification code and new password popup
  const showResetPasswordPopup = async (email: string) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Reset Password",
        html: `
        <input id="swal-input1" class="swal2-input" placeholder="Verification Code">
        <input id="swal-input2" class="swal2-input" type="password" placeholder="New Password">
        <input id="swal-input3" class="swal2-input" type="password" placeholder="Confirm New Password">
      `,
        focusConfirm: false,
        confirmButtonText: "Reset Password",
        confirmButtonColor: "#3B82F6",
        showCancelButton: true,
        preConfirm: async () => {
          const verificationCode = (
            document.getElementById("swal-input1") as HTMLInputElement
          ).value;
          const newPassword = (
            document.getElementById("swal-input2") as HTMLInputElement
          ).value;
          const confirmPassword = (
            document.getElementById("swal-input3") as HTMLInputElement
          ).value;

          if (!verificationCode || !newPassword || !confirmPassword) {
            Swal.showValidationMessage("Please fill in all fields");
            return false;
          }

          if (newPassword !== confirmPassword) {
            Swal.showValidationMessage("Passwords do not match");
            return false;
          }

          try {
            const response = await ResetPasswordAPI(
              email,
              verificationCode,
              newPassword
            );
            return response;
          } catch (error) {
            Swal.showValidationMessage(
              `Reset failed: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
            );
            return false;
          }
        },
      });

      if (formValues) {
        await Swal.fire({
          icon: "success",
          title: "Password Reset Successful",
          text: "You can now login with your new password",
          confirmButtonColor: "#3B82F6",
        });
      }
    } catch (error) {
      console.error("Error in reset password flow:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const response = await LoginAPI(username, password);

      if (response.status === "success") {
        await login(username, password);
        const result = await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Click OK to continue to dashboard",
          confirmButtonText: "OK",
          confirmButtonColor: "#3B82F6",
          showConfirmButton: true,
          allowOutsideClick: false,
        });

        if (result.isConfirmed) {
          navigate("/ProjectPage", { replace: true });
        }
      } else {
        setError(response.message);
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.message,
          confirmButtonColor: "#3B82F6",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  return (
    <div
      class="min-h-screen bg-white flex"
      style="background-image: url('/Pattern.png'); background-repeat: repeat; background-size: 800px 800px; overflow: hidden;"
    >
      {/* Left Column - Image */}
      <div class="hidden lg:block w-1/2 relative overflow-hidden">
        <div
          class="absolute -left-[45%] top-0 w-[150%] h-[150%] bg-cover bg-no-repeat"
          style="
            background-image: url('/City-Login.png');
            background-position: left bottom;
            transform: rotate(0deg);
            transform-origin: bottom left;
            filter: brightness(1.1) contrast(0.95);
          "
        ></div>
      </div>
      {/* Right Column - Form */}
      <div class="w-full lg:w-1/2 justify-center p-8 mb-10 mt-5 lg:px-20 lg:py-1">
        <div class="max-w-md w-full mx-auto">
          {/* Logo BWS */}
          <div class="flex justify-center mb-6">
            <img
              src="/Logo (1).png"
              alt="BWS Logo"
              class="h-11 w-auto"
              style="margin-left: 310px;"
            />
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-lg mt-8">
            <div class="mb-8">
              <h1 class="text-2xl font-bold text-gray-800 mb-2">Login</h1>
              <p class="text-gray-600 text-1xl">
                Login with your personal account
              </p>
            </div>

            <form onSubmit={handleSubmit} class="space-y-2">
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-2">
                  Username
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    class="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label class="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
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
                      <svg
                        class="h-5 w-5 text-gray-400"
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
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411l-3.292-3.29M2 12a9.97 9.97 0 011.562-3.03A9.967 9.967 0 0112 5c4.478 0 8.268 2.943 9.543 7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Button */}
              <button
                type="button"
                onClick={() => showForgotPasswordEmailPopup()}
                class="text-sm text-blue-600 hover:text-blue-800 font-semibold focus:outline-none"
              >
                Forgot Password?
              </button>

              {error() && (
                <div class="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm">
                  {error()}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading()}
                class="w-full bg-[#1A80C5] hover:bg-[#1A80C5] text-white font-medium py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
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
            </form>

            <p class="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                class="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
