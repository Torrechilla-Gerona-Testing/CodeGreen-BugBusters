import { toast } from "react-toastify";
import { fetchWithAuth } from "../utils/fetch";
import useFetchWithAuthExports from "./context-hooks/useFetchWithAuthExports";
import { BackendMessage } from "../types/response.types";
import { LoadingContextType } from "../types/loading.types";
import useLoading from "./context-hooks/useLoading";
import { UserNotification } from "../types/datatypes";

const useSendNotification = () => {
  const { auth, refresh, navigate } = useFetchWithAuthExports();
  const { setAppLoading }: LoadingContextType = useLoading();

  const handleSendNotification = async (formData: UserNotification) => {
    setAppLoading!(true);
    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/notification/add",
        "post",
        formData,
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

  return {
    handleSendNotification,
  };
};

export default useSendNotification;
