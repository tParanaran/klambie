export interface NavItem {
  id: number;
  name: string;
  slug: string;
  subcategories?: NavItem[];
}

// Example: slug can be a kebab-case version of the name
export const navLinks: NavItem[] = [
  {
    id: 1,
    name: 'Men',
    slug: 'men',
    subcategories: [
      {
        id: 11,
        name: 'Clothing',
        slug: 'clothing',
        subcategories: [
          { id: 111, name: 'Shirts', slug: 'shirts' },
          { id: 112, name: 'Pants', slug: 'pants' },
          { id: 113, name: 'Jackets', slug: 'jackets' },
        ],
      },
      {
        id: 12,
        name: 'Footwear',
        slug: 'footwear',
        subcategories: [
          { id: 121, name: 'Sneakers', slug: 'sneakers' },
          { id: 122, name: 'Boots', slug: 'boots' },
          { id: 123, name: 'Sandals', slug: 'sandals' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Women',
    slug: 'women',
    subcategories: [
      {
        id: 21,
        name: 'Clothing',
        slug: 'clothing',
        subcategories: [
          { id: 211, name: 'Dresses', slug: 'dresses' },
          { id: 212, name: 'Tops', slug: 'tops' },
          { id: 213, name: 'Skirts', slug: 'skirts' },
        ],
      },
      {
        id: 22,
        name: 'Accessories',
        slug: 'accessories',
        subcategories: [
          { id: 221, name: 'Bags', slug: 'bags' },
          { id: 222, name: 'Jewelry', slug: 'jewelry' },
          { id: 223, name: 'Hats', slug: 'hats' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Kids',
    slug: 'kids',
    subcategories: [
      {
        id: 31,
        name: 'Clothing',
        slug: 'clothing',
        subcategories: [
          { id: 311, name: 'Shirts', slug: 'shirts' },
          { id: 312, name: 'Pants', slug: 'pants' },
          { id: 313, name: 'Jackets', slug: 'jackets' },
        ],
      },
      {
        id: 32,
        name: 'Footwear',
        slug: 'footwear',
        subcategories: [
          { id: 321, name: 'Sneakers', slug: 'sneakers' },
          { id: 322, name: 'Boots', slug: 'boots' },
          { id: 323, name: 'Sandals', slug: 'sandals' },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Sports',
    slug: 'sports',
    subcategories: [
      {
        id: 41,
        name: 'Clothing',
        slug: 'clothing',
        subcategories: [
          { id: 411, name: 'Shirts', slug: 'shirts' },
          { id: 412, name: 'Pants', slug: 'pants' },
          { id: 413, name: 'Jackets', slug: 'jackets' },
        ],
      },
      {
        id: 42,
        name: 'Footwear',
        slug: 'footwear',
        subcategories: [
          { id: 421, name: 'Sneakers', slug: 'sneakers' },
          { id: 422, name: 'Boots', slug: 'boots' },
          { id: 423, name: 'Sandals', slug: 'sandals' },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Groomity',
    slug: 'groomity',
    subcategories: [
      {
        id: 51,
        name: 'Clothing',
        slug: 'clothing',
        subcategories: [
          { id: 511, name: 'Dresses', slug: 'dresses' },
          { id: 512, name: 'Tops', slug: 'tops' },
          { id: 513, name: 'Skirts', slug: 'skirts' },
        ],
      },
      {
        id: 52,
        name: 'Accessories',
        slug: 'accessories',
        subcategories: [
          { id: 521, name: 'Bags', slug: 'bags' },
          { id: 522, name: 'Jewelry', slug: 'jewelry' },
          { id: 523, name: 'Hats', slug: 'hats' },
        ],
      },
    ],
  },
];
