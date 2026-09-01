export type Plan = {
  id: string;
  name: string;
  priceToman: number;
  priceUSDT: number;
  highlighted: boolean;
  features: string[];
};

export type Product = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription?: string;
  icon: string;
  appUrl: string;
  features: string[];
  plans: Plan[];
};

export type Testimonial = {
  name: string;
  title: string;
  text: string;
  rating: number;
  relatedProduct?: string;
};

export type Faq = { q: string; a: string };
