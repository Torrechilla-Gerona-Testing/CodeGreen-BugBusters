import { fetchWithAuth } from "../../utils/fetch";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";
import useLoading from "../context-hooks/useLoading";
import { LoadingContextType } from "../../types/loading.types";
import { toast } from "react-toastify";

export const useDeleteViolation = () => {
  const { auth, refresh, navigate } = useFetchWithAuthExports();
  const { setAppLoading }: LoadingContextType = useLoading();

  const deleteViolation = async (violationId: string) => {
    setAppLoading!(true);
    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/violation/delete",
        "delete",
        { violationId },
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      const notificationAPI = await response.json();
      toast.success(notificationAPI.message);

      return;
    } catch (err: unknown) {
      toast.error("Network error occurred.");

      // Narrow down `err` to ensure it has a `message` property
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect to the server";

      toast.error(errorMessage);

      return;
    } finally {
      setAppLoading!(false);
    }
  };

  return { deleteViolation };
};
