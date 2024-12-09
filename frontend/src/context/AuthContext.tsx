"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Ensure the correct import for jwt-decode

// Define types for the auth context
interface AuthContextType {
  user: any;
  authTokens: AuthTokens | null;
  registerUser: (
    userData: Record<string, any>
  ) => Promise<{ success: boolean; errors?: Record<string, any> }>;
  loginUser: (credentials: Record<string, any>) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const logoutUser = useCallback(() => {
    localStorage.removeItem("authTokens");
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuthTokens(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  const updateToken = useCallback(async () => {
    if (!authTokens?.refresh) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: authTokens.refresh }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAuthTokens(data);
        setUser({ ...user, ...jwtDecode(data.access) });
        localStorage.setItem("authTokens", JSON.stringify(data));
        document.cookie = `auth_token=${data.access}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict; Secure`;
      } else {
        logoutUser(); // Use the logoutUser function here
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      logoutUser(); // Use the logoutUser function here
    } finally {
      setLoading(false);
    }
  }, [authTokens, logoutUser]); // Make sure logoutUser is in the dependency array

  const registerUser = async (userData: Record<string, any>) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(response);

      if (response.ok) {
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, errors: data };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        errors: { non_field_errors: ["An unexpected error occurred"] },
      };
    }
  };

  const loginUser = async (credentials: Record<string, any>) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthTokens(data);
        setUser({
          email: data.user_details.email,
          username: data.user_details.username,
          role: data.user_details.role,
          ...jwtDecode(data.access),
        });
        localStorage.setItem("authTokens", JSON.stringify(data));
        document.cookie = `auth_token=${data.access}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict; Secure`;
        router.push("/dashboard");
      } else {
        throw new Error(data.detail || "Login failed");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Login error");
    }
  };

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      const tokens = JSON.parse(storedTokens);
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    let interval: NodeJS.Timeout;

    if (authTokens) {
      interval = setInterval(() => {
        updateToken();
      }, REFRESH_INTERVAL);
    }

    return () => clearInterval(interval);
  }, [authTokens, updateToken]);

  const contextData: AuthContextType = {
    user,
    authTokens,
    registerUser,
    loginUser,
    logoutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
