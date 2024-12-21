import { fetchWithAuth } from "../utils/fetch";
import useFetchWithAuthExports from "./context-hooks/useFetchWithAuthExports";
import { BackendMessage } from "../types/response.types";
import { toast } from "react-toastify";
import { LoadingContextType } from "../types/loading.types";
import useLoading from "./context-hooks/useLoading";

const useUpdateStatus = () => {
  const { navigate, refresh, auth } = useFetchWithAuthExports();
  const { setAppLoading }: LoadingContextType = useLoading();

  const handleUpdateStatus = async (id: string) => {
    setAppLoading!(true);
    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/violation/status-change",
        "patch",
        { id },
      );

      if (!response.ok) {
        const backendError: BackendMessage = await response.json();
        toast.error(backendError.message);
        return;
      }

      const backendNotification: BackendMessage = await response.json();
      toast.success(backendNotification.message);
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    } finally {
      setAppLoading!(false);
    }
  };
  return { handleUpdateStatus };
};

export default useUpdateStatus;
