import { toast } from "react-toastify";
import { fetchWithAuth } from "../../utils/fetch"; // Custom fetch utility
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";
import { LoadingContextType } from "../../types/loading.types";
import useLoading from "../context-hooks/useLoading";

export const useApproveRegistration = () => {
  const { auth, refresh, navigate } = useFetchWithAuthExports();
  const { setAppLoading }: LoadingContextType = useLoading();

  const approveRegistration = async (licenseNumber: string) => {
    setAppLoading!(true);

    if (!licenseNumber) {
      toast.error("License number is required.");
      return;
    }

    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/registration/approve",
        "POST",
        { license_number: licenseNumber },
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to approve registration.");
        return false;
      }

      const data = await response.json();
      toast.success(data.message || "Registration approved successfully!");
    } catch {
      toast.error(
        "Network error occurred. Could not connect to the server. Please try again.",
      );
    } finally {
      setAppLoading!(false);
    }
  };

  return { approveRegistration };
};
