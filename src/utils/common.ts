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
