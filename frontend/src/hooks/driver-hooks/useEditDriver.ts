import { fetchWithAuth } from "../../utils/fetch";
import { BackendMessage } from "../../types/response.types";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";
import { DriverWithVandC } from "../../types/datatypes";
import useLoading from "../context-hooks/useLoading";
import { LoadingContextType } from "../../types/loading.types";
import { toast } from "react-toastify";

export const useEditDriver = () => {
  const { setAppLoading }: LoadingContextType = useLoading();
  const { navigate, refresh, auth } = useFetchWithAuthExports();

  const editDriver = async (updatedDriver: DriverWithVandC) => {
    setAppLoading!(true);
    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/driver/update",
        "PATCH",
        updatedDriver,
      );

      if (!response.ok) {
        const errorData: BackendMessage = await response.json();
        toast.error(errorData.message);
        return;
      }

      const notification = await response.json();
      toast.success(notification.message);
    } catch (err) {
      alert(err);
      toast.error("Unexpected error has occurred.");
      return;
    } finally {
      setAppLoading!(false);
    }
  };

  return { editDriver };
};

export default useEditDriver;
