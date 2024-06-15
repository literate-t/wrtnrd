"use client";

import { useEffect } from "react";
import axios from "@/utils/axios";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import { getStatus, notify } from "@/utils/common";
import { useAuth } from "@/providers/AuthProvider";
import { ERROR_UNAUTHORIZED_401, SIGN_IN_FAILURE } from "@/utils/constants";
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
        const status = getStatus(error);

        if (ERROR_UNAUTHORIZED_401 == status) {
          if (null != authState) {
            signOut();
          }
          notify(SIGN_IN_FAILURE);
          router.push(SIGN_URL);

          return Promise.reject(null);
        }

        return Promise.reject(error);
      }
    );
  }, [authState, router]);

  return authState;
};

export default useAuthInterceptor;
