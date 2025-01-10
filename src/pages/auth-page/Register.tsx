<<<<<<< HEAD
import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../../store/auth.store";
import { Logo } from "../../components/common/Logo";

const Register: Component = () => {
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
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword());

    return (
        <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex">
            {/* Left Column - Form */}
            <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
                <div class="max-w-2xl w-full mx-auto">
                    <Logo />
                    
                    <div class="bg-white p-8 rounded-2xl shadow-lg mt-8">
                        <div class="mb-8">
                            <h1 class="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                            <p class="text-gray-600">Join us to start managing your projects</p>
                        </div>

                        <form onSubmit={handleSubmit} class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Company name"
                                    />
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Project</label>
                                    <select
                                        name="project"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="" disabled selected>Select Project</option>
                                        <option value="1">Project 1</option>
                                        <option value="2">Project 2</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label class="text-sm font-medium text-gray-700 block mb-2">Password</label>
                                <div class="relative">
                                    <input
                                        type={showPassword() ? "password" : "text"}
                                        name="password"
                                        required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Create a strong password"
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
                                {isLoading() ? "Creating account..." : "Create Account"}
                            </button>

                            <div class="relative">
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
                                <span>Sign up with Google</span>
                            </button>

                            <p class="text-center text-gray-600 text-sm">
                                Already have an account?{" "}
                                <a href="/login" class="text-blue-600 hover:text-blue-800 font-semibold">
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Column - Image */}
            <div class="hidden lg:block w-1/2 bg-cover bg-center" style="background-image: url('/right-column-login.png')">
                <div class="h-full w-full bg-blue-900 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                    <div class="max-w-md text-white text-center p-8">
                        <h2 class="text-4xl font-bold mb-4">Join Our Community</h2>
                        <p class="text-lg">Start your journey with us and experience the next level of project management.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

=======
import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../../store/auth.store";
import { Logo } from "../../components/common/Logo";

const Register: Component = () => {
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
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword());

    return (
        <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex">
            {/* Left Column - Form */}
            <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
                <div class="max-w-2xl w-full mx-auto">
                    <Logo />
                    
                    <div class="bg-white p-8 rounded-2xl shadow-lg mt-8">
                        <div class="mb-8">
                            <h1 class="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                            <p class="text-gray-600">Join us to start managing your projects</p>
                        </div>

                        <form onSubmit={handleSubmit} class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Company name"
                                    />
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-700 block mb-2">Project</label>
                                    <select
                                        name="project"
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="" disabled selected>Select Project</option>
                                        <option value="1">Project 1</option>
                                        <option value="2">Project 2</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label class="text-sm font-medium text-gray-700 block mb-2">Password</label>
                                <div class="relative">
                                    <input
                                        type={showPassword() ? "password" : "text"}
                                        name="password"
                                        required
                                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Create a strong password"
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
                                {isLoading() ? "Creating account..." : "Create Account"}
                            </button>

                            <div class="relative">
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
                                <span>Sign up with Google</span>
                            </button>

                            <p class="text-center text-gray-600 text-sm">
                                Already have an account?{" "}
                                <a href="/login" class="text-blue-600 hover:text-blue-800 font-semibold">
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Column - Image */}
            <div class="hidden lg:block w-1/2 bg-cover bg-center" style="background-image: url('/right-column-login.png')">
                <div class="h-full w-full bg-blue-900 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                    <div class="max-w-md text-white text-center p-8">
                        <h2 class="text-4xl font-bold mb-4">Join Our Community</h2>
                        <p class="text-lg">Start your journey with us and experience the next level of project management.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

>>>>>>> 6f6949f4938d86ba0e2c06119519abfba8adc3d1
export default Register; 