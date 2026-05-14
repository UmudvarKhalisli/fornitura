import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/i18n';
import { getPublishedPosts } from '@/lib/db/queries/blog';
import { generateSEOMetadata } from '@/lib/seo/generate-metadata';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/section-title';
import { BreadcrumbSchema, JsonLd } from '@/components/seo';
import { getLocalizedField } from '@/lib/db/helpers';
import { formatDate } from '@/lib/utils';
import type { Locale } from '@/lib/seo/constants';
import type { BlogPost } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  return generateSEOMetadata({
    title: dictionary.seo.blog_title,
    description: dictionary.seo.blog_desc,
    locale: locale as Locale,
    path: '/blog',
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const { posts } = await getPublishedPosts(locale);

  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '' },
    { name: dictionary.nav.blog, path: '/blog' },
  ];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: dictionary.seo.blog_title,
    description: dictionary.seo.blog_desc,
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} locale={locale} />
      <JsonLd data={blogSchema} />

      <section className="py-12 md:py-20 bg-white">
        <Container>
          <SectionTitle title={dictionary.blog.title} subtitle={dictionary.blog.subtitle} />

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-medium-gray">{dictionary.blog.no_posts}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post: BlogPost) => {
                const title = getLocalizedField(post, 'title', locale as Locale) as string;
                const excerpt = getLocalizedField(post, 'excerpt', locale as Locale) as string;
                const slug = post[`slug_${locale}` as keyof typeof post] as string || post.slug_en;

                return (
                  <Link
                    key={post.id}
                    href={`/${locale}/blog/${slug}`}
                    className="group rounded-lg border border-light-gray overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <div className="relative aspect-[16/9] bg-off-white overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-light-gray">F</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      {post.published_at && (
                        <p className="text-xs text-metallic-silver mb-2">
                          {formatDate(post.published_at, locale)}
                        </p>
                      )}
                      <h3 className="text-base font-semibold text-deep-charcoal group-hover:text-muted-gold transition-colors line-clamp-2 mb-2">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="text-sm text-medium-gray line-clamp-2">{excerpt}</p>
                      )}
                      <span className="inline-flex items-center text-xs font-medium text-muted-gold mt-3 group-hover:gap-1 transition-all">
                        {dictionary.blog.read_more}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
