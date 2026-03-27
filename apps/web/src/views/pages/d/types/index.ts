import { IProducts } from '../../p/types/product.types';

export interface IDepartementView {
  products: IProducts[];
  error?: string;
  slug: string;
}

export interface IShopByCard {
  products: IProducts[];
  slug: string;
}

export interface IBanner {
  id: number;
  title: string;
  image: string;
  link: string;
  active: boolean;
  createdAt: string;
  validUntil?: string;
  categories: string[];
  discount?: string;
  promoCode?: string;
  isSale: boolean;
}
