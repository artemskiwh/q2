"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icons";
import { useProfile } from "@/components/ProfileProvider";

type Step = "form" | "verify";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useProfile();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");

  const sendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Введите имя");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return setError("Некорректный email");
    }
    if (password.length < 6) return setError("Пароль минимум 6 символов");

    const generated = String(Math.floor(100000 + Math.random() * 900000));
    setSentCode(generated);
    setCode(generated);
    setStep("verify");
  };

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (codeInput.trim() !== code) return setError("Неверный код");
    const r = register(name, email, password);
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
              <h1 className="text-2xl font-bold tracking-tight">Регистрация</h1>
              <p className="text-sm text-muted">
                {step === "form" ? "Создайте аккаунт" : "Подтвердите email"}
              </p>
            </div>
          </div>

          {step === "form" ? (
            <form onSubmit={sendCode} className="flex flex-col gap-4">
              <Field label="Имя" value={name} onChange={setName} placeholder="Иван Иванов" />
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
                placeholder="Минимум 6 символов"
                autoComplete="new-password"
              />
              {error && (
                <div className="rounded-xl border border-brand/30 bg-brand/10 px-3 py-2 text-sm text-brand">
                  {error}
                </div>
              )}
              <button type="submit" className="btn-primary mt-1 justify-center">
                Получить код на email
              </button>
            </form>
          ) : (
            <form onSubmit={confirm} className="flex flex-col gap-4">
              <p className="text-sm text-white/80">
                Мы отправили 6-значный код на{" "}
                <span className="font-semibold text-white">{email}</span>. Введите его ниже.
              </p>
              <div className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent">
                Демо-режим: настоящая отправка email будет подключена при запуске продаж.
                Используйте код <span className="font-mono font-bold">{sentCode}</span>.
              </div>
              <Field
                label="Код подтверждения"
                value={codeInput}
                onChange={setCodeInput}
                placeholder="123456"
              />
              {error && (
                <div className="rounded-xl border border-brand/30 bg-brand/10 px-3 py-2 text-sm text-brand">
                  {error}
                </div>
              )}
              <button type="submit" className="btn-primary mt-1 justify-center">
                Подтвердить и зарегистрироваться
              </button>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-center text-xs text-muted hover:text-white"
              >
                ← Изменить данные
              </button>
            </form>
          )}

          <div className="mt-5 text-center text-sm text-muted">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type?: string;
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
