'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useQueryParams() {
  const DEPARTMENT = ['women', 'men', 'kids', 'sports', 'groomity'];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getQueryObject = () => {
    const obj: Record<string, string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      if (obj[key]) {
        obj[key].push(value);
      } else {
        obj[key] = [value];
      }
    }
    return obj;
  };

  const createLinkParams = useCallback(
    (key: string, value: string, { append = true } = {}, newPath?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (append) {
        params.append(key, value); // Allow mutiple same keys
      } else {
        params.set(key, value); // Overwrite exsiting
      }

      return `${pathname}${newPath ? `/${newPath}` : ''}?${params.toString()}`;
    },
    [searchParams, pathname, router],
  );

  const createParams = useCallback(
    (values: Record<string, string>, options?: { append?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(values).forEach(([key, value]) => {
        if (options?.append) {
          params.append(key, value);
        } else {
          params.set(key, value);
        }
      });

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl);
    },
    [searchParams, pathname, router],
  );

  const createNewRouteParams = useCallback(
    (key: string, value: string, newPath: string) => {
      const params = new URLSearchParams();
      params.set(key, value);

      let newPathname = pathname;

      if (pathname !== newPath) {
        newPathname = newPath;
      }

      const newUrl = params.toString()
        ? `${newPathname}?${params.toString()}`
        : newPathname;
      router.replace(newUrl);
    },
    [searchParams, pathname, router],
  );

  const toggleParams = useCallback(
    (key: string, value: string, newPath?: string, { append = true } = {}) => {
      let params = new URLSearchParams(searchParams.toString());
      const values = params.getAll(key);

      if (values.includes(value)) {
        const newValues = values.filter((v) => v !== value);
        params.delete(key);
        newValues.forEach((v) => params.append(key, v));
      } else {
        if (append) {
          params.append(key, value); // Allow mutiple same keys
        } else {
          params.set(key, value); // Overwrite exsiting
        }
      }

      const newUrl = params.toString()
        ? `${pathname}${newPath ? `/${newPath}` : ''}?${params.toString()}`
        : pathname;
      router.replace(newUrl);
    },
    [searchParams, pathname, router],
  );

  const deleteParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === undefined) {
        params.delete(key);
      } else {
        const values = params.getAll(key).filter((v) => v !== value);
        params.delete(key);
        values.forEach((v) => params.append(key, v));
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl);
    },
    [searchParams, pathname, router],
  );

  const clearAllParams = useCallback(() => {
    router.replace(pathname);
  }, [pathname, router]);

  const getParams = (key: string): string | undefined => {
    return getQueryObject()[key]?.[0];
  };

  const getAllParams = (key: string): string[] | undefined => {
    return getQueryObject()[key] || [];
  };

  const matchPathname = DEPARTMENT.find((dep) =>
    pathname.toLowerCase().includes(dep),
  );

  return {
    pathname,
    searchParams,
    matchPathname,
    createLinkParams,
    toggleParams,
    deleteParams,
    clearAllParams,
    getParams,
    getAllParams,
    createNewRouteParams,
    createParams,
  };
}
