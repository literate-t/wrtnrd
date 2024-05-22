"use client";

import { useEffect } from "react";
import axios from "@/utils/axios";
import { useRecoilValue } from "recoil";
import { authAtoms } from "@/atoms/authAtoms";
import { getStatus } from "@/utils/common";
import { useAuth } from "@/providers/AuthProvider";
import { ERROR_UNAUTHENTICATED_401 } from "@/utils/constants";
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

        if (ERROR_UNAUTHENTICATED_401 == status) {
          signOut();
          router.push(SIGN_URL);
        }

        return error;
      }
    );
  }, [authState, router]);

  return authState;
};

export default useAuthInterceptor;
