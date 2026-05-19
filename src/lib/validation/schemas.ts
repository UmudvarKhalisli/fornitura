import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim(),
  phone: z.string().max(30).trim().optional().default(''),
  subject: z.string().max(200).trim().optional().default(''),
  message: z.string().min(100).max(5000).trim(),
});

export const productSchema = z.object({
  name_az: z.string().min(1).max(500),
  name_en: z.string().min(1).max(500),
  name_ru: z.string().min(1).max(500),
  slug: z.string().min(1).max(500),
  description_az: z.string().optional().default(''),
  description_en: z.string().optional().default(''),
  description_ru: z.string().optional().default(''),
  short_description_az: z.string().optional().default(''),
  short_description_en: z.string().optional().default(''),
  short_description_ru: z.string().optional().default(''),
  category_id: z.string().uuid().nullable().optional(),
  brand_id: z.string().uuid().nullable().optional(),
  part_number: z.string().min(1).max(200),
  compatible_models: z.array(z.string()).optional().default([]),
  stock_status: z.enum(['in_stock', 'out_of_stock']),
  images: z.array(z.string()).optional().default([]),
  main_image: z.string().optional().default(''),
  is_featured: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true),
  seo_title_az: z.string().optional().default(''),
  seo_title_en: z.string().optional().default(''),
  seo_title_ru: z.string().optional().default(''),
  seo_description_az: z.string().optional().default(''),
  seo_description_en: z.string().optional().default(''),
  seo_description_ru: z.string().optional().default(''),
});

export const categorySchema = z.object({
  name_az: z.string().min(1).max(500),
  name_en: z.string().min(1).max(500),
  name_ru: z.string().min(1).max(500),
  slug_az: z.string().min(1).max(500),
  slug_en: z.string().min(1).max(500),
  slug_ru: z.string().min(1).max(500),
  description_az: z.string().optional().default(''),
  description_en: z.string().optional().default(''),
  description_ru: z.string().optional().default(''),
  image: z.string().optional().default(''),
  seo_title_az: z.string().optional().default(''),
  seo_title_en: z.string().optional().default(''),
  seo_title_ru: z.string().optional().default(''),
  seo_description_az: z.string().optional().default(''),
  seo_description_en: z.string().optional().default(''),
  seo_description_ru: z.string().optional().default(''),
  display_order: z.number().int().optional().default(0),
  is_active: z.boolean().optional().default(true),
});

export const brandSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  logo_url: z.string().optional().default(''),
  description_az: z.string().optional().default(''),
  description_en: z.string().optional().default(''),
  description_ru: z.string().optional().default(''),
  display_order: z.number().int().optional().default(0),
  is_active: z.boolean().optional().default(true),
});

export const blogPostSchema = z.object({
  title_az: z.string().min(1).max(500),
  title_en: z.string().min(1).max(500),
  title_ru: z.string().min(1).max(500),
  slug_az: z.string().min(1).max(500),
  slug_en: z.string().min(1).max(500),
  slug_ru: z.string().min(1).max(500),
  content_az: z.string().optional().default(''),
  content_en: z.string().optional().default(''),
  content_ru: z.string().optional().default(''),
  excerpt_az: z.string().optional().default(''),
  excerpt_en: z.string().optional().default(''),
  excerpt_ru: z.string().optional().default(''),
  image: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
  is_published: z.boolean().optional().default(false),
  published_at: z.string().nullable().optional(),
  seo_title_az: z.string().optional().default(''),
  seo_title_en: z.string().optional().default(''),
  seo_title_ru: z.string().optional().default(''),
  seo_description_az: z.string().optional().default(''),
  seo_description_en: z.string().optional().default(''),
  seo_description_ru: z.string().optional().default(''),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type BrandFormData = z.infer<typeof brandSchema>;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;
