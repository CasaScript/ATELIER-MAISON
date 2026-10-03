export type Currency = 'TND' | 'EUR' | 'USD';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  priceDelta: number; // in TND
  stock: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  location?: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  category: string;
  price: number; // In TND (e.g. 145.000)
  compareAtPrice?: number;
  featuredImage: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  features: string[];
  dimensions?: string;
  materials?: string;
  inStock: boolean;
  stockCount: number;
  variants?: {
    optionName: string;
    items: ProductVariant[];
  };
  reviews?: ProductReview[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface Carrier {
  id: string;
  name: string;
  logo: string;
  estimatedDelivery: string;
  price: number; // in TND
  freeThreshold?: number; // e.g. free from 150 TND
  coverage: string;
  trackingAvailable: boolean;
  description: string;
}

export interface Governorate {
  id: string;
  name: string;
  code: string;
  region: 'Grand Tunis' | 'Nord' | 'Sahel' | 'Centre' | 'Sud';
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  governorate: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  carrier: Carrier;
  paymentMethod: 'cod' | 'konnect' | 'flouci' | 'card';
  paymentStatus: 'pending' | 'paid';
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  currency: Currency;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface ShopifyTheme {
  id: string;
  name: string;
  badge?: string;
  price: string;
  speedScore: number;
  bestFor: string;
  keyFeatures: string[];
  previewAccent: string;
  demoUrl: string;
  description: string;
}

export interface ShopifyApp {
  id: string;
  name: string;
  category: 'Avis Clients' | 'Chat & WhatsApp' | 'SEO & Vitesse' | 'Marketing & Vente' | 'Logistique';
  pricing: string;
  rating: number;
  reviewsCount: number;
  description: string;
  whyEssentialForTPE: string;
  setupMinutes: number;
  setupGuide: string[];
}

export interface TrainingLesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  steps: {
    title: string;
    instruction: string;
    tip?: string;
  }[];
  adminPath: string;
}

export interface ProjectMilestone {
  id: number;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  completed: boolean;
  category: 'cadrage' | 'creation' | 'ecommerce' | 'seo' | 'formation';
}
