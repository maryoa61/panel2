import { Send } from "lucide-react";
import { siteConfig, telegramLink } from "@/config";

/** دکمه شناور پشتیبانی — گوشه پایین-راست (RTL) با افکت پالس */
export function SupportFab() {
  return (
    <a
      href={telegramLink(siteConfig.telegramPrefill)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="گفتگو با پشتیبانی در تلگرام"
      className="pulse-ring fixed bottom-6 end-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
    >
      <Send className="h-6 w-6 rtl-mirror" aria-hidden="true" />
    </a>
  );
}
