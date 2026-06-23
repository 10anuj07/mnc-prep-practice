import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";

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
        const response = await axiosInstance.get<T>(url, {
          signal: controller.signal,
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        const axiosErr = err as AxiosError;
        if (axiosErr.name === "CanceledError") return;
        setError(axiosErr.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
