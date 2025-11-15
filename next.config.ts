import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkReadingTime from 'remark-reading-time';
import readingMdxTime from 'remark-reading-time/mdx';
import rehypeSlug from 'rehype-slug';
const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	async rewrites() {
		return [
			{
				source: '/whitepaper',
				destination: '/articles/whitepaper'
			},
			{
				source: '/about',
				destination: '/articles/about'
			}
		];
	}
};
const withMDX = createMDX({
	options: {
		remarkPlugins: [
			remarkMath,
			remarkGfm,
			[remarkFrontmatter, { type: 'toml', marker: '+' }],
			[remarkMdxFrontmatter, { name: 'metadata' }],
			remarkReadingTime,
			readingMdxTime
		],
		rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeSlug]
	}

	// Add markdown plugins here, as desired
});
export default withMDX(nextConfig);

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
