import { useEffect, useState } from "react";

export const useFetchList = <T>(fetchList: () => Promise<T[]>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    fetchList()
      .then((response) => {
        if (!ignore) {
          setData(response);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [fetchList]);

  return {
    data,
    isLoading,
    error,
  };
};
