export interface Category {
  id: string;
  name_az: string;
  name_en: string;
  name_ru: string;
  slug_az: string;
  slug_en: string;
  slug_ru: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  image: string;
  seo_title_az: string;
  seo_title_en: string;
  seo_title_ru: string;
  seo_description_az: string;
  seo_description_en: string;
  seo_description_ru: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name_az: string;
  name_en: string;
  name_ru: string;
  slug: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  short_description_az: string;
  short_description_en: string;
  short_description_ru: string;
  category_id: string | null;
  brand_id: string | null;
  part_number: string;
  compatible_models: string[];
  stock_status: 'in_stock' | 'out_of_stock';
  images: string[];
  main_image: string;
  is_featured: boolean;
  is_active: boolean;
  seo_title_az: string;
  seo_title_en: string;
  seo_title_ru: string;
  seo_description_az: string;
  seo_description_en: string;
  seo_description_ru: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
  brand?: Brand;
}

export interface BlogPost {
  id: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  slug_az: string;
  slug_en: string;
  slug_ru: string;
  content_az: string;
  content_en: string;
  content_ru: string;
  excerpt_az: string;
  excerpt_en: string;
  excerpt_ru: string;
  image: string;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  seo_title_az: string;
  seo_title_en: string;
  seo_title_ru: string;
  seo_description_az: string;
  seo_description_en: string;
  seo_description_ru: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title_az: string;
  title_en: string;
  title_ru: string;
  description_az: string;
  description_en: string;
  description_ru: string;
  icon: string;
  image: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  product_name: string;
  product_url: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  site_name: string;
  logo_url: string;
  favicon_url: string;
  whatsapp_number: string;
  phone_number: string;
  email: string;
  address_az: string;
  address_en: string;
  address_ru: string;
  google_maps_url: string;
  instagram_url: string;
  facebook_url: string;
  linkedin_url: string;
  youtube_url: string;
  telegram_url: string;
  hero_title_az: string;
  hero_title_en: string;
  hero_title_ru: string;
  hero_description_az: string;
  hero_description_en: string;
  hero_description_ru: string;
  hero_image: string;
  about_content_az: string;
  about_content_en: string;
  about_content_ru: string;
  about_image: string;
  repair_service_title_az: string;
  repair_service_title_en: string;
  repair_service_title_ru: string;
  repair_service_description_az: string;
  repair_service_description_en: string;
  repair_service_description_ru: string;
  repair_service_image: string;
  footer_text_az: string;
  footer_text_en: string;
  footer_text_ru: string;
  is_maintenance: boolean;
  updated_at: string;
}

export interface Media {
  id: string;
  url: string;
  public_id: string;
  alt_text: string;
  width: number;
  height: number;
  file_size: number;
  format: string;
  folder: string;
  uploaded_by: string | null;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  created_at: string;
  last_login: string | null;
}
