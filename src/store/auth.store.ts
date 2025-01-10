import { createStore } from "solid-js/store";
// import { createSignal } from "solid-js";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const [authState, setAuthState] = createStore<AuthState>({
  user: null,
  isAuthenticated: false,
});

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    // Simulasi login
    if (email && password) {
      setAuthState({
        user: { email, name: "User Test" },
        isAuthenticated: true,
      });
      localStorage.setItem("auth", "true");
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("auth");
  };

  return {
    authState,
    login,
    logout,
  };
}; 