import { fetchWithAuth } from "../../utils/fetch";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";
import useLoading from "../context-hooks/useLoading";
import { LoadingContextType } from "../../types/loading.types";
import { toast } from "react-toastify";

export const useDeleteCar = () => {
  const { auth, refresh, navigate } = useFetchWithAuthExports();
  const { setAppLoading }: LoadingContextType = useLoading();

  const deleteCar = async (carId: string) => {
    setAppLoading!(true);
    try {
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/car/delete",
        "delete",
        { id: carId },
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
      // Narrow down `err` to ensure it has a `message` property
      const errorMessage = 
        err instanceof Error ? err.message : "Failed to connect to the server";

      toast.error(errorMessage);

      return;
    } finally {
      setAppLoading!(false);
    }
  };

  return { deleteCar };
};
