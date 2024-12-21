import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/fetch";
import useFetchWithAuthExports from "./context-hooks/useFetchWithAuthExports";
import { UserNotification } from "../types/datatypes";

const useNotifications = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>();
  const [haveNotification, setHaveNotification] = useState<boolean>(false);
  const { auth, navigate, refresh } = useFetchWithAuthExports();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    const getNotifications = async () => {
      try {
        const response = await fetchWithAuth(
          navigate,
          refresh,
          auth,
          "/notification/get-by-user",
          "get",
        );

        if (response.status === 404) {
          setHaveNotification(false);
          return;
        }

        setHaveNotification(true);

        const noticationsAPI = await response.json();
        setNotifications(noticationsAPI);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    getNotifications();
  }, []);

  return { notifications, haveNotification, loading };
};

export default useNotifications;
