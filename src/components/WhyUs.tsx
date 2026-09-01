import { Layers, CreditCard, BarChart3, Headphones, Zap, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: Layers, title: "چند محصول، یک استاندارد کیفی", desc: "همه پنل‌ها با همان سطح کیفیت، طراحی و پشتیبانی ساخته می‌شوند." },
  { icon: CreditCard, title: "درگاه پرداخت بانکی و کریپتو", desc: "پذیرش پرداخت ریالی و ارز دیجیتال، به‌صورت داخلی در هر پنل." },
  { icon: BarChart3, title: "گزارش فروش لحظه‌ای", desc: "نمودار و آمار دقیق فروش، کاربران فعال و درآمد در داشبورد هر پنل." },
  { icon: Headphones, title: "پشتیبانی ۲۴ ساعته", desc: "تیم پشتیبانی همیشه در دسترس از طریق تلگرام برای همه محصولات." },
  { icon: Zap, title: "اتصال آسان", desc: "راه‌اندازی سریع هر پنل، معمولاً در کمتر از ۵ دقیقه." },
  { icon: ShieldCheck, title: "امنیت بالا", desc: "رمزنگاری اطلاعات در تمام محصولات، بدون ذخیره‌سازی ناامن داده‌های حساس." },
];

/** بخش «چرا ما» — ویژگی‌های مشترک بین همه محصولات */
export function WhyUs() {
  return (
    <section id="why" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2>چرا پنل‌های ما؟</h2>
          <p className="mt-3 text-muted-foreground">
            هر محصولی که انتخاب کنید، این ویژگی‌ها همیشه همراه شماست.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <article
              key={item.title}
              className="glass-card glass-hover reveal p-6"
              data-reveal-index={i % 3}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/20 text-accent">
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
