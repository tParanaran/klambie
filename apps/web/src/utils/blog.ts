export interface BlogCard {
  title: string;
  slug: string;
  createdAt: string;
  photo: string;
  description: string;
  category: string;
  author: string;
  readTime: string;
}

export const initialBlogCards: BlogCard[] = [
  {
    title: 'Top Streetwear Trends in 2026',
    slug: 'streetwear-trends-2026',
    createdAt: '2026-03-20',
    photo: '/images/blog/streetwear.jpg',
    description:
      'Discover the latest streetwear styles dominating 2026, from oversized fits to bold graphics.',
    category: 'Streetwear',
    author: 'Klambie Team',
    readTime: '5 min read',
  },
  {
    title: 'How to Style Minimalist Outfits',
    slug: 'minimalist-outfits-guide',
    createdAt: '2026-03-18',
    photo: '/images/blog/minimalist.jpg',
    description:
      'Build clean and timeless outfits with essential minimalist fashion pieces.',
    category: 'Minimalist',
    author: 'Klambie Team',
    readTime: '4 min read',
  },
  {
    title: 'Best Summer Fits for Everyday Wear',
    slug: 'summer-outfits-ideas',
    createdAt: '2026-03-15',
    photo: '/images/blog/summer.jpg',
    description:
      'Stay cool and stylish with these easy summer outfit inspirations.',
    category: 'Summer',
    author: 'Klambie Team',
    readTime: '6 min read',
  },
  {
    title: 'Essential Accessories to Elevate Your Look',
    slug: 'fashion-accessories-guide',
    createdAt: '2026-03-12',
    photo: '/images/blog/accessories.jpg',
    description: 'Upgrade your outfit instantly with the right accessories.',
    category: 'Accessories',
    author: 'Klambie Team',
    readTime: '3 min read',
  },
  {
    title: 'Denim Guide: Finding Your Perfect Fit',
    slug: 'denim-fit-guide',
    createdAt: '2026-03-10',
    photo: '/images/blog/denim.jpg',
    description:
      'From skinny to relaxed, find the perfect denim fit for your body type.',
    category: 'Denim',
    author: 'Klambie Team',
    readTime: '5 min read',
  },
  {
    title: 'Layering Techniques for Modern Fashion',
    slug: 'layering-fashion-tips',
    createdAt: '2026-03-08',
    photo: '/images/blog/layering.jpg',
    description:
      'Master the art of layering to create depth and style in your outfits.',
    category: 'Styling',
    author: 'Klambie Team',
    readTime: '4 min read',
  },
];
