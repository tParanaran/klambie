import { IProducts } from '../../p/types/product.types';

export interface IDepartementView {
  products: IProducts[];
  error?: string;
}

export interface IShopByCard {
  products: IProducts[];
}
