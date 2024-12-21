import { useEffect, useState, useCallback } from "react";
import { DriverWithVandC } from "../../types/datatypes.ts";
import { BackendMessage } from "../../types/response.types.ts";
import { fetchWithAuth } from "../../utils/fetch.tsx";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports.ts";

const useDrivers = () => {
  const [data, setData] = useState<DriverWithVandC[] | null>(null);
  const [error, setError] = useState<BackendMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const { auth, refresh, navigate } = useFetchWithAuthExports();

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/driver/get",
        "get",
      );

      if (!response.ok) {
        const error: BackendMessage = await response.json();
        setError(error);
      } else {
        const drivers: DriverWithVandC[] = await response.json();
        setData(drivers);
      }
    } catch {
      setError({ message: "An unexpected error occurred" } as BackendMessage);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  return { data, error, loading, fetchDrivers };
};

export default useDrivers;
