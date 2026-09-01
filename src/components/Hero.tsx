import { ArrowLeft, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-panels.jpg";

/** بخش Hero — ارزش پیشنهادی کل مجموعه محصولات */
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-20 pt-32 lg:pt-40">
      <div
        aria-hidden="true"
        className="absolute -top-40 start-1/4 h-96 w-96 rounded-full bg-primary/30 blur-[140px]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <span className="glass-card inline-flex items-center gap-2 px-4 py-1.5 text-xs text-accent">
            مجموعه پنل‌های مدیریت اختصاصی
          </span>
          <h1 className="mt-6">
            مجموعه کامل <span className="glow-text">پنل‌های مدیریت اختصاصی</span>، برای هر نوع
            کسب‌وکار
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            از ربات تلگرام و دیسکورد تا CRM اختصاصی؛ هر پنل با درگاه پرداخت داخلی، گزارش لحظه‌ای و
            پشتیبانی ۲۴ ساعته آماده تحویل است.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              مشاهده محصولات
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              صحبت با ما
            </a>
          </div>
        </div>

        <div className="reveal" data-reveal-index="1">
          <img
            src={heroImage}
            alt="نمایی از داشبوردهای پنل‌های مدیریت اختصاصی"
            width={1200}
            height={912}
            className="float-anim w-full rounded-[var(--radius)] border border-border shadow-[var(--shadow-glow)]"
          />
        </div>
      </div>
    </section>
  );
}
