"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icons";
import { useProfile } from "@/components/ProfileProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useProfile();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const r = login(email, password);
    if (!r.ok) return setError(r.error);
    router.push("/profile");
  };

  return (
    <div className="container-page py-10 md:py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-bg-line bg-bg-card p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand">
              <Icon.User className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Вход</h1>
              <p className="text-sm text-muted">С почтой и паролем</p>
            </div>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <Field
              label="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="opt@example.ru"
              autoComplete="email"
            />
            <Field
              label="Пароль"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {error && (
              <div className="rounded-xl border border-brand/30 bg-brand/10 px-3 py-2 text-sm text-brand">
                {error}
              </div>
            )}
            <button type="submit" className="btn-primary mt-1 justify-center">
              Войти
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted">
            Нет аккаунта?{" "}
            <Link href="/register" className="font-semibold text-brand hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-xl border border-bg-line bg-bg-soft px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition"
      />
    </div>
  );
}
