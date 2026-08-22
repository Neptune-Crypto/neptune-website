import { fetchArticleMetadataBySlug, fetchArticleSlugs } from '@/lib/articleFetch';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://neptune.cash';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const slugs = await fetchArticleSlugs();
	const articles = await Promise.all(
		slugs.map((slug) => fetchArticleMetadataBySlug(slug))
	);

	return [
		{ url: BASE_URL },
		{ url: `${BASE_URL}/blog` },
		{ url: `${BASE_URL}/learn` },
		// ponytail: /blog/[slug] and /learn/[slug] are 301s to /articles/[slug], so only
		// the canonical path is listed.
		...articles.flatMap((article) =>
			article && !article.hidden
				? [
						{
							url: `${BASE_URL}/articles/${article.slug}`,
							lastModified: new Date(article.date)
						}
					]
				: []
		)
	];
}
