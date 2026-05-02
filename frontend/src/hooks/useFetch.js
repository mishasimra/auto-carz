import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/client.js";

const useFetch = (url, initialValue = []) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(url);
        if (isMounted) {
          setData(response.data.data);
        }
      } catch (err) {
        const message = err.response?.data?.message || "Failed to fetch data";
        if (isMounted) {
          setError(message);
        }
        toast.error(message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, setData, loading, error };
};

export default useFetch;
