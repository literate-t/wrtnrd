"use client";

import React, { createContext, useContext } from "react";
import { useRecoilState } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import axios from "@/utils/axios";
import { getDataFromError, notify } from "@/utils/common";
import { SIGN_OUT_SUCCESS } from "@/utils/constants";
import { useRouter } from "next/navigation";

const AuthContext = createContext({
  signIn: (id: number, email: string) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useRecoilState(authAtoms);
  const router = useRouter();

  const signIn = (id: number, email: string) => {
    setAuthState({
      id,
      email,
    });
  };

  const signOut = async () => {
    try {
      await axios("/api/auth/revoke-all-tokens", {
        method: "POST",
        data: {
          userId: authState?.id,
        },
      });
      setAuthState(null);
      notify(SIGN_OUT_SUCCESS);

      router.push("/");
    } catch (error) {
      notify(getDataFromError(error));
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
