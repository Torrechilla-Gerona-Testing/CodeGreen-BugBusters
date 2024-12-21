import { NavigateFunction } from "react-router-dom";
import { BackendMessage } from "../types/response.types";
import { User } from "../types/user.types";

export const normalFetch = async (
  route: string,
  method: string,
  body?: object
) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${route}`, {
    method: method.toUpperCase(),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  });

  return response;
};

export const fetchWithAuth = async (
  navigate: NavigateFunction,
  refresh: () => Promise<string | undefined>,
  auth: User | undefined,
  route: string,
  method: string,
  body?: object
) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${route}`, {
    method: method.toUpperCase(),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${auth?.accessToken}`,
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : null,
  });


  if (response.status === 403) {
  
    const newAccessToken = await refresh();

    const newResponse = await fetch(
      `${import.meta.env.VITE_SERVER_URL}${route}`,
      {
        method: method.toUpperCase(),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : null,
      }
    );

    if (!newResponse.ok) {
      const backendError: BackendMessage = await newResponse.json();
      navigate("/unauthorized");
      throw new Error(backendError.title + ": " + backendError.message);
    }

    return newResponse;
  }

  return response;
};
