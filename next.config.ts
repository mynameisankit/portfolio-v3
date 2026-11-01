import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = { output: 'export', images: { unoptimized: true } };
export default createMDX({ options: { rehypePlugins: ['rehype-slug'] } })(nextConfig);
