"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { useProfile } from "@/components/ProfileProvider";

export default function ProfilePage() {
  const { profile, setProfile, logout } = useProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm({ name: profile.name, email: profile.email });
  }, [profile]);

  if (!profile) return <GuestView />;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container-page py-8 md:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-bg-line bg-bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand/25 blur-[120px]" />
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
            <Icon.User className="h-8 w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="chip chip-brand mb-1 inline-block">Профиль</span>
            <h1 className="truncate text-2xl font-bold tracking-tight md:text-3xl">
              {profile.name}
            </h1>
            <p className="mt-0.5 truncate text-sm text-muted">{profile.email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="hidden rounded-xl border border-bg-line bg-bg-soft px-4 py-2 text-sm font-medium text-white/80 transition hover:border-brand/40 hover:text-white md:inline-flex"
          >
            Выйти
          </button>
        </div>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-bg-line bg-bg-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Мои данные</h2>
            {!editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs text-brand hover:underline"
              >
                Изменить
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <Field
                label="Имя"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex-1 justify-center">
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setForm({ name: profile.name, email: profile.email });
                  }}
                  className="rounded-xl border border-bg-line bg-bg-soft px-4 py-2.5 text-sm font-medium text-white/80 hover:border-white/20"
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Icon.User className="h-4 w-4 shrink-0 text-brand" />
                <span className="text-white/85">{profile.name}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon.Spark className="h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${profile.email}`} className="text-white/85 hover:text-brand">
                  {profile.email}
                </a>
              </li>
              {saved && (
                <li className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                  Сохранено ✓
                </li>
              )}
            </ul>
          )}

          <button
            type="button"
            onClick={logout}
            className="mt-6 w-full rounded-xl border border-bg-line bg-bg-soft px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-brand/40 hover:text-white md:hidden"
          >
            Выйти
          </button>
        </section>

        <section className="rounded-2xl border border-bg-line bg-bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Быстрые действия</h2>
          <div className="flex flex-col gap-2">
            <QuickLink href="/catalog" icon={<Icon.Catalog className="h-4 w-4" />} label="Каталог товаров" />
            <QuickLink href="/cart" icon={<Icon.Cart className="h-4 w-4" />} label="Корзина" />
            <QuickLink href="/favorites" icon={<Icon.Heart className="h-4 w-4" />} label="Избранное" />
            <QuickLink href="/wholesale" icon={<Icon.Handshake className="h-4 w-4" />} label="Условия опта" />
            <QuickLink href="/contacts" icon={<Icon.Phone className="h-4 w-4" />} label="Связаться с нами" />
          </div>
        </section>
      </div>
    </div>
  );
}

function GuestView() {
  return (
    <div className="container-page py-12 md:py-20">
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand">
          <Icon.User className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-2xl font-bold md:text-3xl">Личный кабинет</h1>
        <p className="mt-2 text-sm text-muted">
          Войдите или зарегистрируйтесь — сможете отслеживать заказы и получать персональные цены.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/login" className="btn-primary justify-center sm:flex-1">
            Войти
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-bg-line bg-bg-soft px-5 py-2.5 text-center text-sm font-semibold text-white/90 transition hover:border-brand/40 hover:text-white sm:flex-1"
          >
            Зарегистрироваться
          </Link>
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
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
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
        className="rounded-xl border border-bg-line bg-bg-soft px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30 transition"
      />
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-bg-line bg-bg-soft px-4 py-3 text-sm font-medium transition hover:border-brand/30 hover:bg-bg-elev"
    >
      <span className="text-brand">{icon}</span>
      <span>{label}</span>
      <Icon.Chevron className="ml-auto h-4 w-4 text-muted" />
    </Link>
  );
}
