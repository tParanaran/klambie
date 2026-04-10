import { useEffect, useState } from 'react';
import { IBrand, ITag } from '../../p/types/product.types';
import { initialAttributes, initialTags } from '@/utils/attribute';
import axiosInstanceClient from '@/lib/axios/client';
import { IAttribute, ICategories } from '../types';
import { initialCategories } from '@/utils/categories';
import { initialBrands } from '@/utils/brands';

export default function useAttribute() {
  const [error, setError] = useState<string>();
  const [categories, setCategories] =
    useState<ICategories[]>(initialCategories);
  const [tags, setTags] = useState<ITag[]>(initialTags);
  const [brands, setBrands] = useState<IBrand[]>(initialBrands);
  const [attributes, setAttributes] = useState<IAttribute[]>(initialAttributes);

  useEffect(() => {
    const syncTags = async () => {
      try {
        const res = await axiosInstanceClient('/attribute/tag');
        if (res.data) {
          setTags(res.data);
        }
      } catch (error: any) {
        error = error.message || 'Something went wrong while fetching tags.';
        setError(error);
      }
    };

    syncTags();
  }, []);

  useEffect(() => {
    const syncBrands = async () => {
      try {
        const res = await axiosInstanceClient('/attribute/brands');
        if (res.data) {
          setBrands(res.data);
        }
      } catch (error: any) {
        error = error.message || 'Something went wrong while fetching brands.';
        setError(error);
      }
    };

    syncBrands();
  }, []);

  useEffect(() => {
    const syncCategories = async () => {
      try {
        const res = await axiosInstanceClient('/attribute/tree');
        if (res.data) {
          setCategories(res.data);
        }
      } catch (error: any) {
        error =
          error.message || 'Something went wrong while fetching categories.';
        setError(error);
      }
    };

    syncCategories();
  }, []);

  useEffect(() => {
    const syncAttributes = async () => {
      try {
        const res = await axiosInstanceClient('/attribute/attributes');
        if (res.data) {
          setAttributes(res.data);
        }
      } catch (error: any) {
        error =
          error.message || 'Something went wrong while fetching attributes.';
        setError(error);
      }
    };

    syncAttributes();
  }, []);

  const brandOptions = brands
    .sort((a, b) => Number(b.priority) - Number(a.priority))
    .map((brand) => ({
      id: brand.id,
      name: brand.name,
    }));

  return { error, tags, brands, categories, attributes, brandOptions };
}
