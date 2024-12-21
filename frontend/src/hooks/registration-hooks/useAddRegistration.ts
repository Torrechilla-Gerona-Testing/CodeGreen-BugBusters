import { BackendMessage } from "../../types/response.types";
import { Registration } from "../../types/datatypes";
import { fetchWithAuth } from "../../utils/fetch";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";
import { toast } from "react-toastify";
import { useState } from "react";

export const useAddRegistration = () => {
  const { auth, refresh, navigate } = useFetchWithAuthExports();
  const [loading, setLoading] = useState<boolean>(false);

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
        toast.error(error.message);
        return;
      }
    } catch (error) {
      alert(error);
      toast.error("Unexpected error has occured.");
    } finally {
      setLoading(false);
    }
  };
  return { postRegistration, loading };
};
export default useAddRegistration;
