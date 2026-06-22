import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const result: T = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
};

export default useFetch;
