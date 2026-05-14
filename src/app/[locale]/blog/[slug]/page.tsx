import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getDictionary } from '@/i18n';
import { getPostBySlug } from '@/lib/db/queries/blog';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { BreadcrumbSchema, JsonLd } from '@/components/seo';
import { getLocalizedField } from '@/lib/db/helpers';
import { formatDate } from '@/lib/utils';
import type { Locale } from '@/lib/seo/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  const dictionary = await getDictionary(locale);
  const title = post ? (getLocalizedField(post, 'title', locale as Locale) as string) : '';

  return generateSEOMetadata({
    title: post?.[`seo_title_${locale}` as keyof typeof post]
      ? (post[`seo_title_${locale}` as keyof typeof post] as string)
      : `${title} - ${dictionary.seo.blog_title}`,
    description: post?.[`seo_description_${locale}` as keyof typeof post]
      ? (post[`seo_description_${locale}` as keyof typeof post] as string)
      : (getLocalizedField(post, 'excerpt', locale as Locale) as string),
    locale: locale as Locale,
    path: `/blog/${slug}`,
    image: post?.image || undefined,
    type: 'article',
    publishedAt: post?.published_at || undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const dictionary = await getDictionary(locale);

  const title = getLocalizedField(post, 'title', locale as Locale) as string;
  const content = getLocalizedField(post, 'content', locale as Locale) as string;

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.blog, path: '/blog' },
    { name: title, path: `/blog/${slug}` },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    image: post.image || undefined,
    datePublished: post.published_at,
    author: { '@type': 'Organization', name: 'Fornitura' },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />
      <JsonLd data={articleSchema} />

      <article className="py-10 md:py-16 bg-white">
        <Container>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 text-sm text-medium-gray hover:text-deep-charcoal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {dictionary.blog.back_to_blog}
          </Link>

          <div className="max-w-3xl mx-auto">
            {post.image && (
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8 bg-off-white">
                <Image
                  src={post.image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-deep-charcoal tracking-tight mb-4">
              {title}
            </h1>

            {post.published_at && (
              <p className="text-sm text-medium-gray mb-6">
                {dictionary.blog.published_at}: {formatDate(post.published_at, locale)}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-off-white text-xs text-medium-gray rounded-full border border-light-gray"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-sm max-w-none text-medium-gray leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
