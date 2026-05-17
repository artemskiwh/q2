"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export interface Profile {
  name: string;
  email: string;
}

type Result = { ok: true } | { ok: false; error: string };

interface AuthCtx {
  profile: Profile | null;
  register: (name: string, email: string, password: string) => Result;
  login: (email: string, password: string) => Result;
  logout: () => void;
  // setProfile retained for the small "edit name/email" form on /profile
  setProfile: (p: Profile) => void;
}

const USERS_KEY = "tyag_auth_users";
const CURRENT_KEY = "tyag_auth_current";

const noop: AuthCtx = {
  profile: null,
  register: () => ({ ok: false, error: "not ready" }),
  login: () => ({ ok: false, error: "not ready" }),
  logout: () => {},
  setProfile: () => {},
};

const AuthContext = createContext<AuthCtx>(noop);

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}

const normEmail = (e: string) => e.trim().toLowerCase();

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile | null>(null);

  useEffect(() => {
    try {
      const email = localStorage.getItem(CURRENT_KEY);
      if (!email) return;
      const user = loadUsers().find((u) => u.email === email);
      if (user) setProfileState({ name: user.name, email: user.email });
    } catch {}
  }, []);

  const persistCurrent = (p: Profile | null) => {
    setProfileState(p);
    try {
      if (p) localStorage.setItem(CURRENT_KEY, p.email);
      else localStorage.removeItem(CURRENT_KEY);
    } catch {}
  };

  const register = (name: string, email: string, password: string): Result => {
    const e = normEmail(email);
    if (!name.trim()) return { ok: false, error: "Введите имя" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return { ok: false, error: "Некорректный email" };
    }
    if (password.length < 6) return { ok: false, error: "Пароль минимум 6 символов" };

    const users = loadUsers();
    if (users.some((u) => u.email === e)) {
      return { ok: false, error: "Email уже зарегистрирован" };
    }
    const next = [...users, { name: name.trim(), email: e, password }];
    saveUsers(next);
    persistCurrent({ name: name.trim(), email: e });
    return { ok: true };
  };

  const login = (email: string, password: string): Result => {
    const e = normEmail(email);
    const user = loadUsers().find((u) => u.email === e);
    if (!user) return { ok: false, error: "Пользователь не найден" };
    if (user.password !== password) return { ok: false, error: "Неверный пароль" };
    persistCurrent({ name: user.name, email: user.email });
    return { ok: true };
  };

  const logout = () => persistCurrent(null);

  const setProfile = (p: Profile) => {
    if (!profile) return;
    const users = loadUsers();
    const idx = users.findIndex((u) => u.email === profile.email);
    if (idx === -1) return;
    const updated = { ...users[idx], name: p.name, email: normEmail(p.email) };
    users[idx] = updated;
    saveUsers(users);
    persistCurrent({ name: updated.name, email: updated.email });
  };

  return (
    <AuthContext.Provider value={{ profile, register, login, logout, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useProfile = () => useContext(AuthContext);
