import { IconType } from 'react-icons';

export interface ISidebarItem {
  title: string;
  Icon?: IconType;
  path: string;
  badge?: number;
  dropdown?: ISidebarItem[];
}

export interface IVariantsDashboard {
  productVariantId: number;
  sku: string;
  name: string;
  stock: number;
  reservedStock: number;
  price: string;
  isActive: boolean;
  soldQty: number;
  image: string;
}

export interface IProductDashboard {
  productId: number;
  name: string;
  brand: string;
  slug: string;
  sku: string;
  price: string;
  stock: number;
  reservedStock: number;
  soldQty: number;
  image: string;
  status: string;
  productVariants: IVariantsDashboard[];
}

export interface IEditVariants {
  stock?: number;
  basePrice?: number;
  isActive?: boolean;
}
