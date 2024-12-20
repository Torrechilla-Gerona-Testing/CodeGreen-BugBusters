import { useState } from "react";
import { toast } from "react-toastify";
import { BackendMessage } from "../../types/response.types";
import { fetchWithAuth } from "../../utils/fetch";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";
import { DriverWithVandC } from "../../types/datatypes";

const useCheckLicenseNumber = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { auth, refresh, navigate } = useFetchWithAuthExports();

  const checkLicenseNumber = async (
    license_number: string,
  ): Promise<DriverWithVandC | undefined> => {
    setLoading(true);

    try {
      // Make sure license_number is URL-safe
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/car/check-license",
        "post",
        {
          license_number,
        },
      );

      if (!response.ok) {
        const backendError: BackendMessage = await response.json();
        toast.error(backendError.message);
        return;
      }

      const driver = await response.json();

      return driver;
    } catch {
      toast.error("Failed to verify license number.");
      return;
    } finally {
      setLoading(false);
    }
  };

  return { checkLicenseNumber, loading };
};

export default useCheckLicenseNumber;
