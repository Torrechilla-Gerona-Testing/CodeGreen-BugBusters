import { BackendMessage } from "../../types/response.types";
import { fetchWithAuth } from "../../utils/fetch";
import useFetchWithAuthExports from "../context-hooks/useFetchWithAuthExports";
import { toast } from "react-toastify";
import { LoadingContextType } from "../../types/loading.types";
import useLoading from "../context-hooks/useLoading";

export const useDeleteRegistration = () => {
  const { auth, refresh, navigate } = useFetchWithAuthExports();
  const { setAppLoading }: LoadingContextType = useLoading();

  const deleteRegistration = async (licenseNumber: string) => {
    setAppLoading!(true);

    try {
      // Send license_number in the request body as JSON
      const response = await fetchWithAuth(
        navigate,
        refresh,
        auth,
        "/registration/delete", // Ensure this matches the backend API endpoint
        "delete",
        {
          license_number: licenseNumber,
        },
      );

      // Log the response status

      let responseBody;
      try {
        responseBody = await response.json();
      } catch (error) {
        console.error("Failed to parse JSON response:", error);
        throw new Error("Invalid JSON response from server.");
      }

      if (!response.ok) {
        const error: BackendMessage = responseBody;
        toast.error(error.message || "Failed to delete the registration.");
        return;
      }

      // Check if the deletion confirmation is present in the response
      if (responseBody.success) {
        toast.success("Registration deleted successfully.");
      } else {
        toast.error("Deletion failed on the server side.");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error("Unexpected error occurred.");
    } finally {
      setAppLoading!(false);
    }
  };

  return { deleteRegistration };
};

export default useDeleteRegistration;
