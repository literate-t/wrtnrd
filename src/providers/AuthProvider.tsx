"use client";

import React, { createContext, useContext } from "react";
import { useSetRecoilState } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";

const AuthContext = createContext({
  signIn: (id: number, email: string) => {},
  signOut: () => {},
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuth = useSetRecoilState(authAtoms);

  const signIn = (id: number, email: string) => {
    setAuth({
      id,
      email,
    });
  };
  const signOut = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
