"use client";

import React, { createContext, useContext } from "react";
import { useSetRecoilState } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import { getDataFromError, removeItemSessionStorage } from "@/utils/common";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import "react-toastify/dist/ReactToastify.css";
import axios from "@/utils/axios";
import { LOGOUT_URL } from "@/utils/urls";

const AuthContext = createContext({
  signIn: (id: number, email: string) => {},
  signOut: (id: number) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuthState = useSetRecoilState(authAtoms);

  const signIn = (id: number, email: string) => {
    setAuthState({
      id,
      email,
    });
  };

  const signOut = async (id: number) => {
    try {
      await axios(LOGOUT_URL, {
        method: "POST",
        data: {
          userId: id,
        },
      });
    } catch (error) {
      console.error(getDataFromError(error));
    }

    setAuthState(null);
    removeItemSessionStorage(ACCESS_TOKEN);
    removeItemSessionStorage(REFRESH_TOKEN);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
