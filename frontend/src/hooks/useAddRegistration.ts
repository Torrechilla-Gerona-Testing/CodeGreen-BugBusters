import { useState } from "react";
import { BackendMessage } from "../types/response.types";
import { Registration } from "../types/datatypes";
import { fetchWithAuth } from "../utils/fetch";
import useFetchWithAuthExports from "./context-hooks/useFetchWithAuthExports";

export const useAddRegistration = () => {
  const [error, setError] = useState<BackendMessage | null>(null); // Handle errors
  const [loading, setLoading] = useState<boolean>(); // Track loading state
  const { auth, refresh, navigate } = useFetchWithAuthExports();

  const postRegistration = async (formData: Registration) => {
    setLoading(true);

    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/registration/add",
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
  return { postRegistration, loading, setLoading, error };
};
export default useAddRegistration;
