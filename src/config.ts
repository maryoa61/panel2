/** تنظیمات عمومی سایت — بدون وابستگی به دامنه خاص */
export const siteConfig = {
  brand: "پنل‌ساز",
  telegramSupport: "https://t.me/support",
  telegramPrefill: "سلام، درباره پنل‌های مدیریت سوال داشتم.",
  socials: [
    { label: "تلگرام", href: "https://t.me/support" },
    { label: "اینستاگرام", href: "https://instagram.com" },
  ],
};

/** ساخت لینک تلگرام با پیام از پیش پر شده */
export function telegramLink(message: string) {
  return `${siteConfig.telegramSupport}?text=${encodeURIComponent(message)}`;
}

/** فرمت قیمت تومان با جداکننده هزارگان فارسی */
export function formatToman(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
