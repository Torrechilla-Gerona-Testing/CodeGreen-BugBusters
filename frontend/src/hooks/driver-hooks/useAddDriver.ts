import { useState } from "react";
import { BackendMessage } from "../../types/response.types";
import { Driver } from "../../types/datatypes";
import { fetchWithAuth } from "../../utils/fetch";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";

export const useAddDriver = () => {
  // const [data, setData] = useState<Driver[] | null>(null); // Store fetched drivers
  const [error, setError] = useState<BackendMessage | null>(null); // Handle errors
  const [loading, setLoading] = useState<boolean>(); // Track loading state
  const { auth, refresh, navigate } = useFetchWithAuthExports();

  const postDriver = async (formData: Driver) => {
    setLoading(true);

    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/driver/add",
        "POST",
        formData,
      );

      if (!response.ok) {
        const error: BackendMessage = await response.json();
        setError(error);
      }
    } catch {
      setError({ message: "An unexpected error occurred" } as BackendMessage);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };
  return { postDriver, loading, setLoading, error };
};

export default useAddDriver;
