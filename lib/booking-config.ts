// Booking delivery config.
//
// The booking form sends a request to a Telegram chat via the Bot API.
// Token and chat id are injected at build time from GitHub Actions
// repository secrets (NEXT_PUBLIC_TELEGRAM_BOT_TOKEN / _CHAT_ID) so they
// are not committed to the source. Until they are set, the form falls
// back to opening WhatsApp with the booking details pre-filled.

export const TELEGRAM = {
  token: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ?? "",
  chatId: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ?? "",
};

export function telegramEnabled(): boolean {
  return Boolean(TELEGRAM.token && TELEGRAM.chatId);
}

export type BookingData = {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  contact: string;
};

export function bookingText(b: BookingData): string {
  const lines = [
    "🎤 Новая бронь — ICON",
    `Имя: ${b.name}`,
    `Телефон: +7 ${b.phone}`,
    `Гостей: ${b.guests}`,
    b.date ? `Дата: ${b.date}` : "",
    b.time ? `Время: ${b.time}` : "",
    b.contact ? `Связь: ${b.contact}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

// Send to Telegram. Returns true on success.
export async function sendToTelegram(b: BookingData): Promise<boolean> {
  if (!telegramEnabled()) return false;
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM.token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM.chatId,
          text: bookingText(b),
          disable_web_page_preview: true,
        }),
      },
    );
    const data = await res.json().catch(() => ({ ok: false }));
    return Boolean(data?.ok);
  } catch {
    return false;
  }
}
