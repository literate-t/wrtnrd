import { toast } from "react-toastify";
import axios from "@/utils/axios";

export const locate = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};

export const getStatus = (error: any): number => {
  const {
    response: { status },
  } = error;

  return status;
};

export const throttle = (limit: number, callback: Function) => {
  let lastTime: number = 0;
  let lastFuncId: any;

  return (args: any) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastTime;
    if (limit <= timeSinceLastRun) {
      callback(args);
      lastTime = now;
    } else {
      lastFuncId = setTimeout(() => {
        callback(args);
        lastTime = now;
        clearTimeout(lastFuncId);
        lastFuncId = undefined;
      }, limit - timeSinceLastRun);
    }
  };
};

export const debounce = (callback: (arg: string) => void, wait: number) => {
  let timerId: any;

  return (arg: any) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(arg);
    }, wait);
  };
};

export const notify = (message: string) => toast(message);
export const getDataFromError = (error: any): any => {
  const {
    response: { data },
  } = error;

  return data;
};

/**
 * A key of param is the key of url search param
 */
export const createDynamicUrlWithObject = (param: object): string => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(param).forEach((key) => {
    // @ts-ignore
    if (param[key] === undefined) {
      return;
    }
    // @ts-ignore
    urlSearchParams.set(key, param[key]);
  });

  return urlSearchParams.toString();
};

/**
 * A key of param is the key of url search param
 */
export const fetchPosts = async (baseUrl: string, param: object) => {
  const queryString = createDynamicUrlWithObject(param);
  const res = await axios.get(`${baseUrl}?${queryString}`);

  return res.data;
};
