import { useRouter, useSearchParams } from "next/navigation";

interface UseSearchParamsOptions {
  defaultPage?: number;
  defaultLimit?: number;
}

interface UseSearchParamsReturn {
  page: number;
  pageLimit: number;
  searchParams: URLSearchParams;
  setSearchParams: (params: Record<string, string>) => void;
}

export const useSearchParamsWithDefaults = (
  options: UseSearchParamsOptions = {}
): UseSearchParamsReturn => {
  const { defaultPage = 1, defaultLimit = 10 } = options;
  const searchParams = useSearchParams();
  const setSearchParams = useRouter().push;

  const page = Number(searchParams.get("page") || defaultPage);
  const pageLimit = Number(searchParams.get("limit") || defaultLimit);

  const updateSearchParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    setSearchParams(newSearchParams.toString());
  };

  return {
    page,
    pageLimit,
    searchParams,
    setSearchParams: updateSearchParams,
  };
};
