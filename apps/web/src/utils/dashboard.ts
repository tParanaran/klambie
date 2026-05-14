import { IoPeople, IoReceipt, IoSettings } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { RiDiscountPercentFill, RiProductHuntFill } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';

export const sidebarItems = [
  {
    title: 'Dashboard',
    Icon: BiCategory,
    path: '/dashboard',
  },
  {
    title: 'Products',
    Icon: RiProductHuntFill,
    path: '/dashboard/products',
    dropdown: [
      { title: 'All Products', path: '/dashboard/products' },
      { title: 'Add Product', path: '/dashboard/products/add' },
      { title: 'Categories', path: '/dashboard/products/categories' },
    ],
  },
  {
    title: 'Promotions',
    Icon: RiDiscountPercentFill,
    path: '/dashboard/promotions',
    dropdown: [
      { title: 'Active', path: '/dashboard/promotions/active' },
      { title: 'Create', path: '/dashboard/promotions/create' },
      { title: 'History', path: '/dashboard/promotions/history' },
    ],
  },
  {
    title: 'Orders',
    Icon: IoReceipt,
    path: '/dashboard/orders',
    badge: 5,
    dropdown: [
      { title: 'All Orders', path: '/dashboard/orders' },
      { title: 'Pending', path: '/dashboard/orders/pending' },
      { title: 'Completed', path: '/dashboard/orders/completed' },
      { title: 'Returns', path: '/dashboard/orders/returns' },
    ],
  },
  {
    title: 'Customers',
    Icon: IoPeople,
    path: '/dashboard/customers',
  },
  {
    title: 'Delivery',
    Icon: TbTruckDelivery,
    path: '/dashboard/delivery',
    dropdown: [
      { title: 'Pending', path: '/dashboard/delivery/pending' },
      { title: 'In Transit', path: '/dashboard/delivery/in-transit' },
      { title: 'Delivered', path: '/dashboard/delivery/delivered' },
      { title: 'Returns', path: '/dashboard/delivery/returns' },
    ],
  },
  {
    title: 'Settings',
    Icon: IoSettings,
    path: '/settings',
  },
];
