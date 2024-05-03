import axios, { AxiosError } from "axios";
import { SIGN_IN_URL } from "@/utils/urls";
import {
  ERROR_FORBIDDEN_403,
  FALSE,
  KEY_SIGN_IN,
  TRUE,
} from "@/utils/constants";
import { locate } from "@/utils/common";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  (response) => {
    console.log("resp ok", response);
    const url = extractRequestUrl(response);
    checkSignInUrlAndSetSessionStorage(url, KEY_SIGN_IN, TRUE);

    return response;
  },
  (error) => {
    console.log("resp fail", error);
    const url = extractRequestUrl(error);
    checkSignInUrlAndSetSessionStorage(url, KEY_SIGN_IN, FALSE);

    const {
      response: { status },
    } = error;

    if (ERROR_FORBIDDEN_403 == status) {
      console.log("getNewTokens");
      getNewTokens(error);
    }

    return Promise.reject(error);
  }
);

// TODO 새로운 토큰을 요청하기 전에 기존 쿠키의 값을 삭제하는 요청을 보낸다
const getNewTokens = (config: AxiosError) => {
  const {
    request: { responseURL },
  } = config;
  axiosInstance("/auth/new-tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      setValueInSessionStorage(KEY_SIGN_IN, TRUE);
      locate(responseURL);
    })
    .catch((error) => {
      setValueInSessionStorage(KEY_SIGN_IN, FALSE);
      locate("/signin");
    });
};

const extractRequestUrl = (value: any) => {
  const {
    config: { url },
  } = value;

  return url;
};

const checkSignInUrlAndSetSessionStorage = (
  url: string | undefined,
  key: string,
  value: string
) => {
  if (isSignInUrl(url)) {
    setValueInSessionStorage(key, value);
  }
};

const isSignInUrl = (url: string | undefined) => {
  return SIGN_IN_URL === url;
};

const setValueInSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export default axiosInstance;
