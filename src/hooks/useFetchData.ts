import { useEffect, useState } from "react";

import { useProductId } from "../api/hooks/useProductId";
import { fetchInstance } from "../api/instance";

export const fetchData = async <T>(path: string): Promise<T> => {
  const response = await fetchInstance.get<T>(path);
  return response.data;
};

export const useFetchData = <T>(getPath: (productId: number) => string) => {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const productId = useProductId();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData<T>(getPath(productId));
        setFetchedData(data);
      } catch (err) {
        setNotFound(true);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [productId, getPath]);

  return { data: fetchedData, loading, error, notFound };
};