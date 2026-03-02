import axiosInstance from '@/lib/axios';

export async function getProducts(slug: string, tag: string) {
  const res = await axiosInstance.get(`/product/all/${slug}`, {
    params: { tag },
  });

  if (!res) throw new Error('Product Not Found');

  return res.data;
}

export async function getOneProduct(slug: string) {
  const res = await axiosInstance.get(`/product/${slug}`);

  if (!res) throw new Error('Product Not Found');

  return res.data;
}

export async function getTags() {
  const res = await axiosInstance.get('/attribute/tag');

  if (!res) throw new Error('Tags Not Found');

  return res.data;
}
