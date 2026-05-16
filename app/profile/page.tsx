"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { useProfile } from "@/components/ProfileProvider";

export default function ProfilePage() {
  const { profile, setProfile } = useProfile();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const hasData = profile.name || profile.phone || profile.email || profile.company;

  return (
    <div className="container-page py-8 md:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-bg-line bg-bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand/25 blur-[120px]" />
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
            <Icon.User className="h-8 w-8" />
          </div>
          <div>
            <span className="chip chip-brand mb-1 inline-block">Профиль</span>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {profile.name || "Мой профиль"}
            </h1>
            {profile.company && (
              <p className="mt-0.5 text-sm text-muted">{profile.company}</p>
            )}
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-bg-line bg-bg-card p-6">
          <h2 className="mb-5 text-lg font-bold">Личные данные</h2>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <ProfileField
              label="Имя / Контактное лицо"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Иван Иванов"
            />
            <ProfileField
              label="Телефон"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="+7 (900) 000-00-00"
              type="tel"
            />
            <ProfileField
              label="E-mail"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="opt@example.ru"
              type="email"
            />
            <ProfileField
              label="Компания / ИП"
              value={form.company}
              onChange={(v) => setForm({ ...form, company: v })}
              placeholder="ИП Иванов И.И."
            />
            <button type="submit" className="btn-primary mt-1 justify-center">
              {saved ? "Сохранено ✓" : "Сохранить данные"}
            </button>
          </form>
        </section>

        <div className="flex flex-col gap-6">
          {hasData && (
            <section className="rounded-2xl border border-bg-line bg-bg-card p-6">
              <h2 className="mb-4 text-lg font-bold">Сводка</h2>
              <ul className="space-y-3 text-sm">
                {profile.phone && (
                  <li className="flex items-center gap-3">
                    <Icon.Phone className="h-4 w-4 shrink-0 text-brand" />
                    <a href={`tel:${profile.phone}`} className="hover:text-brand">
                      {profile.phone}
                    </a>
                  </li>
                )}
                {profile.email && (
                  <li className="flex items-center gap-3">
                    <Icon.User className="h-4 w-4 shrink-0 text-brand" />
                    <a href={`mailto:${profile.email}`} className="hover:text-brand">
                      {profile.email}
                    </a>
                  </li>
                )}
                {profile.company && (
                  <li className="flex items-center gap-3">
                    <Icon.Box className="h-4 w-4 shrink-0 text-brand" />
                    <span className="text-white/80">{profile.company}</span>
                  </li>
                )}
              </ul>
            </section>
          )}

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
    </div>
  );
}

function ProfileField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
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
