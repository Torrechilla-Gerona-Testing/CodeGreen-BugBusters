import { useState } from "react";
import { AuthContextType, UserLogin } from "../types/user.types";
import { BackendMessage } from "../types/response.types";
import { useNavigate } from "react-router-dom";
import useAuth from "./context-hooks/useAuth";
import { LoadingContextType } from "../types/loading.types";
import useLoading from "./context-hooks/useLoading";
import { toast } from "react-toastify";
import { normalFetch } from "../utils/fetch";

const useLogin = () => {
  // loading for the button
  const [loading, setLoading] = useState<boolean>();

  // to set the user info
  const { setAuth }: AuthContextType = useAuth();

  // loading for the app
  const { setAppLoading }: LoadingContextType = useLoading();

  const navigate = useNavigate();

  const submitLogin = async (data: UserLogin) => {
    try {
      // starts button loading
      setLoading(true);

      const response = await normalFetch("/auth/login", "post", data);

      if (!response.ok) {
        const backendError: BackendMessage = await response.json();
        toast.error(`${backendError.message}`);

        // stop button loading here after error
        setLoading(false);
        return;
      }
      // start app loading
      setAppLoading!(true);

      // to set the user info to be used by the app
      const userInfo = await response.json();
      setAuth!(userInfo);

      // notify success login
      toast.success("Logged In Successfully!");

      // To either navigate to the previous page where they go logged off or the landing page
      navigate(userInfo.isAdmin ? "/admin" : "/homepage");
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    } finally {
      // stop the loadings
      setAppLoading!(false);
      setLoading(false);
    }
  };

  return { submitLogin, setLoading, loading };
};

export default useLogin;
