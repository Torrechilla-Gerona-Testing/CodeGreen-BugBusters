import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Registration } from "../types/datatypes.ts";
import { BackendMessage } from "../types/response.types.ts";
import { fetchWithAuth } from "../utils/fetch.tsx";
import useFetchWithAuthExports from "./context-hooks/useFetchWithAuthExports.ts";

const useGetRegistration = () => {
  const [registration, setRegistration] = useState<Registration[] | null>(null); // Store fetched registrations
  const [loading, setLoading] = useState(false); // Track loading state

  const { auth, refresh, navigate } = useFetchWithAuthExports();

  useEffect(() => {
    const fetchRegistration = async () => {
      setLoading(true);

      try {
        const response = await fetchWithAuth(
          navigate,
          refresh,
          auth,
          "/registration/get",
          "get",
        );

        if (!response.ok) {
          const backendError: BackendMessage = await response.json();
          toast.error(backendError.message);
          return;
        }
        const registration = await response.json();
        setRegistration(registration);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistration();
  }, [auth]);

  return { registration, loading };
};

export default useGetRegistration;
