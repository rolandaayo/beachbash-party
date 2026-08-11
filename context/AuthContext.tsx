"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { API_BASE } from "@/lib/api";

const TOKEN_KEY = "bb_token";

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function authError(data: { error?: string }, fallback: string) {
  return new Error(data?.error || fallback);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get(TOKEN_KEY);
    if (!savedToken) {
      setIsLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${savedToken}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Session expired");
        return res.json();
      })
      .then(({ user: usr }) => {
        setToken(savedToken);
        setUser(usr);
      })
      .catch(() => {
        Cookies.remove(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const persist = (tkn: string, usr: AuthUser) => {
    Cookies.set(TOKEN_KEY, tkn, { expires: 7, sameSite: "Lax", path: "/" });
    setToken(tkn);
    setUser(usr);
  };

  const register = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      phone?: string,
    ) => {
      let res: Response;
      try {
        res = await fetch(`${API_BASE}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password,
            phone: phone?.trim() || undefined,
          }),
        });
      } catch {
        throw new Error("Cannot reach server. Is the API running?");
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw authError(data, "Registration failed");
      persist(data.token, data.user);
    },
    [],
  );

  const login = useCallback(async (email: string, password: string) => {
    let res: Response;
    try {
      res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
    } catch {
      throw new Error("Cannot reach server. Is the API running?");
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw authError(data, "Login failed");
    persist(data.token, data.user);
  }, []);

  const logout = useCallback(async () => {
    const savedToken = Cookies.get(TOKEN_KEY);
    if (savedToken) {
      fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${savedToken}` },
      }).catch(() => {});
    }
    Cookies.remove(TOKEN_KEY, { path: "/" });
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
