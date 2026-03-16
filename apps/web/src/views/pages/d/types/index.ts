import { IProducts, ITag } from '../../p/types/product.types';

export default interface IDepartementView {
  products: IProducts[];
  tags: ITag[];
  error?: string;
}
