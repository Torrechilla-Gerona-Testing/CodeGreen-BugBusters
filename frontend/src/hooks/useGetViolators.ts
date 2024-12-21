import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BackendMessage } from "../types/response.types";
import { DriverWithVandC } from "../types/datatypes";
import { fetchWithAuth } from "../utils/fetch";
import useFetchWithAuthExports from "./context-hooks/useFetchWithAuthExports";

const useGetViolators = () => {
  const [violators, setViolators] = useState<DriverWithVandC[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const { auth, refresh, navigate } = useFetchWithAuthExports();

  useEffect(() => {
    const fetchViolators = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth(
          navigate,
          refresh,
          auth,
          "/violator/get",
          "get",
        );

        if (!response.ok) {
          const backendError: BackendMessage = await response.json();
          toast.error(backendError.message);
          return;
        }

        const violators = await response.json();

        setViolators(violators);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolators();
  }, [auth]);

  return { violators, loading };
};

export default useGetViolators;
