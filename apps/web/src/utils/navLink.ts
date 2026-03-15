export interface NavItem {
  name: string;
  subcategories?: NavItem[];
}

export const navLinks: NavItem[] = [
  {
    name: 'Men',
    subcategories: [
      {
        name: 'Clothing',
        subcategories: [
          { name: 'Shirts' },
          { name: 'Pants' },
          { name: 'Jackets' },
        ],
      },
      {
        name: 'Footwear',
        subcategories: [
          { name: 'Sneakers' },
          { name: 'Boots' },
          { name: 'Sandals' },
        ],
      },
    ],
  },
  {
    name: 'Women',
    subcategories: [
      {
        name: 'Clothing',
        subcategories: [
          { name: 'Dresses' },
          { name: 'Tops' },
          { name: 'Skirts' },
        ],
      },
      {
        name: 'Accessories',
        subcategories: [
          { name: 'Bags' },
          { name: 'Jewelry' },
          { name: 'Hats' },
        ],
      },
    ],
  },
  {
    name: 'Kids',
    subcategories: [
      {
        name: 'Clothing',
        subcategories: [
          { name: 'Shirts' },
          { name: 'Pants' },
          { name: 'Jackets' },
        ],
      },
      {
        name: 'Footwear',
        subcategories: [
          { name: 'Sneakers' },
          { name: 'Boots' },
          { name: 'Sandals' },
        ],
      },
    ],
  },
  {
    name: 'Sports',
    subcategories: [
      {
        name: 'Clothing',
        subcategories: [
          { name: 'Shirts' },
          { name: 'Pants' },
          { name: 'Jackets' },
        ],
      },
      {
        name: 'Footwear',
        subcategories: [
          { name: 'Sneakers' },
          { name: 'Boots' },
          { name: 'Sandals' },
        ],
      },
    ],
  },
  {
    name: 'Groomity',
    subcategories: [
      {
        name: 'Clothing',
        subcategories: [
          { name: 'Dresses' },
          { name: 'Tops' },
          { name: 'Skirts' },
        ],
      },
      {
        name: 'Accessories',
        subcategories: [
          { name: 'Bags' },
          { name: 'Jewelry' },
          { name: 'Hats' },
        ],
      },
    ],
  },
];
