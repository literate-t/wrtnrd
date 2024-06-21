"use client";

import { useEffect } from "react";
import axios from "@/utils/axios";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import {
  getItemSessionStorage,
  getStatus,
  locate,
  notify,
} from "@/utils/common";
import { useAuth } from "@/providers/AuthProvider";
import {
  AUTH_ATOMS,
  ERROR_FORBIDDEN_403,
  SIGN_OUT_SUCCESS,
} from "@/utils/constants";
import { useRouter } from "next/navigation";
import { SIGN_URL } from "@/utils/urls";

const useAuthInterceptor = () => {
  const authState = useRecoilValue(authAtoms);
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const status = error && getStatus(error);
        if (ERROR_FORBIDDEN_403 == status) {
          if (authState?.id) {
            signOut(authState?.id);
          } else {
            const id = JSON.parse(
              getItemSessionStorage(AUTH_ATOMS) as string
            ).id;
            signOut(id);
          }
          notify(SIGN_OUT_SUCCESS);
          locate(SIGN_URL);
          return Promise.reject(null);
        }

        return Promise.reject(error);
      }
    );
  }, [authState, router]);

  return authState;
};

export default useAuthInterceptor;
