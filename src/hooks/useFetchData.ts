import { useEffect, useRef,useState } from "react";

import { useProductId } from "../api/hooks/useProductId";
import { fetchInstance } from "../api/instance";

export const fetchData = async <T>(path: string): Promise<T> => {
  const response = await fetchInstance.get<T>(path);
  return response.data;
};

export const useFetchData = <T>(getPath: (productId: number) => string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productId = useProductId();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData = await fetchData<T>(getPath(productId));
        setData(fetchedData);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (!hasFetched.current) {
      fetchDataAsync();
      hasFetched.current = true;
    }
  }, [productId, getPath]);

  return { data, loading, error };
};