'use client';

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_GA_ID) return;

  (window as any).gtag?.('event', action, {
    ...params,
    send_to: process.env.NEXT_PUBLIC_GA_ID,
  });
}

export const trackWhatsAppClick = (productName?: string) => {
  trackEvent('whatsapp_click', { product_name: productName });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click');
};

export const trackProductView = (productId: string, productName: string) => {
  trackEvent('product_view', { product_id: productId, product_name: productName });
};

export const trackCategoryView = (categoryName: string) => {
  trackEvent('category_view', { category_name: categoryName });
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search_used', { search_term: searchTerm });
};

export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit');
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_changed', { language });
};

export const trackRepairServiceClick = () => {
  trackEvent('repair_service_click');
};
