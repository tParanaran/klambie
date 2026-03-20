'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function useQueryParams() {
  // Department list as readonly tuple for type safety
  const DEPARTMENT = ['women', 'men', 'kids', 'sports', 'groomity'] as const;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Helper to build URLs consistently
  const buildUrl = (path: string, params: URLSearchParams) =>
    params.toString() ? `${path}?${params.toString()}` : path;

  // Memoize query object for performance
  const queryObject = useMemo(() => {
    const obj: Record<string, string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      if (obj[key]) obj[key].push(value);
      else obj[key] = [value];
    }
    return obj;
  }, [searchParams.toString()]);

  const getParams = (key: string): string | undefined => queryObject[key]?.[0];
  const getAllParams = (key: string): string[] => queryObject[key] || [];

  const createLinkParams = useCallback(
    (key: string, value: string, { append = true } = {}, newPath?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      append ? params.append(key, value) : params.set(key, value);
      return buildUrl(newPath ?? pathname, params);
    },
    [searchParams.toString(), pathname],
  );

  const createParams = useCallback(
    (
      values: Record<string, string | string[]>,
      options?: { append?: boolean },
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (!options?.append) params.delete(key);
          value.forEach((v) => params.append(key, v));
        } else {
          options?.append ? params.append(key, value) : params.set(key, value);
        }
      });

      router.replace(buildUrl(pathname, params));
    },
    [searchParams.toString(), pathname, router],
  );

  const createArrayParams = useCallback(
    (
      values: Record<string, string | string[]>,
      options?: { append?: boolean },
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(values).forEach(([key, value]) => {
        const arr = Array.isArray(value) ? value : [value];
        const arrayValue = JSON.stringify(arr);
        options?.append
          ? params.append(key, arrayValue)
          : params.set(key, arrayValue);
      });

      router.replace(buildUrl(pathname, params));
    },
    [searchParams.toString(), pathname, router],
  );

  const createNewRouteParams = useCallback(
    (key: string, value: string, newPath: string) => {
      const params = new URLSearchParams();
      params.set(key, value);
      router.replace(buildUrl(newPath, params));
    },
    [router],
  );

  const toggleParams = useCallback(
    (key: string, value: string, newPath?: string, { append = true } = {}) => {
      const params = new URLSearchParams(searchParams.toString());
      const values = params.getAll(key);

      if (values.includes(value)) {
        // Remove the value
        params.delete(key);
        values.filter((v) => v !== value).forEach((v) => params.append(key, v));
      } else {
        // Append: Allow mutiple keys, Set: Overwrite existing keys
        append ? params.append(key, value) : params.set(key, value);
      }

      router.replace(buildUrl(newPath ?? pathname, params));
    },
    [searchParams.toString(), pathname, router],
  );

  const deleteParams = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === undefined) {
        params.delete(key);
      } else {
        params.delete(key, value);
      }
      router.replace(buildUrl(pathname, params));
    },
    [searchParams.toString(), pathname, router],
  );

  const clearAllParams = useCallback(() => {
    router.replace(pathname);
  }, [pathname, router]);

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
    createArrayParams,
  };
}
