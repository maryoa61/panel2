import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import productsData from "@/data/products.json";
import faqData from "@/data/faq.json";
import testimonialsData from "@/data/testimonials.json";
import sectionsData from "@/data/sections.json";
import type { Faq, Product, Testimonial } from "@/lib/types";

import { Particles } from "@/components/Particles";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { ProductCatalog } from "@/components/ProductCatalog";
import { PricingTabs } from "@/components/PricingTabs";
import { Testimonials } from "@/components/Testimonials";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactSection } from "@/components/ContactSection";
import { SupportFab } from "@/components/SupportFab";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

const products = productsData as Product[];
const faqs = faqData as Faq[];
const testimonials = testimonialsData as Testimonial[];
const sections = sectionsData as { id: string; enabled: boolean }[];

const TITLE = "پنل‌ساز | خرید پنل مدیریت اختصاصی ربات تلگرام، دیسکورد و CRM";
const DESCRIPTION =
  "مجموعه پنل‌های مدیریت اختصاصی با درگاه پرداخت بانکی و کریپتو، گزارش فروش لحظه‌ای و پشتیبانی ۲۴ ساعته. راه‌اندازی در کمتر از ۵ دقیقه.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": products.map((p) => ({
            "@type": "Product",
            name: p.name,
            category: p.category,
            description: p.shortDescription,
            offers: p.plans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.priceToman,
              priceCurrency: "IRT",
              url: `${p.appUrl}?plan=${plan.id}`,
              availability: "https://schema.org/InStock",
            })),
          })),
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [selected, setSelected] = useState(products[0]?.id ?? "");
  useReveal();

  // همگام‌سازی تب انتخاب‌شده با URL برای اشتراک‌گذاری مستقیم
  useEffect(() => {
    const hash = window.location.hash;
    const match = /product=([\w-]+)/.exec(hash);
    if (match?.[1] && products.some((p) => p.id === match[1])) setSelected(match[1]);
  }, []);

  const selectProduct = (id: string) => {
    setSelected(id);
    window.history.replaceState(null, "", `#pricing?product=${id}`);
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const enabled = (id: string) => sections.find((s) => s.id === id)?.enabled !== false;

  return (
    <>
      <Particles />
      <Header products={products} />
      <main>
        {enabled("hero") && <Hero />}
        {enabled("why") && <WhyUs />}
        {enabled("products") && <ProductCatalog products={products} onSelect={selectProduct} />}
        {enabled("pricing") && (
          <PricingTabs products={products} selectedId={selected} onSelect={selectProduct} />
        )}
        {enabled("testimonials") && <Testimonials items={testimonials} />}
        {enabled("faq") && <FaqAccordion items={faqs} />}
        {enabled("contact") && <ContactSection products={products} />}
      </main>
      <Footer products={products} onSelect={selectProduct} />
      <SupportFab />
    </>
  );
}
